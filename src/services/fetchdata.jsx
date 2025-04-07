import axios from "axios";

const fetchData = async (pathname, params = {}, method = "GET") => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = new URL(apiUrl + pathname);

  // Si es un GET y hay params, los pasamos por query
  if (method.toUpperCase() === "GET" && Object.keys(params).length > 0) {
    url.search = new URLSearchParams(params).toString();
  }

  const headers = {
    Accept: "application/json",
    // Si necesitas auth en el futuro:
    // Authorization: `Bearer ${localStorage.getItem("JWT")}`
  };

  try {
    let response;

    switch (method.toUpperCase()) {
      case "GET":
        response = await axios.get(url.toString(), { headers });
        break;
      case "POST":
        response = await axios.post(url.toString(), params, { headers });
        break;
      case "PUT":
        response = await axios.put(url.toString(), params, { headers });
        break;
      case "DELETE":
        response = await axios.delete(url.toString(), { headers });
        break;
      default:
        throw new Error("Método HTTP no soportado");
    }

    // Retornamos directamente los datos útiles de Strapi
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
};

export default fetchData;
