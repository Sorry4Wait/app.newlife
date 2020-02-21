import Vue from 'vue'
import VueI18n from 'vue-i18n'

import uz from './langMessages/uz.json';
import ru from './langMessages/ru.json';


Vue.use(VueI18n);

const locale = localStorage.getItem('locale') || 'ru';

const messages = {
	uz: uz,
	ru: ru,
};

const i18n = new VueI18n({
	locale,
	messages
});

export default i18n;

