import { useEffect } from "react";
// import Lists from "./lists/Lists";
import { databases } from "../appwriteConfig";

export default function Layout() {
  const handleGetDocuments = async () => {
    try {
      const response = await databases.listDocuments(
        "6743e31b000309628d2a",
        "6743e34d00031042facb"
      );
      console.log("Documentos:", response.documents);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  useEffect(() => {
    handleGetDocuments();
  }, []);
  return (
    <>
      <div>Layout</div>
      {/* <Lists /> */}
    </>
  );
}
