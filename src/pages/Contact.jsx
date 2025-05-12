import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Spinner,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.message.length < 10) {
      setError("Message must be at least 10 characters long.");
      return;
    }

    setLoading(true);
    try {
        const endpoint = `https://hardayfunkeh-apis.vercel.app/api/email/send-email`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (data.success === false) {
            setError(data.message);
            setLoading(false);
            setSuccess('');
        }

        setLoading(false);
        setSuccess("");
        setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <Box bg="gray.100" px={4} py={10}>
        <Box maxW="3xl" mx="auto" bg="white" p={8} rounded="lg" w="full">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800" mb={4}>
            Contact Us
          </Heading>
          <Text textAlign="center" color="gray.600" mb={6}>
            We’d love to hear from you! Reach out to us for any inquiries or assistance.
          </Text>

          {error && <Text color="red.500" fontSize="sm" mb={3}>{error}</Text>}
          {success && <Text color="green.500" fontSize="sm" mb={3}>{success}</Text>}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input name="name" placeholder="Your Name" bg="gray.100" border={'1px solid'} borderColor="gray.300" _focus={{ borderColor: "red.500" }} _placeholder={{ color: "gray.500" }} fontSize="sm" value={formData.name} onChange={handleChange} py={6}/>
              <Input type="email" name="email" placeholder="Your Email" bg="gray.100" border={'1px solid'} borderColor="gray.300" _focus={{ borderColor: "red.500" }} _placeholder={{ color: "gray.500" }} fontSize="sm" value={formData.email} onChange={handleChange} py={6}/>
              <Textarea name="message" placeholder="Your Message" bg="gray.100" border={'1px solid'} borderColor="gray.300" _focus={{ borderColor: "red.500" }} _placeholder={{ color: "gray.500" }} fontSize="sm" h="32" value={formData.message} onChange={handleChange} py={6}/>
              <Button type="submit" colorScheme="red" w="full" fontWeight="semibold" isDisabled={loading}>
                {loading ? <Spinner size="sm" /> : "Send Message"}
              </Button>
            </VStack>
          </form>

          <Box mt={6}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">Contact Information</Text>
            <HStack spacing={2} mt={2} color="gray.600">
              <Icon as={FaPhone} />
              <Text>+234 812 835 7183</Text>
            </HStack>
            <HStack spacing={2} color="gray.600">
              <Icon as={FaEnvelope} />
              <Text>support@hardayfunkeh.com</Text>
            </HStack>
            <HStack spacing={2} color="gray.600">
              <Icon as={FaMapMarkerAlt} />
              <Text>1 Akin Ogunlewe Str, Abuja, FCT</Text>
            </HStack>
          </Box>

          <HStack mt={6} justify="center" spacing={4} fontSize="xl" color="gray.600">
            <Box as="a" href="#" _hover={{ color: "blue.500" }}><FaFacebook /></Box>
            <Box as="a" href="#" _hover={{ color: "pink.500" }}><FaInstagram /></Box>
            <Box as="a" href="#" _hover={{ color: "blue.400" }}><FaTwitter /></Box>
            <Box as="a" href="#" _hover={{ color: "green.500" }}><FaWhatsapp /></Box>
            <Box as="a" href="#" _hover={{ color: "blue.700" }}><FaLinkedin /></Box>
          </HStack>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
