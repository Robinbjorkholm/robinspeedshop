import styles from "../styles/page.module.css";
import ProductsNews from "./components/productsUi/ProductNews";
import ProductsOnSale from "./components/productsUi/ProductsOnSale";
import ProductsPopular from "./components/productsUi/ProductsPopular";
import {
  ProductsNewsSkeleton,
  ProductsPopularSkeleton,
  ProductsSaleSkeleton,
} from "../ui/skeletons";

export default async function Home() {
  let productsNews = null;
  let productsOnSale = null;
  let productsPopular = null;

  async function fetchProducts(endpoint) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/products/${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      return data && data.length > 0 ? data : null;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const productsPromise = fetchProducts("get-products-news");
    const productsOnSalePromise = fetchProducts("get-products-on-sale");
    const productsPopularPromise = fetchProducts("get-popular-products");

    const [productsResult, productsOnSaleResult, productsPopularResult] =
      await Promise.all([
        productsPromise,
        productsOnSalePromise,
        productsPopularPromise,
      ]);

    productsNews = productsResult;
    productsOnSale = productsOnSaleResult;
    productsPopular = productsPopularResult;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <main className={styles.main}>
      <div>
        {productsNews ? (
          <ProductsNews products={productsNews} />
        ) : (
          <ProductsNewsSkeleton />
        )}
        {productsOnSale ? (
          <ProductsOnSale products={productsOnSale} />
        ) : (
          <ProductsSaleSkeleton />
        )}
        {productsPopular ? (
          <ProductsPopular products={productsPopular} />
        ) : (
          <ProductsPopularSkeleton />
        )}
      </div>
    </main>
  );
}
