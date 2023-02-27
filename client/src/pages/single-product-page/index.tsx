import React from 'react';
import {
  Box, Divider, IconButton, Paper, Stack, styled, Typography,
} from '@mui/material';
import routes from 'navigation/routes';
import { useParams, Navigate } from 'react-router-dom';
import ApiService from 'services/api-service';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Img from 'components/ui/img';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const StyledSwiper = styled(Swiper)({
  width: '100%',
  height: '100%',
});

const SingleProductPage = () => {
  const leftArrowRef = React.useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = React.useRef<HTMLButtonElement | null>(null);
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
  if (product === undefined) return null;

  return (
    <Paper sx={{ marginY: 10, marginX: { xs: 2, md: 6, xl: 30 } }}>
      {/* <Box component="pre">
        {JSON.stringify(product, null, 4)}
      </Box> */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Stack
          divider={<Divider orientation="horizontal" flexItem textAlign="center" variant="middle" />}
        >
          <Typography variant="h3" align="center">{product.title}</Typography>
          <Typography sx={{ paddingY: 3, paddingX: 2 }} variant="subtitle2" align="center">{product.description}</Typography>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            sx={{ paddingTop: 3, paddingX: 2 }}
          >
            <Box>
              Kaina:
              {' '}
              {product.price}
              {' '}

            </Box>
            <Box>
              Įvertinimas:
              {' '}
              {product.rating}
            </Box>
          </Stack>

        </Stack>

        <Box sx={{
          width: { xs: 1 },
          height: 400,
          margin: 'auto',
          position: 'relative',
        }}
        >
          <StyledSwiper
            modules={[Pagination, Navigation]}
            pagination={{ dynamicBullets: true }}
            navigation={{
              enabled: true,
              nextEl: rightArrowRef.current,
              prevEl: leftArrowRef.current,
            }}
          >
            {product.images.map((img) => (
              <SwiperSlide key={img}>
                <Img src={img} sx={{ width: 1, height: 1 }} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
          <Stack sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 3000,
            justifyContent: 'center',
          }}
          >
            <IconButton ref={leftArrowRef}>
              <ArrowCircleLeftIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </IconButton>
          </Stack>
          <Stack sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 3000,
            justifyContent: 'center',
          }}
          >
            <IconButton ref={rightArrowRef}>
              <ArrowCircleRightIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-around', gap: 5 }}>
        <Box sx={{
          maxWidth: 200,
          height: 400,
          position: 'relative',
        }}
        >
          <StyledSwiper
            modules={[Pagination, Navigation]}
            pagination={{ dynamicBullets: true }}
            navigation={{
              enabled: true,
              nextEl: rightArrowRef.current,
              prevEl: leftArrowRef.current,
            }}
          >
            {product.images.map((img) => (
              <SwiperSlide key={img}>
                <Img src={img} sx={{ width: 1, height: 1 }} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
          <Stack sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 3000,
            justifyContent: 'center',
          }}
          >
            <IconButton ref={leftArrowRef}>
              <ArrowCircleLeftIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </IconButton>
          </Stack>
          <Stack sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 3000,
            justifyContent: 'center',
          }}
          >
            <IconButton ref={rightArrowRef}>
              <ArrowCircleRightIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ width: 500 }}>

          <Typography sx={{ paddingBottom: 3 }} variant="h3" align="center">{product.title}</Typography>
          <Divider />
          <Typography sx={{ paddingY: 3, paddingX: 2 }} variant="subtitle2" align="center">
            {product.description}
          </Typography>
          <Divider />
          <Box sx={{
            display: 'flex', paddingY: 3, justifyContent: 'space-around', gap: 5,
          }}
          >
            <Box>
              Kaina:
              {' '}
              {product.price}
              €
            </Box>
            <Box>
              Įvertinimas:
              {' '}
              {product.rating}
            </Box>
          </Box>

        </Box>

      </Box>

    </Paper>
  );
};

export default SingleProductPage;
