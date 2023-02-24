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
import * as Styled from './styled';
import DescriptionField from './description-field';
import ImagesField from './images-field';
import RatingField from './rating-field';
import { getProductFormValues } from './helpers';
import { getModeData } from './data';

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = React.useState<undefined | ProductModel>(undefined);
  const formRef = React.useRef<undefined | HTMLFormElement>(undefined);
  const mode = id !== undefined ? 'edit' : 'create';
  const {
    title,
    btnText,
    color,
    colorMain,
  } = getModeData(mode);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const values = getProductFormValues(formRef.current);
      if (mode === 'create') {
        // TODO: Atlikti sukurimo darbus ir po sukurimo, nuvesti į
        // TODO: pagrindinį puslapį arba sukurto produkto puslapį
        console.log('Vykdomas sukūrimas');
        console.log(values);
      } else {
        // TODO: Atlikti sukurimo darbus ir po sukurimo, nuvesti į pagrindinį puslapį
        console.log('Vykdomas sukūrimas');
        console.log(values);
        await ApiService.createProduct(values);
        console.log('Team created successfully!');

        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error on form submit. Contact system administrator.');
      }
    }
  };
  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchedTeam = await ApiService.fetchProduct(id);
        setProduct(fetchedTeam);
      })();
    }
  }, []);

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
            defaultValue={house?.title}
          />
          <DescriptionField />
          <TextField
            label="Kaina"
            name="price"
            type="number"
            inputProps={{ step: '0.01' }}
            fullWidth
            variant="filled"
            size="small"
          />
          <ImagesField />

          <RatingField />

          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>Pridėti</Button>
        </Stack>
      </Paper>

    </Styled.PageLayout>
  );
};

export default ProductFormPage;
