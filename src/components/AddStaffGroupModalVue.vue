<template>
    <MainModal ref="main_modal">
        <template #modal_title>
           {{ modal_title }}
        </template>
        <template #modal_body>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="add_staff.staff_name"
                        label="Name*"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

        </template>
        <template #modal_btn>
            <v-btn
            color="blue darken-1"
            @click="closeModal"
            >
            Close
            </v-btn>
            <v-btn
            :disabled="isActive || isDisabled"
            color="blue darken-1"
            @click="saveStaff(add_staff)"
            v-model="btn_text"
            >
            {{ btn_text }}
            </v-btn>
        </template>
    </MainModal>
</template>
<script>
import MainModal from './MainModal'
export default {
components:{
    MainModal
},
data: () => ({
    modal_title:'',
    isDisabled:false,
    add_staff:{ 
        staff_name:'',
        working_hour: 0,
        index:0
    }, 
    compare_add_staff:{ 
        staff_name:'',
        working_hour: 0,
        index: 0
    },
    btn_text:''
}),
computed:{
    isActive(){
        if(this.add_staff.staff_name == '') return true

        return false
    },
},
watch: {
    add_staff: {
        handler() {
            this.isDisabled = !(JSON.stringify(this.add_staff) !== JSON.stringify(this.compare_add_staff));
        },
        deep: true,
    },
},
methods:{
    initialize(modal_title){
        this.modal_title = modal_title
        this.btn_text = 'Save'
        this.$refs.main_modal.initialize() //open main modal
    },
    closeModal(){
        this.$refs.main_modal.closeModal() //close main modal
    },
    editModal(modal_title,edit,index){
        this.modal_title = modal_title
        this.add_staff = { 
            staff_name: edit.staff_name,
            working_hour: edit.working_hour,
            index:index
        } 

        this.compare_add_staff = JSON.parse(JSON.stringify(this.add_staff)) //to disable update btn /copy add_staff data
        this.btn_text = 'Update'
        this.isDisabled = true
        this.$refs.main_modal.initialize() //open main modal
    },
    saveStaff(staff){
        if(this.btn_text == 'Save'){
            this.$emit('add_staff_group',staff)
            this.$refs.main_modal.closeModal() //close main modal
            this. add_staff={ 
                staff_name:'',
                working_hour:0
            }
        }else{
            this.$emit('add_staff_group',staff,this.btn_text)
            this.$refs.main_modal.closeModal() //close main modal
            this. add_staff={ 
                staff_name:'',
                working_hour:0
            }
        }
    }
}
}
</script>