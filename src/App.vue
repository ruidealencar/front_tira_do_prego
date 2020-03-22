<template>
	<div id="app" >
		<Header title="Tira do Prego" 
			:hideToggle="!usuario"
			:hideUserDropdown="!usuario" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, usuarioKey } from "@/global"
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'usuario']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(usuarioKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUsuario', null)
			
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.put(`${baseApiUrl}/api/Auth`, userData)

			if (res.data) {
				// console.log(res.data)
				// this.$store.commit('setUsuario', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				// localStorage.removeItem(usuarioKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false

		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}

	
</style>