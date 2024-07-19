import { Artwork } from "@/contracts/types/Artwork";
import { axiosInstance } from "../.."
import axios from "axios";

export const getArtworks = async () => {
  const res = axiosInstance.get('/artwork');
  return res
}

export const getArtworkById = async (id: number) => {
  const res = axiosInstance.get(`/artwork/${id}`);
  return res
}

export const purchaseArtwork = async (cart: any[], amount: number) => {
  
  const artworkRes = await axiosInstance.post('/order', {
      buyerId: 0,
      totalQuantity: 0,
      totalAmount: 0,
      orderDetails: [
        {
          artworkId: 0,
          unitPrice: 0
        }
      ]
    
  })
  const res = await axios.post('http://10.0.2.2:5001/v2/payment-requests', {
    cart: cart,
    amount: amount

  })
  return res
}