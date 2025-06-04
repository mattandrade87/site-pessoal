import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <nav>
        <ul>
          <li>{t('navigation.home')}</li>
          <li>{t('navigation.about')}</li>
          <li>{t('navigation.contact')}</li>
        </ul>
      </nav>
      <div className="buttons">
        <button>{t('buttons.submit')}</button>
        <button>{t('buttons.cancel')}</button>
      </div>
    </div>
  );
}; 