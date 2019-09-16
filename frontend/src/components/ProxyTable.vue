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
        <v-icon class="list_action" @click.stop="updateProxyForm(item.proxy, item.target, item.level)" color="#003366">edit</v-icon>
        <v-icon class="list_action" @click.stop="deleteProxy()" color="#003366">delete</v-icon>
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
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Proxy ID" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Target ID" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Proxy Level" required></v-text-field>
                        </v-flex>
                      </v-layout>
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

    <template v-slot:item.proxyName>
      {{ item.proxyName + '(' + item.proxy + ')' }}
    </template>
    <template v-slot:item.targetName>
      {{ item.targetName + '(' + item.target + ')' }}
    </template>

  <!-- The dialog box for adding a proxy to the database -->
    <v-dialog v-model="dialog_pForm" persistent max-width="700px">
              <v-form>
                <v-card>
                  <v-card-title>
                    <span><h4>Update User Proxy</h4></span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Proxy ID" :value="proxyInfo.proxy" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Target ID" required :value="proxyInfo.target"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Proxy Level" required :value="proxyInfo.level"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog_pForm = false">Close</v-btn>
                    <v-btn color="#003366" dark text @click="addProxy()">Update</v-btn>
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
            <v-btn color="#003366" dark text @click="dialog_pDelete = false">Cancel</v-btn>
            <v-btn color="#003366" dark text @click="dialog_pDelete = false">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
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
        text: 'Proxy User',
        value: 'proxyName'
      },
      {
        sortable: true,
        text: 'Target User',
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
  //Automatically fetches the table contents from the database on page load
  mounted: async function() {
    this.$store.dispatch('proxyActions/getProxy').then(response => {
      if(response === 500){
          this.itemJson = [];
        } else {
          this.itemJson =  await this.mapGuids(response);
          this.isLoading = false;
        }
    })
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
      this.$store.dispatch('proxyActions/getProxy').then(response => {
        if(response === 500){
          this.itemJson = [];
        } else {
          this.itemJson = await this.mapGuids(response);
          this.isLoading = false;
        }
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
    updateProxyForm (proxy, target, level) {
      this.proxyInfo = {'proxy': proxy, 'target': target, 'level': level};
      this.dialog_pForm = true;
    },
    //Initiates the add proxy dialog box and reloads the table when proxy has been added
    addProxy () {
      this.dialog_b = false;
      this.dialog_pForm = false;
      this.getProxy();
    },
    //initiates the proxy delete function
    deleteProxy() {
      this.dialog_pDelete = true;
    }
  }
};
</script>
