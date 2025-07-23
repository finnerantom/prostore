import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Homepage = async () => {
  // await delay(2000)
  const latestProductsRaw = await getLatestProducts();
  const latestProducts = latestProductsRaw.map(product => ({
    ...product,
    rating: Number(product.rating),
    price: Number(product.price),
  }));

  return <>
    <ProductList
      data={latestProducts}
      title="Newest Arrivals"
      limit={LATEST_PRODUCTS_LIMIT}
    />
  </>;
}

export default Homepage;
