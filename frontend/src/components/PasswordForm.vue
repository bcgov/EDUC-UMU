<template>
    <v-form>
        <v-text-field
            v-model="old"
            label="Old Password"
            required
        ></v-text-field>
        <v-text-field
            v-model="newPass"
            label="New Password"
            required
        ></v-text-field>
        <v-text-field
            v-model="confirm"
            label="Confirm New Password"
            required
        ></v-text-field>
        <v-btn
            color="#003366"
            dark
        >Reset Password</v-btn>
    </v-form>
</template>

<script>
export default{

};
</script>
