import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />

      <Box minH="100vh" bgGradient="linear(to-b, gray.100, red.500)" position="relative" display="flex" alignItems="center" justifyContent="center" px={4} py={12}>
        <Box position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" zIndex={0} />

        <Box zIndex={1} bg="white" p={8} rounded="xl" shadow="2xl" textAlign="center" maxW="4xl" w="full">
          {/* Image */}
          <MotionImage src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?semt=ais_hybrid" alt="404 Image" mx="auto" w="160px" mb={4} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}/>
          {/* Texts */}
          <MotionText fontSize="2xl" color="gray.700" mb={4} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Oops! The page you're looking for doesn't exist.
          </MotionText>
          <MotionText fontSize="lg" color="gray.600" mb={8} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            It might have been moved or deleted. Don't worry, we'll get you back on track.
          </MotionText>

          {/* Floating Image Animation */}
          <MotionBox position="relative" display="flex" justifyContent="center" mb={8} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Image src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?semt=ais_hybrid" alt="Floating Object" w="48px" h="48px"/>
          </MotionBox>

          {/* Buttons */}
          <HStack spacing={4} justify="center">
            <Button onClick={handleHomeRedirect} bg="pink.500" size="lg" color='white' _hover={{ transform: 'scale(1.05)' }} transition="all 0.3s">
              Go to Home
            </Button>
            <Button onClick={handleGoBack} bg="gray.300" color="gray.800" size="lg" _hover={{ bg: 'gray.400', transform: 'scale(1.05)' }} transition="all 0.3s">
              Go Back
            </Button>
          </HStack>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default NotFound;
