import React from "react";
import { Box, Button, Container, Heading, Text, Stack, List, 
  ListItem, SimpleGrid, Link } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, yellow.500, pink.500)" py={16} textAlign="center" color="white">
        <Heading as="h1" size="xl" fontWeight="bold">About Hardayfunkeh</Heading>
        <Text mt={2} fontSize="lg">Discover quality fashion & accessories at unbeatable prices.</Text>
      </Box>

      <Container maxW="5xl" px={6} py={10}>
        {/* Introduction */}
        <Box mb={8}>
          <Heading as="h2" size="2xl" color="gray.800">Who We Are</Heading>
          <Text color="gray.600" mt={2} fontSize="lg" lineHeight="1.6">
            Welcome to Hardayfunkeh – your premier destination for elegant abayas, premium fabrics, exquisite jewelry, and stylish fashion. Whether you're looking for timeless modest wear, luxurious fabrics, or statement accessories, we have carefully curated collections to suit every occasion. With our unbeatable wholesale and retail deals, we guarantee top-notch quality, sophistication, and affordability. At Hardayfunkeh, we are committed to helping you express your unique style with elegance and confidence. Shop with us today and experience fashion at its finest!
          </Text>
        </Box>

        {/* Our Mission */}
        <Box mb={8}>
          <Heading as="h2" size="2xl" color="gray.800">Our Mission</Heading>
          <Text color="gray.600" mt={2} fontSize="lg">
            Our mission is to provide affordable yet luxurious fashion that resonates with your style. We believe that fashion should be accessible to everyone, which is why we offer a diverse collection of trendy and traditional clothing at competitive prices.
          </Text>
        </Box>

        {/* Why Choose Us */}
        <Box mb={8}>
          <Heading as="h2" size="2xl" color="gray.800">Why Choose Faizany?</Heading>
          <List mt={3} spacing={3}>
            <ListItem display="flex" alignItems="center">
              <Text color="yellow.500" fontWeight="semibold" mr={2}>✔</Text> High-quality materials and unique designs.
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <Text color="yellow.500" fontWeight="semibold" mr={2}>✔</Text> Affordable pricing with premium craftsmanship.
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <Text color="yellow.500" fontWeight="semibold" mr={2}>✔</Text> Fast and reliable delivery services.
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <Text color="yellow.500" fontWeight="semibold" mr={2}>✔</Text> Exceptional customer support and easy returns.
            </ListItem>
          </List>
        </Box>

        {/* FAQ Section */}
        <Box mb={8}>
          <Heading as="h2" size="2xl" color="gray.800">Frequently Asked Questions</Heading>
          <Stack mt={4} spacing={4}>
            <Box p={4} borderWidth={1} borderRadius="md" cursor="pointer">
              <Heading as="summary" fontWeight="semibold">How long does shipping take?</Heading>
              <Text color="gray.600" mt={2}>Shipping usually takes between 3-7 business days, depending on your location.</Text>
            </Box>
            <Box p={4} borderWidth={1} borderRadius="md" cursor="pointer">
              <Heading as="summary" fontWeight="semibold">Do you offer refunds?</Heading>
              <Text color="gray.600" mt={2}>Yes, we offer refunds within 14 days of purchase if the product is unused and in its original condition.</Text>
            </Box>
          </Stack>
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" mt={10}>
          <Heading as="h3" size="lg" color="gray.800">Join the Faizany Family</Heading>
          <Text color="gray.600" mt={2} fontSize="lg">Start shopping today and experience fashion like never before.</Text>
          <Link href="/shop">
            <Button mt={4} px={6} py={3} bg="yellow.500" color="white" rounded="md" fontWeight="semibold" _hover={{ bg: "yellow.600" }}>
              Shop Now
            </Button>
          </Link>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}
