<template>
  <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
-->
    <v-container>
      <v-layout column justify-center>
        <v-flex>
          <UserTable></UserTable>
        </v-flex>
      <v-spacer></v-spacer>
        <v-flex>
          <ProxyTable></ProxyTable>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import UserTable from './UserTable.vue';
  import ProxyTable from './ProxyTable.vue';

  export default{
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
</style>