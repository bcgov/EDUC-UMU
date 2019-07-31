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
      :items="itemJson"
      :search="search"
      item-key="id"
      show-expand
      single-expand
    >
      <template v-slot:no-data>
        <div class='text-xs-center'>
          <v-progress-circular color="#003366" indeterminate></v-progress-circular>
        </div>
      </template>
      <!--
    <v-progress-linear v-slot:progress color="#fcba19" indeterminate v-show="isLoading"></v-progress-linear>
    -->
      <template 
        v-slot:body.append>
        <tr>
          <td colspan="9">
            <v-layout row justify-center>
            <!-- Add user form -->
              <v-dialog v-model="dialog_a" persistent max-width="700px">
                <template v-slot:activator="{ on }">
                  <v-btn color="#003366" @click="clearUser" dark v-on="on">Add Auth User</v-btn>
                </template>
                <v-form>
                  <v-card>
                    <v-card-title>
                      <span><h4>Add Auth User</h4></span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6>
                            <v-text-field label="System" name="system" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Username" name="username" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Name" name="name" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Value" name="value"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Auth Source" name="auth" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="User GUID" name="guid" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="dialog_a = false">Close</v-btn>
                      <v-btn color="#003366" dark text @click="addUser()">Add</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>

            </v-layout>
          </td>
        </tr>
      </template>

      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>
      <!--
      <template
        slot="items"
        slot-scope="props"
        >
        <tr>
          <td>{{ props.item.system }}</td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.value }}</td>
          <td>{{ props.item.authSource }}</td>
          <td>{{ props.item.guid }}</td>
          <td>
            <v-layout row align-center justify-center>
              <v-icon @click.stop="updateUserForm(props.item.system, props.item.username, props.item.name, props.item.value, props.item.authSource, props.item.guid)" color="#003366">edit</v-icon>
              <v-icon color="#003366">delete</v-icon>
            </v-layout>
          </td>
        </tr>
      </template>
      -->
      <template
        v-slot:expanded-item="props">
            <td colspan="2"><b>Created by:</b> {{ props.item.create }}</td>
            <td colspan="2"><b>Create date:</b> {{ props.item.createDate }}</td>
            <td><b>Updated by:</b> {{ props.item.update }}</td>
            <td colspan="2"><b>Update date:</b> {{ props.item.updateDate }}</td>
            <td></td>
      </template>
      <template
        v-slot:item.action="{ item }">
              <v-icon @click.stop="updateUserForm(item.system, item.username, item.name, item.value, item.authSource, item.guid)" color="#003366">edit</v-icon>
              <v-icon color="#003366">delete</v-icon>
        </v-layout>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>

    <!-- User auth upadate dialog box -->
    <v-dialog v-model="dialog_uForm" persistent max-width="700px">
                <v-form>
                  <v-card>
                    <v-card-title>
                      <span><h4>Update Auth User</h4></span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6>
                            <v-text-field label="System" name="system" :value="userInfo.system" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Username" name="username" :value="userInfo.username" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Name" name="name" :value="userInfo.name" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Value" name="value" :value="userInfo.value"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Auth Source" name="auth" :value="userInfo.auth" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="User GUID" name="guid" :value="userInfo.guid" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="dialog_uForm = false">Close</v-btn>
                      <v-btn color="#003366" dark text @click="addUser()">Update</v-btn>
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
        data () {
          return {
            dialog_a: false,
            dialog_uForm: false,
            isLoading: true,
            valid: true,
            hoverA: false,
            hoverB: false,
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
                  sortable: false,
                  text: 'Actions',
                  value: 'action',
                  align: 'center'
                }
            ],
            items: [],
            itemJson: [],
            userInfo: {}
          }
        },
        mounted(){
          this.getItems();
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            },
            getItems () {
              this.items = [];
              this.itemJson = [];
              axios.get("/api/main/database/users").then(response => {
                  this.items = response.data;
                  this.isLoading = false;
                  var tempArray = this.items;
                  var tempJson = [];
                  tempArray.forEach(function(element, index){
                    tempJson.push({"system": element[0], "username": element[1], "name": element[2], "value": element[3], "authSource": element[4], "guid": element[5], "create": element[6], "createDate": element[7], "update": element[8], "updateDate": element[9], "id": index});
                  });
                  this.itemJson = tempJson;
              });
            },
            /*
            submitUser () {
              userForm.submit().then(dialog_a = false);
            },*/
            updateUserForm(system, username, name, value, auth, guid) {
              this.userInfo = {"system": system, "username": username, "name": name, "value": value, "auth": auth, "guid": guid};
              this.dialog_uForm = true;
            },
            addUser() {
              this.dialog_a = false;
              this.dialog_uForm = false;
              this.getItems();
            }
        },
        watch: {
          items() {
            this.isLoading = false;
          }
        }
    };
</script>
