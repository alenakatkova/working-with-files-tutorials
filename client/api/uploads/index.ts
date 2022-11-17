import { instance } from "../utils";
import { User } from "../../interfaces/user";

export async function createUser(userData: User) {
  try {
    return await instance.post("/users/signup", userData);
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImage(image: File) {
  try {
    console.log("axios magic ", image)
  } catch (error) {
    console.error(error)
  }
}