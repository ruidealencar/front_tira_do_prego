import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        usuario: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.usuario) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUsuario(state, usuario) {
            state.usuario = usuario
            if(usuario) {
                axios.defaults.headers.common['Authorization'] = `bearer ${usuario.accessToken}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})