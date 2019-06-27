<template>
  <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
-->
    <v-container>
          <v-layout row wrap justify-center>
              <v-flex xs10>
                <v-expansion-panel>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      OBIEE User Table
                    </template>
                    <UserTable></UserTable>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
          </v-layout>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
          <v-layout row wrap justify-center>
              <v-flex xs10>
                <v-expansion-panel>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      OBIEE Proxy User Table
                    </template>
                    <ProxyTable></ProxyTable>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
          </v-layout>
    </v-container>
</template>

<script>
  import UserTable from './UserTable.vue';
  import ProxyTable from './ProxyTable.vue';

  export default {
    name: 'home',
    components: {
      UserTable,
      ProxyTable
    },
    data() {
      return {
        dialog: false
      };
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
</style>