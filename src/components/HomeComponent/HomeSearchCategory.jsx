import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
// import { useToast } from '@chakra-ui/react';
import { addWishlist } from '../../store/wishlists/Wishlists';
import { addToCart } from '../../store/cart/cartsReucer';
import { HomeSearchCompContext } from '../../pages/categories/HomeCategory';

import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    Heading,
    IconButton,
} from '@chakra-ui/react';

export default function HomeSearchCategory() {
    const product = useContext(HomeSearchCompContext);

    const {_id, deal, quantity, image, name, price, description, oldprice} = product;
    const priceToLocalString = price.toLocaleString();

    const { currentUser } = useSelector((state) => state.user);

    let dispatch = useDispatch();

    const getCarts = {
        productID: _id,
        productName: name,
        productImage : image,
        productPrice: price,
        // userId : currentUser._id,
        quantity: 1
    }

    const handleCart = () => {
      dispatch(addToCart(getCarts));
    }

    const handleWishlistItem = () => {
        dispatch(addWishlist(getCarts));
    }
    
  return (
    <Box position="relative" bg="white" p="2" rounded="xl" border={'1px solid'} borderColor={'gray.200'} w="full" maxW="full">
      {/* Wishlist Button */}
        <Flex zIndex={1} justifyContent={'center'} alignItems={'center'} fontSize={'2xl'} onClick={handleWishlistItem} aria-label="Add to wishlist" position="absolute" top="2" right="2" w="35px" h="35px" bg="yellow.300" color="white" rounded="full" _hover={{ color: "pink.600", bg: "gray.400" }} _active={{ color: "pink.600", bg: "gray.400" }}>
            <IoHeart/>
        </Flex>
      {/* Product Image and Name */}
      <Link to={`/product-details/${_id}`}>
        <Flex justify="center" pt="0" w="full" mx="auto">
          <Box w={{ base: "full", md: "100%" }} h="170px" mx="auto" display="flex" justifyContent="center">
            <Image src={image ? image[0] : image} alt={name} maxW="full" h="full" objectFit="cover" objectPosition="top" borderRadius="md"/>
          </Box>
        </Flex>

        <Box w="full" mt="2">
          <Heading fontSize="md" fontWeight="bold" color={'gray.700'} textAlign={{ md: "center" }} isTruncated className='truncate'>
            {name}
          </Heading>
        </Box>
      </Link>

      {/* Description */}
      <Box w={'full'}>
        <Text mt="1" fontSize="sm" color={'gray.600'} isTruncated className='truncate'>
            {description.slice(0, 40)}...
        </Text>
      </Box>

      {/* Price & Old Price */}
      <Flex justify="space-between" align="center" mt="2">
        <Flex fontSize="sm" align="center">
          <FaNairaSign fontSize="14px" />
          <Text ml="1" fontWeight="medium">
            {priceToLocalString}.00
          </Text>
        </Flex>

        {oldprice && (
          <Flex fontSize="sm" color="gray.400" textDecoration="line-through" align="center" ml="3">
            <FaNairaSign fontSize="13px" />
            <Text ml="1">{oldprice}</Text>
          </Flex>
        )}
      </Flex>

      {/* Add to Cart Button */}
      <Button onClick={handleCart} w="full" bg="pink.500" mt="3" color="white" fontWeight="medium" _hover={{ bg: "pink.500" }} _active={{ bg: "pink.700" }} rounded="md">
        Add To Cart
      </Button>
    </Box>
  )
}
