import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';
import { FaNairaSign } from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { deleteWishlist } from '../store/wishlists/Wishlists';
import { addToCart } from '../store/cart/cartsReucer';
import { FaRegHeart } from 'react-icons/fa';
import { BiLeftArrowAlt } from 'react-icons/bi';

export default function Wishlists() {
    const { wishlists } = useSelector((state) => state.wishlist);
    const { items } = useSelector((state) => state.cart);

    const [emptyCart, setEmptyCart] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {currentUser} = useSelector((state) => state.user);

    let total = 0;
    
    let dispatch = useDispatch();

    let navigate = useNavigate();

    const handleRemoveItem = (id) => {
        dispatch(deleteWishlist({
            productID: id,
        }));

        if (wishlists.length === 0) {
            setEmptyCart(true);
            return;
        }
    };

    useEffect(() => {
        if (wishlists.length === 0) {
            setEmptyCart(true);
            return;
        }
    });

    const handleReidirect =  () => {
        emptyCart ? setAlertMessage('You need to have at least a single item in your cart before you could checkout') : ''
        setTimeout(() => setAlertMessage(""), 2000);
    }
    
    const handleCart = (item) => {
        const cartItem = {
            productID: item.productID,
            productImage: item.productImage,
            productName: item.productName,
            productPrice: item.productPrice,
            quantity: 1,
        };
    
        dispatch(addToCart(cartItem));
    };
    const handleBack = () => {
        navigate(-1);
    }

    const handleCheckCart = () => {
        if (items.length === 0) {
          setShowModal(true);
        }else{
            navigate('/cart')
        }
    };

  return (
    <div className='bg-zinc-100'>
        <Header/>
        <div className="md:py-10 py-5 2xl:max-w-[80%] xl:max-w-[90%] lg:max-w-[100%] max-w-[97%] mx-auto">
            <div className="bg-white p-4 mb-3 rounded-lg">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/wishlist'} className='text-[13px] text-gray-500'>My wishlist</Link>
                    </div>

                    <button onClick={handleBack} className="py-1 h-[40px] px-6 text-white rounded-md bg-pink-600">
                        Back
                    </button>
                </div>
                <div className='my-5 w-full'>
                    <div className="w-full border-b border-b-gray-300 pb-4">
                        <h1 className='text-2xl font-medium text-center flex justify-center'><FaRegHeart size={22} className='text-pink-600' />My Wishlist</h1>
                        <p className="text-gray-500 text-center max-w-4xl mx-auto">Welcome to your Wishlist! Here, you can save your favorite items and easily find them later. Add products you love, compare options, and shop when you're ready. Don't wait too long—your favorites might sell out!</p>
                    </div>
                    {/* <div className='border border-gray-300 font-medium text-xl text-blue-900 mt-6 py-3 rounded-md' >
                        <Link to={'/shop'} fontWeight={500} className='text- flex items-center justify-center gap-2 text-[#C70039]'><BiLeftArrowAlt/> Continue Shopping</Link>
                    </div> */}
                </div>
                <div className="flex justify-between items-center bg-pink-200 rounded-md py-2 px-4">
                    <div className='font-medium text-xl rounded-md' >
                        <Link to={'/shop'} fontWeight={500} className='lg:text-lg text-sm flex items-center justify-center lg:gap-2 text-[#C70039]'><BiLeftArrowAlt/> Continue Shopping</Link>
                    </div>
                    <div className="">
                        {/* <Link to={'/cart'}>My wishlist</Link> */}
                        <button onClick={handleCheckCart} className="bg-pink-600 text-white lg:px-4 px-2  py-2 lg:text-lg text-sm rounded-md">
                            Check Cart
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="md:flex block justify-center gap-2 flex-wrap">
                <div className="flex-1 relative bg-white md:p-4 p-4 rounded-md">
                    <div className="max-w-[90vw] mx-auto overflow-auto">
                        <table className='w-full'>
                            <thead className='bg-pink-600 text-white'>
                                <tr>
                                    <th className='rounded-tl-md font-medium p-[10px] text-start'>Products</th>
                                    <th className='font-medium p-[10px] text-start'>Price</th>
                                    <th className='font-medium p-[10px] text-start'>Stock status</th>
                                    <th className=' font-medium p-[10px] text-start'>Action</th>
                                    <th className='rounded-tr-md font-medium p-[10px] text-start'>Cart</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {wishlists.length > 0 ? (
                                    wishlists.map((item, index) => {
                                        total += item.productPrice * item.quantity;

                                        return (
                                        <tr className="px-2" key={index}>
                                            <Link to={`/product-details/${item.productID}`}>
                                                <td className="py-2 flex gap-3 lg:w-[200px]">
                                                    <img src={item.productImage} alt="" className="rounded-md max-w-[50px] max-h-[50]"/>
                                                    {item.productName && (
                                                        <p className="text-sm">{item.productName.slice(0, 20)}...</p>
                                                    )}
                                                </td>
                                            </Link>
                                            <td className="py-3 font-normal w-[20%]">
                                                <p className="flex items-center justify-start">
                                                    <FaNairaSign />
                                                    {item.productPrice.toLocaleString()}.00
                                                </p>
                                            </td>
                                            <td className="py-2 font-medium">
                                                {item.stock >= 100 ? (
                                                    <p className="text-sm font-normal">In Stock</p>
                                                ) : (
                                                    <p className="">{item.stock}</p>
                                                )}
                                            </td>
                                            <td className="py-3 font-medium">
                                                <div className="flex justify-start items-start">
                                                    <button className="text-red-500 cursor-pointer text-[14px] font-medium text-start" onClick={() => handleRemoveItem(item.productID)}>
                                                    Delete Item
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 font-medium">
                                            <div className="flex justify-start items-start">
                                                <button onClick={() => handleCart(item)} className="text-white bg-yellow-400 px-2 py-1 rounded-md cursor-pointer text-[14px] font-medium text-start" >
                                                    Add To Cart
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                        );
                                    })
                                    ) : (
                                    <tr className='py-3'>
                                        <td colSpan="5" className="text-center py-4 text-gray-500 ">
                                            Your wishlist is empty. <br />
                                            <button onClick={() => navigate("/shop")} className="cursor-pointer mt-2 px-4 py-2 bg-gray-800 text-white rounded-md">
                                                Go Shopping
                                            </button>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>

        {/* Modal for empty wishlist */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center glass">
            <div className="bg-yellow-400 p-6 rounded-md shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2">Your Cart is Empty</h3>
                <p className="text-gray-800 mb-4 py-2">
                    Would you like to explore our products and add <br /> items to your Cart?
                </p>
                <div className="flex justify-center gap-4">
                <button onClick={() => navigate("/shop")} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Yes, Shop Now
                </button>
                <button  onClick={() => setShowModal(false)}  className="bg-gray-800 text-white px-4 py-2 rounded-md">
                    No, Maybe Later
                </button>
                </div>
            </div>
            </div>
        )}
    </div>
  )
}
