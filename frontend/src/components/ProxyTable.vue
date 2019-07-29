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
      >

      <template v-slot:no-data>
        <div class='text-xs-center'>
          <v-progress-circular color="#003366" indeterminate></v-progress-circular>
        </div>
      </template>

      <template slot="headerCell" slot-scope="props">

      </template>

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

      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>
      <template
        slot="item"
        slot-scope="props">
        <tr>
          <td>{{ props.item[0] }}</td>
          <td>{{ props.item[1] }}</td>
          <td>{{ props.item[2] }}</td>
          <td class="button-container" align="center">
            <v-btn class="no-shadow" @click.stop="updateProxyForm(props.item[0], props.item[1], props.item[2])" color="transparent"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></v-btn>
            <v-btn class="no-shadow" color="transparent"><i class="fas fa-trash-alt fa-lg" style="color:#d93e45"></i></v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
    <!--<div class="text-xs-center pt-2">
      <v-btn color="#5475a7"><span class="white--text"><i class="fas fa-user-plus" style="color:white"></i>&nbsp;Add User</span></v-btn>
    </div>-->
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
  </v-card>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            dialog_pForm: false,
            dialog_b: false,
            isLoading: true,
            valid: true,
            search: '',
            rules: [
              v => !!v || 'Value is required'
            ],
            headers: [
                {
                    sortable: true,
                    text: 'Proxy ID',
                    value: 'proxy'
                },
                {
                    sortable: true,
                    text: 'Target ID',
                    value: "target"
                },
                {
                  sortable: true,
                  text: 'Proxy Level',
                  value: "level"
                },
                {
                  sortable: false,
                  text: 'Edit'
                }
            ],
            items: [],
            itemJson: [],
            proxyInfo: {}
        }),
        mounted: function() {
          this.getProxy();
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            },
            getProxy () {
              this.items = [];
              this.itemJson = [];
              axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/proxy").then(response => {
                this.items = response.data;
                this.isLoading=false;
                var tempArray = this.items;
                var jsonArray = [];
                tempArray.forEach(function(element, index){
                  jsonArray.push({"proxy": element[0], "target": element[1], "level": element[2]});
                });
                this.itemJson = jsonArray;
              });
            },
            updateProxyForm (proxy, target, level) {
              this.proxyInfo = {"proxy": proxy, "target": target, "level": level};
              this.dialog_pForm = true;
            },
            addProxy () {
              this.dialog_b = false;
              this.dialog_pForm = false;
              this.getProxy();
            }
        }
    };
</script>
