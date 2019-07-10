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
            :rules="rules"
            required
          ></v-text-field>
        </td>

        <td>
          <v-text-field label="Target ID"
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
    export default {
        data: () => ({
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
                    value: 'target',
                },
                {
                  sotable: false,
                  text: 'Proxy Level',
                  value: 'level',
                  align: 'center'
                }
            ],
            items: [
              {proxy: 'ASD78FASDTYFYIGFAWWA3F', target: 'HT54YW34534T234EF23', level: 'full'},
              {proxy: '23FWF3Q4TQ3T34T34T34T3', target: '34T34HGW45Y546RGSAF', level: 'full'},
              {proxy: 'DASDF4T56YJTYJU56U5GHJ', target: '34T34T35GSRET46FVMJ', level: 'full'},
              {proxy: 'MFHDR56Y345AWSF2357878', target: 'REGWEH4395FDUILQFNW', level: 'full'},
              {proxy: '2354T80HR39QWGEROIGW9G', target: '430U4T0THJO9ERHE0T4', level: 'full'},
              {proxy: 'TQ34T34T38H4T3948TH34T', target: '3453T80EHFGERGGEREZ', level: 'full'},
              {proxy: 'VCXVER89456J4IOEGGGERG', target: 'ERGE4325Y8934RFGHHG', level: 'full'},
              {proxy: 'BEWRGHE59063U54TJIOERG', target: 'BDFBSJKDN5R984UY349', level: 'full'},
              {proxy: 'DFGDROJKFGH30489434555', target: 'G03U409T3U4TFGOSCV4', level: 'full'},
              {proxy: '34TER90TUSDFOHGDFGOGND', target: '34TOIRHDROS8ERT890U', level: 'full'},
              {proxy: 'W3434Q3489YHFGDFHGFDFF', target: '34535089UASDFGHAASA', level: 'full'},
              {proxy: '90UJHMGHNKLMDDLKGHHFD4', target: 'BXCERT456U86ERTEGEE', level: 'full'},
              {proxy: '56U567UTERT8H97SSDGDFS', target: 'B9SDYR3564958SUIOFA', level: 'full'},
            ]
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