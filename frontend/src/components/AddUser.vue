<template>
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>

    <v-container v-else>
        <v-layout row wrap justify-center>
            <v-flex xs10>
                <v-tabs
                v-model="active"
                color="#003366"
                dark
                slider-color="#fcba19"
                class="top-round">
                <v-tab>SEC Authorization</v-tab>
                <v-tab-item>
                  <UserForm></UserForm>
                </v-tab-item>

                <v-tab>User Proxies</v-tab>
                <v-tab-item>
                  <UserForm></UserForm>
                </v-tab-item>

                <v-tab>SEC Application</v-tab>
                <v-tab-item>
                  <UserForm></UserForm>
                </v-tab-item>
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
  .top-round{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .bottom-round{
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>