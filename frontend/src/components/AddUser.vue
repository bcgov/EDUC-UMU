<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex>
                <UserForm></UserForm>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default{
    name: 'add_user',
    components: {
        AddUser
    },
    data() {
      return {
        dialog: false
      };
    }
};
</script>