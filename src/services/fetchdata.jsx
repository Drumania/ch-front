import axios from "axios";

const fetchData = async (pathname, params = {}, method = "GET") => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const url = new URL(apiUrl + pathname);
  console.log(url);
  const headers = {
    // Authorization: `Bearer ${localStorage.getItem("JWT")}`, // Esta línea la puedes comentar o eliminar
    // TENANT: localStorage.getItem("Tenant"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const axiosMethods = {
    GET: () => axios.get(url.toString(), { headers }),
    POST: () => axios.post(url.toString(), params, { headers }),
    PUT: () => axios.put(url.toString(), params, { headers }),
    DELETE: () => axios.delete(url.toString(), { headers }),
  };

  try {
    if (method.toUpperCase() === "GET" && Object.keys(params).length > 0) {
      url.search = new URLSearchParams(params).toString();
    }

    const response = await axiosMethods[method.toUpperCase()]();
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
};

export default fetchData;
