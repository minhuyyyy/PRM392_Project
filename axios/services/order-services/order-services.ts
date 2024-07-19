import { axiosInstance } from "@/axios";

const getOrderById = async (id: number) => {
    const res = axiosInstance.get(`/order/${id}`);
    return (await res).data
}

export default getOrderById