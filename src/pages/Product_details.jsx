import React, { useEffect, useRef, useState } from 'react'
import { CgMathMinus } from 'react-icons/cg';
import { FaNairaSign, FaStar } from 'react-icons/fa6';
import { IoMdCall } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';
import { MdOutlinePolicy } from 'react-icons/md';
import { PiGreaterThan } from 'react-icons/pi';
import { RiAddFill } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { addToCart, changeQuantity } from '../store/cart/cartsReucer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { p } from 'framer-motion/client';
import { addWishlist } from '../store/wishlists/Wishlists';
import { FaRegHeart } from 'react-icons/fa';
import Advert from '../components/Advert';

export default function Details() {
    const { id } = useParams();
    const { items } = useSelector((state) => state.cart);
    const { wishlists } = useSelector((state) => state.wishlist);
    const { currentAdmin } = useSelector((state) => state.admin);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const [getCarts, setGetCarts] = useState({
        productID: '',
        productName: '',
        productImage: '',
        productPrice: '',
        size: [],
        quantity: 1,
    });

    
    let displayImage = useRef(null);
    const logQuantity = useRef(null);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        try {
            setLoading(true);

            const fetchData = async () => {
                const res =  await fetch(`https://hardayfunkeh-apis.vercel.app/api/products/single-products/${id}`);
        
                const data = await res.json();

                if (data.success === false) {
                    console.log(data.message);
                    setLoading(false);
                }
    
                setLoading(false);
                setProduct(data);
            };
            fetchData();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, []);

    const {_id, name, category, stock, image, price, trackingId, description, oldprice, size, gender} = product;
    
    // Update state when `product` changes
    useEffect(() => {
        if (product) {
            setGetCarts({
                productID: product._id || '',
                productName: product.name || '',
                productImage: product.image || '',
                productPrice: product.price || '',
                size: [],
                quantity: 1,
            });
        }
    }, [product]);  // Runs whenever `product` updates
    
    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
    
        setGetCarts((prev) => {
            const updatedSizes = checked 
                ? [...prev.size, value]  // Add new size
                : prev.size.filter((s) => s !== value);  // Remove unselected size
            
            return { ...prev, size: updatedSizes };
        });
    };
    
    // Logs the updated state AFTER it changes
    useEffect(() => {
        // console.log("Updated cart:", getCarts);
        
    });

    const handleCart = () => {
        dispatch(addToCart(getCarts));
    }

    const increaseQuantity = () => {
        items.map((item) => {
            if (_id === item.productID) {
            dispatch(changeQuantity({
                productID : item.productID,
                quantity : item.quantity + 1
            }));
            }
        });
    }

    let navigate = useNavigate();

    const decreaseQuantity = () => {
        items.map((item) => {
            if (_id === item.productID) {
            dispatch(changeQuantity({
                productID : item.productID,
                quantity : item.quantity - 1 < 1 ? navigate('/')
                : item.quantity - 1
            }));
            }
        });
    }

    const handleClick = (img) => {
        displayImage.current.src = img;
    }
    
    const handleBack = () => {
        navigate(-1)
    }

    const handleWishlistItem = () => {
        dispatch(addWishlist(getCarts))
    };
  
    return (
        <div className="bg-zinc-100">
            <Header/>
            <div className='py-10 2xl:max-w-[80%] xl:max-w-[90%] lg:max-w-[100%] max-w-[97%] mx-auto'>
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center bg-white px-3 py-2 rounded-md max-w-xs">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={`/product-details/${_id}`} className='text-[13px] text-gray-500'>Products Details</Link>
                    </div>
                    <div className="text-gray-400">
                        {
                            loading && 'Loading item...'
                        }
                    </div>
                    <div className="">
                        <button onClick={handleBack} className="py-2 px-6 text-white rounded-md bg-pink-600">
                            Back
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    <div className="flex-1 relative bg-white md:p-4 p-2 rounded-md">
                        <button onClick={handleWishlistItem} className="cursor-pointer absolute top-2 right-2 p-1 px-2 text-sm text-white bg-yellow-400 rounded-lg capitalize">
                            <FaRegHeart size={22} />
                        </button>
                        <div className="flex gap-2 flex-wrap">
                            <div className="2xl:w-[350px] w-[300px]">
                                <div className="w-[300px] flex md:justify-start justify-center">
                                    {
                                        loading ? (
                                            // <div className='w-[300px] h-[400px] shadow-md animate- rounded-md anime flex md:justify-start justify-center'>
                                                
                                            // </div>
                                            <div className="w-[300px] h-[400px] animate-pulse p-4 bg-gray-300 rounded-md"></div>
                                        ) : (
                                            <>
                                                {
                                                    image !== undefined ? (
                                                        <>
                                                            <img src={image[0]} alt="" ref={displayImage} className='max-w-full rounded-md object-fill'/>
                                                        </>
                                                    ) : (
                                                        <img src={image} alt="" ref={displayImage} className='max-w-full rounded-md object-fill'/> 
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className="py-2">
                                    {
                                        loading ? (
                                            <div className="flex items-center gap-2">
                                                {
                                                    image?.length > 0 && image.map((index) => (
                                                        <div key={index} className='w-14 h-14 shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse'>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <>
                                                {
                                                image !== undefined ? (
                                                    <div className='flex items-center gap-2'>
                                                        {
                                                            image.length > 0 && image.map((img) => {
                                                                return (
                                                                        <div className="max-w-14 cursor-pointer bg-pink-600 p-1 rounded-md">
                                                                            <img src={img} onMouseEnter={() => handleClick(img)} className='rounded-md' alt="" />
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                ) : ''
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        <div className="flex-1 bg-white md:mt-0 mt-4 pl-3">
                            <div className=" mt-4 border-b-[1px] border-b-gray-300 pb-2">
                                <h2 className='pt-4 font-normal'>{name}</h2>
                                <div className="mt-3">
                                        <p className='text-sm text-gray-500 my-1'>Product Code: <span className='text-gray-600 text-[13px]'>{trackingId}</span></p>
                                        {/* <div className="flex items-center gap-2">
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <p className='text-sm text-gray-500'>11 Reviews</p>
                                        </div> */}
                                        {/* <p className='text-sm text-gray-500 pt-2'>Brand: <span className='text-gray-600 text-[13px]'></span></p> */}
                                </div>
                                <div className="py-3">
                                    <div className="flex items-center gap-3">
                                        {
                                            price !== undefined ? (
                                            <>
                                                <h2 className='lg:text-3xl text-2xl font-medium flex items-center'><FaNairaSign className='text-2xl'/>{price.toLocaleString()}</h2>
                                                {
                                                    oldprice && (
                                                        <p className="text-sm text-gray-400 font-normal pt-2 line-through flex items-center"><FaNairaSign className='text-sm'/>{oldprice}</p>
                                                    )
                                                }
                                                {
                                                    oldprice && (
                                                        <p className="text-sm px-2 py-1 border border-red-500 rounded-sm text-pink-500 font-medium flex items-center">{((oldprice - price) / oldprice * 100).toFixed(2)}%</p>
                                                    )
                                                }
                                                {
                                                    stock && (
                                                        <p className="text-sm px-2 py-1 text-white bg-pink-600 to-red-500 rounded-sm font-normal">Only {stock} left</p>
                                                    )
                                                }
                                            </>
                                            ): ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-[1px] border-b-gray-300 py-3">
                                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <p className='text-sm'>Quantity: </p>
                                        <div className="flex gap-2 items-center">
                                            <button type='button' className='text-white bg-pink-600 w-7 h-7 rounded-md flex justify-center items-center' onClick={decreaseQuantity}><CgMathMinus className='text-sm'/></button>
                                            <span className="" ref={logQuantity}>
                                            {
                                                items.map((item) => (
                                                    <>
                                                        {
                                                            _id === item.productID && (
                                                                <>
                                                                {item.quantity}
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ))
                                            }
                                            </span>
                                            <button type='button' className='text-white bg-pink-600 w-7 h-7 rounded-md flex justify-center items-center' onClick={increaseQuantity}><RiAddFill className='text-sm'/></button>
                                        </div>
                                    </div>

                                    <div className="bg-pink-200 py-2 px-2 rounded-md mt-5">
                                        <p className='text-sm font-medium text-center'>Call us for Bulk Purchase</p>
                                        <div className="flex justify-center items-center text-pink-500 font-medium">
                                            <IoMdCall/>
                                            <Link to={'tell:07047594667'} className='text-center'>07047594667</Link>
                                        </div>
                                    </div>
                                </div>
                                {
                                    size?.length > 0 && (
                                        <div className="my-3 bg-pink-200 p-2 rounded-md">
                                            <p className="text-sm font-semibold text-pink-500">Available Sizes</p>
                                            <div className="flex items-center gap-5">
                                                <div className="flex gap-2">
                                                    {
                                                        size.map((size) => (
                                                            <label key={size} className="flex items-center gap-1 cursor-pointer">
                                                                <input type="checkbox" name="size" value={size} onChange={handleSizeChange} /> {size}
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className=" mt-5 flex justify-between items-center">
                                    <button className="bg-pink-600 flex justify-center flex-col items-center text-white px-5 py-1 rounded-full w-[100%] font-medium" onClick={handleCart}>
                                        Add To Cart {
                                            oldprice && (
                                                <p className="text-xs font-norma flex items-center">{((oldprice - price) / oldprice * 100).toFixed(2)}% OFF</p>
                                            )
                                        }
                                    </button>
                                </div>
                                        {/* <button onClick={handleWishlistItem} className=" text-white cursor-pointer hover:text-pink-600 active:text-pink-600 focus:text-pink-600 absolute top-3 right-3 w-[30px] h-[30px] bg-gray-300 flex justify-center items-center rounded-full">
                                            <IoHeart className='text-xl'/>
                                        </button> */}
                                {
                                    currentAdmin && (
                                        <div mt={4} className='text-center mt-4 underline text-gray-500 text-sm'>
                                            <Link to={`/dashboard/items/update-item/${_id}`}>Update Product</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='block lg:hidden bg-white px-3 py-3 rounded-md 2xl:max-w-[80%] xl:max-w-[90%] lg:max-w-[100%] max-w-[97%] mx-auto'>
                        <div className="mb-2">
                            <h2 className='font-medium text-xl'>Products Details:</h2>
                        </div>
                        {/* <ReactMarkdown >{description}</ReactMarkdown> */}
                        <p className="pb-2" dangerouslySetInnerHTML={{
                            __html: description ? description.replace(/\n/g, "<br />") : description,
                        }}></p>
                    </div>
                </div>
                <div className="md:w-[350px] w-full bg-white rounded-md md:h-[]">
                    <div className="py-2 border-b-[1px] border-b-gray-300 p-3">
                        <p className='text-[16px] font-medium'>Delivery & Retrurn</p>
                    </div>
                    <div className="py-3 flex gap-2 justify-start p-3">
                        <div className="">
                                <TbTruckDelivery className='text-pink-500 text-xl'/>
                        </div>
                        <div className="">
                            <p className='text-[15] font-medium'>Delivery</p>
                            <p className=''>Estimated delivery time 1-9 business days</p>
                            <p className="text-[13px] pb-3">Express Delivery Available</p>
                            <p className="text-[13px] pb-3"><span className="font-medium">For Same-Day-Delivery:</span> Please place your order before 11AM</p>
                            <p className="text-[13px] pb-3"><span className="font-medium">Next-Day-Delivery:</span> Orders placed after 11AM will be delievered the next day</p>
                            <p className="text-[13px] pb-3"><span className="text-[13px] font-medium">Note: </span>Availability may vary by location</p>
                        </div>
                    </div>
                    <div className="text-[13px] py-3 flex gap-2 justify-start p-3">
                        <div className="">
                            <MdOutlinePolicy className='text-pink-500 text-xl'/>
                        </div>
                        <div className="">
                            <p className="text-[15px] pb-3">Return Policy</p>
                            <p className="text-[13px] pb-3 font-medium">Guaranteed 7-Day Return Policy</p>
                        </div>
                    </div>
            </div>
            </div>
            <div className='hidden md:block bg-white px-3 py-3 rounded-md mt-6'>
                <div className="mb-2">
                    <h2 className='font-medium text-[16px] text-gray-800'>Products Details:</h2>
                </div>
                <p className="pb-2" dangerouslySetInnerHTML={{
                    __html: description ? description.replace(/\n/g, "<br />") : description,
                }}></p>
                {/* <ReactMarkdown className={'text-gray-600'}>{description}</ReactMarkdown> */}
            </div>
        </div>
        <Advert/>
        <Footer/>
    </div>
  )
}
