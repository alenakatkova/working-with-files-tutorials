import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { uploadImage } from "../api/uploads";

const UploadImage: NextPage = () => {
  const [image, setImage] = useState<File | null>(null);

  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData()
    formData.append("image", image);
    if (image != null) await uploadImage(formData);
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
   if (event.target.files != null) {
      setImage(event.target.files[0]);
   }
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Upload image</title>
          <meta name="description" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Upload image here!
          </h1>

          <div className={styles.contentContainer}>
            <form method="post" encType="multipart/form-data" className={styles.userForm} onSubmit={saveUser}>
              <div className={styles.formLine}>
                <label htmlFor="image">Your image:</label>
                <input type="file" name="image" onChange={handleChange} />
              </div>
              <button>Save</button>
            </form>

          </div>
        </main>
      </div>
  )
}

export default UploadImage;
