const isStringArray = (
  arr: Array<unknown | string>,
): arr is string[] => arr.every((str) => typeof str === 'string');

export const getProductFormValues = (form: HTMLFormElement | undefined): Omit<ProductModel, 'id'> => {
  const formData = new FormData(form);
  const title = formData.get('title');
  if (typeof title !== 'string') throw new Error('Missing Title');
  if (title.length < 2) throw new Error('title must have at least 2 symbols');

  const price = formData.get('price');
  if (typeof price !== 'string') throw new Error('Missing price');
  if (price.length < 1) throw new Error('price must have at least 1 number');

  const description = formData.get('description');
  if (typeof description !== 'string') throw new Error('Missing description');
  if (description.length < 2) throw new Error('description must have at least 2 symbols');

  const rating = formData.get('rating');
  if (typeof rating !== 'string') throw new Error('Missing rating');
  if (rating.length < 1) throw new Error('rating must have at least 1 number');

  const images = formData.getAll('images');
  if (!isStringArray(images)) throw new Error('All images must be strings');

  const values = {
    title,
    price: Number(price),
    description,
    rating: Number(rating),
    images: images.filter((img) => img !== ''),
  };

  return values;
};
