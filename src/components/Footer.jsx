import { Box, Grid, Heading, Text, Link, Stack, Flex } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={10} px={6}>
      <Grid maxW="1200px" mx="auto" templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} textAlign={{ base: "start", md: "left" }}>
        {/* About Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Hardayfunkeh Sales
          </Heading>
          <Text color="gray.400">
            Your premier destination for elegant abayas, premium fabrics, exquisite jewelry, and stylish fashion. We offer unbeatable wholesale and retail deals, ensuring quality and sophistication at the best prices.
          </Text>
        </Box>

        {/* Categories */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Shop by Category
          </Heading>
          <Stack spacing={2}>
            <Link href="/home-fashion" _hover={{ textDecoration: "underline" }}>
              Home Fashion
            </Link>
            <Link href="/abaya" _hover={{ textDecoration: "underline" }}>
              Abaya Collection
            </Link>
            <Link href="/fabric" _hover={{ textDecoration: "underline" }}>
              Exclusive Fabrics
            </Link>
            <Link href="/jewelry" _hover={{ textDecoration: "underline" }}>
              Jewelry & Accessories
            </Link>
            <Link href="/wholesale" _hover={{ textDecoration: "underline" }}>
              Wholesale Deals
            </Link>
          </Stack>
        </Box>

        {/* Follow Us */}
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Follow Us
          </Heading>
          <Text color="gray.400" mb={2}>
            Stay updated on the latest trends & offers.
          </Text>
          <Flex justify={{ base: "center", md: "flex-start" }} gap={4}>
            <Link href="https://facebook.com" isExternal _hover={{ color: "gray.400" }}>
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://instagram.com" isExternal _hover={{ color: "gray.400" }}>
              <FaInstagram size={20} />
            </Link>
            <Link href="https://twitter.com" isExternal _hover={{ color: "gray.400" }}>
              <FaTwitter size={20} />
            </Link>
            <Link href="https://youtube.com" isExternal _hover={{ color: "gray.400" }}>
              <FaYoutube size={20} />
            </Link>
          </Flex>
        </Box>
      </Grid>

      {/* Copyright */}
      <Text mt={8} textAlign="center" color="gray.400">
        &copy; {new Date().getFullYear()} Hardayfunkeh Sales. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
