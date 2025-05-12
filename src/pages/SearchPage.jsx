import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartsReucer";
import Header from "../components/Header";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SearchLoader from "../components/SearchLoader";
import {
  Box,
  Heading,
  Input,
  Text,
  Flex,
  Image,
  Button,
  Grid,
} from "@chakra-ui/react";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [size, setSize] = useState("");
  const [deal, setDeal] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 50000;
  const selectedSize = searchParams.get("size") || "";
  const selectedDeal = searchParams.get("deal") || "";

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setSize(selectedSize);
    setDeal(selectedDeal);
  }, [minPrice, maxPrice, selectedSize, selectedDeal]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          query,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          size,
          deal,
        }).toString();

        const response = await fetch(
          `https://hardayfunkeh-apis.vercel.app/api/product/search?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(`Failed to load search results: ${err.message}`);
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, priceRange, size, deal]); 

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Box bg="pink.100">
      <Header />
      <Flex direction={{ base: "column", lg: "row" }} wrap="wrap" gap={6} maxW="container.xl" mx="auto" p={{ base: 3, lg: 6 }}>
        <Box
          w={{ base: "100%", lg: "300px" }}
          h={{ lg: "400px" }}
          bg="white"
          p={4}
          shadow="md"
          rounded="md"
        >
          <Heading as="h3" size="md" mb={4}>
            Filters
          </Heading>

          <Input
            value={query}
            onChange={(e) => updateFilters("query", e.target.value)}
            placeholder="Search for products"
            mb={4}
          />

          <Box mb={4}>
            <Text fontWeight="semibold" mb={1}>
              Price Range
            </Text>
            <Slider
              range
              min={0}
              max={100000}
              step={500}
              value={priceRange}
              onChange={(values) => setPriceRange(values)}
              onAfterChange={() => {
                updateFilters("minPrice", priceRange[0]);
                updateFilters("maxPrice", priceRange[1]);
              }}
            />
            <Flex justify="space-between" fontSize="sm" mt={2}>
              <Text>N{priceRange[0]}</Text>
              <Text>N{priceRange[1]}</Text>
            </Flex>
          </Box>

          <Box mb={4}>
            <Text fontWeight="semibold" mb={1}>
              Size
            </Text>
            <Box
              as="select"
              value={size}
              onChange={(e) => updateFilters("size", e.target.value)}
              width="100%"
              px={3}
              py={2}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.300"
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </Box>
          </Box>

          <Box mb={4}>
            <Text fontWeight="semibold" mb={1}>
              Deals
            </Text>
            <Box
              as="select"
              value={deal}
              onChange={(e) => updateFilters("deal", e.target.value)}
              width="100%"
              px={3}
              py={2}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.300"
            >
              <option value="">All Deals</option>
              <option value="good">Good</option>
              <option value="great">Great</option>
            </Box>
          </Box>
        </Box>

        <Box
          flex="1"
          bg="white"
          shadow="xl"
          rounded="2xl"
          p={{ base: 2, lg: 4 }}
        >
          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            mb={4}
          >
            <Heading size={{ base: "sm", lg: "lg" }}>
              Search Results for: <Text as="span" color="pink.600">{query}</Text>
            </Heading>
            <Text fontSize={{ base: "xs", lg: "sm" }} color="gray.500">
              ({products.length} products found)
            </Text>
          </Flex>

          {loading && <SearchLoader />}
          {error && <Text color="red.500">{error}</Text>}
          {products.length === 0 && !loading && (
            <Text color="gray.500">No products found.</Text>
          )}

          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
            {products.map((product) => (
              <Box
                key={product._id}
                position="relative"
                shadow="lg"
                rounded="lg"
                bg="white"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Link to={`/product-details/${product._id}`}>
                  <Image
                    src={product.image?.length > 0 ? product.image[0] : "/placeholder.png"}
                    alt={product.name}
                    objectFit="cover"
                    w="full"
                    h="180px"
                  />
                </Link>
                <Box p={2}>
                  <Text fontWeight="semibold" fontSize="lg" mb={2} noOfLines={1} color="gray.800">
                    {product.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={1}>
                    {product.description}
                  </Text>
                  {product.oldprice && (
                    <Box position="absolute" top={3} left={3} bg="yellow.100" color="pink.600" py={1} px={2} fontSize="xs" rounded="full">
                      -{((product.oldprice - product.price) / product.oldprice * 100).toFixed(2)}%
                    </Box>
                  )}
                  <Flex mt={2} align="center" justify="space-between">
                    <Text fontSize="sm" fontWeight="semibold" color="pink.600" display="flex" alignItems="center">
                      <TbCurrencyNaira />
                      {product.price?.toLocaleString() || "N/A"}
                    </Text>
                    <Text fontSize="sm" px={2} rounded="full" bg="pink.200">
                      {product.category}
                    </Text>
                  </Flex>
                  <Button
                    leftIcon={<FaCartShopping />}
                    colorScheme="pink"
                    size="sm"
                    w="full"
                    mt={3}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
