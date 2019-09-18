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
                          <v-select :items="systemArray" label="System" ref="addSystem" required></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field label="Application Role" ref="addRole" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog_c = false">Close</v-btn>
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
              <v-icon class="list_action" @click.stop="updateRoleForm(item.system, item.role)" color="#003366">edit</v-icon>
              <v-icon class="list_action" @click="deleteRole(item.system, item.role)" color="#003366">delete</v-icon>
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
                          <v-select :items="systemArray" label="System" ref="updateSystem" :value="roleInfo.system" required></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field label="Application Role" ref="updateRole" :value="roleInfo.role" required></v-text-field>
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
  data: () => ({
    deleteJson: {},
    dialog_c: false,
    dialog_rForm: false,
    dialog_rDelete: false,
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
        text: 'Application Role',
        value: 'role'
      },
      {
        sortable: true,
        text: 'Created By',
        value: 'create'
      },
      {
        sortable: true,
        text: 'Create Date',
        value: 'createDate'
      },
      {
        sortable: true,
        text: 'Updated By',
        value: 'update'
      },
      {
        sortable: true,
        text: 'Update Date',
        value: 'updateDate'
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
    ...mapGetters('roleActions', ['roles'])
  },
  mounted: function() {
    this.getRoles()
  },
  methods: {
  //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },
    //retrieve roles from the API endpoint
    getRoles () {
      this.isLoading = true;
      this.items = [];
      this.itemJson = [];
      this.$store.dispatch('roleActions/getRoles').then(response => {
        if(response === 500){
          this.itemJson = [];
          this.isLoading = false;
        } else {
          this.itemJson = this.roles;
          this.getSystems();
          this.isLoading = false;
        }
      });
    },
    getSystems() {
      const sysArr = [];
      (this.itemJson).forEach(function(element){
        if(!(sysArr.includes(element.system))){
          sysArr.push(element.system);
        }
      });
      this.systemArray = sysArr;
    },
    //Passes information from a specific row to the Update form
    updateRoleForm (system, role) {
      this.roleInfo = {'system': system, 'role': role};
      this.dialog_rForm = true;
    },
    updateRole() {
      const roleInfo = {'system': this.$refs.updateSystem, 'role': this.$refs.updateRole};
      this.$store.dispatch('roleActions/updateRole', roleInfo).then(response => {
        if(response === 500){
          this.dialog_rForm = false;
          this.getRoles();
        }
      });
      this.roleInfo = {};
    },
    //Adds a role to the database then refreshes the table
    addRole () {
      const roleInfo = {'system': this.$refs.addSystem, 'role': this.$refs.addRole};
      this.dialog_c = false;
      this.$store.dispatch('roleActions/addRole', roleInfo).then(response => {
        if(response != 500){
          this.getRoles();
        }
      });
    },
    //Deletes a role from the database
    deleteForm(system, role) {
      this.deleteJson = {'system': system, 'role': role};
      this.dialog_rDelete = true;
    },
    deleteRole() {
      this.$store.dispatch('roleActions/deleteRole', this.deleteJson).then(response => {
        if(response === 500){
          this.itemJson = [];
        }
      });
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
