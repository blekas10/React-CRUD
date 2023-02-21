import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import Img from 'components/ui/img';
import * as Styled from './styled';

type ProductCardProps = ProductModel;

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  images,
  price,
  rating,
}) => (
  <Stack sx={{ boxShadow: 4 }}>
    <Img src={images[0]} alt="" sx={{ aspectRatio: '1', width: 1 }} />
    <Styled.ProductCardContent>
      <Box sx={{ flexGrow: 1 }}>
        
        <Typography sx={{ fontSize: '1.15rem', fontWeight: 500, paddingBottom: 2 }}>{title}</Typography>
        <Typography variant="subtitle2" sx={{ height:80}}>{`${description}`}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: 1}}>
          <Box sx={{ fontSize: '1.3rem', color: 'grey.700', fontWeight: 600 }}>{price}</Box>
          <Styled.ProductCardRating>{rating}</Styled.ProductCardRating>
        </Box>
      
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
       <Button color="primary" variant="contained" sx={{ mt: 3 }}>Plačiau</Button>
       <Button color="primary" variant="outlined" sx={{ mt: 3 }}>į krepšelį</Button>
      </Box>
      
    </Styled.ProductCardContent>
  </Stack>
);

export default ProductCard;
