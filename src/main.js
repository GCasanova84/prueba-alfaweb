import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsWH6Phx91DCOFO5RQ4-_FWDintFjUuzs",
  authDomain: "prueba-cursos-alfaweb.firebaseapp.com",
  projectId: "prueba-cursos-alfaweb",
  storageBucket: "prueba-cursos-alfaweb.appspot.com",
  messagingSenderId: "498671868486",
  appId: "1:498671868486:web:eb50b210222176397e0847"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

Vue.config.productionTip = false

new Vue({
  app,
  db,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  sessionStorage.setItem('user',JSON.stringify(user));
  store.commit('setUser', user ? user.email : user);  
});