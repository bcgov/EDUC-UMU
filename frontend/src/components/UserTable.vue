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
                @click="deleteUser('Are you sure you want to delete all entries with this username?')"
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
            <v-btn color="#003366" @click="dialog_a = true" dark v-on="on">Add Auth User</v-btn>
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
                            <v-select label="System" :items="systemArray" :readonly="groupOpen" required></v-select>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field label="Username" name="username" :readonly="groupOpen" :value="usernameArr[0].username" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Name" name="name" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Value" name="value"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Auth Source" name="auth" :readonly="groupOpen" :value="usernameArr[0].authSource" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="User GUID" name="guid" :readonly="groupOpen" :value="usernameArr[0].guid" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="#003366" dark text @click="dialog_a = false">Close</v-btn>
                      <v-btn color="#003366" dark text @click="addUser()">Add</v-btn>
                      <v-file-input chips multiple label="Add CSV File"></v-file-input>
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
          <v-btn icon class="list_action" @click.stop="deleteUser('Are you sure you want to delete this user?')" color="#d93e45"><v-icon>delete</v-icon></v-btn>
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
                            <v-select :items="systemArray" label="System"></v-select>
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
            <v-btn color="#003366" dark text @click="dialog_uDelete = false">Cancel</v-btn>
            <v-btn color="#003366" dark text @click="dialog_uDelete = false">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import axios from 'axios';

export default{
  data: () =>  ({
      usernameGroup: '',
      usernameArr: [
        {"system": '', "username": '', "guid": '', "authSource": ''}
      ],
      tempArray: [],
      roleArray: [],
      systemArray: [],
      fab: false,
      groupOpen: false,
      dialog_a: false,
      deleteMessage: '',
      dialog_uForm: false,
      dialog_uDelete: false,
      isLoading: false,
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
      itemJson: [
        {"system": "EDW","username": "NDenny","name": "lkfsdjafs", "value": "sdgjhndffsd", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 1 },
        {"system": "EDW","username": "NDenny","name": "sdfsad", "value": "sdfasdf", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 3 },
        {"system": "EDW","username": "SShaw","name": "ntw3462nwer", "value": "nqertnwern", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 18 },
        {"system": "EDW","username": "NDenny","name": "gfdagdfe", "value": "hgj5effa", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 5 },
        {"system": "EDW","username": "PHolland","name": "54fq34yu", "value": "23589yht9", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 6 },
        {"system": "EDW","username": "PHolland","name": "refgwe54tui90", "value": "afwer2nn54", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 7 },
        {"system": "EDW","username": "PHolland","name": "qv3jhun34", "value": "q4tv", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 8 },
        {"system": "EDW","username": "NDenny","name": "sdfsdfas", "value": "wefaweff", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 4 },
        {"system": "EDW","username": "PHolland","name": "nwh456", "value": "25yn4nwertwb", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 9 },
        {"system": "EDW","username": "PHolland","name": "qwbtqtret", "value": "wetbrtbwertt34", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 10 },
        {"system": "EDW","username": "TRankin","name": "4tbbq4t", "value": "qetbrbbt", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 11 },
        {"system": "EDW","username": "NDenny","name": "dfgagfasdf", "value": "sadfsdfs", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 2 },
        {"system": "EDW","username": "TRankin","name": "436bbqwrtbrbe", "value": "yjumsea", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 12 },
        {"system": "EDW","username": "TRankin","name": "34tbw34bg", "value": "weby6um3", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 14 },
        {"system": "EDW","username": "TRankin","name": "b3wtwtbwer", "value": "btrnurnrew", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 15 },
        {"system": "EDW","username": "SShaw","name": "n625nwerv", "value": "wbtrt324n62", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 16 },
        {"system": "EDW","username": "SShaw","name": "rewtn34n63", "value": "wernt3562", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 17 },
        {"system": "EDW","username": "TRankin","name": "vqwe5qvfmhjf", "value": "mjrtyw45", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 13 },
        {"system": "EDW","username": "SShaw","name": "wernt66546", "value": "wnt43626n2n", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 19 },
        {"system": "EDW","username": "SShaw","name": "nt3w6562", "value": "n265462ewtn", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 20 }
      ],
      items: [],
      userInfo: {}
  }),

  //automatically populates the table on page load
  mounted(){
    this.getSystems();
    //this.getItems();
  },
  methods: {
    //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },
    resetUsername(){
      this.groupOpen = false;
      this.usernameArr = [{"system": '', "username": '', "guid": '', "authSource": ''}];
      this.usernameGroup = '';
      this.itemJson = this.tempArray;
    },
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
      this.items = [];
      this.itemJson = [];
      this.isLoading = true;
      axios.get('/api/main/database/users').then(response => {
        this.items = response.data;
        this.isLoading = false;
        var tempArray = this.items;
        var tempJson = [];
        tempArray.forEach(function(element, index){
          tempJson.push({'system': element[0], 'username': element[1], 'name': element[2], 'value': element[3], 'authSource': element[4], 'guid': element[5], 'create': element[6], 'createDate': element[7], 'update': element[8], 'updateDate': element[9], 'id': index});
        });
        this.itemJson = tempJson;
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
    //initiates the add user dialog box and reloads the table once the user has been added
    addUser() {
      this.dialog_a = false;
      this.dialog_uForm = false;
      this.getItems();
    },
    //initiates the delete user dialog box
    deleteUser(message) {
      this.deleteMessage = message;
      this.dialog_uDelete = true;
    },
    getSystems() {
      const sysArr = this.systemArray;
      (this.itemJson).forEach(function(element){
        if(sysArr.includes(element.system)){
          sysArr.push(element.system);
        }
      });
      this.systemArray = sysArr;
    }/*
    deleteGroup(){
      
    }*/
  }
};
</script>
