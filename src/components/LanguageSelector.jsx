import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import flagEn from "/flags/gb.svg";
import flagEs from "/flags/es.svg";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");
  const op = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: flagEn },
    { code: "es", name: "Español", flag: flagEs },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setSelectedLang(lng);
      op.current.hide();
    });
  };

  // Si el idioma no está en la lista, usa inglés por defecto
  const selectedLanguage =
    languages.find((lang) => lang.code === selectedLang) || languages[0];

  return (
    <div className="d-flex align-items-center ps-3 cs-line-left">
      <img
        src={selectedLanguage?.flag || flagEn}
        alt={selectedLanguage?.name || "English"}
        className="select-tenant-pic me-2 cursor-pointer"
        style={{ width: 30, height: 30 }}
        onClick={(e) => op.current.toggle(e)}
      />

      <OverlayPanel ref={op}>
        <div className="p-2">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="d-flex align-items-center p-2 cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => changeLanguage(lang.code)}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="me-2"
                style={{ width: 24, height: 24 }}
              />
              {lang.name}
            </div>
          ))}
        </div>
      </OverlayPanel>
    </div>
  );
};

export default LanguageSelector;
