import styles from "../styles/skeletons.module.css";

export function ProductsNewsSkeleton() {
  return (
    <div>
      <div style={{ background: "red" }}> asddasadssad</div>
    </div>
  );
}

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
