<template>
    <MainModal ref="main_modal">
        <template #modal_title>
           {{ modal_title }}
        </template>
        <template #modal_body>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                >
                    <v-select
                        v-model="add_staff.staff_group_name"
                        :items="staff_group"
                        item-text="staff_group_name"
                        item-value="staff_group_name"
                        label="Staff Group*"
                        required
                    ></v-select>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                >
                    <v-select
                        v-model="add_staff.working_hour"
                        :items="working_hour"
                        item-text=".working_hour"
                        item-value="working_hour"
                        label="Working hours*"
                        required
                    ></v-select>
                </v-col>
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
    staff_group:[],
    working_hour:['Am','PM'],
    add_staff:{ 
        staff_group_name:'',
        staff_name:'',
        working_hour:'',
        index:0
    }, 
    compare_add_staff:{ 
        staff_group_name:'',
        staff_name:'',
        working_hour:'',
        index:0
    },
    btn_text:''
}),
computed:{
    isActive(){
        const isEmpty = !Object.values(this.add_staff).some(x => x === null || x === '') //false
        if(isEmpty) return false

        return true
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
    initialize(add){
        this.modal_title = add.modal_title
        this.staff_group = add.items
        this.btn_text = 'Save'
        this.$refs.main_modal.initialize() //open main modal
    },
    closeModal(){
        this.$refs.main_modal.closeModal() //close main modal
    },
    editModal(edit){
        this.modal_title = edit.modal_title
        this.add_staff = edit.add_staff
        this.compare_add_staff = JSON.parse(JSON.stringify(this.add_staff)) //to disable update btn /copy add_staff data
        this.staff_group = edit.items
        this.btn_text = 'Update'
        this.isDisabled = true
        this.$refs.main_modal.initialize() //open main modal
    },
    saveStaff(staff){
        if(this.btn_text == 'Save'){
            this.$emit('add_staff_list',staff)
            this.$refs.main_modal.closeModal() //close main modal
            this. add_staff={ 
                staff_group_name:'',
                staff_name:'',
                working_hour:''
            }
        }else{
            this.$emit('update_staff_list',staff)
            this.$refs.main_modal.closeModal() //close main modal
            this. add_staff={ 
                staff_group_name:'',
                staff_name:'',
                working_hour:''
            }
        }
    }
},
mounted(){
}
}
</script>