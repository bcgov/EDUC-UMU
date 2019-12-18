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
          color="white"></v-text-field>
      </v-card-title>
    </div>
    <v-data-table
      :headers="headers"
      :items="itemJson"
      :search="search"
      :loading="isLoading"
    >
    <!-- Delete and Update actions you can perform on each row of the table -->
      <template
        v-slot:item.action="{ item }">
        <v-icon class="list_action" @click.stop="updateProxyForm(item.PROXYID, item.TARGETID, item.PROXYLEVEL, item.proxyName, item.targetName)" color="#43893e">edit</v-icon>
        <v-icon class="list_action" @click.stop="deleteForm(item.PROXYID, item.TARGETID, item.PROXYLEVEL)" color="#d93e45">delete</v-icon>
      </template>


    <!-- This slot is appended to the bottom of the table (before the footer) -->
      <template 
        v-slot:body.append>
        <tr>
          <td colspan="9">
            <v-layout row justify-center>

              <v-dialog v-model="dialog_b" persistent max-width="700px">
                <template v-slot:activator="{ on }">
                  <v-btn color="#003366" dark v-on="on">Add User Proxy</v-btn>
                </template>
                <v-form>
                <v-card>
                  <v-card-title>
                    <span><h4>Add User Proxy</h4></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-radio-group v-model="userSelect" row>
                        <v-radio color="#003366" name="userSelect" label="GUID" :value="false"></v-radio>
                        <v-radio color="#003366" name="userSelect" label="Username" :value="true"></v-radio>
                      </v-radio-group>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="addProxyInput" :disabled="userSelect" label="Proxy ID"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="addTarget" :disabled="userSelect" label="Target ID"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="addProxyNameInput" :disabled="!userSelect" label="Proxy Username"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="addTargetName" :disabled="!userSelect" label="Target Username"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="addLevel" label="Proxy Level" required></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="cancelAdd()">Close</v-btn>
                    <v-btn color="#003366" dark text @click="addProxy()">Add</v-btn>
                  </v-card-actions>
                </v-card>
                </v-form>
              </v-dialog>
            </v-layout>
          </td>
        </tr>
      </template>


    <!-- Displays in the header row of the table -->
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

    <!-- Displays when a search query returns no results -->
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>

  <!-- The dialog box for adding a proxy to the database -->
    <v-dialog v-model="dialog_pForm" persistent max-width="700px">
              <v-form>
                <v-card>
                  <v-card-title>
                    <span><h4>Update User Proxy</h4></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-radio-group v-model="userSelect" row>
                        <v-radio color="#003366" name="userSelect" label="GUID" :value="false"></v-radio>
                        <v-radio color="#003366" name="userSelect" label="Username" :value="true"></v-radio>
                      </v-radio-group>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="updateProxyInput" :disabled="userSelect" label="Proxy ID" :value="proxyInfo.PROXYID"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="updateTarget" :disabled="userSelect" label="Target ID" :value="proxyInfo.TARGETID"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="updateProxyNameInput" :disabled="!userSelect" label="Proxy Username" :value="proxyInfo.proxyName"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="updateTargetName" :disabled="!userSelect" label="Target Username" :value="proxyInfo.targetName"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="updateLevel" label="Proxy Level" required :value="proxyInfo.PROXYLEVEL"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog_pForm = false">Close</v-btn>
                    <v-btn color="#003366" dark text @click="updateProxy()">Update</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
      </v-dialog>


    <!-- The dialog box for deleting a proxy from the database -->
      <v-dialog v-model="dialog_pDelete" persistent max-width="330px">
        <v-card>
          <v-card-title>
            <span><h4>Confirm Delete</h4></span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span>Are you sure you want to delete this proxy?</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#003366" dark text @click="cancelDelete()">Cancel</v-btn>
            <v-btn color="#003366" dark text @click="deleteProxy()">Delete</v-btn>
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
export default {
  data: () => ({
    deleteJson: {},
    userSelect: false,
    statusDialog: false,
    statusMessage: '',
    dialog_pForm: false,
    dialog_b: false,
    dialog_pDelete: false,
    isLoading: true,

    guidsConverted: false,

    updateProxyInput: null,
    updateTarget: null,
    updateLevel: null,
    updateProxyNameInput: null,
    updateTargetName: null,

    addProxyInput: null,
    addTarget: null,
    addLevel: null,
    addProxyNameInput: null,
    addTargetName: null,

    valid: true,
    search: '',
    hoverA: false,
    hoverB: false,
    rules: [
      v => !!v || 'Value is required'
    ],
    headers: [
      {
        sortable: true,
        text: 'Proxy User (GUID)',
        value: 'proxyName'
      },
      {
        sortable: true,
        text: 'Target User (GUID)',
        value: 'targetName'
      },
      {
        sortable: true,
        text: 'Proxy Level',
        value: 'PROXYLEVEL'
      },
      {
        sortable: false,
        text: 'Actions',
        align: 'center',
        value: 'action'
      }
    ],
    items: [],
    guidArr: [],
    userArr: [],
    itemJson: [],
    proxyInfo: {}
  }),
  computed: {
    ...mapGetters('proxyActions', ['proxy', 'proxyAddError', 'proxyUpdateError', 'proxyDeleteError']),
    ...mapGetters('userActions', ['users'])
  },
  //Automatically fetches the table contents from the database on page load
  mounted: function() {
    this.getProxy();
  },
  methods: {
    //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },
    //retrieves table entries from the API endpoint and places them in a JSON array
    async getProxy () {
      this.items = [];
      this.itemJson = [];
      this.isLoading = true;
      await this.$store.dispatch('proxyActions/getProxy');
      const arr = await this.mapGuids(this.proxy);
      console.log(arr);
      this.itemJson = arr;
      this.isLoading = false;
    },

    //map each user GUID to a readable username
    async mapGuids(arr){
      this.$store.dispatch('userActions/getUsers').then(response => {
        arr.forEach(element => {
          if(response.find(x => x.USERGUID === element.PROXYID)){
            element.proxyName = response.find(x => x.USERGUID === element.PROXYID).USERNAME;
          }
          if(response.find(x => x.USERGUID === element.TARGETID)){
            element.targetName = response.find(x => x.USERGUID === element.TARGETID).USERNAME;
          }
        });
      });
      return arr;
    },
    //Passes information from a specific row to the Update dialog box
    updateProxyForm (proxy, target, level, proxyName, targetName) {
      this.proxyInfo = {'proxy': proxy, 'target': target, 'level': level, 'proxyName': proxyName, 'targetName': targetName};
      this.updateProxyNameInput = proxyName;
      this.updateTargetName = targetName;
      this.updateProxyInput = proxy;
      this.updateTarget = target;
      this.updateLevel = level;
      this.dialog_pForm = true;
    },
    async updateProxy(){
      let updateInfo ={};
      if(this.userSelect){
        if((this.updateProxyNameInput === null) || (this.updateTargetName === null) || (this.updateLevel === null)){
          this.statusDialog = true;
          this.statusMessage = 'All fields must have inputs';
          return;
        }
        let proxyGuid = this.usernameToGuid(this.updateProxyNameInput);
        let targetGuid = this.usernameToGuid(this.updateTargetName);
        if((proxyGuid === null) || (targetGuid === null)){
          this.statusDialog = true;
          this.statusMessage = 'Username/GUID does not exist in the database';
          return;
        } else {
          updateInfo = {'proxy': proxyGuid, 'target': targetGuid, 'level': this.updateLevel};
        }
      } else {
        if((this.updateProxyInput === null) || (this.updateTarget === null) || (this.updateLevel === null)){
          this.statusDialog = true;
          this.statusMessage = 'All fields must have inputs';
          return;
        }
        let proxyGuid = this.checkGuid(this.updateProxyInput);
        let targetGuid = this.checkGuid(this.updateTarget);
        if(!proxyGuid || !targetGuid){
          this.statusDialog = true;
          this.statusMessage = 'Username/GUID does not exist in the database';
          return;
        }
        updateInfo = {'proxy': this.updateProxyInput, 'target': this.updateTarget, 'level': this.updateLevel};
      }
      const UpdateJson = {'old': this.proxyInfo, 'new': updateInfo};
      await this.$store.dispatch('proxyActions/updateProxy', UpdateJson);
      this.statusDialog = true;
      if(this.proxyUpdateError){
        this.statusMessage = 'Unable to update proxy';
      } else {
        this.statusMessage = 'Proxy successfully updated';
      }
      this.getProxy();
      this.proxyInfo = {};
      this.dialog_pForm = false;

    },
    //Initiates the add proxy dialog box and reloads the table when proxy has been added
    async addProxy () {
      let proxyJson = {};
      if(this.userSelect){
        if((this.addProxyNameInput === null) || (this.addTargetName === null) || (this.addLevel === null)){
          this.statusDialog = true;
          this.statusMessage = 'All fields must have inputs';
          return;
        }
        let proxyGuid = this.usernameToGuid(this.addProxyNameInput);
        let targetGuid = this.usernameToGuid(this.addTargetName);
        if((proxyGuid === null) || (targetGuid === null)){
          this.statusDialog = true;
          this.statusMessage = 'Username/GUID does not exist in the database';
          return;
        } else {
          proxyJson = {'proxy': proxyGuid, 'target': targetGuid, 'level': this.addLevel};
        }
      } else {
        if((this.addProxyInput === null) || (this.addTarget === null) || (this.addLevel === null)){
          this.statusDialog = true;
          this.statusMessage = 'All fields must have inputs';
          return;
        }
        let proxyGuid = this.checkGuid(this.addProxyInput);
        let targetGuid = this.checkGuid(this.addTarget);
        if(!proxyGuid || !targetGuid){
          this.statusDialog = true;
          this.statusMessage = 'Username/GUID does not exist in the database';
          return;
        }
        proxyJson = {'proxy': this.addProxyInput, 'target': this.addTarget, 'level': this.addLevel};
      }
      this.dialog_b = false;
      await this.$store.dispatch('proxyActions/addProxy', proxyJson);
      this.statusDialog = true;
      if(this.proxyAddError){
        this.statusMessage = 'Unable to add proxy';
      } else {
        this.statusMessage = 'Proxy successfully added';
      }
      this.addProxyNameInput = null;
      this.addTargetName = null;
      this.addLevel = null;
      this.addProxyInput = null;
      this.addTarget = null;
      this.getProxy();
    },
    cancelAdd(){
      this.addProxyNameInput = null;
      this.addTargetName = null;
      this.addLevel = null;
      this.addProxyInput = null;
      this.addTarget = null;
      this.dialog_b = false;
    },
    //initiates the proxy delete function
    deleteForm(proxy, target, level){
      this.dialog_pDelete = true;
      this.deleteJson = {'proxy': proxy, 'target': target, 'level': level};
    },
    async deleteProxy() {
      console.log(this.deleteJson);
      await this.$store.dispatch('proxyActions/deleteProxy', this.deleteJson);
      this.statusDialog = true;
      if(this.proxyDeleteError){
        this.statusMessage = 'Unable to delete proxy';
      } else {
        this.statusMessage = 'Proxy successfully deleted';
      }
      this.dialog_pDelete = false;
      this.getProxy();
      this.deleteJson = {};
    },
    cancelDelete() {
      this.dialog_pDelete = false;
      this.deleteJson = {};
    },
    usernameToGuid(userInput) {
      let returnValue = null;
      (this.users).forEach(element => {
        if(userInput == element.USERNAME){
          returnValue = element.USERGUID;
        }
      });
      return returnValue;
    },
    checkGuid(guidInput) {
      let returnValue = false;
      (this.users).forEach(element => {
        if(guidInput == element.USERGUID){
          returnValue = true;
        }
      });
      return returnValue;
    }
  }
};
</script>
