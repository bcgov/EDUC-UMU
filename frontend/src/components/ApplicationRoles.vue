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
        <td>{{ item.system }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.create }}</td>
        <td>{{ item.update }}</td>
        <td align="center"><i class="fas fa-edit fa-lg hover-change" style="color:#003366"></i></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      <template slot="footer">
          <td>
            <v-select
              :items="systems"
              :rules="rules"
              label="System"
              required
              ></v-select>
          </td>

          <td colspan="2">
            <v-text-field label="Role"
              v-model="role"
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
        }
    };
</script>