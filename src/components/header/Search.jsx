import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";

export default function Search() {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center h-100">
      <div className="p-inputgroup searchbar-container">
        <InputText
          className="searchbar-input"
          placeholder="Buscar Listas..."
          // placeholder={t("search")}
        />
        <span className="p-inputgroup-addon searchbar-icon cursor-pointer">
          <i className="pi pi-search"></i>
        </span>
      </div>
    </div>
  );
}
