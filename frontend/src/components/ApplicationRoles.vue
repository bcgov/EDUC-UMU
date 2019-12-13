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
      :loading="isLoading"
    >

    <!-- Displays as the final row of the table -->
      <template 
        v-slot:body.append>
        <tr>
          <td colspan="7">
            <v-layout row justify-center>
              <v-dialog v-model="dialog_c" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="#003366" dark v-on="on">Add System Role</v-btn>
                </template>
                <v-form>
                <v-card>
                  <v-card-title>
                    <span><h4>Add System Role</h4></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-select :items="systemArray" label="System" v-model="addSystem" required></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field label="Application Role" v-model="addRoleInput" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="cancelAdd()">Close</v-btn>
                    <v-btn color="#003366" dark text @click="addRole()">Add</v-btn>
                  </v-card-actions>
                </v-card>
                </v-form>
              </v-dialog>
            </v-layout>
          </td>
        </tr>
      </template>


    <!-- The actions you can take on any row of the table -->
      <template
        v-slot:item.action="{ item }">
              <v-icon class="list_action" @click.stop="updateRoleForm(item.SYSTEM, item.APPLICATION_ROLE)" color="#43893e">edit</v-icon>
              <v-icon class="list_action" @click="deleteForm(item.SYSTEM, item.APPLICATION_ROLE)" color="#d93e45">delete</v-icon>
      </template>


    <!-- How the header is displayed -->
      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>


  <!-- Displays when search query returns no results -->
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>

    <template
        v-slot:no-data
      >
        <p>Unable to retrieve data from database.</p>
    </template>

  <!-- Pop-up to add role -->
    <v-dialog v-model="dialog_rForm" persistent max-width="700px">
              <v-form>
                <v-card>
                  <v-card-title>
                    <span><h4>Update System Role</h4></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-select :items="systemArray" label="System" v-model="updateSystem" :value="roleInfo.SYSTEM" required></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field label="Application Role" v-model="updateRoleInput" :value="roleInfo.APPLICATION_ROLE" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog_rForm = false">Close</v-btn>
                    <v-btn color="#003366" dark text @click="updateRole()">Update</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
      </v-dialog>


    <!-- Dialog that deletes a role from the database -->
      <v-dialog v-model="dialog_rDelete" persistent max-width="320px">
        <v-card>
          <v-card-title>
            <span><h4>Confirm Delete</h4></span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span>Are you sure you want to delete this role?</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#003366" dark text @click="cancelDelete()">Cancel</v-btn>
            <v-btn color="#003366" dark text @click="deleteRole()">Delete</v-btn>
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
import { mapGetters } from 'vuex';
export default{
  data: () => ({
    loggedInUser: null,
    statusDialog: false,
    statusMessage: '',
    deleteJson: {},
    dialog_c: false,
    dialog_rForm: false,
    dialog_rDelete: false,
    oldRoleData: {},
    isLoading: true,
    valid: true,
    hoverA: false,
    hoverB: false,
    search: '',

    updateRoleInput: null,
    updateSystem: null,

    addRoleInput: null,
    addSystem: null,

    rules: [
      v => !!v || 'Required'
    ],
    headers: [
      {
        sortable: true,
        text: 'System',
        value: 'SYSTEM'
      },
      {
        sortable: true,
        text: 'Application Role',
        value: 'APPLICATION_ROLE'
      },
      {
        sortable: true,
        text: 'Created By',
        value: 'CREATE_BY'
      },
      {
        sortable: true,
        text: 'Create Date',
        value: 'CREATE_DATE'
      },
      {
        sortable: true,
        text: 'Updated By',
        value: 'UPDATE_BY'
      },
      {
        sortable: true,
        text: 'Update Date',
        value: 'UPDATE_DATE'
      },
      {
        sortable: false,
        text: 'Actions',
        align: 'center',
        value: 'action'
      }
    ],
    items: [],
    systemArray: [],
    itemJson: [],
    roleInfo: {}
  }),
  computed: {
    ...mapGetters('roleActions', ['roles', 'roleAddError', 'roleUpdateError', 'roleDeleteError'])
  },
  mounted: function() {
    this.loggedInUser = this.$store.dispatch('auth/getUser');
    this.getRoles();
  },
  methods: {
  //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },
    //retrieve roles from the API endpoint
    async getRoles () {
      this.isLoading = true;
      this.items = [];
      this.itemJson = [];
      await this.$store.dispatch('roleActions/getRoles');
      this.itemJson = this.roles;
      this.getSystems();
      this.isLoading = false;
    },
    getSystems() {
      const sysArr = [];
      (this.itemJson).forEach(function(element){
        if(!(sysArr.includes(element.SYSTEM))){
          sysArr.push(element.SYSTEM);
        }
      });
      this.systemArray = sysArr;
    },
    //Passes information from a specific row to the Update form
    updateRoleForm (system, role) {
      this.roleInfo = {'system': system, 'role': role};
      this.oldRoleData = {'system': system, 'role': role};
      this.updateSystem = system;
      this.updateRoleInput = role;
      this.dialog_rForm = true;
    },
    async updateRole() {
      if((this.updateSystem === null) || (this.updateRoleInput === null)){
        this.statusDialog = true;
        this.statusMessage = 'All fields must have inputs';
      }
      const roleInfo = {'system': this.updateSystem, 'role': this.updateRoleInput, 'updateUser': this.loggedInUser};
      const UpdateJson = {'old': this.oldRoleData, 'new': roleInfo};
      await this.$store.dispatch('roleActions/updateRole', UpdateJson);
      this.statusDialog = true;
      if(this.roleUpdateError){
        this.statusMessage = 'Unable to update role';
      } else {
        this.statusMessage = 'Role successfully updated';
      }
      this.dialog_rForm = false;
      this.updateSystem = null;
      this.updateRoleInput = null;
      this.getRoles();
      this.roleInfo = {};
    },
    //Adds a role to the database then refreshes the table
    async addRole () {
      if((this.addSystem === null) || (this.addRoleInput === null)){
        this.statusDialog = true;
        this.statusMessage = 'All fields must have inputs';
      }
      const roleInfo = {'system': this.addSystem, 'role': this.addRoleInput, 'userAdd': this.loggedInUser};
      this.dialog_c = false;
      await this.$store.dispatch('roleActions/addRole', roleInfo);
      this.statusDialog = true;
      if(this.roleAddError){
        this.statusMessage = 'Unable to add role';
      } else {
        this.statusMessage = 'Role successfully added';
      }
      this.addSystem = null;
      this.addRoleInput = null;
      this.getRoles();
    },
    cancelAdd(){
      this.addSystem = null;
      this.addRoleInput = null;
      this.dialog_c = false;
    },
    //Deletes a role from the database
    deleteForm(system, role) {
      this.deleteJson = {'system': system, 'role': role};
      this.dialog_rDelete = true;
    },
    async deleteRole() {
      await this.$store.dispatch('roleActions/deleteRole', this.deleteJson);
      this.statusDialog = true;
      if(this.roleDeleteError){
        this.statusMessage = 'Unable to delete role';
      } else {
        this.statusMessage = 'Role successfully deleted';
      }
      this.dialog_rDelete = false;
      this.getRoles();
    },
    cancelDelete() {
      this.deleteJson = {};
      this.dialog_rDelete = false;
    }
  }
};
</script>
