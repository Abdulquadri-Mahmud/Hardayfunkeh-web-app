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
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

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
              <Link to="/" style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
                See All <FaAngleRight style={{ marginLeft: "4px", fontSize: "20px" }} />
              </Link>
            </Flex>

            <SimpleGrid bg={'white'} p={{md: 6}} rounded={'xl'} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
              {loading
                ? [...Array(8)].map((_, index) => (
                    <Box key={index} p={4} bg="gray.200" rounded="lg" boxShadow="lg" className="animate-pulse">
                      <Box h="64" bg="gray.300" rounded="md" mb={4}></Box>
                      <Box h={4} bg="gray.300" w="75%" mb={2} rounded="md"></Box>
                      <Box h={4} bg="gray.300" w="50%" rounded="md"></Box>
                    </Box>
                  ))
                : paginatedProducts.length === 0 ? (
                    <Text textAlign="center" color="gray.500">
                      No products available at the moment.
                    </Text>
                  ) : (
                    paginatedProducts.map((product) => (
                      <Box key={product._id}bg="white" border={'1px solid'} borderColor={'gray.200'} rounded="lg" overflow="hidden" _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
                        <Link to={`/product-details/${product._id}`}>
                          <Flex w={{ base: "full", md: "100%" }} p={3} h="170px" mx="auto" justify={'center'} alignItems={'center'}>
                            <Image src={product.image?.[0] || "/placeholder.png"} alt={product.name} w="full" h="160px" rounded={'lg'} objectFit="cover"/>
                          </Flex>
                        </Link>
                        <Box p={2}>
                          <Text as={'h2'} fontWeight={500} color={'gray.600'} size="md" isTruncated mb={2} className="truncate">
                            {product.name}
                          </Text>
                          <Text color="gray.600" fontSize="sm" isTruncated className="truncate" mb={2}>
                            {product.description}
                          </Text>
                          {
                            product.oldprice ? (
                              <Badge colorScheme="pink" variant="subtle" mt={2} fontSize="xs">
                                {((product.oldprice - product.price) / product.oldprice * 100).toFixed(2)}% OFF
                              </Badge>
                              ) : <Badge mt={2}>
                                No Discount Available
                            </Badge>
                          }
                          <Flex justify="space-between" align="center">
                            <Flex align="center" fontWeight="semibold" color="pink.600" fontSize={{ base: "sm", lg: "lg" }}>
                              <TbCurrencyNaira /> {product.price?.toLocaleString() || "N/A"}
                            </Flex>
                            <Box bg={'pink.50'} color="pink.600" px={2} py={1} borderRadius="md" fontSize="xs">{product.category}</Box>
                          </Flex>
                          <Button mt={4} w="full" bg="pink.600" color="white" _hover={{ bg: "pink.700" }} onClick={() => handleAddToCart(product)} leftIcon={<FaCartShopping />}>
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
