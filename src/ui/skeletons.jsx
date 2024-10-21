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
    <div className={styles.productsSkeletonItemMain}>
      <h1>News</h1>
      <div className={styles.productsSkeletonItem}></div>
    </div>
  );
}

export function ProductsPopularSkeleton() {
  return (
    <div className={styles.productsSkeletonItemMain}>
      <h1>Popular</h1>
      <div className={styles.productsSkeletonItem}></div>
    </div>
  );
}

export function ProductsSaleSkeleton() {
  return (
    <div className={styles.productsSkeletonItemMain}>
      <h1>Sale</h1>
      <div className={styles.productsSkeletonItem}></div>
    </div>
  );
}

export function ProductsDetailSkeleton() {
  return <div className={styles.productsDetailSkeleton}></div>;
}

export function CheckoutLoginFormSkeleton(){
  return <div className={styles.checkoutLoginFormSkeleton}>Loading...</div>
}