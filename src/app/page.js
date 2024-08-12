import styles from "./page.module.css";
import { ProductsNewsSkeleton } from "../ui/skeletons";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductsNewsSkeleton />
    </main>
  );
}
