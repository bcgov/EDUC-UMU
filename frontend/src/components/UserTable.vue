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
      :items="items"
      :search="search"
    >
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
        <td>{{ item.system }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.value }}</td>
        <td>{{ item.guid }}</td>
        <td>{{ item.create }}</td>
        <td>{{ item.update }}</td>
        <td align="center"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></td>
      </template>
      <template slot="footer">
        <td>
          <v-select
            :items="systems"
            label="System"
            :rules="rules"
            required
            ></v-select>
        </td>

        <td>
          <v-text-field label="Username"
            :rules="rules"
            required
            ></v-text-field>
        </td>

        <td>
          <v-text-field label="Value"
            :rules="rules"
            required
          ></v-text-field>
        </td>

        <td colspan="2">
          <v-text-field label="GUID"
            :rules="rules"
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
    import axios from 'axios'

    export default{
        data: () => ({
            valid: true,
            systems: ['EDW', 'SIS'],
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
                    text: 'Value',
                    value: 'value'
                },
                {
                    sortable: true,
                    text: 'User GUID',
                    value: 'guid',
                },
                {
                  sortable: true,
                  text: 'Created By',
                  value: 'create'
                },
                {
                  sortable: true,
                  text: 'Updated By',
                  value: 'update'
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
            async getUsers(){
              try{
                const response = await axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/users");
                const users = response.rows;

                if(!body) {
                  throw new Error('no body in response');
                }
                if(body.error){
                  throw new Error(body.error);
                }
                this.testBody = users;
              } catch (e) {
                console.log('Error getting users from database');
                console.log(e);
                this.bodyError = 'error :p';
              }
          }
        },
        mounted: {
          axios.get("https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main/database/users").then(response => {this.items = response.rows});
        }
    };
</script>