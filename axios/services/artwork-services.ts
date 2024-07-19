import Toast from "react-native-toast-message";
import { axiosInstance } from ".."
import nodejsInstance from "../nodejs-services/nodeJsInstance";

export const getArtworks = async () => {
  const res = axiosInstance.get('/artwork');
  return res
}

export const getArtworkById = async (id: number) => {
  const res = axiosInstance.get(`/artwork/${id}`);
  return res
}

export const buyArtwork = async (buyerId: number, totalAmount: number, totalQuantity: number, orderDetails: { artworkId: number, unitPrice: number }[]) => {
  try {
    const orderId = Number(String(new Date().getTime()).slice(-6));

    // Prepare order details with multiple items
    const orderData = {
      buyerId: buyerId,
      totalAmount: totalAmount,
      totalQuantity: totalQuantity,
      orderDetails: orderDetails.map(detail => ({
        artworkId: detail.artworkId,
        unitPrice: detail.unitPrice,
      }))
    };

    // Post order to server
    const postToNet = await axiosInstance.post('/order', orderData);


    if (postToNet.status === 200 || postToNet.status === 201) {
      // Post payment request to Node.js server
      const postToNode = await nodejsInstance.post('/payment/payment-requests', {
        amount: 20000,
        items: orderDetails,
        orderId: postToNet.data.orderId,
      });

      if (postToNode.status === 200) {
        console.log(postToNode.data.checkoutUrl);

        return postToNode.data.checkoutUrl;
      }
    } else if (postToNet.status === 400) {
      Toast.show({
        type: 'error',
        text1: 'You have bought this artwork before',
        position: 'top',
      })
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error.response.data.msg,
      position: 'top',
    })
  }
};
