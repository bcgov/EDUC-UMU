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
      hide-actions>
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
        slot-scope="{ item }">
        <td>{{ item.proxy }}</td>
        <td>{{ item.target }}</td>
        <td>{{ item.level }}</td>
        <td align="center"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      <template slot="footer">
        <td>
          <v-text-field label="Proxy ID"
            :rules="v => !!v || 'Proxy ID is required'"
            required
          ></v-text-field>
        </td>

        <td>
          <v-text-field label="Target ID"
            :rules="v => !!v || 'Target ID is required'"
            required
          ></v-text-field>
        </td>

        <td align="center"><v-btn :disabled="!valid" @click="validate"><i class="fas fa-plus fa-lg hover-change" style="color:#003366"></i></v-btn></td>
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
    export default {
        data: () => ({
            search: '',
            headers: [
                {
                    sortable: true,
                    text: 'Proxy ID',
                    value: 'proxy'
                },
                {
                    sortable: true,
                    text: 'Target ID',
                    value: 'target',
                },
                {
                  sotable: false,
                  text: 'Proxy Level',
                  value: 'level',
                  align: 'center'
                }
            ],
            items: []
        }),
        methods: {
            validate () {
                if (this.$refs.form.validate()){
                    this.snackbar=true
                }
            }
        }
    };
</script>