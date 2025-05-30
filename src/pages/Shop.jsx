import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { addToCart } from "../store/cart/cartsReucer";
import Advert from "../components/Advert";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoHeart } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { addWishlist } from "../store/wishlists/Wishlists";

export default function Shop() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.items); 

  const categories = ["Abaya", "Jalab", "Jewellery", "Fabric"];
  const itemsPerPage = 10; // Products per page

  // State to track the current page for each category
  const [currentPage, setCurrentPage] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: 1 }), {})
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartItem = {
      productID: product._id,
      productImage: product.image?.length > 0 ? product.image[0] : "/placeholder.png",
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
  };

   const handleWishlistItem = (product) => {
      const cartItem = {
        productID: product._id || '',
        productName: product.name || [],
        productImage: product.image?.length > 0 ? product.image[0] :  product.image || [],
        productPrice: product.price || '',
        stock: product.stock || [],
        quantity: 1,
      };
      dispatch(addWishlist(cartItem));
    };

  const handlePageChange = (category, direction) => {
    setCurrentPage((prev) => ({
      ...prev,
      [category]: prev[category] + direction,
    }));
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="bg-gray-100">
      <Header />
      <Box maxW="7xl" mx="auto" px={{ base: 3, md: 6 }} py={10}>
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
                <Text fontSize="sm" color="gray.500">All Categories</Text>
              </Link>
            </HStack>
            <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
          </Flex>

          <Box mt={6}>
            <Heading fontSize={'5xl'} color={'gray.700'}>All Categories</Heading>
          </Box>
        </Box>

      {categories.map((category) => {
        const filteredProducts = products.filter((item) => item.category === category);
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const startIndex = (currentPage[category] - 1) * itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

        return (
          <Box key={category} mb={10} bg="white" p={2} rounded="lg">
            <Flex mb={4} py={3} px={3} bg="pink.600" color="white" rounded="md" justify="space-between" align="center">
              <Heading fontSize="xl" fontWeight="semibold">
                {category} Collection
              </Heading>
              <Link to={`/${category}`} style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
                See All <FaAngleRight style={{ marginLeft: "4px", fontSize: "20px" }} />
              </Link>
            </Flex>

            <SimpleGrid bg={'white'} p={{md: 6}} rounded={'xl'} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
              {loading
                ? [...Array(8)].map((_, index) => (
                    <GridItem key={index} bg="gray.200" p={4} borderRadius="lg" border={'1px solid'} borderColor={'gray.200'} opacity={0.6}>
                      <Box h="64" bg="gray.300" mb={4} />
                      <Box h="4" bg="gray.300" w="3/4" mb={2} />
                      <Box h="4" bg="gray.300" w="1/2" />
                      <Box h="10" bg="gray.300" w="full" mt={3} />
                    </GridItem>
                  ))
                : paginatedProducts.length === 0 ? (
                    <Text textAlign="center" color="gray.500">
                      No products available at the moment.
                    </Text>
                  ) : (
                    paginatedProducts.map((item) => (
                      <Box key={item._id}bg="white" border={'1px solid'} borderColor={'gray.200'} rounded="lg" overflow="hidden" _hover={{ transform: "scale(1.05)", transition: "0.3s" }} position="relative">
                        <Link to={`/product-details/${item._id}`}>
                          <Flex w={{ base: "full", md: "100%" }} p={3} h="170px" mx="auto" justify={'center'} alignItems={'center'}>
                            <Image src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"} alt={item.name} h="full" objectFit="cover" borderRadius="md"/>
                          </Flex>
                        </Link>
                        <Flex zIndex={1} justifyContent={'center'} alignItems={'center'} fontSize={'2xl'} onClick={handleWishlistItem} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="35px" h="35px" bg="yellow.400" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
                          <IoHeart/>
                        </Flex>
                        <Box p={3}>
                          <Heading as={'h2'} fontWeight={500} color={'gray.600'} size="md" isTruncated mb={1} className="truncate">
                            {item.name}
                          </Heading>
                          <Text color="gray.600" fontSize="12px" bg='gray.100' p='1' rounded='md' isTruncated className="truncate" mb={1}>
                            {item.description}
                          </Text>
    
                          <Flex justify="space-between" align="center" mt={1} w="full">
                            <Box>
                              {item.oldprice ? (
                                  <Badge bg="gray.100" color='gray.800' variant="subtle" mt={2} fontSize="xs">
                                    {((item.oldprice - item.price) / item.oldprice * 100).toFixed(2)}% OFF
                                  </Badge>
                                ) : <Badge bg="gray.100" color='gray.800' variant="subtle" fontSize="xs" mt={2}>
                                    No Discount Available
                                  </Badge>
                                }
                            </Box>
                    
                            <Badge bg="gray.100" color='gray.800' variant="subtle" mt={1} fontSize="xs">
                              {item.category}
                            </Badge>
                          </Flex>
    
                          <Flex justify="space-between" mt={1}>
                            <Text display={'flex'} alignItems={'center'} fontWeight="semibold" color="pink.600" fontSize="lg">
                              <TbCurrencyNaira className="mr-1" />
                              {item.price?.toLocaleString() || "N/A"}
                            </Text>
                            {item.oldprice && (
                              <Flex fontSize="sm" color="gray.400" textDecoration="line-through" align="center" ml="3">
                                <TbCurrencyNaira fontSize="13px" />
                                <Text ml="1">{item.oldprice}</Text>
                              </Flex>
                            )}
                          </Flex>
                          <Button onClick={() => handleAddToCart(item)} mt={4} w="full" bg="pink.600" color='white' leftIcon={<IoMdCart />}>
                            Add to Cart
                          </Button>
                        </Box>
                      </Box>
                    ))
                  )}
            </SimpleGrid>

            <Flex justify="center" mt={6} gap={4}>
              <Button
                onClick={() => handlePageChange(category, -1)}
                isDisabled={currentPage[category] === 1}
                bg={currentPage[category] === 1 ? "gray.300" : "pink.600"}
                color={currentPage[category] === 1 ? "gray.600" : "white"}
                _hover={{ bg: "pink.700" }}
              >
                Previous
              </Button>
              <Text fontWeight="medium" color="gray.700">
                Page {currentPage[category]} of {totalPages || 1}
              </Text>
              <Button
                onClick={() => handlePageChange(category, 1)}
                isDisabled={currentPage[category] === totalPages}
                bg={currentPage[category] === totalPages ? "gray.300" : "pink.600"}
                color={currentPage[category] === totalPages ? "gray.600" : "white"}
                _hover={{ bg: "pink.700" }}
              >
                Next
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Box>
      <Advert/>
      <Footer />
    </div>
  );
}
