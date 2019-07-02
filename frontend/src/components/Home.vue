<template>
  <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
-->
    <v-container>
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <v-tabs
                v-model="active"
                color="#003366"
                dark
                slider-color="#fcba19">
                <v-tab>OBIEE User Table</v-tab>
                <v-tab-item>
                  <UserTable></UserTable>
                </v-tab-item>
                <v-tab>OBIEE User Proxy Table</v-tab>
                <v-tab-item>
                  <ProxyTable></ProxyTable>
                </v-tab-item>
              </v-tabs>
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