// src/hooks/useSlugify.js

export function useSlugify() {
  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD") // separa tildes
      .replace(/[\u0300-\u036f]/g, "") // remueve tildes
      .replace(/\s+/g, "-") // espacios por guiones
      .replace(/[^\w-]+/g, ""); // remueve cualquier otro caracter especial

  return { slugify };
}
