import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  Badge,
  Container,
  useBreakpointValue
} from "@chakra-ui/react";
import TopHeader from "./TopHeader";
import Sidebar from "./Sidebar";
import SearchInputField from "./SearchInputField ";

const BottomNavs = () => {
  const links = [
    { path: "/", label: "Home" },
    // { path: "/about", label: "About" },
    { path: "/abaya", label: "Abaya" },
    { path: "/jalab", label: "Jalab" },
    { path: "/jewellery", label: "Jewellery" },
    { path: "/fabrics", label: "Fabrics" },
    { path: "/shop", label: "All Categories" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Box bg="white" py={4} borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex justify="center" wrap="wrap" gap={6}>
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <Text
                fontWeight="medium"
                color="black"
                _hover={{ color: "pink.600" }}
                transition="color 0.2s"
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default function Header() {
  const [cartLength, setCartLength] = useState(0);
  const [wishlistsLength, setWishlistsLength] = useState(0);

  const { items } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);

  useEffect(() => {
    setCartLength(items.length || 0);
  }, [items]);

  useEffect(() => {
    setWishlistsLength(wishlists.length || 0);
  }, [wishlists]);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box position="sticky" top="0" zIndex="999">
      <TopHeader />

      {/* Main Header */}
      <Box bg="pink.600" py={5} borderBottom="5px solid white">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" gap={4}
>
            {/* Logo */}
            <Link to="/">
              <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" color="white">
                Hardayfunkeh
              </Text>
            </Link>

            {/* Search */}
            <Box flex="1" maxW={["100%", "100%", "500px"]} display={{md: 'block',base : 'none' }}>
              <SearchInputField />
            </Box>

            {/* Icons */}
            <Flex align="center" gap={6}>
              {/* Wishlist */}
              <Link to="/wishlist">
                <Flex direction="column" align="center" color="white" position="relative">
                  <FaRegHeart size={22} />
                  {wishlistsLength > 0 && (
                    <Box position="absolute" top="-2" right="-3" bg="yellow.400" color="white" borderRadius="full" px={2} fontSize="xs">
                      {wishlistsLength}
                    </Box>
                  )}
                  <Text fontSize="sm" display={{md: 'block', base: 'none'}}>Your Wishlist</Text>
                </Flex>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Flex direction="column" align="center" color="white" position="relative">
                  <BsCart4 size={22} />
                  {cartLength > 0 && (
                    <Box position="absolute" top="-2" right="-3" bg="yellow.400" color="white" borderRadius="full" px={2} fontSize="xs">
                      {cartLength}
                    </Box>
                  )}
                  <Text fontSize="sm" display={{md: 'block', base: 'none'}}>Your Cart</Text>
                </Flex>
              </Link>

              {/* Sidebar for mobile */}
              {isMobile && <Sidebar />}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Bottom nav only for desktop */}
      {!isMobile && <BottomNavs />}
    </Box>
  );
}
