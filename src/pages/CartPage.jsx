// Full updated CartPage using Chakra UI and replacing the table with cards and Headless UI modal

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Dialog, Transition } from '@headlessui/react';
import { MdDelete } from 'react-icons/md';
import { PiGreaterThan } from 'react-icons/pi';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { changeQuantity, deleteProduct } from '../store/cart/cartsReucer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoMdCart } from 'react-icons/io';

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const [emptyCart, setEmptyCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { wishlists } = useSelector((state) => state.wishlist);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let total = 0;

  useEffect(() => {
    if (items.length === 0) setEmptyCart(true);
  }, [items]);

  const increaseQuantity = (id) => {
    items.forEach((item) => {
      if (id === item.productID) {
        dispatch(
          changeQuantity({
            productID: item.productID,
            quantity: item.quantity + 1,
          })
        );
      }
    });
  };

  const decreaseQuantity = (id) => {
    items.forEach((item) => {
      if (id === item.productID) {
        dispatch(
          changeQuantity({
            productID: item.productID,
            quantity: Math.max(1, item.quantity - 1),
          })
        );
      }
    });
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteProduct({ productID: id }));
  };

  const handleRedirect = () => {
    if (emptyCart) {
      setAlertMessage('You need at least one item in your cart.');
    } else if (!currentUser) {
      setAlertMessage('You must be logged in to proceed.');
    }
    setTimeout(() => setAlertMessage(''), 2000);
  };

  const handleBack = () => navigate(-1);

  const handleCheckWishlist = () => {
    if (wishlists.length === 0) setShowModal(true);
    else navigate('/wishlist');
  };

  return (
    <Box bg="gray.100">
      <Header />
      <Box maxW="90%" mx="auto" py={5}>
        <Box bg="white" p={4} rounded="md">
          <Flex justify="space-between" align="center" mb={4}>
            <HStack spacing={1} align="center">
              <Link to="/">
                <Text fontSize="sm" color="gray.500">Home</Text>
              </Link>
              <Text size={12} color="gray.400">
                <PiGreaterThan />
              </Text>
              <Link to="/cart">
                <Text fontSize="sm" color="gray.500">My Carts</Text>
              </Link>
            </HStack>
            <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
          </Flex>

          <Box textAlign="center" mb={4}>
            <Flex justify="center" align="center" gap={2} mb={3}>
              <IoMdCart size={22} color="#C70039" />
              <Text fontSize="2xl"color={'gray.800'}  fontWeight="medium">My Cart</Text>
            </Flex>
            <Text color="gray.500" maxW="2xl" mx="auto">
              Review your selected items before checkout. You can update quantities or remove items if needed.
            </Text>
          </Box>

          <Flex justify="space-between" bg="pink.200" p={3} rounded="md" mb={4}>
            <Link to="/shop">
              <Text fontSize="xl" color="#C70039" display="flex" alignItems="center">
                <BiLeftArrowAlt /> Continue Shopping
              </Text>
            </Link>
            <Button onClick={handleCheckWishlist} bg="pink.600" color={'white'}>Check Wishlist</Button>
          </Flex>

          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            {/* Cart Items */}
            <Box flex={1} bg="white" color={'gray.800'} p={{lg: 4}} rounded="md">
              {items.length > 0 ? (
                <VStack spacing={4}>
                  {items.map((item, index) => {
                    total += item.productPrice * item.quantity;
                    return (
                      <Flex key={index} bg={'gray.100'} border="1px solid" borderColor="gray.300" rounded="md" p={4} w="full" justify="space-between" align="center" wrap="wrap" gap={4}>
                        <Flex gap={3} align="center" as={Link} to={`/product-details/${item.productID}`}>
                          <Image src={item.productImage} boxSize="50px" objectFit="cover" rounded="md" />
                          <Text fontSize="sm">{item.productName?.slice(0, 20)}...</Text>
                        </Flex>

                        <Flex align="center" gap={2}>
                          <Button h={{md:'35px', base: '30px'}} w={{md:'30px', base: '30px'}} bg={'pink.500'} color={'white'} size="sm" onClick={() => decreaseQuantity(item.productID)}><CgMathMinus /></Button>
                            <Text>{item.quantity}</Text>
                          <Button h={{md:'35px', base: '30px'}} w={{md:'30px', base: '30px'}} bg={'pink.500'} color={'white'} size="sm" onClick={() => increaseQuantity(item.productID)}><RiAddFill /></Button>
                        </Flex>

                        <Flex align="center">
                          <FaNairaSign />
                          <Text fontWeight="medium" ml={1}>{(item.productPrice * item.quantity).toLocaleString()}.00</Text>
                        </Flex>

                        <Button h={{md:'35px', base: '30px'}} w={{md:'30px', base: '30px'}} colorScheme="red" border={'1px solid'} borderColor={'gray.300'} onClick={() => handleRemoveItem(item.productID)} leftIcon={<MdDelete />}>
                          <MdDelete fontSize={'3xl'} color='red'/>
                        </Button>
                      </Flex>
                    );
                  })}
                </VStack>
              ) : (
                <Box textAlign="center" py={6}>
                  <Text color="gray.500" fontSize="lg">Your cart is empty.</Text>
                  <Button onClick={() => navigate("/shop")} bg="pink.600" color="white" mt={4}>
                    Go to Shop
                  </Button>
                </Box>
              )}
            </Box>

            {/* Summary Section */}
            <Box mt={{lg:4}} w={{md: "300px"}} h={'350px'} bg={{md: "gray.100", base: 'pink.100'}} border={'1px solid'} borderColor={'gray.300'} color={'gray.800'} p={4} rounded="md">
              <VStack align="stretch" spacing={4}>
                <Flex justify="space-between">
                  <Text fontWeight="medium">Order Summary</Text>
                  <Text fontSize="sm">Subtotal ({items.length} Item)</Text>
                </Flex>

                <Box>
                  <Text fontWeight="medium">Delivery Charges:</Text>
                  <Text fontSize="xs" color="gray.400">Add your Delivery address at checkout to see delivery charges</Text>
                </Box>

                <Flex justify="space-between">
                  <Text fontWeight="medium">Subtotal</Text>
                  <Text><FaNairaSign /> {total.toLocaleString()}.00</Text>
                </Flex>

                <Flex justify="space-between">
                  <Text fontWeight="medium">Total</Text>
                  <Text><FaNairaSign /> {total.toLocaleString()}.00</Text>
                </Flex>

                <Text fontSize="xs" color="yellow.600" textAlign="right">Excluding delivery charges</Text>

                {alertMessage && (
                  <Box bg="red.400" border="1px" borderColor="red.300" p={2} rounded="md">
                    <Text fontSize="sm">{alertMessage}</Text>
                  </Box>
                )}

                <Link to={currentUser && !emptyCart ? "/checkout" : "/cart"}>
                  <Button w="full" bg="pink.600"  color="white" onClick={handleRedirect}>Proceed to Checkout</Button>
                </Link>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Headless UI Modal for empty wishlist */}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" style={{ position: "relative", zIndex: 50 }} onClose={() => setShowModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Box position="fixed" inset={0} bg="blackAlpha.600" />
          </Transition.Child>

          <Box position="fixed" inset={0} overflowY="auto">
            <Flex minH="100vh" align="center" justify="center" p={4} textAlign="center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Box w="full" maxW="md" bg="yellow.400" p={6} rounded="2xl" textAlign="left" boxShadow="xl">
                  <Text fontSize="lg" fontWeight="medium" textAlign="center">
                    Your Wishlist is Empty
                  </Text>
                  <Box mt={2}>
                    <Text fontSize="sm" color="gray.800" textAlign="center">
                      Would you like to explore our products and add items to your wishlist?
                    </Text>
                  </Box>

                  <Flex mt={4} justify="center" gap={4}>
                    <Button bg="pink.500" color="white" _hover={{ bg: "pink.600" }} onClick={() => navigate("/shop")}>
                      Yes, Shop Now
                    </Button>
                    <Button bg="gray.800" color="white" _hover={{ bg: "gray.700" }} onClick={() => setShowModal(false)}>
                      No, Maybe Later
                    </Button>
                  </Flex>
                </Box>
              </Transition.Child>
            </Flex>
          </Box>
        </Dialog>
      </Transition>
      <Footer />
    </Box>
  );
}
