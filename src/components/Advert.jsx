import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const advertContent = [
  {
    heading: 'Shop Elegant Abayas, Jalabs, Jewelry, and Fabrics at Hardayfunkeh',
    text: `Discover a carefully curated collection of stylish and high-quality abayas, jalabs, exquisite jewelry, and premium fabrics at Hardayfunkeh. Whether you’re looking for modest yet fashionable attire or unique jewelry pieces to elevate your look, we have a diverse selection to suit your taste. Our collection embraces cultural elegance with a modern touch, ensuring you find the perfect outfit or accessory for any occasion. Start shopping today and experience timeless beauty and sophistication with Hardayfunkeh.`
  },
  {
    heading: 'Explore Our Exclusive Abayas and Jalabs',
    text: `Enhance your wardrobe with our luxurious abayas and jalabs, designed for comfort and elegance. Our collection features a variety of designs, from classic black abayas to modern embroidered and embellished pieces. Whether you need an outfit for everyday wear, special occasions, or religious events, Hardayfunkeh offers high-quality, stylish options to reflect your personal style.`
  },
  {
    heading: 'Accessorize with Exquisite Jewelry',
    text: `Complete your look with our stunning jewelry collection, featuring handcrafted pieces that add a touch of elegance and charm. From intricate gold-plated necklaces and bracelets to statement rings and earrings, our jewelry is designed to complement both traditional and contemporary outfits. Find the perfect accessory to express your individuality at Hardayfunkeh.`
  },
  {
    heading: 'Premium Fabrics for Your Custom Creations',
    text: `At Hardayfunkeh, we offer high-quality fabrics that inspire creativity and elegance. Our collection includes luxurious chiffon, silk, and cotton fabrics, perfect for custom tailoring and fashion projects. Whether you're designing your own abaya, jalab, or other traditional wear, we provide the best materials to bring your vision to life.`
  }
];

const faqContent = [
  {
    question: 'What Payment Options are Available on Hardayfunkeh?',
    answer: 'We offer multiple payment options, including online payment via MasterCard, Visa, Verve, bank transfers, and USSD, as well as pay-on-delivery for your convenience.'
  },
  {
    question: 'Can I Return Items Purchased from Hardayfunkeh?',
    answer: 'Yes! We offer a hassle-free return policy. If you\'re not satisfied with your purchase, you can return eligible items within 7 days for a full refund or exchange.'
  },
  {
    question: 'How Can I Contact Hardayfunkeh Customer Support?',
    answer: 'Our dedicated support team is always ready to assist you. For inquiries, orders, or complaints, please call us at 070-XXXX-XXXX or reach out via our official social media channels.'
  },
  {
    question: 'Can I Become a Seller on Hardayfunkeh?',
    answer: 'Hardayfunkeh is an exclusive online store for purchasing abayas, jalabs, jewelry, and fabrics. At this time, we do not support third-party sellers.'
  }
];

export default function Advert() {
  return (
    <Box maxW={{ base: '97%', lg: '100%', xl: '95%', '2xl': '80%' }} mx="auto" my="10" bg="white" color="gray.600" p="3" rounded="md">
      {advertContent.map((item, index) => (
        <Box key={index} mb={index === 0 ? 0 : 4}>
          <Heading fontSize="lg" fontWeight="medium">{item.heading}</Heading>
          <Text fontSize="sm" mt="2">{item.text}</Text>
        </Box>
      ))}

      <Heading fontSize="xl" mt="6" mb="6">
        Frequently Asked Questions (FAQs)
      </Heading>

      {faqContent.map((faq, index) => (
        <Box mb="5" key={index}>
          <Heading fontSize="lg" fontWeight="medium">{faq.question}</Heading>
          <Text fontSize="sm" mt="2">{faq.answer}</Text>
        </Box>
      ))}
    </Box>
  );
}
