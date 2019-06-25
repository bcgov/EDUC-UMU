<template>
  <material-card
    color="#003366"
    title="OBIEE User Table"
    text="">
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions>
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
        <td>{{ item.Name }}</td>
        <td>{{ item.Email }}</td>
        <td>{{ item.IDIR }}</td>
        <td>{{ item.Privileges }}</td>
      </template>
    </v-data-table>
  </material-card>
</template>

<script>
    export default{
        data: () => ({
            headers: [
                {
                    sortable: true,
                    text: 'Name',
                    value: 'Name'
                },
                {
                    sortable: true,
                    text: 'Email',
                    value: 'Email'
                },
                {
                    sortable: true,
                    text: 'IDIR',
                    value: 'IDIR'
                },
                {
                    sortable: true,
                    text: 'Privileges',
                    value: 'Privileges',
                }
            ],
            items: [
                    { Name: 'Nathan Denny', Email: 'nathan.denny@gov.bc.ca', IDIR: 'NDENNY', Privileges: 'EDW_Developer' },
                    { Name: 'Frank Reynolds', Email: 'freynolds@wolfcola.eu', IDIR: 'FREYNOLDS', Privileges: 'EDW_Administrator' },
                    { Name: 'Peter Holland', Email: 'peter.holland@gov.bc.ca', IDIR: 'PHOLLAND', Privileges: 'EDW_General' },
                    { Name: 'Fake Name', Email: 'fake@notreal.no', IDIR: 'FNAME', Privileges: 'EDW_Superintendant' },
                    { Name: 'John Smith', Email: 'jsmith@email.com', IDIR: 'JSMITH', Privileges: 'EDW_School_Principle' }  
                ]
        })
    };
</script>