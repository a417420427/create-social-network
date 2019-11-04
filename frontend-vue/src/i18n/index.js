import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { cookie } from './cookie';
import * as translations from './translation';

Vue.use(VueI18n);

const languageKey = 'locale-language';
export const getLang = () => cookie.get(languageKey) || 'zh';

export const i18n = new VueI18n({
  locale: getLang(),
  messages: translations,
});
