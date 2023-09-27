import { useTransContext } from '@mbarzda/solid-i18next';

const LanguageSwitcher = ({ locale, onLocaleChange }) => {
  const [t, { changeLanguage }] = useTransContext();

  function handleLanguageChange(event) {
    const newLocale = event.target.value;
    changeLanguage(newLocale);
    onLocaleChange(newLocale);
  }

  return (
    <div>
      <select value={locale} onChange={handleLanguageChange}>
        <option value='en-US'>{t('english_label')}</option>
        <option value='es-ES'>{t('spanish_label')}</option>
        <option value='ru-RU'>{t('russian_label')}</option>
        <option value='ar-EG'>{t('arabic_label')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
