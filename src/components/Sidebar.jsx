import React, { useEffect, useState } from "react";
import { Badge, Box, Button, CloseButton, Drawer, Flex, IconButton, Portal, Stack, Text } from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

const Sidebar = () => {
  const [cartLength, setCartLength] = useState(0);
  const [wishlistsLength, setWishlistsLength] = useState(0);

  const { items } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setCartLength(items?.length || 0);
  }, [items]);

  useEffect(() => {
    setWishlistsLength(wishlists?.length || 0);
  }, [wishlists]);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button color={'white'} variant="outline" size="sm" borderColor={'gray.200'} borderWidth={2}>
          <HiMenuAlt3 />
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header bg={'pink.600'} color={'gray.100'}>
              <Drawer.Title fontSize={24}>Hardayfunkeh</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body bg={'white'} color={'gray.800'}>
              {/* Sidebar links */}
              <Stack color={'gray.800'} gap={4} mt={4}>
                {[
                  { label: "Home", to: "/" },
                  // { label: "About", to: "/about" },
                  { label: "Abaya", to: "/abaya" },
                  { label: "Jalab", to: "/jalab" },
                  { label: "Jewellery", to: "/jewellery" },
                  { label: "Fabrics", to: "/fabrics" },
                  { label: "All Categories", to: "/shop" },
                  { label: "Contact Us", to: "/contact" },
                ].map((link) => (
                  <Button
                    key={link.to}
                    variant="ghost"
                    justifyContent="flex-start"
                    w="full"
                    as={Link}
                    to={link.to}
                    color={'gray.800'}
                    fontWeight={500}
                    bg={'gray.100'}
                    _hover={{ color: "pink.500", bg: "pink.100" }}
                  >
                    {link.label}
                  </Button>
                ))}

                {currentUser ? (
                  <Button variant="ghost" justifyContent="flex-start" w="full" as={Link} to={`/profile/${currentUser._id}`} _hover={{ color: "pink.500", bg: "pink.100" }}>
                    My Account
                  </Button>
                ) : (
                  <Button variant="ghost" justifyContent="flex-start" w="full" as={Link} to="/login" bg={'gray.100'} color={'gray.800'} _hover={{ color: "red.500" }}>
                    Login
                  </Button>
                )}
              </Stack>

              <Flex mt={5} bg={'pink.200'} p={3} rounded={'md'} gap={4} direction="row" justify={'space-between'}>
                {/* Wishlist Section */}
                <Link to="/wishlist">
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Box position="relative" color={'gray.800'}>
                      <Text mt={2} fontSize="2xl" variant="link" aria-label="Cart" color="black">
                        <FaRegHeart />
                      </Text>
                      <Badge position="absolute" top="-7px" right="-12px"  bg="pink.600" color="white" fontSize="xs" px={2} py={0.5} borderRadius="full" >
                        {wishlistsLength}
                      </Badge>
                    </Box>
                    <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                      Your Wishlist
                    </Text>
                  </Box>
                </Link>

                {/* Cart Section */}
                <Link to="/cart">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box position="relative">
                      <Text mt={2} fontSize="2xl" variant="link" aria-label="Cart" color="black">
                        <IoMdCart />
                      </Text>
                      {/* <IconButton icon={<IoMdCart />}/> */}
                      <Badge position="absolute" top="-7px" right="-12px" bg="pink.600" color="white" fontSize="xs" h={5} w={5} display="flex" justifyContent="center" alignItems="center" borderRadius="full" >
                        {cartLength}
                      </Badge>
                    </Box>
                    <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                      Your Cart
                    </Text>
                  </Box>
                </Link>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Sidebar;
