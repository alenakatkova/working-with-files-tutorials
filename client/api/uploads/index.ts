import { instance } from "../utils";

export async function uploadImage(image: FormData) {
  try {
    return await instance.post("/upload", image)
  } catch (error) {
    console.error(error)
  }
}
