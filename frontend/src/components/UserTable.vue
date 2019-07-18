<template>
  <v-card class="bottom-round">
    <div class="gov-blue">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          dark
          color="white"
          ></v-text-field>
      </v-card-title>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template v-slot:no-data>
        <v-progress-circular color="#003366" indeterminate></v-progress-circular>
      <template>
    <!--
      <v-progress-linear v-slot:progress color="#fcba19" indeterminate v-show="isLoading"></v-progress-linear>
    -->
      <template slot="headerCell" slot-scope="props">

      </template>
      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>
      <template
        slot="items"
        slot-scope="props">
        <td>{{ props.item[0] }}</td>
        <td>{{ props.item[1] }}</td>
        <td>{{ props.item[2] }}</td>
        <td>{{ props.item[3] }}</td>
        <td>{{ props.item[4] }}</td>
        <td>{{ props.item[5] }}</td>
        <td>{{ props.item[6] }}</td>
        <td>{{ props.item[8] }}</td>
        <td align="center"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></td>
      </template>
      <template slot="footer">
        <td>
          <v-select
            :items="systems"
            label="System"
            :rules="rules"
            required
            ></v-select>
        </td>

        <td>
          <v-text-field label="Username"
            :rules="rules"
            required
            ></v-text-field>
        </td>

        <td>
          <v-text-field label="Value"
            :rules="rules"
            required
          ></v-text-field>
        </td>

        <td colspan="2">
          <v-text-field label="GUID"
            :rules="rules"
            required
          ></v-text-field>
        </td>

        <td align="center"><v-btn :disabled="!valid" @click="validate"><i class="fas fa-plus fa-lg hover-change" style="color:#003366"></i></v-btn></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
    <!--<div class="text-xs-center pt-2">
      <v-btn color="#5475a7"><span class="white--text"><i class="fas fa-user-plus" style="color:white"></i>&nbsp;Add User</span></v-btn>
    </div>-->
  </v-card>
</template>

<script>
    import axios from 'axios'

    export default{
        data () {
          return {
            isLoading: true,
            valid: true,
            systems: ['EDW', 'SIS'],
            search: '',
            rules: [
              v => !!v || 'Required'
            ],
            headers: [
                {
                    sortable: true,
                    text: 'System'
                },
                {
                    sortable: true,
                    text: 'Username'
                },
                {
                  sortable: true,
                  text: 'Name'
                },
                {
                    sortable: true,
                    text: 'Value'
                },
                {
                  sortable: true,
                  text: 'Auth source'
                },
                {
                    sortable: true,
                    text: 'User GUID'
                },
                {
                  sortable: true,
                  text: 'Created By'
                },
                {
                  sortable: true,
                  text: 'Updated By'
                }
            ],
            items: []
          }
        },
        mounted: function() {
          axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/users").then(response => {this.items = response.data});
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            }
        },
        watch: {
          items() {
            this.isLoading = false;
          }
        }
    };
</script>