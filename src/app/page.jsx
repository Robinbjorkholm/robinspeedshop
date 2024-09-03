import styles from "./page.module.css";
import News from "./components/News";
import { ProductsNewsSkeleton } from "../ui/skeletons";

export default async function Home() {
  let products = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/get-products-news`
    );
    products = await response.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <main className={styles.main}>
      {products ? <News products={products} /> : <ProductsNewsSkeleton />}
    </main>
  );
}
