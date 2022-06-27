<template>
  <div>
    <v-tabs 
      background-color="grey lighten-2"
      v-model="index"
    >
      <v-tab v-for="(tab,tab_index) in tabs" :key="tab_index" @click="clickTab(tab_index)">
        {{ tab }}
      </v-tab>
    </v-tabs>
    <navigation-vue class="py-0 bg-light">
      <template #title>
        <a class="navbar-brand">{{tab_title.name}}</a>
      </template>
      <template #action>
        <button
          v-for="(action,btn_index) in tab_title.btns" 
          :key="btn_index" 
          class="btn btn-outline-info px-3 ml-2"
          @click="addModalOpen()"
          >
            <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;{{ action }}
          </button>
      </template>
    </navigation-vue>
    <div class="bg-light py-3 border border-bottom-0 border-end-0 border-start-0"></div>
    <div class="overflow-auto" style="height:400px;">
      <v-simple-table 
        v-for="(item,index) in lists.res_data" :key="index"
      >
        <template v-slot:default>
          <thead class="back-color" v-if="item.staff_group_name && item.category">
            <tr>
              <th class="text-start" style="width:20%;">
                {{ item.staff_group_name }}
              </th>
              <th class="text-start"  style="width:20%;">
                {{ item.count }}
              </th>
              <th class="text-start">
                {{ item.col_3 }}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody class="border border-bottom-0 border-end-0 border-start-0">
            <tr
              v-for="(cat,staff_index) in item.category"
              :key="staff_index"
            >
              <td  style="width:20%;">{{ cat.staff_name }}</td>
              <td  style="width:20%;">{{ cat.working_hour }}</td>
              <td>{{ cat.col_3 }}</td>
              <td class="text-end">
                <v-btn
                  depressed
                  class="mr-5 text-capitalize"
                  @click="editModalOpen(cat,staff_index,item.staff_group_name)"
                >
                  <i class="fa-solid fa-gear"></i>&nbsp;&nbsp;
                  edit
                </v-btn>
                <span @click="deleteModalOpen(item.staff_group_name,staff_index,cat.staff_name)">
                  <i class="fa-solid fa-trash-can red--text cursor"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <add-modal-vue ref="add_modal" @add_staff_list = 'addStaffList'></add-modal-vue>
    <add-modal-vue ref="edit_modal" @update_staff_list = 'updateStaffList'></add-modal-vue>
    <delete-modal-vue ref="del_modal" @del_staff_list= 'delStaffList'></delete-modal-vue>
    <add-staff-group ref="add_staff_group_modal" @add_staff_group = 'addStaffGroup'></add-staff-group>
  </div>
</template>

<script>
import NavigationVue from '../views/NavigationVue.vue'
import AddModalVue from '@/components/AddModalVue.vue'
import addStaffGroup from '@/components/AddStaffGroupModalVue.vue'
import DeleteModalVue from '@/components/DeleteModalVue.vue'
export default {
    data(){
      return{
        index:null,
        lists:{
          res_id:'',
          res_data:''
        },
        tab_title:[],
        modal_title:'Add Staff',
        tabs:['Staff Group','Staff Group Management'],
        tab_titles:[
          {
            name:'Staff Group',
            btns:['Add Staff']
          },
          {
            name:'Staff Group Management',
            btns:['Add Staff Group']
          },
          {
            name:'Tab_3_Title',
            btns:['btn_3','btn_3_1']
          },
          {
            name:'Tab_4_Title',
            btns:['btn_4']
          },
        ],
        Tab_index:0,
        modal_titles:[  
          {
            add:'Add Staff',
            update : 'Update Staff'
          }, 
          {
            add:'Add Staff Group',
            update : 'Update Staff Group'
          }
        ],
      }
    },
    components:{
      NavigationVue,
      AddModalVue,
      DeleteModalVue,
      addStaffGroup
    },
    methods:{
      clickTab(tab_index){
        this.Tab_index = tab_index //tab index
        this.tab_title = this.tab_titles[tab_index] //tab title
        this.modal_title = this.modal_titles[tab_index].add //modal title
        this.lists = JSON.parse(localStorage.getItem("data")) //

        if(tab_index != 0){
          var data =this.lists.res_data
          var category = []
          for(var key in data) {
            if(data[key].staff_group_name &&  data[key].category){
              let cat_data =
                {
                  "staff_name": data[key].staff_group_name,
                  "working_hour": data[key].category.length
                }
              category.push(cat_data)
            } 
            if(data[key].staff_group_name &&  !data[key].category){
              let cat_data =
                {
                  "staff_name": data[key].staff_group_name,
                  "working_hour": 0
                }
              category.push(cat_data)
            }
          }
          const id = this.lists.res_id
          delete this.lists.res_data
          this.lists = {
            res_id: id,
            res_data: [{category: category }]
          }
          localStorage.setItem("staff_group_data",JSON.stringify(this.lists.res_data[0].category));
        }
      },
      addModalOpen(){
        this.modal_title = this.modal_titles[this.Tab_index].add //modal title
        let add = {
          items : this.resData.res_data,  //latest localstorage data
          modal_title : this.modal_title
        }
        if(this.modal_title == this.modal_titles[0].add){
          this.$refs.add_modal.initialize(add)
        }else{
          this.$refs.add_staff_group_modal.initialize(this.modal_title)
        }
      },
      addStaffList(staff){
        // let current_staff = staff.staff
        let add_staff = {
          staff_group_name: staff.staff_group_name,
          category:[
            {
              staff_name: staff.staff_name,
              working_hour: staff.working_hour
            } 
          ]
        }

        let exist_staff_group_name = this.lists.res_data.filter(arr => {
              return arr.staff_group_name === add_staff.staff_group_name
        })

        if(exist_staff_group_name.length != 0){
          const keys = Object.keys(exist_staff_group_name);
          keys.forEach((key) => {
            if(exist_staff_group_name[key].category){
              exist_staff_group_name[key].category.push(add_staff.category[key])
            }else{
              exist_staff_group_name[key] = add_staff
              let index = this.lists.res_data.findIndex(
                x => x.staff_group_name === exist_staff_group_name[key].staff_group_name
              );
              this.lists.res_data.splice(index,1,exist_staff_group_name[key])
            }
          });  
        }
        else{
          this.lists.push(add_staff)
        }
        localStorage.setItem("data",JSON.stringify(this.lists));
      },
      editModalOpen(category,staff_index,staff_group_name){
        this.modal_title = this.modal_titles[this.Tab_index].update //modal title
        let edit = {
          add_staff:{ 
            staff_group_name: staff_group_name,
            staff_name: category.staff_name,
            working_hour: category.working_hour,
            index:staff_index
          },
          items: this.resData.res_data,
          modal_title : this.modal_title
        }
        if(this.modal_title == this.modal_titles[0].update){
          this.$refs.edit_modal.editModal(edit)
        }else{
          this.$refs.add_staff_group_modal.editModal(this.modal_title,category,staff_index)
        }
      },
      updateStaffList(staff){

        let add_staff = {
          staff_group_name: staff.staff_group_name,
          category:[
            {
              staff_name: staff.staff_name,
              working_hour: staff.working_hour
            }
          ],
          index: staff.index 
        }

        let exist_staff_group_name = this.lists.res_data.filter(arr => {
              return arr.staff_group_name === add_staff.staff_group_name
        })

        if(exist_staff_group_name.length != 0){
          const keys = Object.keys(exist_staff_group_name);
          keys.forEach((key) => {
            var category = exist_staff_group_name[key].category;
            category.splice(add_staff.index, 1, add_staff.category[key]);
          });  
        }
        localStorage.setItem("data",JSON.stringify(this.lists));
      },
      deleteModalOpen(staff_group_name,staff_index,staff_name){
        
        var del_staff = {
          staff_group_name: staff_group_name,
          index: staff_index,
          staff_name: staff_name
        }

        this.$refs.del_modal.initialize(del_staff)
      },
      delStaffList(del_staff){
        let exist_staff_group_name = this.lists.res_data.filter(arr => {
              return arr.staff_group_name === del_staff.staff_group_name
        })
        const keys = Object.keys(exist_staff_group_name);
        keys.forEach((key) => {
          var category = exist_staff_group_name[key].category;
          category.splice(del_staff.index, 1);
          if(category.length == 0){
            delete exist_staff_group_name[key].category
          }
        });  
        localStorage.setItem("data",JSON.stringify(this.lists));

      },
      addStaffGroup(staff,btn_tex){
        if(btn_tex === 'Update'){ 
          var group_data = JSON.parse(localStorage.getItem("staff_group_data"))
          console.log(group_data[staff.index].staff_name)
          console.log(staff.staff_name)
          let exist_staff_group_name = this.lists.res_data
          console.log(exist_staff_group_name);
          // if(exist_staff_group_name.length != 0){
          //   const keys = Object.keys(exist_staff_group_name);
          //   keys.forEach((key) => {
          //     var category = exist_staff_group_name[key].category;
          //     category.splice(add_staff.index, 1, add_staff.category[key]);
          //   });  
          // }
          // var group_data = JSON.parse(localStorage.getItem("staff_group_data"))
          // group_data.splice(staff.index,1,staff)
          // localStorage.setItem("staff_group_data",JSON.stringify(group_data));
          // console.log(this.lists);
        }else{
          this.lists.res_data[0].category.push(staff)
          localStorage.setItem("staff_group_data",JSON.stringify(this.lists.res_data[0].category));
          // localStorage.setItem("data",JSON.stringify(this.lists)); //ERROR CASE
        }
      }
    },
    mounted() {
      this.tab_title = this.tab_titles[0]
      this.lists = JSON.parse(localStorage.getItem("data"))
    },
    computed:{
      resData(){
        var group_data = JSON.parse(localStorage.getItem("staff_group_data"))
        if(group_data){
          let exist_staff_group_name = group_data.filter(arr => {
                return arr.working_hour === 0
          })
          const keys = Object.keys(exist_staff_group_name);
            keys.forEach((key) => {
              if(exist_staff_group_name[key].staff_name){
                this.lists.res_data.
                push(
                  {
                    "staff_group_name": exist_staff_group_name[key].staff_name
                  }
                )
              }
            });  
          return this.lists
        }
        return this.lists
      }
    }
}
</script>

<style>
.back-color{
  background-color: rgb(187 188 190);
}
.back-color th{
  height: 30px !important;
}
</style>