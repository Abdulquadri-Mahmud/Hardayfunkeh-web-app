import React from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Select,
  Button,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
    <Box bg="gray.100" minH="100vh">
      <Header />
      <Box maxW="90%" mx="auto" my={10}>
        <Heading as="h2" size="lg" color="gray.700" mb={4}>
          Checkout
        </Heading>

        <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Input type="text" id="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" required/>
            <Input type="text" id="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required/>
            <Input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required/>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required/>
            <Textarea id="address" value={formData.address} onChange={handleChange} placeholder="Full Address" required/>
            <Select id="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} >
              <option>Standard</option>
              <option>Express</option>
            </Select>
            <Select id="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option>Cash on Delivery</option>
              <option>Online Payment</option>
            </Select>
          </SimpleGrid>

          <Button type="submit" mt={4} bg="blue.600" color="white" px={6} py={2} borderRadius="md" _hover={{ bg: 'blue.700' }} isDisabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </form>

        {success && <Text mt={4} color="green.600">{success}</Text>}
        {error && <Text mt={4} color="red.600">{error}</Text>}
      </Box>
      <Footer />
    </Box>
  );
}
