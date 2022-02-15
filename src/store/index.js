import Vue from 'vue'
import Vuex from 'vuex'
import { collection, addDoc, doc, deleteDoc, setDoc, Timestamp, onSnapshot, query } from "firebase/firestore";
import { db } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    courses: [],
    alertMsg: "",
    alert: false,
    error: false,
    registro: false,
  },
  getters: {
    user: state => {
      return state.user
    },
    courses: state => {
      return state.courses
    },
    alertMsg: state => {
      return state.alertMsg
    },
    alert: state => {
      return state.alert
    },
    error: state => {
      return state.error
    },
    registro: state => {
      return state.registro
    },
    totalCupos: state => {
      return state.courses.reduce((a, b) => a + b.cupos, 0)
    },
    totalInscritos: state => {
      return state.courses.reduce((a, b) => a + b.inscritos, 0)
    },
    cursosTerminados: state => {
      return state.courses.filter(curso => curso.estado).length
    },
    cursosActivos: state => {
      return state.courses.filter(curso => !curso.estado).length
    },
    getCurso: state => cursoId => {
      return state.courses.find(curso => curso.id == cursoId)
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    getCourses(state, courses) {
      state.courses = courses
    },
    setAlertMsg(state, msg) {
      state.alertMsg = msg;
    },
    setAlert(state, alert) {
      state.alert = alert;
    },
    setError(state, error) {
      state.error = error;
    },
    setRegistro(state, registro) {
      state.registro = registro;
    },
  },
  actions: {
    getCourses({ commit }) {
      const q = query(collection(db, "cursos"));
      onSnapshot(q, (querySnapshot) => {
        const coursesDB = [];
        querySnapshot.forEach((doc) => {
          coursesDB.push({
            codigo: doc.data().codigo,
            costo: doc.data().costo,
            cupos: doc.data().cupos,
            descripcion: doc.data().descripcion,
            duracion: doc.data().duracion,
            estado: doc.data().estado,
            imagen: doc.data().imagen,
            inscritos: doc.data().inscritos,
            nombre: doc.data().nombre,
            fecha: doc.data().fecha,
            id: doc.id
          })
        });
        commit('getCourses', coursesDB);
      });
    },
    async addCourse({ commit }, course) {
      try {
        await addDoc(collection(db, "cursos"), {
          nombre: course.nombre,
          imagen: course.imagen,
          cupos: course.cupos,
          inscritos: course.inscritos,
          duracion: course.duracion,
          costo: course.costo,
          descripcion: course.descripcion,
          fecha: Timestamp.fromDate(course.fecha),
          estado: course.estado,
          codigo: course.codigo
        });
        setTimeout(() => {
          commit('setAlert', true);
          setTimeout(() => {
            commit('setAlert', false);
          }, 3000);
        }, 1000);
      } catch (e) {
        console.error("Error agregando documento: ", e);
      }
    },
    async deleteCourse({ commit }, courseId) {
      await deleteDoc(doc(db, "cursos", courseId));
      setTimeout(() => {
        commit('setAlert', true);
        setTimeout(() => {
          commit('setAlert', false);
        }, 3000);
      }, 1000);
    },
    async updateCourse({ commit }, course) {
      await setDoc(doc(db, "cursos", course.id), {
        nombre: course.nombre,
        imagen: course.imagen,
        cupos: course.cupos,
        inscritos: course.inscritos,
        duracion: course.duracion,
        costo: course.costo,
        descripcion: course.descripcion,
        fecha: Timestamp.fromDate(course.fecha),
        estado: course.estado,
        codigo: course.codigo
      });
      setTimeout(() => {
        commit('setAlert', true);
        setTimeout(() => {
          commit('setAlert', false);
        }, 3000);
      }, 1000);
    }
  },
})
