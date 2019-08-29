<template>
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>

    <v-container class="bottom-padding" v-else>
          <v-layout row wrap justify-center>
            <v-flex xs12>
              <v-tabs
                v-model="active"
                background-color="#003366"
                dark
                slider-color="#fcba19"
                class="top-round">
                <v-tab>SEC Authorization Table</v-tab>
                <v-tab-item>
                  <UserTable></UserTable>
                </v-tab-item>

                <v-tab>User Proxies Table</v-tab>
                <v-tab-item>
                  <ProxyTable></ProxyTable>
                </v-tab-item>

                <v-tab>SEC Application Roles Table</v-tab>
                <v-tab-item>
                  <ApplicationRoles></ApplicationRoles>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import UserTable from './UserTable.vue';
import ProxyTable from './ProxyTable.vue';
import ApplicationRoles from './ApplicationRoles.vue';

export default {
  name: 'home',
  components: {
    UserTable,
    ProxyTable,
    ApplicationRoles
  },
  data() {
    return {
      dialog: false,
      testBody: '',
      bodyError: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
};
</script>

<style>
  .small-letters{
    font-size: 1.0rem;
  }
  .list_action{
    padding-right: 2.5px;
    padding-left: 2.5px;
  }
  .bottom-padding{
    padding-bottom: 100px;
  }
  .sectionCard {
    margin-bottom: 20px;
  }
  .jsonText textarea {
    font-family: 'Courier New', Courier, monospace;
  }
  .underRadioField {
    padding-left: 32px;
  }
  tbody tr:nth-of-type(odd){
    background-color: rgba(0,0,0,0.05);
  }
  .round{
    border-radius: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-bottom: 10px;
  }
  .gov-blue{
    background-color: #003366;
    color: white;
  }
  .blue{
    color: #0091ea
  }
  .red{
    color: #f44336
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
    padding-bottom: 10px;
  }
  .card-colour{
    background-color: #003366;
    color: white
  }
  .table-card{
    border-radius: 0px;
    margin-bottom: 15px;
  }
  .container{
    max-width: 1500px;
  }
  .no-shadow{
    box-shadow: none !important;
    min-width: 0 !important;
  }
  .button-container{
    width: 140px;
  }
  .v-icon:hover{
    color: #0091ea
  }
</style>
