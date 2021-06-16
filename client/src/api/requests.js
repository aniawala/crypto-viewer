import api from "./index";

export const getCryptocurrencies = async () => {
  try {
    const response = await api.get("/cryptocurrencies");
    return [response.data, null];
  } catch (e) {
    const error = e.response.data.message;
    return [null, error];
  }
};
