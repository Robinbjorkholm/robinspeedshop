import styles from "../styles/skeletons.module.css";

export function ProductsSkeleton() {
  return (
    <div className={styles.gridLayout}>
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
      <div className={styles.gridItem} />
    </div>
  );
}

export function ProductsNewsSkeleton() {
  return (
    <div className={styles.productsNewsSkeletonItemMain}>
      <h1>News</h1>
      <div className={styles.productsNewsSkeletonItem}></div>
    </div>
  );
}

export function ProductsPopularSkeleton() {
  return (
    <div className={styles.productsNewsSkeletonItemMain}>
      <h1>Popular</h1>
      <div className={styles.productsNewsSkeletonItem}></div>
    </div>
  );
}

export function ProductsSaleSkeleton() {
  return (
    <div className={styles.productsNewsSkeletonItemMain}>
      <h1>Sale</h1>
      <div className={styles.productsNewsSkeletonItem}></div>
    </div>
  );
}
