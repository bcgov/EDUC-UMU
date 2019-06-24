<template>
    <div>
        <b-table striped hover bordered :items="items"></b-table>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                fields: ['Name', 'Email', 'IDIR', 'Privileges']
                items: [
                    { Name: 'Nathan Denny', Email: 'nathan.denny@gov.bc.ca', IDIR: 'NDENNY', Privileges: 'EDW_Developer' },
                    { Name: 'Frank Reynolds', Email: 'freynolds@wolfcola.eu', IDIR: 'FREYNOLDS', Privileges: 'EDW_Administrator' },
                    { Name: 'Peter Holland', Email: 'peter.holland@gov.bc.ca', IDIR: 'PHOLLAND', Privileges: 'EDW_General' },
                    { Name: 'Fake Name', Email: 'fake@notreal.no', IDIR: 'FNAME', Privileges: 'EDW_Superintendant' },
                    { Name: 'John Smith', Email: 'jsmith@email.com', IDIR: 'JSMITH', Privileges: 'EDW_School_Principle' }  
                ]
            }
        }
    }
</script>