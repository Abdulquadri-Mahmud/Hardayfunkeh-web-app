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
import { addWishlist } from '../store/wishlists/Wishlists';
import { FaRegHeart } from 'react-icons/fa';
import Advert from '../components/Advert';

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';

export default function Details() {
    const { id } = useParams();
    const { items } = useSelector((state) => state.cart);
    const { wishlists } = useSelector((state) => state.wishlist);
    const { currentAdmin } = useSelector((state) => state.admin);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    let [isOpen, setIsOpen] = useState(false);

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
                    setLoading(false);
                }
    
                setLoading(false);
                setProduct(data);
            };
            fetchData();
        } catch (error) {
            setLoading(false);
        }
    }, []);

    const {_id, name, category, stock, image, price, trackingId, description, oldprice, size, gender} = product;
    
    // Update state when `product` changes
    useEffect(() => {
        if (product) {
            setGetCarts({
                productID: product._id || '',
                productName: product.name || '',
                productImage: product.image?.length > 0 ? product.image[0] :  product.image || [],
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
    
    let [message, setMessage] = useState(null);
    const handleCart = () => {
        if (category !== 'Jewellery') {
            if (getCarts.size.length <= 0) {
                setMessage('Please Select a variation (size)!');
                setTimeout(() => setMessage(null), 1500)
                setIsOpen(true);
                return;
            }else{
                dispatch(addToCart(getCarts));
            }
        }
        else{
            dispatch(addToCart(getCarts));
        }
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
        <Box bg={'gray.100'}>
            <Header/>
            {
                message && (
                    <Box position="fixed" bottom="5" left="5" zIndex="50" p={3} fontWeight="normal" fontSize="sm" borderRadius="lg" bg="green.600" color="white" >
                        {message}
                    </Box>
                )
            }
            <Box py={10} maxW={{ base: "97%", lg: "100%", xl: "90%", "2xl": "80%" }} mx="auto">
                <Box bg="white" p={4} borderRadius="lg" boxShadow="" mb={6}>
                    <Flex justify="space-between" align="center" mb={4}>
                        <HStack spacing={1} align="center">
                            <Link to="/">
                                <Text fontSize="sm" color="gray.500">Home</Text>
                            </Link>
                            <Text size={12} color="gray.400">
                                /
                            </Text>
                            <Link to="/cart">
                                <Text fontSize="sm" color="gray.500">product details</Text>
                            </Link>
                        </HStack>
                        <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
                    </Flex>
        
                    <Box mt={6}>
                        <Heading fontSize={{lg: '5xl', base: '3xl'}} color={'gray.700'}>Product Details</Heading>
                    </Box>
                </Box>
                <Box mt={4} justify="center" gap={2} wrap="wrap">
                    <Box flex={'1'} position={'relative'} bg={'white'} m={{md: '4'}} rounded={'lg'} boxShadow={'lg'} p={4} className="relative flex items-center justify-center flex-col md:flex-row gap-2">
                        <Button onClick={handleWishlistItem} position="absolute"top="0.5rem"right="0.5rem"p="1"px="2"fontSize="sm"color="white"bg="yellow.400"_hover={{ bg: 'yellow.500' }}borderRadius="lg"textTransform="capitalize">
                            <FaRegHeart size={22} />
                        </Button>
                        <Box className="flex gap-2 flex-wrap">
                            <Box className="2xl:w-[350px] w-[300px]">
                                <Box className="w-[300px] flex md:justify-start justify-center">
                                    {
                                        loading ? (
                                            // <Box className='w-[300px] h-[400px] shadow-md animate- rounded-md anime flex md:justify-start justify-center'>
                                                
                                            // </Box>
                                            <Box className="w-[300px] h-[400px] animate-pulse p-4 bg-gray-300 rounded-md"></Box>
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
                                </Box>
                                <Box className="py-2">
                                    {
                                        loading ? (
                                            <Box className="flex items-center gap-2">
                                                {
                                                    image?.length > 0 && image.map((index) => (
                                                        <Box key={index} className='w-14 h-14 shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse'>
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                        ) : (
                                            <>
                                                {
                                                image !== undefined ? (
                                                    <Box className='flex items-center flex-wrap gap-2'>
                                                        {
                                                            image.length > 0 && image.map((img) => {
                                                                return (
                                                                    <Box className="max-w-14 cursor-pointer bg-pink-600 p-1 rounded-md">
                                                                        <img src={img} onMouseEnter={() => handleClick(img)} className='rounded-md' alt="" />
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </Box>
                                                ) : ''
                                                }
                                            </>
                                        )
                                    }
                                </Box>
                            </Box>
                        <Box className="flex-1 bg-white md:mt-0 mt-4 pl-3">
                            <Box className=" mt-4 border-b-[1px] border-b-gray-300 pb-2">
                                <h2 className='pt-4 font-normal'>{name}</h2>
                                <Box className="mt-3">
                                        <p className='text-sm text-gray-500 my-1'>Product Code: <span className='text-gray-600 text-[13px]'>{trackingId}</span></p>
                                        {/* <Box className="flex items-center gap-2">
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <FaStar className='text-yellow-500'/>
                                            <p className='text-sm text-gray-500'>11 Reviews</p>
                                        </Box> */}
                                        {/* <p className='text-sm text-gray-500 pt-2'>Brand: <span className='text-gray-600 text-[13px]'></span></p> */}
                                </Box>
                                <Box className="py-3">
                                    <Box className="flex items-center gap-3">
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
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="border-b-[1px] border-b-gray-300 py-3">
                                <Box className="flex items-center justify-between flex-wrap gap-2 mb-3">
                                    <Box className="flex items-center gap-2">
                                        <p className='text-sm'>Quantity: </p>
                                        <Box className="flex gap-2 items-center">
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
                                        </Box>
                                    </Box>

                                    <Box className="bg-pink-200 py-2 px-2 rounded-md mt-5">
                                        <p className='text-sm font-medium text-center'>Call us for Bulk Purchase</p>
                                        <Box className="flex justify-center items-center text-pink-500 font-medium">
                                            <IoMdCall/>
                                            <Link to={'tell:07047594667'} className='text-center'>07047594667</Link>
                                        </Box>
                                    </Box>
                                </Box>
                                {
                                    size?.length > 0 && (
                                        <Box className="my-3 bg-pink-200 p-2 rounded-md">
                                            <p className="text-sm font-semibold text-pink-500">Available Sizes</p>
                                            <Box className="flex items-center gap-5">
                                                <Box className="flex gap-2 flex-wrap">
                                                    {
                                                        size.map((size) => (
                                                            <label key={size} className="flex items-center gap-1 cursor-pointer">
                                                                <input type="checkbox" name="size" value={size} onChange={handleSizeChange} /> {size}
                                                            </label>
                                                        ))
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                }
                                <Box className=" mt-5 flex justify-between items-center">
                                    <button className="bg-pink-600 flex justify-center flex-col items-center text-white px-5 py-1 rounded-full w-[100%] font-medium" onClick={handleCart}>
                                        Add To Cart {
                                            oldprice && (
                                                <p className="text-xs font-norma flex items-center">{((oldprice - price) / oldprice * 100).toFixed(2)}% OFF</p>
                                            )
                                        }
                                    </button>
                                </Box>
                                        {/* <button onClick={handleWishlistItem} className=" text-white cursor-pointer hover:text-pink-600 active:text-pink-600 focus:text-pink-600 absolute top-3 right-3 w-[30px] h-[30px] bg-gray-300 flex justify-center items-center rounded-full">
                                            <IoHeart className='text-xl'/>
                                        </button> */}
                                {
                                    currentAdmin && (
                                        <Box mt={4} className='text-center mt-4 underline text-gray-500 text-sm'>
                                            <Link to={`/dashboard/items/update-item/${_id}`}>Update Product</Link>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Box className='block lg:hidden bg-white px-3 py-3 rounded-md 2xl:max-w-[80%] xl:max-w-[90%] lg:max-w-[100%] max-w-[97%] mx-auto'>
                        <Box className="mb-2">
                            <h2 className='font-medium text-xl'>Products Details:</h2>
                        </Box>
                        {/* <ReactMarkdown >{description}</ReactMarkdown> */}
                        <p className="pb-2" dangerouslySetInnerHTML={{
                            __html: description ? description.replace(/\n/g, "<br />") : description,
                        }}></p>
                    </Box>
                </Box>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <Box className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg relative space-y-4 border bg-pink-200 p-8 shadow-lg rounded-lg">
                            <DialogTitle className="text-center">Please select a variation</DialogTitle>
                            <Box className="bg-white px-3 py-3 rounded-md">
                                <Box className="flex gap-2 flex-wrap mb-4">
                                    {
                                        size?.map((size) => (
                                            <label key={size} className="flex items-center gap-1 cursor-pointer">
                                                <input type="checkbox" name="size" value={size} onChange={handleSizeChange} className='cursor-pointer'/> {size}
                                            </label>
                                        ))
                                    }
                                </Box>
                                <Box className="space-y-3">
                                    <button className="bg-pink-600 flex justify-center flex-col items-center text-white px-5 py-1 rounded-full w-[100%] font-medium" onClick={handleCart}>
                                        Add To Cart {
                                            oldprice && (
                                                <p className="text-xs font-norma flex items-center">{((oldprice - price) / oldprice * 100).toFixed(2)}% OFF</p>
                                            )
                                        }
                                    </button>
                                </Box>
                            </Box>
                            <button onClick={() => setIsOpen(false)} className=' bg-red-600 text-white px-4 py-2 rounded-md'>Cancel</button>
                        </DialogPanel>
                    </Box>
                </Dialog>
                <Box className="md:w-[350px] w-full bg-white rounded-md md:h-[]">
                    <Box className="py-2 border-b-[1px] border-b-gray-300 p-3">
                        <p className='text-[16px] font-medium'>Delivery & Retrurn</p>
                    </Box>
                    <Box className="py-3 flex gap-2 justify-start p-3">
                        <Box className="">
                                <TbTruckDelivery className='text-pink-500 text-xl'/>
                        </Box>
                        <Box className="">
                            <p className='text-[15] font-medium'>Delivery</p>
                            <p className=''>Estimated delivery time 1-9 business days</p>
                            <p className="text-[13px] pb-3">Express Delivery Available</p>
                            <p className="text-[13px] pb-3"><span className="font-medium">For Same-Day-Delivery:</span> Please place your order before 11AM</p>
                            <p className="text-[13px] pb-3"><span className="font-medium">Next-Day-Delivery:</span> Orders placed after 11AM will be delievered the next day</p>
                            <p className="text-[13px] pb-3"><span className="text-[13px] font-medium">Note: </span>Availability may vary by location</p>
                        </Box>
                    </Box>
                    <Box className="text-[13px] py-3 flex gap-2 justify-start p-3">
                        <Box className="">
                            <MdOutlinePolicy className='text-pink-500 text-xl'/>
                        </Box>
                        <Box className="">
                            <p className="text-[15px] pb-3">Return Policy</p>
                            <p className="text-[13px] pb-3 font-medium">Guaranteed 7-Day Return Policy</p>
                        </Box>
                    </Box>
            </Box>
            </Box>
            <Box className='hidden lg:block bg-white px-3 py-3 rounded-md mt-6'>
                <Box className="mb-2">
                    <h2 className='font-medium text-[16px] text-gray-700'>Products Details:</h2>
                </Box>
                <p className="pb-2 text-sm text-gray-600" dangerouslySetInnerHTML={{
                    __html: description ? description.replace(/\n/g, "<br />") : description,
                }}></p>
            </Box>
        </Box>
        <Advert/>
        <Footer/>
    </Box>
  )
}
