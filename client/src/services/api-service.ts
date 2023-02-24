import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5024',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

type CreateProductRequest = Omit<ProductModel, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-shadow
const createProduct = async (getProductFormValues: CreateProductRequest) => {
  const response = await api.post<ProductModel>('/products', getProductFormValues);

  return response.data;
};
const updateProduct = async (id: string, ProductData: Omit<ProductModel, 'id'>) => {
  const response = await api.put<ProductModel[]>(`/products/${id}`, ProductData);

  return response.data;
};

const fetchProducts = async () => {
  const response = await api.get<ProductModel[]>('/products');

  return response.data;
};

const fetchProduct = async (id: string | number) => {
  const response = await api.get<ProductModel>(`/products/${id}`);

  return response.data;
};

const deleteProduct = async (id: string | number) => {
  await api.delete(`products/${id}`);
};

const ApiService = {
  updateProduct,
  createProduct,
  fetchProducts,
  fetchProduct,
  deleteProduct,
};

export default ApiService;
