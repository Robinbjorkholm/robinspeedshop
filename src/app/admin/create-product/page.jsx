"use client";
import React, { useState, useRef } from "react";
import styles from "../../../styles/createProduct.module.css";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { CldUploadWidget } from "next-cloudinary";

function createProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const router = useRouter();
  console.log(image);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            numberInStock: numberInStock,
            category: category,
            image: image,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.message) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/admin`);
      }
    } catch (error) {
      console.log(error);
    }
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
      </label>
      <label className={styles.label} htmlFor="description">
        Description:
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.textareaField}
        />
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
      <label className={styles.label} htmlFor="numberInStock">
        Number in stock:
        <input
          type="number"
          id="numberInStock"
          placeholder="0"
          value={numberInStock}
          onChange={(event) => setNumberInStock(event.target.value)}
          className={styles.inputField}
        />
      </label>
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
          <option value="Engine management">Engine management</option>
          <option value="Drivetrain">Drivetrain</option>
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
              className={styles.cancelButton}
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
        <button className={styles.cancelButton} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default createProduct;
