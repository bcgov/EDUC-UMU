<template>
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>

    <v-container v-else>
          <v-layout row wrap justify-center>
            <v-flex xs12>
              <v-tabs
                v-model="active"
                color="#003366"
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

                <v-tab>
              </v-tabs>
            </v-flex>
            <v-flex xs12>
              <v-card>
                <v-flex><v-btn @click="getUsers()">Get Users</v-btn></v-flex>
                <v-flex v-if="testBody">{{testBody}}</v-flex>
                <v-flex v-if="bodyError" error>{{bodyError}}</v-flex>
              </v-card>
            </v-flex>
          </v-layout>
    </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import UserTable from './UserTable.vue';
  import ProxyTable from './ProxyTable.vue';
  import ApplicationRoles from './ApplicationRoles.vue';
  import axios from 'axios';

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
    },
    methods: {
      async getUsers(){
        try{
          const response = await axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/database/users");
          const body = response.data;

          if(!body) {
            throw new Error('no body in response');
          }
          if(body.error){
            throw new Error(body.error);
          }
          this.testBody = body;
        } catch (e) {
          console.log('Error getting users from database');
          console.log(e);
          this.bodyError = 'error :p';
        }
      }
    }
  };
</script>

<style>
  @import "{{ site.theme }}";

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
  .hover-change:hover{
    color: #81D4FA;
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
</style>