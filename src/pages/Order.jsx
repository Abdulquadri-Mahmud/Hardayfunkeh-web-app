import React, { useState } from 'react';
import { FaNairaSign } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { clearCart } from '../redux/cartSlice';

export default function Order() {
  const { items } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    deliveryMethod: 'Standard',
    paymentMethod: 'Cash on Delivery',
    items: items || [],
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  let total = items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://hardayfunkeh-apis.vercel.app/api/order/create_orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success === false) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }
      
      setSuccess('Order placed successfully!');
      setShowModal(true);
      dispatch(clearCart());
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-100">
      <Header />
      <div className="max-w-[90%] mx-auto my-10">
        <h2 className="text-2xl font-medium text-gray-700">Checkout</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" id="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" required />
            <input type="text" id="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" required />
            <input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" required />
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="border p-2 rounded" required />
            <textarea id="address" value={formData.address} onChange={handleChange} placeholder="Full Address" className="border p-2 rounded" required></textarea>
            <select id="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="border p-2 rounded">
              <option>Standard</option>
              <option>Express</option>
            </select>
            <select id="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="border p-2 rounded">
              <option>Cash on Delivery</option>
              <option>Online Payment</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Processing...' : 'Place Order'}</button>
        </form>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
