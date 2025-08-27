import { z } from 'zod';
// import { formatNumberWithDecimal } from './utils';

  // const z.number() = z
  // .string()
  // .regex(/^(0|[1-9]\d*)\.\d{2}$/, { message: 'Price must have exactly two decimal places' })
  // .refine(val => parseFloat(val) > 0, { message: 'Price must be greater than 0' });

  // const z.number() = z.string()
  // .refine(
  //   (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
  //   'Price must have exactly two decimal places')
  // .transform((value) => Number(value))
  
  // .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
  // .transform((val) => Number(val)),

  
  // Schema for inserting products
  export const insertProductSchema = z.object({
    name: z.string().min(3, { error: 'Name must be at least 3 characters' }),
    slug: z.string().min(3, { error: 'Slug must be at least 3 characters' }),
    category: z
    .string()
    .min(3, { error: 'Category must be at least 3 characters' }),
  brand: z.string().min(3, { error: 'Brand must be at least 3 characters' }),
  description: z
    .string()
    .min(3, { error: 'Description must be at least 3 characters' }),
  stock: z.coerce.number(),
  images: z
    .array(z.string())
    .min(1, { error: 'Product must have at least one image' }),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.number(),
});

// Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, { error: 'Id is required' }),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z
    .string()
    .trim()
    .min(6, { error: 'Password must be at least 6 characters' }),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, { error: 'Name must be at least 3 characters' }),
    email: z.email({ error: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { error: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { error: 'Confirm password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Cart Schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, { error: 'ProdProducts is required' }),
  name: z.string().min(1, { error: 'Name is required' }),
  slug: z.string().min(1, { error: 'Slug is required' }),
  qty: z.number().int().nonnegative('Quantity must be a positive number'),
  image: z.string().min(1, { error: 'Image is required' }),
  price: z.number(),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.number(),
  totalPrice: z.number(),
  shippingPrice: z.number(),
  taxPrice: z.number(),
  sessionCartId: z.string().min(1, { error: 'Session Cart ID is required' }),
  userId: z.string().optional().nullable(),
});
