import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import Loader from '../../components/Loader';
import HomeSearchCategory from '../../components/HomeComponent/HomeSearchCategory';
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  SimpleGrid,
  Button,
  VStack,
  For,
  Portal,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";

export const HomeSearchCompContext = createContext();

export default function HomeCategory() {
  const categories = ["Abaya", "Jalab", "Jewellery", "Fabric"];
  const [priceRange, setPriceRange] = useState(1000000);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://hardayfunkeh-apis.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price <= priceRange && (filter === 'All' || product.category === filter)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Box p={4} bg="white" rounded="md" maxW="7xl" mx="auto" color={'gray.800'}>
      <Flex flexWrap="wrap" gap={5}>
        {/* Sidebar */}
        <Box w={{lg: "350px", base: 'full'}} h={{lg: "400px", base : '100%'}} bg="gray.100" rounded="md" p={2}>
          <Heading as="h2" size="md" fontWeight="semibold" mb={3}>
            Category
          </Heading>

          <Flex w={'full'} flexDir={'column'} alignItems={'start'} justifyContent={'center'} gap={4} align="stretch" spacing={1}>
            {categories.map((category, index) => (
              <Box key={index} bg={'white'} w={'full'} height={'50px'} borderRadius={'lg'} pt={'3'} pl={5}>
                <Link to={`/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </Box>
            ))}
          </Flex>

          {/* Price Filtering */}
          <Box borderTop="1px" borderBottom="1px" borderColor="gray.200" py={3} px={3} mt={5}>
            <Flex justify="space-between" align="center" mb={3}>
              <Text color={'pink.500'} fontSize="lg" fontWeight="medium" display="flex" alignItems="center">
                PRICE (<FaNairaSign />)
              </Text>
              <Text>{priceRange.toLocaleString()}</Text>
            </Flex>
            <Input border={'2px solid'} borderColor={'pink.300'} type="range" min="0" max="1000000" step="5" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}/>
          </Box>
        </Box>

        {/* Main Content */}
        <Box flex="1" bg="white" rounded="md">
          <Flex w={'full'} justify="space-between" align="center" mb={4} borderBottom="1px solid" borderColor="gray.200" pb={5}>
            <Box>
              <Heading size="md" fontWeight="semibold">
                Products
              </Heading>
              <Text fontSize="sm" color="gray.500">
                ({filteredProducts.length} products found)
              </Text>
            </Box>

            {/* Selections */}
            <Stack gap="5" width="">
              {/* Categories Select */}
              <Box>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="All">All</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))
                  ) : (
                    <option>No categories available</option>
                  )}
                </select>
              </Box>
            </Stack>
          </Flex>

          {/* Product Grid */}
          {loading ? (
            <Loader />
          ) : (
            <SimpleGrid gap={4} columns={{ base: 2, md: 3, lg: 3, xl: 4 }} spacing={3} py={3} px={2}>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <HomeSearchCompContext.Provider key={product._id} value={product}>
                    <HomeSearchCategory product={product} />
                  </HomeSearchCompContext.Provider>
                ))
              ) : (
                <Text>No products found in this category.</Text>
              )}
            </SimpleGrid>
          )}

          {/* Pagination */}
          <Flex justify="center" align="center" my={4} gap={2} flexWrap="wrap">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1} px={4} py={2} bg="gray.200" _hover={{ bg: "pink.400" }} rounded="md">
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                px={4}
                py={2}
                rounded="md"
                bg={currentPage === index + 1 ? "pink.600" : "gray.200"}
                color={currentPage === index + 1 ? "white" : "black"}
                _hover={{ bg: "pink.400" }}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              px={4}
              py={2}
              bg="gray.200"
              _hover={{ bg: "pink.400" }}
              rounded="md"
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
