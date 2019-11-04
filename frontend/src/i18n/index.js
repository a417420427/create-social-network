import { cookie } from 'utils/cookie';
import React, { useState, useCallback, useContext, createContext } from 'react';
import * as translations from './translation';
const languageKey = 'locale-language';

const getLang = () => cookie.get(languageKey) || 'en';

const LanguageContext = new createContext();

export const LanguageProvider = props => {
  console.log(translations[getLang()], 'xxxxxxx');
  let [$t, setLanguage] = useState(translations[getLang()]);
  return (
    <LanguageContext.Provider value={{ $t, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = function() {
  const { $t, setLanguage } = useContext(LanguageContext);
  const switchLanguage = useCallback(() => {
    const currentLang = getLang() === 'en' ? 'zh' : 'en';
    cookie.set(languageKey, currentLang);
    setLanguage(translations[currentLang]);
  }, [setLanguage]);

  return { $t, switchLanguage };
};
