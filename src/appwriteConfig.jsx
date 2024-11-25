import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Cambia esto si tienes otro endpoint
  .setProject("66e24eba003d137710bb"); // Reemplaza con tu ID de proyecto en Appwrite

// Servicios
export const account = new Account(client);
export const databases = new Databases(client);

export default client;
