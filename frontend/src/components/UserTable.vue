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
            items: [
              {system: 'EDW', username: 'NDENNY', value: 'EDW_General', guid: 'ASDFGQHW34R23789EHFAWEKFB348143694', create: 'system', update: '-'},
              {system: 'EDW', username: 'NDENNY', value: 'EDW_EAB_Analyst', guid: 'ASDFGQHW34R23789EHFAWEKFB348143694', create: 'system', update: '-'},
              {system: 'EDW', username: 'NDENNY', value: 'EDW_Dimstud', guid: 'ASDFGQHW34R23789EHFAWEKFB348143694', create: 'system', update: '-'},
              {system: 'EDW', username: 'EGOMBOC', value: 'EDW_Dimstud', guid: 'AHFAW89Y34593457ERUIOWEIY5439DFO' , create: 'system', update: 'OBIEE_SYS_UAT'},
              {system: 'EDW', username: 'EGOMBOC', value: 'EDW_General', guid: 'AHFAW89Y34593457ERUIOWEIY5439DFO', create: 'OBIEE_SYS_UAT', update: '-'},
              {system: 'EDW', username: 'RAUJLA', value: 'EDW_Dimstud', guid: 'NHAKASDFJLHWAEFKJABNWNFAB3705721', create: 'system', update: '-'},
              {system: 'EDW', username: 'RAUJLA', value: 'EDW_EAB_Analyst', guid: '273HGWFA98EFQW389RYH23HRRWERWER', create: 'OBIEE_SYS_UAT', update: 'system'},
              {system: 'EDW', username: 'SDAMANI', value: 'EDW_Developer', guid: 'FWH3453H5324HLKDFH893495HERFJKL', create: 'system', update: 'system'},
              {system: 'EDW', username: 'SDAMANI', value: 'EDW_School_Principle', guid: 'FWH3453H5324HLKDFH893495HERFJKL', create: 'OBIEE_SYS_UAT', update: '-'},
              {system: 'EDW', username: 'SDAMANI', value: 'EDW_Administrator', guid: 'FWH3453H5324HLKDFH893495HERFJKL', create: 'system', update: '-'},
              {system: 'EDW', username: 'SDAMANI', value: 'EDW_Dimstud', guid: 'FWH3453H5324HLKDFH893495HERFJKL', create: 'system', update: '-'},
              {system: 'EDW', username: 'HWANG', value: 'EDW_Administrator', guid: '3489ASDHFHASKWEH28328923H3RH2389', create: 'system', update: 'system'},
              {system: 'EDW', username: 'HWANG', value: 'EDW_Dimstud', guid: '3489ASDHFHASKWEH28328923H3RH2389', create: 'OBIEE_SYS_UAT', update: '-'},
              {system: 'EDW', username: 'HWANG', value: 'EDW_Developer', guid: '3489ASDHFHASKWEH28328923H3RH2389', create: 'system', update: '-'},
              {system: 'EDW', username: 'YAZHANG', value: 'EDW_Administrator', guid: '849HGUEFH8ER89423H2R3RHWEHWEIR', create: 'system', update: '-'}
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