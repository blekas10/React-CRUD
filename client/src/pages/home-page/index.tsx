import React from 'react';
import ApiService from 'services/api-service';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import * as Styled from './styled';
import ProductCard from './product-card';

const HomePage = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const fetchedProducts = await ApiService.fetchProducts();
      setProducts(fetchedProducts);
    })();
  }, []);

  return (
    <Container sx={{ mt: 2 }}>

      <Button variant="outlined" onClick={() => navigate(routes.ProductFormPage)}>Sukurti nauja</Button>

      <Styled.ProductsGrid>
        {products.map((productProps) => (<ProductCard key={productProps.id} {...productProps} />))}
      </Styled.ProductsGrid>
    </Container>
  );
};

export default HomePage;
