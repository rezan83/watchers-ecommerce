import React from 'react';
import { useNavigate } from 'react-router-dom';
// Chakra imports
import { Box, Button, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import useProductsStore from 'store/productsStrore';

const ProjectCard = ({
  id,
  image,
  name,
  price,
  description
}: {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}) => {
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');
  const setProductToReview = useProductsStore(state => state.setProductToReview);
  const navigate = useNavigate();
  const goReviewPage = () => {
    setProductToReview(id);
    navigate('/product-add-review');
  };
  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image src={image} borderRadius="15px" />
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          borderRadius="15px"
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"></Box>
      </Box>
      <Flex direction="column">
        <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
          {name}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
          ${price}
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
          {description}
        </Text>
        <Flex justifyContent="space-between">
          <Button
            onClick={goReviewPage}
            variant="outline"
            colorScheme="teal"
            minW="110px"
            h="36px"
            fontSize="xs"
            px="1.5rem">
            REVIEW PURCHASE
          </Button>
          {/* <AvatarGroup size='xs'>
              {avatars.map((el, idx) => {
                return <Avatar src={el} key={idx} />;
              })}
            </AvatarGroup> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectCard;
