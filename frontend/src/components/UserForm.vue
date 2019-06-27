<template>
    <v-card class="user-form">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-layout row>
                <div class="form-left">
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
                    <v-text-field
                        v-model="guid"
                        :rules="guidRules"
                        label="GUID"
                        required
                    ></v-text-field>
                </div>
                <div class="form-middle">
                    <h2>User Roles</h2>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_Administrator`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_Developer`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_EAB_Analyst`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_General`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_District_Superintendant`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_School_Principle`">
                        </v-checkbox>
                        <v-checkbox
                            color="#003366"
                            v-model="checkbox"
                            :label="`EDW_Dimstud`">
                        </v-checkbox>
                </div>
                <div class="form-right">
                  <h2>User Proxy Roles</h2>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_General_Test`"></v-checkbox>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_EAB_Analyst_Test`"></v-checkbox>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_Developer_Test`"></v-checkbox>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_Adm_Test`"></v-checkbox>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_Dist_Super_Test`"></v-checkbox>
                    <v-checkbox
                        color="#003366"
                        v-model="checkbox"
                        :label="`EDW_Sch_Princpl_Test`"></v-checkbox>
                </div>
            </v-layout>
            <v-layout row>
                <div>
                    <v-btn color="#E0E0E0" :disabled="!valid" @click="validate">Submit</v-btn>
                </div>
                <div>
                    <v-btn color="#E0E0E0">Add CSV File</v-btn>
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
        ],
        guid: '',
        guidRules: [
            v => !!v || 'GUID is required'
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
    .form-right{
        width: 420px;
        padding-bottom: 10px;
        border-left: 1px solid black;
    }
    .form-left{
        width: 420px;
        padding-right: 20px;
        padding-bottom: 10px;
        padding-left: 10px;
        border-right: 1px solid black;
    }
    .form-middle{
        width: 420px;
        padding-left: 20px;
        padding-bottom: 10px;
    }
</style>