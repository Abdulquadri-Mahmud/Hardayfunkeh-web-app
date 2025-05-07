import React, { useContext, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Badge,
  IconButton,
  Stack,
  Heading
} from "@chakra-ui/react";
import { IoHeart } from "react-icons/io5";
import { FaAngleRight, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartsReucer";
import { FaCartShopping, FaNairaSign } from "react-icons/fa6";
import { addWishlist } from "../../../store/wishlists/Wishlists";
import { JalabProductsContext } from "../../../pages/Home_page";
import { IoMdCart } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

const JalabProducts = () => {
  const item = useContext(JalabProductsContext) || [];
  const dispatch = useDispatch();

    // const { _id, image, name, price, description } = products;

    const getCarts = {
      productID: item._id || '',
      productName: item.name || [],
      productImage: item.image?.length > 0 ? item.image[0] :  item.image || [],
      productPrice: item.price || '',
      stock: item.stock || [],
      quantity: 1,
    };
    
    const handleCart = () => {
      dispatch(addToCart(getCarts));
    };
    
    const handleWishlistItem = () => {
      dispatch(addWishlist(getCarts))
    };

  return (
    <Box position="relative" bg="white" p="2" rounded="xl" border={'1px solid'} borderColor={'gray.200'} w="full" maxW="full">
      {/* Wishlist Button */}
        <Flex zIndex={1} justifyContent={'center'} alignItems={'center'} fontSize={'2xl'} onClick={handleWishlistItem} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="35px" h="35px" bg="yellow.300" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
            <IoHeart/>
        </Flex>
      {/* Product Image and Name */}
      <Link to={`/product-details/${item._id}`}>
        <Flex w={{ base: "full", md: "100%" }} p={3} h="170px" mx="auto" justify={'center'} alignItems={'center'}>
          <Image src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"} alt={item.name} h="full" objectFit="cover" borderRadius="md"/>
        </Flex>
      </Link>
      <Box p={3}>
        <Heading as={'h2'} fontWeight={500} color={'gray.600'} size="md" isTruncated mb={1} className="truncate">
          {item.name}
        </Heading>
        <Text color="gray.600" fontSize="12px" bg='gray.100' p='1' rounded='md' isTruncated className="truncate" mb={1}>
          {item.description}
        </Text>

        <Flex justify="space-between" align="center" mt={1} w="full">
          <Box>
            {item.oldprice ? (
              <Badge bg="gray.100" color='gray.800' variant="subtle" mt={2} fontSize="xs">
                {((item.oldprice - item.price) / item.oldprice * 100).toFixed(2)}% OFF
              </Badge>
            ) : <Badge bg="gray.100" color='gray.800' variant="subtle" fontSize="xs" mt={2}>
                No Discount Available
              </Badge>
            }
          </Box>

          <Badge bg="gray.100" color='gray.800' variant="subtle" mt={1} fontSize="xs">
            {item.category}
          </Badge>
        </Flex>

        <Flex justify="space-between" mt={1}>
          <Text display={'flex'} alignItems={'center'} fontWeight="semibold" color="pink.600" fontSize="lg">
            <TbCurrencyNaira className="mr-1" />
            {item.price?.toLocaleString() || "N/A"}
          </Text>
          {item.oldprice && (
            <Flex fontSize="sm" color="gray.400" textDecoration="line-through" align="center" ml="3">
              <TbCurrencyNaira fontSize="13px" />
              <Text ml="1">{item.oldprice}</Text>
            </Flex>
          )}
        </Flex>
        <Button onClick={() => handleCart(item)} mt={4} w="full" bg="pink.600" color='white' leftIcon={<IoMdCart />}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default JalabProducts;