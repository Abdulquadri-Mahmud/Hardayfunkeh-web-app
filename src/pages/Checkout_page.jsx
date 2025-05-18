import React, { useState } from 'react';
import { FaNairaSign } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box,Button,Container,Flex, Heading, HStack, Text } from '@chakra-ui/react';
// import { toast } from 'react-toastify';
import {
  Grid,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
export default function CheckOutPage() {
  const { items } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  let total = 0;

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.defaultValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
        setLoading(true);

        const url = `https://hardayfunkeh-apis.vercel.app/api/order/create_orders`;

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success === false) {
            setError(data.message || 'Something went wrong');
            // toast.error(data.message || 'Something went wrong');
            setLoading(false);
            return;
        }

        // Success
        setSuccess(data.message);
        setShowModal(true); // Show modal on success
        //   toast.success('Order created successfully!');
        setError('');
        setLoading(false);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    //   toast.error(`Error: ${error.message || 'Failed to create gadget'}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const cancelOrder = async () => {
    await deleteOrder()
  }

  let navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <Box className="bg-zinc-100">
        <Header/>
      <Box maxW={{ base: '100%', xl: '90%', '2xl': '80%' }} mx="auto" my="10">
        <Box>
          <Container mt={8}>
            <Box border={'1px solid'} borderColor={'gray.200'} bg="white" p={4} borderRadius="lg" boxShadow="" mb={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <HStack spacing={1} align="center">
                  <Text fontSize="13px" color="gray.500">
                    <Link to="/">Home / </Link>
                  </Text>
                  <Text fontSize="13px" color="gray.500">
                    <Link to="/cart">My Carts / </Link>
                  </Text>
                  <Text fontSize="13px" color="gray.500">
                    <Link to="/create-order">Checkout</Link>
                  </Text>
                </HStack>
                <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
              </Flex>
              <Box mt={4}>
                <Heading fontSize={'5xl'} color={'pink.600'}>Checkout</Heading>
              </Box>
            </Box>
          </Container>
          <Container py={5} px={2}>
            <Box mb={2} p={2} bg="pink.600" borderTopRadius="md">
              <Heading as="h2" fontSize="2xl" fontWeight="medium" color="white">
                Basic Information
              </Heading>
            </Box>
            <Flex color={'gray.800'} justify="space-between" gap={3} flexWrap="wrap">
              {/* FORM SECTION */}
              <form onSubmit={handleSubmit}
                style={{
                  fontWeight: 500,
                  width: '100%',
                  maxWidth: '100%',
                  backgroundColor: 'white',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  borderBottomLeftRadius: '0.375rem',
                  borderBottomRightRadius: '0.375rem',
                  flexBasis: '45%'
                }}
              >
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                  <Input onChange={handleChange} defaultValue={formData.firstname} id="firstname" type="text" placeholder="First Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                  <Input onChange={handleChange} defaultValue={formData.lastname} id="lastname" type="text" placeholder="Last Name" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                </Grid>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                  <Input onChange={handleChange} defaultValue={formData.phone} id="phone" type="text" placeholder="Phone Number" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                  <Input onChange={handleChange} defaultValue={formData.email} id="email" type="email" placeholder="Email Address" fontWeight="normal" fontSize="sm" color="gray.500" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                </Grid>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} p={3}>
                  <select id="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} color="gray.600" p={2} borderRadius="md">
                    <option>Standard</option> <option>Express</option>
                  </select>
                  <select id="paymentMethod" value={formData.paymentMethod} onChange={handleChange} color="gray.600" p={2} borderRadius="md">
                    <option>Cash on Delivery</option>
                    <option>Online Payment</option>
                  </select>
                </Grid>

                <Box p={3}>
                  <Text mb={1}>Full Address</Text>
                  <Textarea id="address" onChange={handleChange} defaultValue={formData.address} placeholder="Full Address" fontWeight="normal" fontSize="sm" color="gray.500" h="80px" border="1px solid" borderColor="gray.200" rounded="md" p={2}/>
                </Box>

                <Flex justify="flex-end" p={3}>
                  <Button type="submit" bg="pink.600" _hover={{ bg: 'red.800' }} color="white" py={3} px={4} rounded="md" transition="background-color 0.2s" isLoading={loading} loadingText="Placing Order..." >
                    Place Order Now
                  </Button>
                </Flex>
              </form>

              {/* ORDER TABLE SECTION */}
              <Box flex="1" bg="white" rounded="md" p={4}>
                <Box maxW="90vw" mx="auto" overflowX="auto">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{
                            backgroundColor: '#facc15', // yellow.400
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '500',
                            padding: '10px',
                            borderTopLeftRadius: '8px',
                          }}>
                          Product
                        </th>
                        <th
                          style={{
                            backgroundColor: '#facc15',
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '500',
                            padding: '10px',
                          }}
                        >
                          Price
                        </th>
                        <th style={{
                            backgroundColor: '#facc15',
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '500',
                            padding: '10px',
                          }}>
                          Quantity
                        </th>
                        <th
                          style={{
                            backgroundColor: '#facc15',
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '500',
                            padding: '10px',
                            borderTopRightRadius: '8px',
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => {
                        total += item.productPrice * item.quantity;
                        return (
                          <tr key={index} style={{ borderBottom: '1px solid #d1d5db' }}>
                            <td
                              style={{
                                padding: '8px',
                                fontWeight: '400',
                                maxWidth: '150px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.productName && (
                                <span style={{ fontSize: '14px' }}>{item.productName.slice(0, 30)}...</span>
                              )}
                            </td>
                            <td style={{ padding: '12px', fontWeight: '400' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FaNairaSign style={{ fontSize: '14px' }} />
                                {item.productPrice?.toLocaleString()}.00
                              </div>
                            </td>
                            <td style={{ padding: '8px', fontWeight: '400' }}>
                              <div style={{ paddingLeft: '12px' }}>{item.quantity}</div>
                            </td>
                            <td style={{ padding: '12px', fontWeight: '400' }}>
                              <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
                                <FaNairaSign style={{ fontSize: '14px' }} />
                                {(item.productPrice * item.quantity).toLocaleString()}.00
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <Grid templateColumns="1fr 1fr" alignItems="center" borderBottom="1px solid" borderColor="gray.300" py={2}>
                    <Text fontSize="xl" px={2} fontWeight="medium">Grand Total</Text>
                    <Flex justify="flex-end" align="center" px={2}>
                      <FaNairaSign />
                      {total.toLocaleString()}.00
                    </Flex>
                  </Grid>
                </Box>
              </Box>
            </Flex>
          </Container>
        </Box>
      </Box>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-medium mb-4">Order Successful</h2>
            <p className="text-sm mb-4 leading-8 font-medium">
              {success}. <br /> Click to <Link to={'/payment'} className="text-blue-600 underline">Proceed to Payment</Link>
              <br /> If paying on delivery click the close button
            </p>
            <p className="text-blue-800 font-medium underline pb-4"><Link to={'/cart'}>Continue shopping</Link></p>
            <div className="flex justify-between items-center">
              <button onClick={closeModal}
                className="py-2 px-4 font-medium bg-blue-900 text-white rounded-md hover:bg-blue-800">
                Close
              </button>
              {/* <button onClick={cancelOrder} className='bg-blue-900 text-white px-5 py-2 rounded-md font-medium'>Cancel order</button> */}
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </Box>
  );
}
