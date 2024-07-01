import { axiosInstance } from ".."

export const getArtworks = async () => {
  const res = axiosInstance.get('/artwork');
  return res
}

export const getArtworkById = async (id: number) => {
  const res = axiosInstance.get(`/artwork/${id}`);
  return res
}