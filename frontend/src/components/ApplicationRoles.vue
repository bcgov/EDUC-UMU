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
        <div class='text-xs-center'>
          <v-progress-circular color="#003366" indeterminate></v-progress-circular>
        </div>
      </template>

      <template slot="headerCell" slot-scope="props">

      </template>

      <template 
        slot='footer'>
          <td colspan="9">
            <v-layout row justify-center>

              <v-btn @click="getRoles" color="#003366" dark>Reload Table</v-btn>

              <v-dialog v-model="dialog_c" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="#003366" dark v-on="on">Add System Role</v-btn>
                </template>
                <v-form>
                <v-card>
                  <v-card-title>
                    <span><h2>Add System Role</h2></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="System" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Application Role" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark flat @click="dialog_c = false">Close</v-btn>
                    <v-btn color="#003366" dark flat @click="dialog_c = false">Add</v-btn>
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
        <td>{{ props.item[4] }}</td>
        <td class="button-container" align="center">
          <v-btn class="no-shadow" @click.stop="updateRoleForm(props.item[0], props.item[1])" color="transparent"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></v-btn>
          <v-btn class="no-shadow" color="transparent"><i class="fas fa-trash-alt fa-lg" style="color:#F44336"></i></v-btn>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog_rForm" persistent max-width="700px">
              <v-form>
                <v-card>
                  <v-card-title>
                    <span><h2>Update System Role</h2></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="System" :value="roleInfo.system" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Application Role" :value="roleInfo.role" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark flat @click="dialog_rForm = false">Close</v-btn>
                    <v-btn color="#003366" dark flat @click="dialog_rForm = false">Update</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
      </v-dialog>
    <!--<div class="text-xs-center pt-2">
      <v-btn color="#5475a7"><span class="white--text"><i class="fas fa-user-plus" style="color:white"></i>&nbsp;Add User</span></v-btn>
    </div>-->
  </v-card>
</template>

<script>
    import axios from 'axios'

    export default{
        data: () => ({
            dialog_c: false,
            dialog_rForm: false,
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
                    text: 'Application Role'
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
            items: [],
            roleInfo: {}
        }),
        mounted: function() {
          this.getRoles();
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            },
            getRoles () {
              this.items = [];
              axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/roles").then(response => {this.items = response.data; this.isLoading = false;});
            },
            updateRoleForm (system, role) {
              this.roleInfo = {"system": system, "role": role};
              this.dialog_rForm = true;
            }
        }
    };
</script>