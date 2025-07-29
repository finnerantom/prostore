'use server';
import { prisma } from '@/db/prisma';

import { ConvertToPlainObject } from '@/lib/utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return ConvertToPlainObject(data);
}
// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findFirst({
    where: { slug: slug },
  });
  return ConvertToPlainObject(data);
}
