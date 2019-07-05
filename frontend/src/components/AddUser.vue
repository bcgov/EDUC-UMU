<template>
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>

    <v-container v-else>
        <v-layout row wrap justify-center>
            <v-flex xs10>
                <UserForm></UserForm>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import UserForm from './UserForm.vue';

export default {
    name: 'add_user',
    components: {
        UserForm
    },
    data() {
      return {
        dialog: false
      };
    },
    computed: {
      ...mapGetters('auth', ['isAuthenticated'])
    }
};
</script>

<style>
.user-form{
    border-radius: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 15px;
    padding-left: 15px;
  }
</style>