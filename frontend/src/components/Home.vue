<template>
    <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
    -->
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class='sectionCard'>
            <v-spacer></v-spacer>
            <UserTable/>
            <v-spacer></v-spacer>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import UserTable from './UserTable.vue';
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