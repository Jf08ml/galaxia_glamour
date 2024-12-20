import { apiImage } from "./axiosConfig";
import { handleAxiosError } from "../utils/handleAxiosError";

interface UploadImageResponse {
  imageUrl: string;
}

export const uploadImage = async (file: File): Promise<string | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    const folder = `${import.meta.env.VITE_FOLDER_IMAGES}`;

    const response = await apiImage.post<UploadImageResponse>(
      `/upload/${folder}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  } catch (error) {
    handleAxiosError(error, "Error al subir la imagen");
  }
};
