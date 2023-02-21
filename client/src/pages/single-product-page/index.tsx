import { Box } from '@mui/material';
import routes from 'navigation/routes';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ApiService from 'services/api-service';

const SingleProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState<undefined | ProductModel>(undefined);

  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchedProduct = await ApiService.fetchProduct(id);
        setProduct(fetchedProduct);
      })();
    }
  }, []);

  if (id === undefined) return <Navigate to={routes.HomePage} />;

  return (
    <Box component="pre">
      {JSON.stringify(product, null, 4)}

    </Box>
  );
};

export default SingleProductPage;
