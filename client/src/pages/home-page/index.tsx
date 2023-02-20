import React from 'react';
import ApiService from 'services/api-service';
import * as Styled from './styled';
import ProductCard from './product-card';

const HomePage = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([]);

  React.useEffect(() => {
    (async () => {
      const fetchedProducts = await ApiService.fetchProducts();
      setProducts(fetchedProducts);
    })();
  }, []);

  return (
    <Styled.HousesGrid>
      {products.map((productProps) => (<ProductCard key={productProps.id} {...productProps} />))}
    </Styled.HousesGrid>
  );
};

export default HomePage;
