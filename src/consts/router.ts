/**
 * Навигация по приложению.
 * Описывает доступные в приложении пути и заголовки страниц.
 */
export const ROUTER = {
  ROOT: {
    PATH: "/",
    TITLE: "Главная",
  },
  IMPORT: {
    PATH: "/import",
    TITLE: "Импорт данных",
  },
  CERT: {
    PATH: "/cert",
    TITLE: "Сертификат",
  },
} as const;
