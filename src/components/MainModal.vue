<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
        <v-card>
        <v-card-title>
            <span class="text-h5 text-info">
                <slot name='modal_title'></slot>
            </span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <slot name="modal_body"></slot>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="modal_btn"></slot>
            <v-spacer></v-spacer>
        </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        dialog: false,
    }),
    methods:{
        initialize(){
            this.dialog = true
        },
        closeModal(){
            this.dialog = false
        }
    },
}
</script>