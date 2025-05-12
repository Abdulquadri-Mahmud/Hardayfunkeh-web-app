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
import { Badge, Box, Button, Flex, Heading, HStack, Icon, Image, Skeleton, Stack, Text,  } from '@chakra-ui/react';

export default function ProdDetails() {
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

    // console.log(getCarts.size);
    
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
            <Flex mt={4} justify="cente" gap={2} wrap="wra" color={'gray.800'} bg={'white'} p={3} rounded={'xl'}> 
                <Flex position="relative" align="center" justify="center" direction={{ base: "column", md: "row" }} gap={2}>
                    <Button onClick={handleWishlistItem} position="absolute"top="0.5rem"right="0.5rem"p="1"px="2"fontSize="sm"color="white"bg="yellow.400"_hover={{ bg: 'yellow.500' }}borderRadius="lg"textTransform="capitalize">
                        <FaRegHeart size={22} />
                    </Button>
                    <Flex gap={2} flexWrap={'wrap'}>
                            <Box w={{ base: "100%", "lg": "350px" }}>
                                <Flex w="350px" display="flex" justifyContent={{ base: "center", md: "flex-start" }}>
                                    {
                                        loading ? (
                                            <Box w="350px" h="400px" p="4" bg="gray.100" borderRadius="md" className="animate-pulse"/>
                                        ) : (
                                            <>
                                                {image !== undefined ? (
                                                    <Image  src={image[0]}  alt=""  ref={displayImage}  maxW="full"  borderRadius="md"  objectFit="fill" />
                                                ) : (
                                                    <Image src={image} alt="" ref={displayImage} maxW="full" borderRadius="md" objectFit="fill" />
                                                )}
                                            </>
                                        )
                                    }
                                </Flex>
                                <Box py={2} >
                                    {loading ? (
                                    <Box display="flex" alignItems="center" gap={2}>
                                        {image?.length > 0 &&
                                            image.map((_, index) => (
                                                <Skeleton key={index} width="56px" height="56px" borderRadius="lg" startColor="gray.200" endColor="gray.300" />
                                            ))}
                                    </Box>
                                    ) : (
                                    <>
                                        {image !== undefined && (
                                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                                            {image.length > 0 &&
                                                image.map((img, index) => (
                                                    <Box  key={index}  maxW="3.5rem"  cursor="pointer" p={1} border={'1px solid'} borderColor={'gray.300'}  borderRadius="md"  onMouseEnter={() => handleClick(img)}  >
                                                        <Image src={img} alt="" borderRadius="md" />
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                        )}
                                    </>
                                    )}

                                </Box>
                            </Box>
                            <Box flex={1} bg={'white'} mt={{md: 0, base : 4}} pl={3}>
                                <Box mt={4} borderBottom="1px solid" borderColor="gray.300" pb={2}>
                                    <Heading as="h2" pt={4} fontWeight="normal" fontSize={{lg:"xl", base: "2xl"}}>
                                        {name}
                                    </Heading>

                                    <Box mt={3}>
                                        <Text fontSize="sm" color="gray.500" my={1}>
                                            Product Code:{" "}
                                            <Text as="span" color="gray.600" fontSize="13px">
                                                {trackingId}
                                            </Text>
                                        </Text>

                                        {/* Optional: Reviews Section */}
                                        
                                        <Box display="flex" alignItems="center" gap={2}>
                                            {[...Array(5)].map((_, i) => (
                                                <Icon as={FaStar} key={i} color="yellow.400" />
                                            ))}
                                            <Text fontSize="sm" color="gray.500">20,00 Reviews</Text>
                                        </Box> 
                                    

                                        {/* Optional: Brand Section */}
                                        {/* 
                                        <Text fontSize="sm" color="gray.500" pt={2}>
                                        Brand: <Text as="span" color="gray.600" fontSize="13px">BrandName</Text>
                                        </Text> 
                                        */}
                                    </Box>
                                    <Box className="py-3">
                                    <Box display="flex" alignItems="center" gap={3}>
                                        {price !== undefined && (
                                            <>
                                            <Heading as="h2" fontSize={{ base: "2xl", lg: "3xl" }} fontWeight="medium" display="flex" alignItems="center">
                                                <FaNairaSign style={{ fontSize: '1.5rem' }} />
                                                {price.toLocaleString()}
                                            </Heading>

                                            {oldprice && (
                                                <Text fontSize="sm" color="gray.400" fontWeight="normal" pt={2} textDecoration="line-through" display="flex" alignItems="center">
                                                    <FaNairaSign style={{ fontSize: '0.875rem' }} />
                                                    {oldprice}
                                                </Text>
                                            )}

                                            {oldprice && (
                                                <Badge fontSize="sm" px={2} py={1} border="1px" borderColor="red.500" borderRadius="sm" color="pink.500" fontWeight="medium" display="flex" alignItems="center">
                                                    {((oldprice - price) / oldprice * 100).toFixed(2)}% OFF
                                                </Badge>
                                            )}

                                            {stock && (
                                                <Text fontSize="sm" px={2} py={1} color="white" bgGradient="linear(to-r, pink.600, red.500)" borderRadius="sm" fontWeight="normal">
                                                Only {stock} left
                                                </Text>
                                            )}
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                            <Box borderBottom="1px" borderColor="gray.300" py={3}>
                                <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2} mb={3}>
                                    <Flex align="center" gap={2}>
                                        <Text fontSize="sm">Quantity:</Text>
                                        <Flex gap={2} align="center">
                                        <Button type="button" bg="pink.600" color="white" w={9} h={9} rounded="md" display="flex" justifyContent="center" alignItems="center" onClick={decreaseQuantity} _hover={{ bg: "pink.500" }} _active={{ bg: "pink.700" }} p={0}>
                                            <CgMathMinus fontSize="0.875rem" />
                                        </Button>

                                        <Box ref={logQuantity}>
                                            {items.map((item) =>
                                            _id === item.productID ? (
                                                <Text key={item.productID}>{item.quantity}</Text>
                                            ) : null
                                            )}
                                        </Box>

                                        <Button type="button" bg="pink.600" color="white" w={9} h={9} rounded="md" display="flex" justifyContent="center" alignItems="center" onClick={increaseQuantity} _hover={{ bg: "pink.500" }} _active={{ bg: "pink.700" }} p={0}>
                                            <RiAddFill fontSize="0.875rem" />
                                        </Button>
                                        </Flex>
                                    </Flex>

                                    <Box bg="gray.200" py={2} px={2} rounded="md" mt={5}>
                                        <Text fontSize="sm" fontWeight="medium" textAlign="center">
                                            Call us for Bulk Purchase
                                        </Text>
                                        <Flex justifyContent="center" alignItems="center" color="pink.500" fontWeight="medium" gap={1}>
                                            <IoMdCall />
                                            <Link to="tel:07047594667" textAlign="center">
                                                07047594667
                                            </Link>
                                        </Flex>
                                    </Box>
                                </Box>
                                {/* {size?.length >= 0 && (
                                    <Box my={3} bg="gray.200" p={2} rounded="md">
                                        <Text fontSize="sm" fontWeight="semibold" color="pink.500">
                                        Available Sizes
                                        </Text>
                                        <Flex align="center" gap={5} flexWrap="wrap">
                                            <Flex gap={2} flexWrap="wrap">
                                                {size.map((sz) => (
                                                <Box as="label" key={sz} display="flex" alignItems="center" gap={1} cursor="pointer">
                                                    <input type="checkbox" name="size" value={sz} onChange={handleSizeChange} />
                                                    <Text>{sz}</Text>
                                                </Box>
                                                ))}
                                            </Flex>
                                        </Flex>
                                    </Box>
                                )} */}

                                    <Box mt={5} display="flex" justifyContent="space-between" alignItems="center">
                                        <Button bg="green.600" color="white" px={5} py={6} fontSize={'20px'} borderRadius="full" w="100%" fontWeight="medium" _hover={{ bg: "pink.500" }} onClick={handleCart} flexDirection="column" alignItems="center" justifyContent="center">
                                            Add To Cart
                                        </Button>
                                    </Box>
                                {
                                    currentAdmin && (
                                        <Box mt={4} className='text-center mt-4 underline text-gray-500 text-sm'>
                                            <Link to={`/dashboard/items/update-item/${_id}`}>Update Product</Link>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </Flex>
                    <Box display={{ base: "block", lg: "none" }} bg="white" px={3} py={3} borderRadius="md" maxW={{ base: "97%", lg: "100%", xl: "90%", "2xl": "80%" }} mx="auto" >
                        <Box mb={2}>
                            <Heading fontSize={{lg:"4xl", base: '2xl'}} fontWeight="medium">
                            Products Details:
                            </Heading>
                        </Box>
                        <Text
                            pb={2}
                            dangerouslySetInnerHTML={{
                            __html: description ? description.replace(/\n/g, "<br />") : "",
                            }}
                        />
                    </Box>
                </Flex>
                {
                    isOpen && (
                        <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="blackAlpha.700" display="flex" alignItems="center" justifyContent="center" zIndex="50" p={4}>
                            <Box bg="gray.100" color={'gray.800'} borderRadius="lg" p={8} maxW="lg" w="100%" position="relative" mt={{'2xl' : 0, xl:28}}>
                                <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
                                    Please select a variation
                                </Text>
                    
                            <Box bg="white" p={4} borderRadius="md">
                                <Stack direction="row" flexWrap="wrap" spacing={3} mb={4}>
                                    {size?.map((s) => (
                                        <>
                                            {
                                                s === s && (
                                                    <Box bg={'gray.800'} p={2} borderRadius="md" key={s} color={'gray.100'} pos={'relative'}>
                                                        <input type="checkbox" id={s} key={s} value={s} onChange={handleSizeChange}/>
                                                        <label htmlFor={s}>
                                                            {s}
                                                        </label>
                                                    </Box>
                                                )
                                            }
                                        </>
                                    ))}
                                </Stack>
                    
                                <Button type='button' width="100%" bg="green.600" color="white" borderRadius="full" onClick={handleCart} _hover={{ bg: "pink.700" }} flexDirection="column" fontWeight="medium" py={2} >
                                    Add To Cart
                                </Button>
                            </Box>
                    
                            <Button  onClick={() => setIsOpen(false)}  mt={4}  bg="red.600"  color="white"  _hover={{ bg: "red.700" }}  w="100%"  borderRadius="md">
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                    )
                }
                <Box w={{ base: "100%", md: "350px" }} bg="white" borderRadius="md" overflow="hidden" >
                    {/* Header */}
                    <Box py={2} px={3} borderBottom="1px solid" borderColor="gray.300">
                        <Text fontSize="16px" fontWeight="medium">
                        Delivery & Return
                        </Text>
                    </Box>

                    {/* Delivery Section */}
                    <Flex py={3} px={3} gap={2} align="flex-start">
                        <Icon as={TbTruckDelivery} color="pink.500" boxSize={5} mt={1} />
                        <Box>
                            <Text fontSize="15px" fontWeight="medium">
                                Delivery
                            </Text>
                            <Text>Estimated delivery time 1–9 business days</Text>
                            <Text fontSize="13px" pb={3}> Express Delivery Available </Text>
                            <Text fontSize="13px" pb={3}>
                                <Text as="span" fontWeight="medium">
                                For Same-Day-Delivery:
                                </Text>{" "}
                                Please place your order before 11AM
                            </Text>
                            <Text fontSize="13px" pb={3}>
                                <Text as="span" fontWeight="medium">
                                Next-Day-Delivery:
                                </Text>{" "}
                                Orders placed after 11AM will be delivered the next day
                            </Text>
                            <Text fontSize="13px" pb={3}>
                                <Text as="span" fontWeight="medium">
                                Note:
                                </Text>{" "}
                                Availability may vary by location
                            </Text>
                        </Box>
                    </Flex>

                    {/* Return Section */}
                    <Flex py={3} px={3} gap={2} align="flex-start" fontSize="13px">
                        <Icon as={MdOutlinePolicy} color="pink.500" boxSize={5} mt={1} />
                        <Box>
                        <Text fontSize="15px" pb={3}>
                            Return Policy
                        </Text>
                        <Text fontWeight="medium" pb={3}>
                            Guaranteed 7-Day Return Policy
                        </Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    </Box>
  )
}
