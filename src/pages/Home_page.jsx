import React, { useState, useEffect, createContext, Suspense } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SearchProductInput from "../components/SearchProductInput";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import HeroSection from "../components/HomeComponent/Hero";
import Advert from "../components/Advert";
import HomeCategory from "./categories/HomeCategory";
import { Box, Button, Flex, Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Features from "../components/Categories";

export const AbayaProductsContext = createContext();
export const JalabProductsContext = createContext();
export const JewelleryProductsContext = createContext();
export const FabricsProductsContext = createContext();

const AbayaProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Abaya'));
const JalabProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Jalab'));
const JewelleryProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Jewellery'));
const FabricProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Fabrics'));

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState({});

  const [Abaya, setAbaya] = useState([])
  const [Jalab, setJalab] = useState([])
  const [Jewellery, setJewellery] = useState([])
  const [Fabrics, setFabrics] = useState([]);

  const slides = [
    { text: "Your Ultimate Destina tion for Elegance & Style", image: "/image/hero.jpg" },
    { text: "Your Ultimate Destination for Elegance & Style", image: "/image/abaya3.jpg" },
    { text: "Exquisite Abayas, Jalab, Luxurious Fabrics & Timeless Jewellery", image: "/image/jalab.jpg" },
    { text: "Redefine Your Home of Fashion with Sophistication & Grace", image: "/image/jewellery.jpg" },
  ];

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const url = 'https://hardayfunkeh-apis.vercel.app/api/products/all-products';
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      };
      fetchProducts();
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setAbaya(products.filter((item) => item.category === "Abaya"));
      setJalab(products.filter((item) => item.category === "Jalab"));
      setJewellery(products.filter((item) => item.category === "Jewellery"));
      setFabrics(products.filter((item) => item.category === "Fabric"));
    }
  }, [products]);  // 🛑 Add 'products' as dependency  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const [abayaPage, setAbayaPage] = useState(1);
  const [jalabPage, setJalabPage] = useState(1);
  const [jewelleryPage, setJewelleryPage] = useState(1);
  const [fabricsPage, setFabricsPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedAbayas = Abaya.slice((abayaPage - 1) * itemsPerPage, abayaPage * itemsPerPage);
  const paginatedJalabs = Jalab.slice((jalabPage - 1) * itemsPerPage, jalabPage * itemsPerPage);
  const paginatedJewellery = Jewellery.slice((jewelleryPage - 1) * itemsPerPage, jewelleryPage * itemsPerPage);
  const paginatedFabrics = Fabrics.slice((fabricsPage - 1) * itemsPerPage, fabricsPage * itemsPerPage);

  const Pagination = ({ currentPage, setPage, totalItems }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <Flex justify="center" align="center" mt={4} gap={2}>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1} bg={currentPage === 1 ? "gray.300" : "pink.500"} color="white">Prev</Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button key={i} onClick={() => setPage(i + 1)} bg={currentPage === i + 1 ? "pink.500" : "gray.200"} color={currentPage === i + 1 ? "white" : "black"}>{i + 1}</Button>
        ))}
        <Button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages} bg={currentPage === totalPages ? "gray.300" : "pink.500"} color="white">Next</Button>
      </Flex>
    );
  };


  return (
    <Box className="bg-gray-50">
      <Header />
      <div className="absolute">
        <SearchProductInput/>
      </div>
      <HeroSection/>
      {/*  */}
      <Features/>


      {/* Abaya Products */}
      <Box w={{ base: '100%', xl: '95%', '2xl': '80%' }} maxW="100%" mx="auto" bg="white" rounded="lg" px={{ base: 3, md: 6 }} py={6} mb={10}>
        {/* Heading */}
        <Heading as="h2" fontSize="3xl" fontWeight="bold" color="gray.800" textAlign="center" mb={4}>
          Explore Our Exclusive Collections
        </Heading>

        <Text fontSize="lg" color="gray.600" textAlign="center" mb={8} mx="auto" w={{ base: '97%', lg: '60%' }}>
          Discover timeless elegance with our premium selection of abayas,
          crafted for sophistication and comfort.
        </Text>
        <Flex mb={4} py={3} px={3} bg="pink.500" color="white" rounded="md" justify="space-between" align="center" gap={4}>
          <Heading as="h2" fontSize="xl" fontWeight="semibold">
          Exclusive Abaya Collections
          </Heading>
          <Link to="/abaya" fontSize="12px" fontWeight="medium" textTransform="uppercase" display="flex" alignItems="center" color="white">
            See All <FaAngleRight style={{ fontSize: '20px', marginLeft: '5px' }} />
          </Link>
        </Flex>

          <SimpleGrid gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
            {paginatedAbayas.map((abaya, index) => (
              <Suspense key={index} fallback={<Loader />}>
                <AbayaProductsContext.Provider value={abaya}>
                  <AbayaProducts abaya={abaya} />
                </AbayaProductsContext.Provider>
              </Suspense>
            ))}
          </SimpleGrid>
          <Pagination currentPage={abayaPage} setPage={setAbayaPage} totalItems={Abaya.length}/>
        </Box>

        <Box bg="black" w={{ base: "100%", xl: "95%", "2xl": "80%", sm: "100%" }} maxW="97%" mx="auto" mb="16" rounded="2xl" position="relative">
          <Box position="relative" color="white" display="flex" alignItems="center" justifyContent="center" minH="300px" px={{ base: 2, md: 8 }} rounded="lg" overflow="hidden" className="glass-card">
            {/* Decorative Elements */}
            <Box position="absolute" top={0} left={0} w="32" h="32" bg="pink.400" opacity={0.3} rounded="full" filter="blur(20px)" />
            <Box position="absolute" bottom={0} right={0} w="32" h="32" bg="yellow.600" opacity={0.3} rounded="full" filter="blur(20px)" />

            {/* Content */}
            <Box position="relative" zIndex={10} textAlign="center" maxW="2xl">
              <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mb={4} sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
                Exclusive Jalab Collections
              </Heading>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="medium" lineHeight="relaxed">
                Step into sophistication with our
                <Text as="span" fontWeight="semibold"> Exclusive Jalab Collections</Text>, where tradition meets modern elegance.
                Crafted from <Text as="span" fontWeight="semibold">premium fabrics</Text> with intricate detailing, our Jalabs
                offer <Text as="span" fontWeight="semibold">comfort, luxury, and versatility</Text> for every occasion.
              </Text>
            </Box>
          </Box>

          {/* Animated Arrow */}
          <Box position="absolute" left="50%" transform="translateX(-50%)" bottom="-10">
            <Box className="arrow bounce">
              <Box as="svg" w={10} h={10} color="yellow.400" animation="pulse 2s infinite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Product List Section */}
        <Box w={{ base: "100%", xl: "95%", "2xl": "80%", sm: "100%" }} maxW="100%" mx="auto" mb="10" bg="white" rounded="lg" px={{ base: 3, md: 6 }} py={6}>
          <Flex mb={4} py={3} px={3} bg="pink.500" color="white" rounded="md" justify="space-between" align="center" gap={4}>
            <Text fontSize="xl" fontWeight="semibold">Exclusive Jalab Collection</Text>
            <Link to="/jalab" className="text-[12px] font-medium text-white uppercase flex items-center">
              See All <FaAngleRight style={{ fontSize: "20px", marginLeft: "4px" }} />
            </Link>
          </Flex>

          <SimpleGrid gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
            {paginatedJalabs.map((jalab) => (
              <Suspense fallback={<Loader />}>
                <JalabProductsContext.Provider value={jalab}>
                  <JalabProducts abaya={jalab} />
                </JalabProductsContext.Provider>
              </Suspense>
            ))}
          </SimpleGrid>

          <Pagination currentPage={jalabPage} setPage={setJalabPage} totalItems={Jalab.length} />
        </Box>

        
        {/* Jewellery Section */}
        <Box bg="black" w={{ base: '100%', xl: '95%', '2xl': '80%', sm: '100%' }} maxW="97%" mx="auto" mb="16" rounded="2xl" position="relative">
          <Flex position="relative" color="white" align="center" justify="center" minH="300px" p={{ base: 2, md: 8 }} rounded="lg" overflow="hidden" className="glass-card">
            {/* Decorative Elements */}
            <Box position="absolute" top="0" left="0" w="20" h="20" bg="yellow.400" opacity="0.3" rounded="full" filter="blur(40px)" />
            <Box position="absolute" bottom="0" right="0" w="32" h="32" bg="red.600" opacity="0.3" rounded="full" filter="blur(40px)" />

            {/* Content */}
            <Box position="relative" zIndex="10" textAlign="center" maxW="2xl">
              <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" mb="4" textShadow="lg">Exclusive Jewellery Collection</Heading>
              <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight="medium" lineHeight="relaxed">
                Elevate your style with our
                <Text as="span" fontWeight="semibold" color="yellow.300"> premium jewellery collection</Text>, crafted with the finest materials and exquisite designs.
                Each piece embodies <Text as="span" fontWeight="semibold" color="orange.300">elegance, luxury, and timeless beauty</Text>, perfect for any occasion.
              </Text>
            </Box>
          </Flex>

          {/* Animated Arrow */}
          <Box position="absolute" left="50%" transform="translateX(-50%)" bottom="-10">
            <Box className="arrow bounce">
              <Box as="svg" w="10" h="10" color="yellow.400" animation="pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Jewellery Collection Grid */}
        <Box w={{ base: '100%', xl: '95%', '2xl': '80%' }} maxW="100%" mx="auto" mb="10" bg="white" rounded="lg" px={{ base: 3, md: 6 }} py="10">
          <Flex mb="4" py="3" px="3" bg="pink.500" color="white" rounded="md" justify="space-between" align="center" gap="4">
            <Heading fontSize="xl" fontWeight="semibold">Exclusive Jewellery Collection</Heading>
            <Link to="/jewellery" className="text-[12px] font-medium text-white uppercase flex items-center">
              See All <FaAngleRight className="text-[20px]" />
            </Link>
          </Flex>

          <SimpleGrid gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
            {paginatedJewellery.map((jewellery) => (
              <Suspense fallback={<Loader />}>
                <JewelleryProductsContext.Provider value={jewellery}>
                  <JewelleryProducts abaya={jewellery} />
                </JewelleryProductsContext.Provider>
              </Suspense>
            ))}
          </SimpleGrid>
          <Pagination currentPage={jewelleryPage} setPage={setJewelleryPage} totalItems={Jewellery.length} />
        </Box>

        {/* Fabric Collection */}
        <Box w={{ base: '100%', xl: '95%', '2xl': '80%' }} maxW="100%" mx="auto" mb="10" bg="white" rounded="lg" px={{ base: 3, md: 6 }} py="10">
          <Flex mb="4" py="3" px="3" bg="pink.500" color="white" rounded="md" justify="space-between" align="center" gap="4">
            <Heading fontSize="xl" fontWeight="semibold">Exclusive Fabric Collections</Heading>
            <Link to="/fabric" className="text-[12px] font-medium text-white uppercase flex items-center">
              See All <FaAngleRight className="text-[20px]" />
            </Link>
          </Flex>

          <SimpleGrid gap={4} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={3} py={3} px={2}>
            {paginatedFabrics.map((fabric) => (
              <Suspense fallback={<Loader />}>
                <FabricsProductsContext.Provider value={fabric}>
                  <FabricProducts fabric={fabric} />
                </FabricsProductsContext.Provider>
              </Suspense>
            ))}
          </SimpleGrid>
          <Pagination currentPage={fabricsPage} setPage={setFabricsPage} totalItems={Fabrics.length} />
        </Box>

        <Box className="">
          <HomeCategory/>
        </Box>

        <Advert/>
        <Box className="">
          <Footer/>
        </Box>
    </Box>
  );
};

export default HomePage;
