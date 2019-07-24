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
      :items="items"
      :search="search"
      >

      <template v-if="isLoading" v-slot:no-data>
        <div class='text-xs-center'>
          <v-progress-circular color="#003366" indeterminate></v-progress-circular>
        </div>
      </template>
      <template v-else v-slot:no-data>
        <div class='text-xs-center'>
          <h2>Unable to retrieve data</h2>
        </div>
      </template>

      <template slot="headerCell" slot-scope="props">

      </template>
      <template
        slot="headerCell"
        slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"/>
      </template>
      <template
        slot="items"
        slot-scope="props">
        <td>{{ props.item[0] }}</td>
        <td>{{ props.item[1] }}</td>
        <td>{{ props.item[2] }}</td>
        <td align="center"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
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
  </v-card>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            isLoading: true,
            valid: true,
            search: '',
            rules: [
              v => !!v || 'Value is required'
            ],
            headers: [
                {
                    sortable: true,
                    text: 'Proxy ID'
                },
                {
                    sortable: true,
                    text: 'Target ID'
                },
                {
                  sotable: false,
                  text: 'Proxy Level'
                }
            ],
            items: []
        }),
        mounted: function() {
          axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/proxy").then(response => {this.items = response.data; this.isLoading=false});
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            }
        }
    };
</script>