import api from "./index";

export const getCryptocurrencies = async (params) => {
  try {
    const response = await api.get("/cryptocurrencies", { params });
    return [response.data, null];
  } catch (e) {
    const error = e.response.data.message;
    return [null, error];
  }
};
