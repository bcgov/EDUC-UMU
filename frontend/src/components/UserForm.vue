<template>
    <v-card class="round">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="idir"
                    :rules="idirRules"
                    label="IDIR"
                    required
                ></v-text-field>
                <v-btn :disabled="!valid" @click="validate">Submit</v-btn>
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