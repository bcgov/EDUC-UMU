<template>
    <v-container>
        <h1>You are not authorized to use this site. Get outta here.</h1>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'unauthorized',
    components: {
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated'])
    }
}
</script>

<style>
</style>