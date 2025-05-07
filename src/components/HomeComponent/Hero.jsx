import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Text, Image, Container } from "@chakra-ui/react";

const slides = [
  { text: "Discover Timeless Elegance & Style", image: "/image/hero.jpg" },
  { text: "Luxury Abayas, Jalabs & Accessories", image: "/image/abaya3.jpg" },
  { text: "Premium Fabrics & Exquisite Jewellery", image: "/image/jalab.jpg" },
  { text: "Redefine Fashion with Grace & Sophistication", image: "/image/jew.jpeg" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Box className="" bg={'pink.700'}>
      <Container maxW="container.xl" py={{ base: 20, md: 20, '2xl': 30 }} px={{ base: 3, md: 6 }}>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap={4} position="relative">
          {/* Text Section */}
          <Box w={{ base: "100%", md: "50%" }} textAlign={{ base: "center", md: "left" }}>
            <AnimatePresence mode="wait">
              <motion.h2  key={currentSlide}  initial={{ opacity: 0, y: -20 }}  animate={{ opacity: 1, y: 0 }}  exit={{ opacity: 0, y: 20 }}  transition={{ duration: 0.6 }}>
                <Heading as="h2" size={{lg: "6xl", base: '3xl'}} color="white" fontWeight="extrabold" lineHeight="tight"> 
                  {slides[currentSlide].text}
                </Heading>
              </motion.h2>
            </AnimatePresence>
            <Text fontSize="xl" color="gray.100" fontWeight="medium" my={4}>
              Elevate your wardrobe with our exclusive collections.
            </Text>

            <Flex justify={{ base: "center", md: "flex-start" }} gap={4}>
              <Link to="/shop">
                <Button bg="yellow.500" _hover={{ bg: "yellow.600" }} color="white" fontWeight="bold" px={6} py={3}>
                  Shop Now
                </Button>
              </Link>
              <Link to="/collections">
                <Button variant="outline" borderColor="white" color="white" _hover={{ bg: "white", color: "green.600" }} fontWeight="bold" px={6} py={3}>
                  Explore Collection
                </Button>
              </Link>
            </Flex>
          </Box>

          {/* Image Section */}
          <Box position="relative" w={{ base: "100%", md: "45%" }} h={{ base: "80", lg: "400px", '2xl': "500px" }} bg="white" rounded="2xl" p={1} display="flex" alignItems="center" justifyContent="center">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].image}
              alt="Hero"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1rem" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
          </Box>

          {/* Slide Navigation */}
          <Flex position="absolute" bottom={8} left={0} right={0} justify="center" gap={4}>
            <Button onClick={prevSlide} bg="yellow.400" color={'white'} p={3} rounded="full" _hover={{ bg: "yellow.400" }}>
              <TbPlayerTrackPrevFilled/>
            </Button>
            <Button onClick={nextSlide} bg="yellow.400" color={'white'} p={3} rounded="full" _hover={{ bg: "yellow.400" }}>
              <TbPlayerTrackNextFilled/>
            </Button>
          </Flex>

          {/* Slide Indicators */}
          <Flex position="absolute" bottom={3} justify="center" gap={2}>
            {slides.map((_, index) => (
              <Box
                key={index}
                w={3}
                h={3}
                rounded="full"
                bg={index === currentSlide ? "yellow.500" : "whiteAlpha.700"}
              />
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
