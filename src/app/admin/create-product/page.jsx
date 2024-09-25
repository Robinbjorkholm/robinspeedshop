"use client";
import React, { useState } from "react";
import styles from "../../../styles/createProduct.module.css";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { CldUploadWidget } from "next-cloudinary";

function createProduct() {
  const [title, setTitle] = useState("");
  const [titleNews, setTitleNews] = useState("");
  const [description, setDescription] = useState("");
  const [disclaimers, setDisclaimers] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [numberInStock, setNumberInStock] = useState(null);
  const [isStockProduct, setIsStockProduct] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [kitIncludes, setKitIncludes] = useState([]);
  const [kitIncludesItem, setkKitIncludesItem] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/products/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            titleNews: titleNews,
            description: description,
            disclaimers: disclaimers,
            stockProduct: isStockProduct,
            price: price,
            numberInStock: numberInStock,
            category: category,
            image: image,
            kitIncludes: kitIncludes,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.message) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/admin`);
      }
      if (responseData.error) {
        setError(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddKitIncludesItem = (event) => {
    event.preventDefault();
    if (kitIncludesItem.trim() !== "") {
      setKitIncludes([...kitIncludes, kitIncludesItem.trim()]);
      setkKitIncludesItem("");
    }
  };
  const handleRemoveKitIncludesItem = (index) => {
    setKitIncludes(kitIncludes.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create a new product</h2>
      <label className={styles.label} htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={styles.inputField}
        />
      </label>{" "}
      <label className={styles.label} htmlFor="titleNews">
        Title news:
        <input
          type="text"
          id="titleNews"
          value={titleNews}
          onChange={(event) => setTitleNews(event.target.value)}
          className={styles.inputField}
        />
      </label>{" "}
      <label className={styles.label} htmlFor="description">
        Description:
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.textareaField}
        />
      </label>{" "}
      <label className={styles.label} htmlFor="disclaimers">
        Disclaimers:
        <textarea
          id="disclaimers"
          value={disclaimers}
          onChange={(event) => setDisclaimers(event.target.value)}
          className={styles.textareaField}
        />
      </label>
      <label htmlFor="kitIncludesItem">Kit includes</label>
      <div>
        <input
          id="kitIncludesItem"
          value={kitIncludesItem}
          onChange={(e) => setkKitIncludesItem(e.target.value)}
          placeholder="what does this kit include?"
        />
        <button
          className={styles.greyButton}
          style={{ marginLeft: "1rem" }}
          onClick={handleAddKitIncludesItem}
        >
          Add
        </button>
      </div>
      <label className={styles.label} htmlFor="kitIncludes">
        {kitIncludes.length > 0 ? (
          <ul className={styles.kitIncludesList}>
            {kitIncludes.map((item, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                {item}
                <button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveKitIncludesItem(index)}
                  className={styles.greyButton}
                  style={{ marginLeft: "1rem" }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: "1rem" }}>
            This kit does not include anything yet
          </p>
        )}
      </label>
      <label className={styles.label} htmlFor="price">
        Price:
        <input
          type="number"
          id="price"
          placeholder="0"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className={styles.inputField}
        />
      </label>
     
      <label className={styles.label} htmlFor="isStockProduct">
        Stock product:
        <select
          id="isStockProduct"
          placeholder="0"
          value={isStockProduct}
          onChange={(event) => setIsStockProduct(event.target.value)}
          className={styles.inputField}
        >
          <option value="true">yes</option>

          <option value="false">no</option>
        </select>
      </label>
      {isStockProduct &&   <label className={styles.label} htmlFor="numberInStock">
        Number in stock:
        <input
          type="number"
          id="numberInStock"
          placeholder="0"
          value={numberInStock}
          onChange={(event) => setNumberInStock(event.target.value)}
          className={styles.inputField}
        />
      </label>}
    
      <label className={styles.label} htmlFor="category">
        Category:
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={styles.selectField}
        >
          <option value="">Select a category</option>

          <option value="engine">Engine</option>
          <option value="fuel">Fuel</option>
          <option value="chassis">Chassis</option>
          <option value="engine-management">Engine management</option>
          <option value="drivetrain">Drivetrain</option>
        </select>
      </label>
      <CldUploadWidget
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={(result) => {
          const imageUrl = result.info.secure_url;
          setImage((prev) => [...prev, imageUrl]);
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className={styles.greyButton}
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
      <div className={styles.previewImages}>
        {image &&
          image.map((image, index) => (
            <div key={index}>
              <NextImage
                key={index}
                src={image}
                alt="preview"
                width={50}
                height={50}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}

        {!image && (
          <p className={styles.centerText}>Upload images to preview</p>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>
          Create product
        </button>
        <button className={styles.greyButton} type="button">
          Cancel
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default createProduct;
