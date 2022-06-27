<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 text-center">
          Are you sure want to delete?
        </v-card-title>

        <v-card-text class="pt-5">
            Staff Group : {{del_staff.staff_group_name}}
        </v-card-text>
        <v-card-text>
            Staff Name : {{del_staff.staff_name}}
        </v-card-text>

        <v-divider class=""></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            @click="dialog = false"
          >
          Close
          </v-btn>
          <v-btn
            color="error"
            @click="delStaff()"
          >
          Delete
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        del_staff:{
            staff_group_name:'',
            index:'',
            staff_name:''
        }
      }
    },
    methods:{
        initialize(del_staff){
            this.del_staff = del_staff
            this.dialog = true
        },
        delStaff(){
            this.$emit('del_staff_list',this.del_staff)
            this.dialog = false
        }
        
    }
  }
</script>