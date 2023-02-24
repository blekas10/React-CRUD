import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import Img from 'components/ui/img';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import * as Styled from './styled';

type ProductCardProps = ProductModel & {
  onDelete: VoidFunction,
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  images,
  price,
  rating,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (

    <Stack sx={{ boxShadow: 4, position: ' relative' }}>

      <Button

        variant="outlined"
        size="small"
        color="error"
        sx={{
          position: 'absolute', right: 10, top: 10, minWidth: ' initial',
        }}
        onClick={onDelete}
      >
        X
      </Button>
      <Button
        onClick={() => navigate(routes.UpdateProductPage.createLink(id))}
        variant="outlined"
        size="small"
        color="warning"
        sx={{
          position: 'absolute', right: 60, top: 10, minWidth: ' initial',
        }}
      >
        Ed
      </Button>
      <Img src={images[0]} alt="" sx={{ aspectRatio: '1', width: 1 }} />
      <Styled.ProductCardContent>
        <Box sx={{ flexGrow: 1 }}>

          <Typography sx={{ fontSize: '1.15rem', fontWeight: 500, paddingBottom: 2 }}>{title}</Typography>
          <Typography variant="subtitle2" sx={{ height: 80 }}>{`${description}`}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: 1 }}>
            <Box sx={{ fontSize: '1.3rem', color: 'grey.700', fontWeight: 600 }}>{price}</Box>
            <Styled.ProductCardRating>{rating}</Styled.ProductCardRating>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate(routes.SingleProductPage.createLink(id))}
          >
            Plačiau

          </Button>
          <Button color="primary" variant="outlined" sx={{ mt: 3 }}>į krepšelį</Button>
        </Box>

      </Styled.ProductCardContent>
    </Stack>
  );
};

export default ProductCard;
