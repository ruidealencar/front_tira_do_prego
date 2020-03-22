<template>
	<div class="category-admin">
		<b-form>
			<input id="category-id" type="hidden" v-model="prestador.id" />
			<b-row v-if="mode != 'remove'">
				<b-col md="6" sm="12">
					<b-form-group label="Nome:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.nome" required
							placeholder="Nome Fantasia" />
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Latitude:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.latitude"
							placeholder="Latitude" />
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode != 'remove'">
				<b-col md="6" sm="12">
					<b-form-group label="Telefone:" label-for="category-name">
					<b-form-input id="category-name" type="text"
						v-model="prestador.telefone"
						placeholder="Telefone" />
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Longitude:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.longitude"
							placeholder="Longitude" />
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode != 'remove'">
				<b-col md="6" sm="12">
					<b-form-group label="Horario:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.horario" required
							placeholder="Horario de funcionamento" />
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Tipo" id="category-tipo" label-for="category-name">
						<b-form-radio v-model="prestador.tipo" name="category-tipo" value="B">Borracharia</b-form-radio>
						<b-form-radio v-model="prestador.tipo" name="category-tipo" value="R">Reboque</b-form-radio>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode === 'remove'">
				<b-col md="6" sm="12">
					<b-form-group label="Nome:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.nome"
							:readonly="mode === 'remove'" />
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Latitude:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.latitude"
							:readonly="mode === 'remove'"/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode === 'remove'">
				<b-col md="6" sm="12">
					<b-form-group label="Telefone:" label-for="category-name">
					<b-form-input id="category-name" type="text"
						v-model="prestador.telefone"
						:readonly="mode === 'remove'"/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Longitude:" label-for="category-name">
						<b-form-input id="category-name" type="text"
							v-model="prestador.longitude"
							:readonly="mode === 'remove'"/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode === 'load' || mode === 'save' ">
				<b-col md="12" sm="6">
					<b-button block variant="primary"
				@click="save">Salvar</b-button>
				</b-col>
			</b-row>
			<b-row v-else-if="mode === 'edit'">
				<b-col md="6" sm="6">
					<b-button block variant="primary"
						@click="save">Salvar</b-button>
				</b-col>
				<b-col md="6" sm="6">
					<b-button block v-if="mode === 'edit' || mode === 'remove'" @click="reset">Cancelar</b-button>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" sm="6">
					<b-button block variant="danger" v-if="mode === 'remove'"
						@click="remove">Excluir</b-button>
				</b-col>
				<b-col md="6" sm="6">
					<b-button block v-if="mode === 'remove'" @click="reset">Cancelar</b-button>
				</b-col>
			</b-row>
		</b-form>
		<hr>
		<b-table hover striped :items="prestadores" :fields="fields">
			<template slot="actions" slot-scope="data">
				<b-button variant="warning" @click="loadPrestador(data.item)" class="mr-2">
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button variant="danger" @click="loadPrestador(data.item, 'remove')">
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
	name: 'PrestadorAdmin',
	data: function() {
		return {
			mode: 'load',
			prestador: {},
			prestadores: [],
			fields: [
				{ key: 'nome', label: 'Nome', sortable: true },
				{ key: 'latitude', label: 'Latitude', sortable: true },
				{ key: 'longitude', label: 'Longitude' },
				{ key: 'horario', label: 'Horario' },
				{ key: 'telefone', label: 'Telefone' },
				{ key: 'tipo', label: 'Tipo' },
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		loadPrestadores() {
			const url = `${baseApiUrl}/api/v1/prestador`
			axios.get(url).then(res => {
				// this.categories = res.data
				this.prestadores = res.data.map(prestador => {
					return { ...prestador, value: prestador.id, text: prestador.nome }
				})
			})
		},
		reset() {
			this.mode = 'save'
			this.prestador = {}
			this.loadPrestadores()
		},
		save(mode = 'save') {
			this.mode = mode
			const method = this.prestador.id ? 'put' : 'post'
			const id = this.prestador.id ? `/${this.prestador.id}` : ''
			axios[method](`${baseApiUrl}/api/v1/prestador${id}`, this.prestador)
				.then(() => {
					this.$toasted.global.defaultSuccess()
					this.reset()
				})
				.catch(showError)
		},
		remove() {
			const id = this.prestador.id
			axios.delete(`${baseApiUrl}/api/v1/prestador/${id}`)
				.then(() => {
					this.$toasted.global.defaultSuccess()
					this.reset()
				})
				.catch(showError)
		},
		loadPrestador(prestador, mode = 'edit') {
			this.mode = mode
			this.prestador = { ...prestador }
		}
	},
	mounted() {
		this.loadPrestadores()
	}
}
</script>

<style>

</style>