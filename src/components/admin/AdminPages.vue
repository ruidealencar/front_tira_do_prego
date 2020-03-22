<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Gerenciamento" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Prestador" active>
                        <PrestadorAdmin />
                    </b-tab>
                    <b-tab title="Usuario">
                        <UsuarioAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import PrestadorAdmin from './PrestadorAdmin'
// import UsuarioAdmin from './UsuarioAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, PrestadorAdmin }
}
</script>

<style>

</style>
