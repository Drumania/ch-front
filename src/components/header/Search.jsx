import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";

export default function Search() {
  const { t } = useTranslation();

  return (
    <div className="p-inputgroup searchbar-container">
      <span className="p-inputgroup-addon searchbar-icon">
        <i className="pi pi-search"></i>
      </span>
      <InputText className="searchbar-input" placeholder={t("search")} />
    </div>
  );
}
