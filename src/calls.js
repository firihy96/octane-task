import axios from "axios";

const ORDERS_API_URL =
  "https://run.mocky.io/v3/b0816630-c4b5-49a9-9a0b-76a60ef2e405?mocky-delay=1500ms";

export const retrieveOrders = async () => {
  let response = await axios.get(ORDERS_API_URL);
  return response.data.orders;
};
const USERS_API_URL =
  "https://run.mocky.io/v3/f0cb3044-7776-49db-a0ea-e1957668c61d?mocky-delay=1500ms";
export const retrieveUsers = async () => {
  let response = await axios.get(USERS_API_URL);
  return response.data.users;
};
