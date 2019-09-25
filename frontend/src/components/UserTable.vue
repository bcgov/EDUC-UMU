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
                        <v-row>
                          <v-col>
                            <v-select v-model="addSystem" label="System" :items="systemArray" :readonly="groupOpen" :value="usernameArr[0].system" required></v-select>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="addUsername" label="Username" name="username" :readonly="groupOpen" :value="usernameArr[0].username" required></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select v-model="addName" :items="nameOptions" label="Name" name="name" required></v-select>
                          </v-col>
                          <v-col>
                            <v-select v-if="addName === 'ROLES'" v-model="addValue" label="Value" name="value" :items="roleList" required></v-select>
                            <v-select v-else-if="addName === 'EDW_MASKING_USER_DISTRICT'" v-model="addValue" label="Value" name="value" :items="districtList" required></v-select>
                            <v-select v-else-if="addName === 'EDW_MASKING_USER_SCHOOL'" v-model="addValue" label="Value" name="value" :items="schoolList" required></v-select>
                            <v-text-field v-else v-model="addValue" label="Value" name="value"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-select v-model="addAuth" :items="authSources" label="Auth Source" name="auth" :value="usernameArr[0].authSource" :readonly="groupOpen" required></v-select>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="addGuid" label="User GUID" name="guid" :readonly="groupOpen" :value="usernameArr[0].guid" required></v-text-field>
                          </v-col>
                        </v-row>

                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="cancelAdd()">Close</v-btn>
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
                        <v-row>
                          <v-col>
                            <v-select v-model="updateSystem" :items="systemArray" :value="userInfo.system" name="system" label="System"></v-select>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="updateUsername" label="Username" name="username" :value="userInfo.username" required></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select v-model="updateName" label="Name" name="name" :value="userInfo.name" :items="nameOptions" required></v-select>
                          </v-col>
                          <v-col>
                            <v-select v-if="updateName === 'ROLES'" v-model="updateValue" label="Value" name="value" :value="userInfo.value" :items="roleList" required></v-select>
                            <v-select v-else-if="updateName === 'EDW_MASKING_USER_DISTRICT'" v-model="updateValue" label="Value" name="value" :value="userInfo.value" :items="districtList" required></v-select>
                            <v-select v-else-if="updateName === 'EDW_MASKING_USER_SCHOOL'" v-model="updateValue" label="Value" name="value" :value="userInfo.value" :items="schoolList" required></v-select>
                            <v-text-field v-else v-model="updateValue" label="Value" name="value" :value="userInfo.value"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-select v-model="updateAuth" label="Auth Source" :items="authSources" name="auth" required></v-select>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="updateGuid" label="User GUID" name="guid" :value="userInfo.guid" required></v-text-field>
                          </v-col>
                        </v-row>
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
                  <span>{{ deleteMessage }}</span>
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
      <v-dialog v-model="statusDialog" persistent max-width="320px">
        <v-card class="textOnlyCard">
          <v-card-text>

            {{ statusMessage }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="#003366" dark text @click="statusDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import { DownloadRoutes, FormLists, ApiRoutes } from '@/utils/constants';
import { mapGetters } from 'vuex';
import axios from 'axios';
export default{
  data: () =>  ({
      csvRoute: DownloadRoutes.CSV,
      usernameGroup: '',
      statusDialog: false,
      statusMessage: "",
      deleteMessage: "",

      roleList: [],
      districtList: FormLists.SCHOOL_DISTRICTS,
      schoolList: FormLists.SCHOOLS,
      nameOptions: FormLists.NAME_OPTIONS,
      authSources: [],


      bulkAdd: false,
      bulkDelete:false,

      updateSystem: null,
      updateUsername: null,
      updateName: null,
      updateValue: null,
      updateAuth: null,
      updateGuid: null,

      addSystem: null,
      addUsername: null,
      addName: null,
      addValue: null,
      addAuth: null,
      addGuid: null,

      usernameArr: [
        {"system": '', "username": '', "guid": '', "authSource": ''}
      ],
      tempArray: [],
      systemArray: [],
      groupOpen: false,
      dialog_a: false,
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
    ...mapGetters('userActions', ['users', 'userAddError', 'userUpdateError', 'userDeleteError']),
    ...mapGetters('roleActions', ['roles'])
  },
  mounted: async function(){
    await this.getAuth();
    this.getItems();
    const list = [];
    await this.$store.dispatch('roleActions/getRoles');
    (this.roles).forEach( async element => {
      if(!((list).includes(element.role))){
        list.push(element.role);
      }
    });
    this.roleList = list;
  },

  methods: {
    //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },

    async getAuth(){
      const auths = await axios.get(ApiRoutes.AUTH_SOURCES);
      console.log(auths.data.array);
      this.authSources = auths.data.array;
    },
    //remove the user group that is currently selected
    resetUsername(){
      this.groupOpen = false;
      this.usernameArr = [{"system": '', "username": '', "guid": '', "authSource": ''}];
      this.usernameGroup = '';
      this.addSystem = null;
      this.addUsername = null;
      this.addAuth = null;
      this.addGuid = null;
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
        this.addSystem = this.itemJson[0].system;
        this.addUsername = this.itemJson[0].username;
        this.addAuth = this.itemJson[0].authSource;
        this.addGuid = this.itemJson[0].guid;
      }
    },

    //retrieves users from the API endpoint and puts them into a JSON array
    async getItems () {
      this.isLoading = true;
      this.resetUsername();
      await this.$store.dispatch('userActions/getUsers');
      this.itemJson = this.users;
      this.getSystems();
      this.isLoading = false;
    },
    /*
    submitUser () {
      userForm.submit().then(dialog_a = false);
    },*/

    //Passes information from a specific row in the table to the Update user form
    updateUserForm(system, username, name, value, auth, guid) {
      this.updateSystem = system;
      this.updateUsername = username;
      this.updateName = name;
      this.updateValue = value;
      this.updateAuth = auth;
      this.updateGuid = guid;
      this.userInfo = {'system': system, 'username': username, 'name': name, 'value': value, 'auth': auth, 'guid': guid};
      this.dialog_uForm = true;
    },
    async updateUser(){
      const updateInfo = {'system': this.updateSystem, 'username': this.updateUsername, 'name': this.updateName, 'value': this.updateValue, 'authSource':this.updateAuth, 'guid':this.updateGuid };
      const UpdateJson = {'old': this.userInfo, 'new': updateInfo};
      await this.$store.dispatch('userActions/updateUser', UpdateJson);
      this.statusDialog = true;
      if(this.userAddError){
        this.statusMessage = "Unable to update item";
      } else {
        this.statusMessage = "Item successfully updated"
      }
      this.getItems();
      this.userInfo = {};
      this.dialog_uForm = false;
    },

    //initiates the add user dialog box and reloads the table once the user has been added
    async addUser() {
      if((this.addSystem === null) || (this.addUsername === null) || (this.addName === null) || (this.addValue === null) || (this.addAuth === null) || (this.addGuid === null)){
        this.statusDialog = true;
        this.statusMessage = "All fields must have inputs";
        return;
      }
      const userJson = {'system': this.addSystem, 'username': this.addUsername, 'name': this.addName, 'value': this.addValue, 'authSource': this.addAuth, 'guid': this.addGuid};
      await this.$store.dispatch('userActions/addNewUser', userJson);
      this.statusDialog = true;
      if(this.userAddError){
        this.statusMessage = "Unable to add item";
      } else {
        this.statusMessage = "Item successfully added";
      }
      this.addSystem = null;
      this.addUsername = null;
      this.addName = null;
      this.addValue = null;
      this.addAuth = null;
      this.addGuid = null;
      this.getItems();
      this.dialog_a = false;
    },
    cancelAdd(){
      this.addSystem = null;
      this.addUsername = null;
      this.addName = null;
      this.addValue = null;
      this.addAuth = null;
      this.addGuid = null;
      this.dialog_a = false;
    },

    //initiates the delete user dialog box
    deleteForm(system, username, name, value, authSource, guid) {
      this.deleteMessage = "Are yyou sure you want to delete this item?";
      this.dialog_uDelete = true;
      this.deleteJson = {'system': system, 'username': username, 'name': name, 'value': value, 'authSource': authSource, 'guid': guid};
    },
    async deleteUser() {
      if(!(this.bulkDelete)){
        await this.$store.dispatch('userActions/deleteUser', this.deleteJson);
        this.statusDialog = true;
        if(this.userDeleteError){
          this.statusMessage = "Unable to delete item";
        } else {
          this.statusMessage = "Item successfully deleted"
        }
      } else {
        (this.itemJson).forEach(async element => {
          await this.$store.dispatch('userActions/deleteUser', element);
        });
        this.statusDialog = true;
        this.statusMessage = "Username Group successfully deleted";
      }
      this.dialog_uDelete = false;
      this.deleteJson = {};
      this.resetUsername();
      this.getItems();
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
      this.dialog_uDelete = false;
      this.bulkDelete = true;
      this.deleteMessage = "Are you sure you want to delete all entries with this username?"
      this.dialog_uDelete = true;
    },
    async addCsv(csvRes){
      csvRes.forEach(async function(element){
        await this.$store.dispatch('userActions/addNewUser', element);
      });
    }
  }
};
</script>
