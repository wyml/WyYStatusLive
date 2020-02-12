import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import zhHans from 'vuetify/es5/locale/zh-Hans';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: '#388E3C',
                accent: '#FF5722'
            }
        }
    },
    lang: {
        locales: {
            zhHans
        },
        current: 'zhHans'
    }
});