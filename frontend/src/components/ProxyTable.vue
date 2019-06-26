  <template>
  <v-card>
    <div class="gov-blue">
      <v-card-title>
        OBIEE Proxy Users Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details></v-text-field>
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
        <td align="center"><v-btn color="#5475a7"><i class="fas fa-edit" style="color:white"></i></v-btn></td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-btn color="#5475a7"><span class="white--text"><i class="fas fa-user-plus" style="color:white"></i>Add User</span></v-btn>
    </div>
  </v-card>
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
                    text: 'Proxy Roles',
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
    .card-colour{
        background-color: #7590b9;
        color: white
    }
  .gov-blue{
    background-color: #5475a7;
    color: white;
  }
  tbody tr:nth-of-type(odd){
    background-color: rgba(0,0,0,0.05);
  }
</style>