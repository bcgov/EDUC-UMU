<template>
    <v-card class='form-card'>
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
                @click="dialog = true"
            >Reset Password</v-btn>
        </v-form>
        <v-dialog
            v-model="dialog"
            max-width="400px"
            persistent
        >
            <v-card>
                <v-card-title>
                    <span><h4>Confirm Password Reset</h4></span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                        <span>Are you sure you want to reset your password?</span>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="#003366" dark text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="#003366" dark text @click="dialog = false">Reset Password</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default{
    data: () => ({
        dialog: false
    }),

};
</script>
