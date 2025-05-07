import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { addToCart } from "../../store/cart/cartsReucer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Advert from "../../components/Advert";
import { addWishlist } from "../../store/wishlists/Wishlists";
import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Text,
  Image,
  Flex,
  Badge,
  Center,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { IoMdCart } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

export default function JewelleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();
        
        const filteredJewellery = data.filter(product => product.category === "Jewellery");
        setItems(filteredJewellery);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart
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
      dispatch(addWishlist(cartItem))
    };

  // Pagination Logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleBack = () => navigate(-1);

  return (
    <Box bg="gray.50">
      <Header />
      <Container maxW="container.xl" py={6}>
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
                <Text fontSize="sm" color="gray.500">Jewellery</Text>
              </Link>
            </HStack>
            <Button onClick={handleBack} bg="pink.600" color={'white'}>Back</Button>
          </Flex>

          <Box mt={6}>
            <Heading fontSize={'5xl'} color={'gray.700'}>Jewellery</Heading>
          </Box>
        </Box>

        <SimpleGrid bg={'white'} p={{md: 6}} rounded={'xl'} gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
          {loading
            ? [...Array(10)].map((_, index) => (
                <GridItem key={index} bg="gray.200" p={4} borderRadius="lg" boxShadow="lg" opacity={0.6}>
                  <Box h="64" bg="gray.300" mb={4} />
                  <Box h="4" bg="gray.300" w="3/4" mb={2} />
                  <Box h="4" bg="gray.300" w="1/2" />
                  <Box h="10" bg="gray.300" w="full" mt={3} />
                </GridItem>
              ))
            : currentItems.length === 0 ? (
                <Center colSpan={5}>
                  <Text color="gray.500">No items available at the moment.</Text>
                </Center>
              ) : (
                currentItems.map((item) => (
                  <GridItem key={item._id} bg="white" border={'1px solid'} borderColor={'gray.200'} borderRadius="lg" boxShadow="lg" position="relative">
                    <Link to={`/product-details/${item._id}`}>
                      <Flex w={{ base: "full", md: "100%" }} p={3} h="170px" mx="auto" justify={'center'} alignItems={'center'}>
                        <Image src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"} alt={item.name} h="full" objectFit="cover" borderRadius="md"/>
                      </Flex>
                    </Link>
                    <Flex zIndex={1} justifyContent={'center'} alignItems={'center'} fontSize={'2xl'} onClick={handleWishlistItem} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="35px" h="35px" bg="yellow.400" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
                      <IoHeart/>
                    </Flex>
                    <Box p={4}>
                      <Heading as={'h2'} fontWeight={500} color={'gray.600'} size="md" isTruncated mb={2} className="truncate">
                        {item.name}
                      </Heading>
                      <Text color="gray.600" fontSize="sm" isTruncated className="truncate" mb={2}>
                        {item.description}
                      </Text>
                      {item.oldprice ? (
                        <Badge colorScheme="pink" variant="subtle" mt={2} fontSize="xs">
                          {((item.oldprice - item.price) / item.oldprice * 100).toFixed(2)}% OFF
                        </Badge>
                      ) : <Badge mt={2}>
                          No Discount Available
                        </Badge>}
                      <Flex justify="space-between" mt={4}>
                        <Text display={'flex'} alignItems={'center'} fontWeight="semibold" color="pink.600" fontSize="lg">
                          <TbCurrencyNaira className="mr-1" />
                          {item.price?.toLocaleString() || "N/A"}
                        </Text>
                        <Box bg={'pink.50'} color="pink.600" px={2} py={1} borderRadius="md" fontSize="xs">
                          {item.category}
                        </Box>
                        {/* <Tag colorScheme="pink" size="sm" variant="solid">
                        </Tag> */}
                      </Flex>
                      <Button onClick={() => handleAddToCart(item)} mt={4} w="full" bg="pink.600" leftIcon={<IoMdCart />}>
                        Add to Cart
                      </Button>
                    </Box>
                  </GridItem>
                ))
              )}
        </SimpleGrid>

        {/* Pagination Controls */}
        {items.length > itemsPerPage && (
          <Flex justify="center" mt={10}>
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1} mr={2} colorScheme="pink">
              Prev
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button key={i} onClick={() => setCurrentPage(i + 1)} colorScheme={currentPage === i + 1 ? "pink" : "gray"} variant={currentPage === i + 1 ? "solid" : "outline"} mx={1}>
                {i + 1}
              </Button>
            ))}

            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages} ml={2} colorScheme="pink">
              Next
            </Button>
          </Flex>
        )}
      </Container>
      <Advert />
      <Footer />
    </Box>
  );
}
