  <template>
  <v-card>
    <div class="gov-blue">
      <v-card-title>
        <span class="white--text">OBIEE Proxy Users Table</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        :class=""></v-text-field>
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
        <td>{{ item.name }}</td>
        <td>{{ item.proxy }}</td>
        <td align="center"><v-btn class="gov-blue">Edit User</v-btn></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-btn class="gov-blue">Add User</v-btn>
    </div>
  </material-card>
</template>

<script>
    export default{
        data: () => ({
            search: '',
            headers: [
                {
                    sortable: true,
                    text: 'Name',
                    value: 'name'
                },
                {
                    sortable: true,
                    text: 'Proxy Privileges',
                    value: 'proxy',
                }
            ],
            items: [
                    { name: "Nathan Denny", proxy: "EDW_General_Test"},
                    { name: "Frank Reynolds", proxy: "EDW_Developer_Test"},
                    { name: "John Smith", proxy: "EDW_Adm_Test"},
                    { name: "Fake Name", proxy: "EDW_Sch_Princpl_Test"}
                ]
        })
    };
</script>
<style>
  .gov-blue{
    background-color: #003366;
    color: white;
  }
  tbody tr:nth-of-type(odd){
    background-color: rgba(0,0,0,0.05);
  }
</style>