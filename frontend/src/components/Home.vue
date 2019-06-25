<template>
  <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
-->
    <v-container v-else>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <UserTable></UserTable>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import UserTable from './UserTable.vue';

  export default{
    name: 'home',
    components: {
      UserTable
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