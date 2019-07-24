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
      <template v-if="isLoading" v-slot:no-data>
        <div class='text-xs-center'>
          <v-progress-circular color="#003366" indeterminate></v-progress-circular>
        </div>
      </template>
      <template v-else v-slot:no-data>
        <div class='text-xs-center'>
          <h2>Unable to retrieve data</h2>
        </div>
      </template>
      <!--
    <v-progress-linear v-slot:progress color="#fcba19" indeterminate v-show="isLoading"></v-progress-linear>
    -->
      <template slot="headerCell" slot-scope="props">

      </template>
      <template 
        slot='footer'>
          <td colspan="9">
            <v-layout row justify-center>


              <v-dialog v-model="dialog_a" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="#003366" dark v-on="on">Add Auth User</v-btn>
                </template>
                <v-form>
                <v-card>
                  <v-card-title>
                    <span><h1>Add Auth User</h1></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-text-field label="System" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field label="Username" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Value"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Auth Source" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="User GUID" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark flat @click="dialog_a = false">Close</v-btn>
                    <v-btn color="#003366" dark flat @click="dialog_a = false">Add</v-btn>
                  </v-card-actions>
                </v-card>
                </v-form>
              </v-dialog>


            </v-layout>
          </td>
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
      <template
        slot="items">
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
            dialog_a: false,
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
                    text: 'System',
                    value: 'system'
                },
                {
                    sortable: true,
                    text: 'Username',
                    value: 'username'
                },
                {
                  sortable: true,
                  text: 'Name',
                  value: 'name'
                },
                {
                    sortable: true,
                    text: 'Value',
                    value: 'value'
                },
                {
                  sortable: true,
                  text: 'Auth source',
                  value: 'authSource'
                },
                {
                    sortable: true,
                    text: 'User GUID',
                    value: 'guid'
                },
                {
                  sortable: true,
                  text: 'Created By',
                  value: 'create'
                },
                {
                  sortable: true,
                  text: 'Updated By',
                  value: 'update'
                }
            ],
            items: []
          }
        },
        mounted: function() {
          axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/users").then(response => {
                                                                                                                      this.items = response.data;
                                                                                                                      this.isLoading = false;
                                                                                                                    });
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