<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-expandsion-panel>
                    <h3 v-slot="header"></h3>
                    <v-expansion-panel-content>
                        <UserForm></UserForm>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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