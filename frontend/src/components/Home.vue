<template>

    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>

    <v-container v-else>
      <v-layout row wrap>
          <v-card class='sectionCard'>
            <UserTable/>
          </v-card>
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