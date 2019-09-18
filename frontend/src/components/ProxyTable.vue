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

    <template v-slot:item.proxyName="{ item }">
      {{ item.proxyName + ' (' + item.proxy + ')' }}
    </template>
    <template v-slot:item.targetName="{ item }">
      {{ item.targetName + ' (' + item.target + ')' }}
    </template>
    <!-- Delete and Update actions you can perform on each row of the table -->
      <template
        v-slot:item.action="{ item }">
        <v-icon class="list_action" @click.stop="updateProxyForm(item.proxy, item.target, item.level, item.proxyName, item.targetName)" color="#003366">edit</v-icon>
        <v-icon class="list_action" @click.stop="deleteForm(item.proxy, item.target, item.level)" color="#003366">delete</v-icon>
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
                          <v-text-field :disabled="userSelect" label="Proxy ID"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field :disabled="userSelect" label="Target ID"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field ref="addProxy" :disabled="!userSelect" label="Proxy Username"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field ref="addTarget" :disabled="!userSelect" label="Target Username"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field ref="addLevel" label="Proxy Level" required></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog_b = false">Close</v-btn>
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
                          <v-text-field :disabled="userSelect" label="Proxy ID" :value="proxyInfo.proxy"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field :disabled="userSelect" label="Target ID" :value="proxyInfo.target"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field ref="updateProxy" :disabled="!userSelect" label="Proxy Username" :value="proxyInfo.proxyName"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field ref="updateTarget" :disabled="!userSelect" label="Target Username" :value="proxyInfo.targetName"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field ref="updateLevel" label="Proxy Level" required :value="proxyInfo.level"></v-text-field>
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    deleteJson: {},
    userSelect: false,
    actionStatus: true,
    actionInitiate: '',
    dialog_pForm: false,
    dialog_b: false,
    dialog_pDelete: false,
    isLoading: true,
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
        value: 'level'
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
    ...mapGetters('proxyActions', ['proxy']);
  },
  //Automatically fetches the table contents from the database on page load
  mounted: function() {
    this.getProxy()
  },
  methods: {
    //validates forms
    validate () {
      if (this.$refs.form.validate()){
        this.snackbar=true;
      }
    },
    //retrieves table entries from the API endpoint and places them in a JSON array
    getProxy () {
      this.items = [];
      this.itemJson = [];
      this.isLoading = true;
      this.$store.dispatch('proxyActions/getProxy').then(response => {
        if(response === 500){
          return [];
        } else {
          return this.mapGuids(this.proxy);
        }
      }).then(response => {
        this.itemJson = response;
        this.isLoading = false;
      })
    },

    //map each user GUID to a readable username
    async mapGuids(arr){
      this.$store.dispatch('userActions/getUsers').then(response => {
        arr.forEach(element => {
          if(response.find(x => x.guid === element.proxy)){
            element.proxyName = response.find(x => x.guid === element.proxy).username;
          }
          if(response.find(x => x.guid === element.target)){
            element.targetName = response.find(x => x.guid === element.target).username;
          }
        });
      });
      return arr;
    },
    //Passes information from a specific row to the Update dialog box
    updateProxyForm (proxy, target, level, proxyName, targetName) {
      this.proxyInfo = {'proxy': proxy, 'target': target, 'level': level, 'proxyName': proxyName, 'targetName': targetName};
      this.dialog_pForm = true;
    },
    updateProxy(){
      const updateJson = {'proxy': this.$refs.updateProxy, 'target': this.$refs.updateTarget, 'level': this.$refs.updateLevel};
      this.$store.dispatch('proxyActions/updateProxy', updateJson).then(response => {
        if(response != 500){
          this.getProxy();
          this.proxyInfo = {};
          this.dialog_pForm = false;
        }
      });
    },
    //Initiates the add proxy dialog box and reloads the table when proxy has been added
    addProxy () {
      const proxyJson = {'proxy': this.$refs.addProxy, 'target': this.$refs.addTarget, 'level': this.$refs.addLevel};
      this.dialog_b = false;
      this.actionInitiate = 'add';
      this.$store.dispatch('proxyActions/addProxy', proxyJson).then(response => {
        if(response === 500){
          this.actionStatus = false;
        } else {
          this.actionStatus = true;
        }
      });
      this.getProxy();
    },
    //initiates the proxy delete function
    deleteForm(proxy, target, level){
      this.dialog_pDelete = true;
      this.deleteJson = {'proxy': proxy, 'target': target, 'level': level};
    },
    deleteProxy() {
      this.actionInitiate = 'delete';
      this.$store.dispatch('proxyActions/deleteProxy', this.deleteJson).then(response => {
        if(response === 500){
          this.actionStatus = false;
        } else {
          this.actionStatus = true;
        }
      });
      this.dialog_pDelete = false;
      this.deleteJson = {}
    },
    cancelDelete() {
      this.dialog_pDelete = false;
      this.deleteJson = {};
    }
  }
};
</script>
