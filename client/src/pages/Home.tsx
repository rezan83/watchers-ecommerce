import React, { useEffect, useState } from 'react';
import { Box, Button, Icon } from '@chakra-ui/react';

import useProductsStore from 'store/productsStrore';

import { ThreeGallery } from 'components/ThreeGallery';
import { useNavigate } from 'react-router-dom';
import { HiShoppingBag } from 'react-icons/hi';

export default function Home() {
  const navigate = useNavigate();
  const featured = useProductsStore(state => state.featuredProducts);
  const [images, setimages] = useState<any>([]);
  useEffect(() => {
    if (featured.length) {
      setimages([
        // Front
        {
          position: [0, 0, 3.5],
          rotation: [0, 0, 0],
          url: featured[0].image,
          title: featured[0].name,
          price: featured[0].price,
          id: featured[0]._id
        },
        // Back
        // { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
        // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
        // Left
        {
          position: [-0.2, 0, 2.25],
          rotation: [0, Math.PI / 2.5, 0],
          url: featured[1].image,
          title: featured[1].name,
          price: featured[1].price,
          id: featured[1]._id
        },
        // { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
        // { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
        // Right
        {
          position: [0.2, 0, 2.25],
          rotation: [0, -Math.PI / 2.5, 0],
          url: featured[2].image,
          title: featured[2].name,
          price: featured[2].price,
          id: featured[2]._id
        }
        // { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
        // { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }
      ]);
    }
  }, [featured]);

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      <Button
        position={'absolute'}
        zIndex={'100'}
        top={0}
        left={`1rem`}
        colorScheme={'blue'}
        color='white'
        size={'sm'}>
        {'Our Featured'}
      </Button>
      {!!featured.length && <ThreeGallery images={images} />}
      <Button
        position={'absolute'}
        zIndex={'100'}
        bottom={'1rem'}
        left={`1rem`}
        colorScheme={'blue'}
        color='white'
        size={'sm'}
        onClick={() => navigate('/products')}>
        <span>{'See More in ->'} <Icon as={HiShoppingBag} /> {'Shop'}</span>
        
        
      </Button>
    </Box>
  );
}
