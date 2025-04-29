import React from 'react';
import { IoPhonePortrait } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const CheckUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <Link as={RouterLink} to={`/profile/${currentUser._id}`} fontSize="sm" _hover={{ color: '#C70039' }}>
          My Account
        </Link>
      ) : (
        <Link as={RouterLink} to="/login" fontSize="sm" _hover={{ color: '#C70039' }}>
          Login
        </Link>
      )}
    </>
  );
};

export default function TopHeader() {
  return (
    <Box bg="pink.700" color="white">
      <Flex maxW="container.xl" mx="auto" py={2} px={3} justify="space-between" align="center" wrap="wrap">
        <Flex gap={5} align="center">
          <Link as={RouterLink} to="tel:+971544827478" fontSize="sm" display="flex" alignItems="center" gap={1}>
            <IoPhonePortrait />
            +971544827478
          </Link>
          <Box display={{ base: 'none', sm: 'block' }}>
            <Link as={RouterLink} to="mailto:example@gmai.com" fontSize="sm" display="flex" alignItems="center" gap={1}>
              <MdEmail />
              example@gmai.com
            </Link>
          </Box>
        </Flex>
        <Box>
          <CheckUser />
        </Box>
      </Flex>
    </Box>
  );
}
