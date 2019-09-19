<template>
  <v-card class="bottom-round">
    <div class="gov-blue">
      <v-card-title>
        <v-row>
          <v-col 
            cols="auto"
            class="left-col"
          >
            <h4 class="small-letters">Group By Username: </h4>
          </v-col>
          <v-col v-if="groupOpen">
              <v-chip
                class="mr-2"
                pill 
                close
                dark
                color="#5475a7"
                @click:close="resetUsername()"
              >
                <v-avatar
                  left
                  color="#96c0e6"
                >
                  {{ usernameGroup[0] }}
                </v-avatar>
                {{ usernameGroup }}
              </v-chip>
              <v-chip
                class="mr-2"
                dark
                color="#d93e45"
                @click="deleteGroup()"
              >
                <v-icon left>delete</v-icon>
                Delete group
              </v-chip>
              <v-chip
                class="mr-2"
                dark
                color="#43893e"
                @click="dialog_a = true"
              >
                <v-icon left>add_circle</v-icon>
                Add Item
              </v-chip>
          </v-col>
          <v-col v-else>
            <p class="small-letters">
              No user selected
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              dark
              color="white"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
    </div>
    <v-data-table
      :headers="headers"
      :items="itemJson"
      :search="search"
      item-key="id"
      :loading="isLoading"
      show-expand
      single-expand
    >


    <!-- Displays as the final row(s) of the table --> 
      <template 
        v-slot:body.append>
        <tr>
          <td colspan="9">
            <v-layout row justify-center>
            <!-- Add user form -->
            <v-btn class="ma-2" dark color="#003366" :href='csvRoute'>
              <v-icon left>save_alt</v-icon>
              CSV Template
            </v-btn>
            <v-btn class="ma-2" color="#003366" @click="dialog_a = true" dark v-on="on">Add Auth User</v-btn>
              <v-dialog v-model="dialog_a" persistent max-width="700px">
                <v-form>
                  <v-card>
                    <v-card-title>
                      <span><h4>Add Auth User</h4></span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6>
                            <v-select ref="addSystem" label="System" :items="systemArray" :readonly="groupOpen" :value="usernameArr[0].system" required></v-select>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field ref="addUsername" label="Username" name="username" :readonly="groupOpen" :value="usernameArr[0].username" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select ref="addName" :items="nameOptions" label="Name" name="name" required></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field ref="addValue" label="Value" name="value"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select ref="addAuth" :items="authSources" label="Auth Source" name="auth" :value="usernameArr[0].authSource" :readonly="groupOpen" required></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field ref="addGuid" label="User GUID" name="guid" :readonly="groupOpen" :value="usernameArr[0].guid" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="dialog_a = false">Close</v-btn>
                      <v-btn color="#003366" dark text @click="addUser()">Add</v-btn>
                      <v-file-input accept=".csv" color="#003366" class="file_in" chips multiple label="Add CSV File"></v-file-input>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-layout>
          </td>
        </tr>
      </template>


    <!-- Displays as the header of the table -->
      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>

      <template
        v-slot:no-data
      >
        <p>Unable to retrieve data from database.</p>
      </template>
    <!-- Displays as the row that expands from a row -->
      <template
        v-slot:expanded-item="props">
            <td colspan="2"><b>Created by:</b> {{ props.item.create }}</td>
            <td colspan="2"><b>Create date:</b> {{ props.item.createDate }}</td>
            <td><b>Updated by:</b> {{ props.item.update }}</td>
            <td colspan="2"><b>Update date:</b> {{ props.item.updateDate }}</td>
            <td></td>
      </template>


    <!-- The delete and edit user actions that are available to each row -->
      <template
        v-slot:item.action="{ item }">
          <v-btn icon class="list_action" @click.stop="selectUsername(item.username)" color="#5475a7"><v-icon>group</v-icon></v-btn>
          <v-btn icon class="list_action" @click.stop="updateUserForm(item.system, item.username, item.name, item.value, item.authSource, item.guid)" color="#43893e"><v-icon>edit</v-icon></v-btn>
          <v-btn icon class="list_action" @click.stop="deleteForm(item.system, item.username, item.name, item.value, item.authSource, item.guid)" color="#d93e45"><v-icon>delete</v-icon></v-btn>
      </template>


    <!-- Displays when a search query returns no results --> 
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
                            <v-select ref="updateSystem" :items="systemArray" :value="userInfo.system" name="system" label="System"></v-select>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field ref="updateUsername" label="Username" name="username" :value="userInfo.username" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select ref="updateName" label="Name" name="name" :items="nameOptions" required></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field ref="updateValue" label="Value" name="value" :value="userInfo.value"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select ref="updateAuth" label="Auth Source" :items="authSources" name="auth" required></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field ref="updateGuid" label="User GUID" name="guid" :value="userInfo.guid" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="dialog_uForm = false">Close</v-btn>
                      <v-btn color="#003366" dark text @click="updateUser()">Update</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
      </v-dialog>


    <!-- The dialog box that appears when you attempt to delete a user -->
      <v-dialog v-model="dialog_uDelete" persistent max-width="320px">
        <v-card>
          <v-card-title>
            <span><h4>Confirm Delete</h4></span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span>Are you sure you want to delete this entry?</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#003366" dark text @click="cancelDelete()">Cancel</v-btn>
            <v-btn color="#003366" dark text @click="deleteUser()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import { DownloadRoutes } from '@/utils/constants';
import { mapGetters } from 'vuex';
export default{
  data: () =>  ({
      csvRoute: DownloadRoutes.CSV,
      usernameGroup: '',
      actionInitiate: '',
      actionStatus: true,
      usernameArr: [
        {"system": '', "username": '', "guid": '', "authSource": ''}
      ],
      tempArray: [],
      nameOptions: ["ROLES", "DISPLAYNAME", "EDW_MASKING_USER_DISTRICT", "EDW_MASKING_USER_SCHOOL", "ENCRYPTED_ODBC_PASSWORD", "PORTALPATH"],
      authSources: ["IDIR", "CAP BCEID", "CAP TBCEID"],
      roleArray: [],
      systemArray: [],
      groupOpen: false,
      dialog_a: false,
      deleteMessage: '',
      dialog_uForm: false,
      dialog_uDelete: false,
      isLoading: true,
      valid: true,
      hoverA: false,
      hoverB: false,
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
      itemJson: [],
      items: [],
      userInfo: {}
  }),
  computed: {
    ...mapGetters('userActions', ['users'])
  },
  mounted: function(){
    this.getItems()
  },

  methods: {
    //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },

    //remove the user group that is currently selected
    resetUsername(){
      this.groupOpen = false;
      this.usernameArr = [{"system": '', "username": '', "guid": '', "authSource": ''}];
      this.usernameGroup = '';
      this.itemJson = this.tempArray;
    },

    //select all entries with the same username
    selectUsername(usrname){
      if(this.groupOpen){
        return;
      }
      else{
        this.groupOpen = true;
        this.usernameGroup = usrname;
        this.usernameArr = (this.itemJson).filter(function(item){
                                                  return item.username == usrname;
                                                });
        this.tempArray = this.itemJson;
        this.itemJson = this.usernameArr;
      }
    },

    //retrieves users from the API endpoint and puts them into a JSON array
    getItems () {
      this.isLoading = true;
      this.resetUsername();
      this.$store.dispatch('userActions/getUsers').then(response => {
        if(response === 500){
          this.itemJson = [];
        } else {
          this.itemJson = this.users;
          this.getSystems();
          this.isLoading = false;
        }
      });
    },
    /*
    submitUser () {
      userForm.submit().then(dialog_a = false);
    },*/

    //Passes information from a specific row in the table to the Update user form
    updateUserForm(system, username, name, value, auth, guid) {
      this.userInfo = {'system': system, 'username': username, 'name': name, 'value': value, 'auth': auth, 'guid': guid};
      this.dialog_uForm = true;
    },
    updateUser(){
      const updateJson = {'system': this.$refs.updateSystem, 'username': this.$refs.updateUsername, 'name': this.$refs.updatename, 'value': this.$refs.updateValue, 'authSource':this.$refs.updateAuth, 'guid':this.$refs.updateGuid};
      this.$store.dispatch('userActions/updateUser', updateJson).then(function() {
        this.getItems();
        this.userInfo = {};
        this.dialog_uForm = false;
      });
    },

    //initiates the add user dialog box and reloads the table once the user has been added
    addUser() {
      const user = {'system': this.$refs.addSystem, 'username': this.$refs.addUsername, 'name': this.$refs.addName, 'value': this.$refs.addValue, 'authSource': this.$refs.addAuth, 'guid': this.$refs.addGuid};
      this.actionInitiate = 'add';
      this.$store.dispatch('userActions/addUser', user).then(response => {
        if(response === 500){
          this.actionStatus = false;
        }
      });
      this.actionStatus = true;
      this.getItems();
      this.dialog_a = false;
    },

    //initiates the delete user dialog box
    deleteForm(system, username, name, value, authSource, guid) {
      this.dialog_uDelete = true;
      this.deleteJson = {'system': system, 'username': username, 'name': name, 'value': value, 'authSource': authSource, 'guid': guid};
    },
    deleteUser() {
      this.actionInitiate = 'delete';
      this.$store.dispatch('userActions/deleteUser', this.deleteJson).then(function(){
          this.dialog_uDelete = false;
          this.deleteJson = {};
      });
    },
    cancelDelete() {
      this.dialog_uDelete = false;
      this.deleteJson = {}
    },

    //find all valid systems by searching database response
    getSystems() {
      const sysArr = this.systemArray;
      (this.itemJson).forEach(function(element){
        if(!(sysArr.includes(element.system))){
          sysArr.push(element.system);
        }
      });
      this.systemArray = sysArr;
    },

    //delete actions
    deleteGroup(){
      this.actionInitiate = 'bulkDelete';
      this.dialog_uDelete = false;
      this.itemJson.foreach(function(element){
        this.deleteJson = element;
        this.deleteUser();
      });
      this.getItems();
    },
    addCsv(csvRes){
      this.actionInitiate = 'bulkAdd';
      csvRes.foreach(function(element){
        this.$store.dispatch('userActions/addUser', element).then(function(){
          this.actionStatus = true;
        });
      });
    }
  }
};
</script>
