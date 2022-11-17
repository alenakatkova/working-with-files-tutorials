import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { createUser } from "./api/users";
import { User } from "../interfaces/user";

const UploadImage: NextPage = () => {
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    age: 0
  });
  const [idOfLastCreatedUser, setIdOfLastCreatedUser] = useState<number | null>(null)


  const [image, setImage] = useState<File | null>(null);



  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(image)
    //await createUser(newUser).then(res => res && setIdOfLastCreatedUser(res.data.newUserId));
    reset();
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    //setNewUser({...newUser, [event.target.name] : event.target.value});
    console.log(event.target.files)
   if (event.target.files != null) {
      setImage(event.target.files[0]);
   }
  }

  function reset() {
    setNewUser({
      username: "",
      email: "",
      password: "",
      age: 0
    })
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
