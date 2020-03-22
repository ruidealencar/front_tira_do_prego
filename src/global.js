import Vue from 'vue'

export const usuarioKey = '__knowledge_user'
export const baseApiUrl = 'https://apitiradoprego.herokuapp.com'
// export const baseApiUrl = 'http://localhost:5100'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showPasswordError() {
    Vue.toasted.global.passwordError()
}

export default { baseApiUrl, showError, showPasswordError, usuarioKey }