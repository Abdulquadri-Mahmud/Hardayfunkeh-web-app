// Converted version of the component using Headless UI for modal instead of Chakra UI Modal
import React, { useEffect, useState, Fragment } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { Table } from "@chakra-ui/react"
import { Dialog, Transition } from '@headlessui/react';
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
import { BsCart4 } from 'react-icons/bs';
import { IoMdCart } from 'react-icons/io';

export default function Wishlists() {
  const { wishlists } = useSelector((state) => state.wishlist);
  const { items } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const [emptyCart, setEmptyCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  let total = 0;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(deleteWishlist({ productID: id }));
    if (wishlists.length === 0) {
      setEmptyCart(true);
    }
  };

  useEffect(() => {
    if (wishlists.length === 0) {
      setEmptyCart(true);
    }
  });

  const handleReidirect = () => {
    if (emptyCart) setAlertMessage('You need to have at least a single item in your cart before you could checkout');
    setTimeout(() => setAlertMessage(''), 2000);
  };

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
  };

  const handleCheckCart = () => {
    if (items.length === 0) {
      setShowModal(true);
    } else {
      navigate('/cart');
    }
  };

  return (
    <Box bg="gray.100">
      <Header />
      <Box maxW="95%" mx="auto" py={{ base: 5, md: 10 }}>
        <Box bg="white" p={4} mb={3} rounded="lg">
          <Flex justify="space-between">
            <Flex gap={1} align="center">
              <ChakraLink as={Link} to="/" fontSize="sm" color="gray.500">Home</ChakraLink>
              <Icon as={PiGreaterThan} fontSize="sm" color="gray.500" />
              <ChakraLink as={Link} to="/wishlist" fontSize="sm" color="gray.500">My Wishlist</ChakraLink>
            </Flex>
            <Button onClick={handleBack} bg="pink.600" color="white" h="40px">Back</Button>
          </Flex>

          <Stack my={5} spacing={4}>
            <Box borderBottom="1px" borderColor="gray.300" pb={4}>
              <Flex justify="center" align="center" gap={2} mb={3}>
                <Icon as={FaRegHeart} color="pink.600" boxSize={6} />
                <Heading size="xl" color={'gray.800'} textAlign="center">My Wishlist</Heading>
              </Flex>
              <Text textAlign="center" color="gray.500" maxW="4xl" mx="auto">
                Welcome to your Wishlist! Here, you can save your favorite items and easily find them later.
                Add products you love, compare options, and shop when you're ready. Don't wait too long—your favorites might sell out!
              </Text>
            </Box>

            <Flex justify="space-between" align="center" bg="pink.200" p={4} rounded="md">
              <ChakraLink as={Link} to="/shop" fontWeight="medium" fontSize={{ base: 'sm', lg: 'lg' }} color="#C70039" display="flex" alignItems="center" gap={2}>
                <Icon as={BiLeftArrowAlt} /> Continue Shopping
              </ChakraLink>
              <Button onClick={handleCheckCart} bg="pink.600" color="white" fontSize={{ base: 'sm', lg: 'lg' }}>
                Check Cart
              </Button>
            </Flex>
          </Stack>

          <Box bg="white" p={{lg: 4}} rounded="md">
            <Box overflowX="auto">
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4} color={'gray.800'} spacing={6} mt={0}>
                {wishlists.length > 0 ? (
                  wishlists.map((item, index) => {
                    total += item.productPrice * item.quantity;
                    return (
                      <Box key={index} bg="white" rounded="lg"  p={4} border="1px solid" borderColor="gray.200">
                        <Link to={`/product-details/${item.productID}`}>
                          <Image src={item.productImage} alt={item.productName} rounded="md" objectFit="cover" w="100%" h="200px" mb={3} />
                        </Link>
                        <Heading as="h3" size="sm" mb={2}>
                          {item.productName?.slice(0, 40)}...
                        </Heading>
                        <Flex align="center" mb={2} fontWeight="semibold">
                          <FaNairaSign />
                          <Text ml={1}>{item.productPrice.toLocaleString()}.00</Text>
                        </Flex>
                        <Text fontSize="sm" mb={3}>
                          Stock: {item.stock >= 100 ? 'In Stock' : item.stock}
                        </Text>
                        <Flex justify="space-between" mt="auto" gap={2}>
                          <Button bg="gray.200" fontSize={'3xl'} color={'white'} flex={1} onClick={() => handleRemoveItem(item.productID)}>
                            <MdDelete fontSize={'3xl'} color='red'/>
                          </Button>
                          <Button bg="pink.600" color="white" flex={1} onClick={() => handleCart(item)}>
                            <IoMdCart/>
                          </Button>
                        </Flex>
                      </Box>
                    );
                  })
                ) : (
                  <Box colSpan={5} textAlign="center" py={10} color="gray.500">
                    Your wishlist is empty. <br />
                    <Button mt={4} bg="gray.800" color="white" onClick={() => navigate('/shop')}>
                      Go Shopping
                    </Button>
                  </Box>
                )}
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />

      {/* Headless UI Modal */}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-yellow-400 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Your Cart is Empty
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                      Would you like to explore our products and add items to your Cart?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                      onClick={() => navigate('/shop')}
                    >
                      Yes, Shop Now
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
                      onClick={() => setShowModal(false)}
                    >
                      No, Maybe Later
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Box>
  );
}
