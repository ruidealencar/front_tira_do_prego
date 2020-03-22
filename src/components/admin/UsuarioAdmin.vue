<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="usuarioEdit.id" />
            <b-row v-if="mode != 'remove' ">
                    <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="usuarioEdit.login" required
                            :readonly="mode === 'remove'"
                            placeholder="Login" />
                    </b-form-group>
                    <b-form-group label="Email:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="usuarioEdit.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Email" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password" v-if="mode != 'remove'">
                        <b-form-input id="user-password" type="password"
                            v-model="usuarioEdit.password" required
                            placeholder="Senha" />
                    </b-form-group>
                    <b-form-group label="Confirmação Senha:" label-for="user-password" v-if="mode != 'remove'">
                        <b-form-input id="user-password" type="password"
                            v-model="usuarioEdit.passwordConfirm" required
                            placeholder="Confirme a Senha" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="usuarioEdit.login" required
                            :readonly="mode === 'remove'"
                            placeholder="Login" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Email:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="usuarioEdit.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Email" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-checkbox id="user-admin" v-show="mode != 'remove'"
                        v-model="usuarioEdit.admin" class="mb-3">
                        Administrador?
                    </b-form-checkbox>  
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
        <b-table hover striped :items="usuarios" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUsuario(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUsuario(data.item, 'remove')">
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
    name: 'UsuarioAdmin',
    data: function() {
        return {
            mode: 'load',
            usuarioEdit: {},
            usuarios: [],
            fields: [
                { key: 'login', label: 'Login', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadUsuarios() {
            const url = `${baseApiUrl}/api/Usuario`
            axios.get(url).then(res => {
                this.usuarios = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.usuarioEdit = {}
            this.loadUsuarios()
        },
        save(mode = 'save') {
            this.mode = mode
            const method = this.usuarioEdit.id ? 'put' : 'post'
            const id = this.usuarioEdit.id ? `/${this.usuarioEdit.id}` : ''
            axios[method](`${baseApiUrl}/api/Usuario${id}`, this.usuarioEdit)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.usuarioEdit.id
            axios.delete(`${baseApiUrl}/api/Usuario/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUsuario(usuarioEdit, mode = 'edit') {
            this.mode = mode
            this.usuarioEdit = { ...usuarioEdit }
        }
    },
    mounted() {
        this.loadUsuarios()
        this.usuarioEdit = {}
    }
}
</script>

<style>

</style>
