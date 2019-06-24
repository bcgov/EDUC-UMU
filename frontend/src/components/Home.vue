<template>
    <!--
    <v-container v-if="!isAuthenticated">
        <h1>Not Logged In</h1>
    </v-container>
    -->
    <v-container>
      <v-layout wrap>
        <v-flex xs8>
          <v-img
            :src="require('@/assets/images/bcid-symbol.svg')"
            class="my-3"
            contain
            height="150"
            position="left"
          ></v-img>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-card class='sectionCard'>
            <v-spacer></vspacer>
            <UserTable/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<style>
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