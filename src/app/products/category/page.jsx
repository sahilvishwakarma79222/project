'use client';

import { useParams } from 'next/navigation';
import ProductsMainPage from '../page';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  return <ProductsMainPage category={category} />;
}