import i18next from "i18next";
import { Show, createEffect, createSignal } from "solid-js";
import LanguageSwitcher from "./components/LanguageSwitcher";
import WeatherForm from "./components/WeatherForm";

import { useTransContext } from "@mbarzda/solid-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

function App() {
  const [isReady, setIsReady] = createSignal(false);
  const [locale, setLocale] = createSignal("en-US");
  const [t] = useTransContext();

  createEffect(() => {
    i18next
      .use(Backend)
      .use(LanguageDetector)
      .init({
        lng: "en-US",
        debug: true,
        interpolation: {
          escapeValue: false,
        },
        fallbackLng: false,
        ns: "translation",
        backend: {
          loadPath: "./../locales/{{lng}}/{{ns}}.json",
        },
      })
      .then(() => setIsReady(true))
      .catch((err) => console.error(err));
  });

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  createEffect(() => {
    if (locale().startsWith("ar-EG")) {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  });

  return (
    <Show when={isReady()} fallback={<div>Loading...</div>}>
      <div className="container mx-auto my-10 flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-center">{t("app_name")}</h1>
        <LanguageSwitcher
          locale={locale()}
          onLocaleChange={handleLocaleChange}
        />
        <WeatherForm />
      </div>
    </Show>
  );
}

export default App;
