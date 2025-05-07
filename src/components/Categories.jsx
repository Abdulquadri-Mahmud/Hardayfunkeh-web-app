import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Heading, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotionBox = motion(Box);

const features = [
  { name: "Abaya", image: "/image/abaya3.jpg" },
  { name: "Jalab", image: "/image/jalab2.jpg" },
  { name: "Fabrics", image: "/image/fabric1.jpg" },
  { name: "Jewellery", image: "/image/jewellery2.jpg" },
  { name: "Fabrics", image: "/image/j2.jpg" },
];

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const Features = () => {
  const navigate = useNavigate();

  return (
    <Box my={{ base: 10, md: 10 }} py={{ base: 5, md: 10 }} px={{ base: 4, md: 10 }} mx="auto" maxW="7xl" bg="pink.100" rounded={{lg: '2xl'}}>
      {/* Header */}
      <Box textAlign="center" mb={5} data-aos="fade-up">
        <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold" color="gray.800">
          Explore Our Categories
        </Heading>
        <Text fontSize="md" mt={4} color="gray.600" maxW="2xl" mx="auto">
          Find the perfect item to express your style from our exclusive selection of Abayas, Jalabs, Fabrics, and Jewellery.
        </Text>
      </Box>

      {/* Slider */}
      <Slider {...sliderSettings}>
        {features.map((feature, index) => (
          <MotionBox key={index} p={3} data-aos="zoom-in" cursor="pointer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition="all 0.3s ease-in-out" onClick={() => navigate(`/${feature.name.toLowerCase()}`)}>
            <Box rounded="2xl" overflow="hidden" bg="white" p={2} border={'1px solid'} borderColor={'gray.100'}>
              <Image src={feature.image} alt={feature.name} objectFit="cover" w="full" h="56" rounded={'lg'}/>
              <Box py={2} textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {feature.name}
                </Text>
              </Box>
            </Box>
          </MotionBox>
        ))}
      </Slider>
    </Box>
  );
};

export default Features;
