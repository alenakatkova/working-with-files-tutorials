import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { uploadImage } from "../api/uploads";

const UploadImage: NextPage = () => {
  const [image, setImage] = useState<File | null>(null);

  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("saved in state ", image)

    const formData = new FormData()
    console.log("formData ", formData);

    if (image != null) await uploadImage(image);
    //await createUser(newUser).then(res => res && setIdOfLastCreatedUser(res.data.newUserId));
    reset();
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files)
   if (event.target.files != null) {
      setImage(event.target.files[0]);
   }
  }

  function reset() {
    // reset
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
                <label htmlFor="username">Your image:</label>
                <input type="file" name="image-to-upload" onChange={handleChange} />
              </div>
              <button>Save</button>
            </form>

          </div>
        </main>
      </div>
  )
}

export default UploadImage;
