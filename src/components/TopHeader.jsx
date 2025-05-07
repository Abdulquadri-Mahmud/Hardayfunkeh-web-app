import React from 'react';
import { IoPhonePortrait } from 'react-icons/io5';
import { MdEmail, MdWavingHand } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import { VscAccount } from 'react-icons/vsc';

const CheckUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <Link as={RouterLink} to={`/profile/${currentUser._id}`} _hover={{ color: '#C70039' }}>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Image src={currentUser.avatar} rounded={'full'} boxSize={'30px'} objectFit={'cover'} objectPosition={'center'}/>
            <Text display={'flex'} alignItems={'center'} gap={1} fontSize="13px" color={'gray.100'}>
              Hi<Text as={'span'} color={'yellow.500'}><MdWavingHand /></Text>, {currentUser.firstname}
            </Text>
          </Box>
        </Link>
      ) : (
        <Link as={RouterLink} to="/login" fontSize="sm" color={'white'} _hover={{ color: 'pink.500' }}>
          Login
        </Link>
      )}
    </>
  );
};

export default function TopHeader() {
  return (
    <Box bg="pink.900" color="white">
      <Flex maxW="container.xl" mx="auto" py={1} px={3} justify="space-between" align="center" wrap="wrap">
        <Flex gap={5} align="center" color="white">
          <Link as={RouterLink} to="tel:+971544827478" fontSize="sm" display="flex" alignItems="center" gap={1}>
            <Text as={'span'} color={'pink.500'}>
              <IoPhonePortrait />
            </Text>
            <Text as={'span'} color={'white'} fontSize={'13px'}>
              +971544827478
            </Text>
          </Link>
          <Box display={{ base: 'none', sm: 'block' }}>
            <Link as={RouterLink} to="mailto:example@gmai.com" fontSize="sm" display="flex" alignItems="center" gap={1}>
              <Text as={'span'} color={'pink.500'}>
                <MdEmail />
              </Text>
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
