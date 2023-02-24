import React from 'react';
import {
  Stack,
  Typography,
  TextField,
  Paper,
  Button,

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ApiService from 'services/api-service';
import { useNavigate, useParams } from 'react-router-dom';
import useProduct from 'hooks/use-product';
import routes from 'navigation/routes';
import * as Styled from './styled';
import ImagesField from './images-field';
import RatingField from './rating-field';
import { getProductFormValues } from './helpers';
import { getModeData } from './data';

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, loadingProductData] = useProduct(id);
  const formRef = React.useRef<undefined | HTMLFormElement>(undefined);
  const mode = id !== undefined ? 'edit' : 'create';
  const {
    color,
  } = getModeData(mode);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const values = getProductFormValues(formRef.current);
      if (mode === 'create') {
        await ApiService.createProduct(values);
        navigate(routes.HomePage);
      } else {
        await ApiService.updateProduct(id as any, values);
        navigate(routes.SingleProductPage.createLink(id as any));
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error on form submit. Contact system administrator.');
      }
    }
  };

  if (loadingProductData) return null;

  return (
    <Styled.PageLayout sx={{
      py: { xs: 2, md: 6, xl: 10 },
      px: 2,
      alignItems: 'center',
    }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        ref={formRef}
        elevation={6}
        sx={{ p: 3, width: (theme) => ({ xs: 1, sm: theme.breakpoints.values.sm }) }}
      >
        <Stack sx={{ gap: 2, alignItems: 'center' }}>
          <AddIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h4" color="primary">Pridėti produktą</Typography>
          <TextField
            label="Pavadinimas"
            name="title"
            fullWidth
            variant="filled"
            size="small"
            color={color}
            defaultValue={product?.title}
          />
          <TextField
            label="Aprašymas"
            name="description"
            fullWidth
            multiline
            variant="filled"
            size="small"
            rows={3}
            defaultValue={product?.description}
          />
          <TextField
            label="Kaina"
            name="price"
            type="number"
            fullWidth
            variant="filled"
            size="small"
            defaultValue={product?.price}
          />
          <ImagesField defaultImages={product?.images} />
          <RatingField defaultValue={product?.rating} />
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>Pridėti</Button>
        </Stack>
      </Paper>
    </Styled.PageLayout>
  );
};

export default ProductFormPage;
