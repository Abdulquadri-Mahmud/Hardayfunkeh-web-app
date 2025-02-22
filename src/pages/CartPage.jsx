import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { changeQuantity, deleteProduct } from '../store/cart/cartsReucer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartPage() {
    const { items } = useSelector((state) => state.cart);
    const [emptyCart, setEmptyCart] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { wishlists } = useSelector((state) => state.wishlist);

    const [showModal, setShowModal] = useState(false);

    const {currentUser} = useSelector((state) => state.user);

    let total = 0;
    
    let dispatch = useDispatch();

    // useEffect()
    // const mSize = item.productSize.findIndex((it) => it === 'M');

    const increaseQuantity = (id) => {
        items.map((item) => {
        if (id === item.productID) {
            dispatch(changeQuantity({
            productID : item.productID,
            quantity : item.quantity + 1
            }));
        }
        });
    }

    let navigate = useNavigate();

    const decreaseQuantity = (id) => {
        items.map((item) => {
        if (id === item.productID) {
            dispatch(changeQuantity({
            productID : item.productID,
            quantity : item.quantity - 1 < 1 ? 1
            : item.quantity - 1
            }));
        }
        });
    };

    const handleRemoveItem = (id) => {
        dispatch(deleteProduct({
            productID: id,
        }));

        if (items.length === 0) {
            setEmptyCart(true);
            return;
        }
    };

    useEffect(() => {
        if (items.length === 0) {
            setEmptyCart(true);
            return;
        }
    });

    const handleReidirect =  () => {
        emptyCart ? setAlertMessage('You need to have at least a single item in your cart before you could checkout') : ''
        setTimeout(() => setAlertMessage(""), 2000);
    }
    
    const handleBack = () => {
        navigate(-1);
    }

    const handleCheckWishlist = () => {
        if (wishlists.length === 0) {
          setShowModal(true);
        }else{
            navigate('/wishlist')
        }
    };

  return (
    <div className='bg-zinc-100'>
        <Header/>
        <div className="md:py-10 py-5 2xl:max-w-[80%] xl:max-w-[90%] lg:max-w-[100%] max-w-[97%] mx-auto">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                        <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                        <Link to={'/cart'} className='text-[13px] text-gray-500'>My Carts</Link>
                    </div>

                    <button onClick={handleBack} className="py-1 h-[40px] px-6 text-white rounded-md bg-pink-600">
                        Back
                    </button>
                </div>
                <div className="w-full pb-4">
                    <h1 className='text-2xl font-medium text-center flex justify-center items-center gap-1'>My Cart <FaShoppingCart size={22} className='text-pink-600' /></h1>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto">Review your selected items before checkout. You can update quantities or remove items if needed. Don’t wait too long—your favorite products might sell out! 🎉</p>
                </div>
                <div className="flex justify-between items-center bg-pink-200 rounded-md py-2 px-4">
                    <div className='font-medium text-xl rounded-md' >
                        <Link to={'/shop'} fontWeight={500} className='text- flex items-center justify-center gap-2 text-[#C70039]'><BiLeftArrowAlt/> Continue Shopping</Link>
                    </div>
                    <div className="">
                        {/* <Link to={'/cart'}>My wishlist</Link> */}
                        <button onClick={handleCheckWishlist} className="bg-pink-600 text-white px-4 py-2 rounded-md">
                            Check Wishlist
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="md:flex mt-4 block justify-center gap-2 flex-wrap">
                <div className="flex-1 relative bg-white md:p-4 p-2 rounded-md">
                    <div className="max-w-[90vw] mx-auto overflow-auto">
                        <table className='w-full'>
                            <thead className='bg-pink-600 text-white'>
                                <tr>
                                    <th className='rounded-tl-md font-medium p-[10px] text-start'>Products</th>
                                    <th className='font-medium p-[10px] text-start'>Quantity</th>
                                    <th className='font-medium p-[10px] text-start'>Items Price</th>
                                    <th className='rounded-tr-md font-medium p-[10px] text-start'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {items.length > 0 ? (
                                    items.map((item, index) => {
                                        total += item.productPrice * item.quantity;
                                        
                                        return (
                                        <tr className="px-2" key={index}>
                                            <td className="py-2 flex gap-3 w-[200px]">
                                                <img src={item.productImage} alt="" className="rounded-md max-w-[50px] max-h-[50]"/>
                                                {item.productName && (
                                                    <p className="text-sm">{item.productName.slice(0, 30)}...</p>
                                                )}
                                            </td>
                                            <td className="py-2 font-medium">
                                                <div className="flex justify-start items-start h-full gap-2">
                                                    <button type="button" className="rounded-sm bg-zinc-100 w-6 h-6 flex justify-center items-center" onClick={() => decreaseQuantity(item.productID)} >
                                                        <CgMathMinus className="text-[14px] font-medium text-black" />
                                                    </button>
                                                        <span>{item.quantity}</span>
                                                    <button type="button" className="rounded-sm bg-zinc-100 w-6 h-6 flex justify-center items-center" onClick={() => increaseQuantity(item.productID)} >
                                                        <RiAddFill className="text-[14px] font-medium text-black" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 font-medium w-[20%]">
                                                <p className="flex items-center justify-start">
                                                    <FaNairaSign />
                                                    {(item.productPrice * item.quantity).toLocaleString()}.00
                                                </p>
                                            </td>
                                            <td className="py-3 font-medium">
                                                <div className="flex justify-start items-start">
                                                    <button className="text-red-500 cursor-pointer text-[14px] font-medium text-start" onClick={() => handleRemoveItem(item.productID)} >
                                                    Delete Item
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                    })
                                    ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6">
                                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                                        <button  onClick={() => navigate("/shop")}  className="bg-pink-600 text-white px-4 py-2 rounded-md mt-4">
                                            Go to Shop
                                        </button>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='md:max-w-[300px] w-[100%] mx-auto bg-white p-3 rounded-md'>
                    <div className='flex justify-between items-center pb-3 bottom-2 border-gray-300'>
                        <h1 className='text-sm font-medium'>Order Summary</h1>
                        <p className='text-sm'>Subtotal ({items.length} Item)</p>
                    </div>
                    <div className='flex justify-between items-center pb-3 bottom-2 border-gray-300'>
                        <h1 className='text-sm font-medium'>Delivery Changes:</h1>
                        <p textAlign={'end'} className='text-[11px] text-gray-400'>Add your Delivery address at checkout to see delivery charges</p>
                    </div>
                        <div className='flex justify-between items-center pb-3 bottom-2 border-gray-300'>
                            <h1 className='text-sm font-medium'>Subtotal</h1>
                        <div>
                        <p className='flex items-center text-sm'><FaNairaSign/>{total.toLocaleString()}.00</p>
                    </div>
                    </div>
                    <div className='flex justify-between items-center pb-3 bottom-2 border-gray-300'>
                        <h1 className='text-sm font-medium'>Total</h1>
                        <p className='flex items-center text-sm'><FaNairaSign/>{total.toLocaleString()}.00</p>
                    </div>
                    <p className='text-[12px] text-yellow-600 text-end py-2'>Excluding delivery charges</p>
                    {
                        alertMessage && (
                            <div className="py-2 px-2 text-sm w-full rounded-md border border-red-300 bg-red-100">
                                <p className="">{alertMessage}</p>
                            </div>
                        )
                    }
                    <div onClick={handleReidirect}>
                        <Link to={`${currentUser && !emptyCart ? `/checkout` : '/cart'}`}>
                            <button className='cursor-pointer bg-pink-600 text-white w-full my-3 rounded-md py-2 font-medium'>Continue to Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        {/* Modal for empty wishlist */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center glass">
            <div className="bg-yellow-400 p-6 rounded-md shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-800 mb-4 py-2">
                    Would you like to explore our products and add <br /> items to your wishlist?
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
