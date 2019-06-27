<template>
    <v-card class="user-form">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-layout row>
                <div class="form-side">
                    <h2>User Information</h2>
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="idir"
                        :rules="idirRules"
                        label="IDIR"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="bceid"
                        :rules="bceidRules"
                        label="BCeID"
                        required
                    ></v-text-field>
                    <v-btn :disabled="!valid" @click="validate">Submit</v-btn>
                </div>
                <div class="form-side">
                  <h2>User Proxy Roles</h2>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_General_Test"></checkbox>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_EAB_Analyst_Test"></checkbox>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_Developer_Test"></checkbox>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_Adm_Test"></checkbox>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_Dist_Super_Test"></checkbox>
                    <v-checkbox
                        v-model="checkbox"
                        :label="EDW_Sch_Princpl_Test"></checkbox>
                </div>
            </v-layout>
            </v-form>
        </v-card>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required'
        ],
        idir: '',
        idirRules: [
            v => !!v || 'IDIR is required'
        ],
        email: '',
        emailRules: [
            v => !!v || 'Email is required'
        ],
        bceid: '',
        bceidRules: [
            v => !!v || 'BCeID is required'
        ]
    }),

    methods: {
        validate() {
            if(this.$refs.form.validate()){
                this.snackbar=true
            }
        }
    }
};
</script>
<style>
    .form-side{
        width: 400px;
    }
</style>