import { mask } from 'vue-the-mask';
import money from 'v-money3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', mask);
  nuxtApp.vueApp.directive('money', money);
});
