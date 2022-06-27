<template>
  <v-simple-table
    fixed-header
    height="400px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Number of Staff
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in restaurants"
          :key="index"
          class="cursor"
          @click="detail(index,item)"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.staff_count }}</td>
          <td><i class="fa-solid fa-chevron-right"></i></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
  export default {
    data () {
      return {
        restaurants: [],
        data: [
          [
            [
              {
                staff_group_name:'Waiter Group',
                category:[
                  {
                    staff_name:'waiter_1',
                    working_hour: 'AM'
                  },
                  {
                    staff_name:'waiter_2',
                    working_hour: 'PM'
                  }
                ]
              },
              {
                staff_group_name:'Kitchen Group',
                category:[
                  {
                    staff_name:'Kitchen_1',
                    working_hour: 'AM'
                  },
                  {
                    staff_name:'Kitchen_2',
                    working_hour: 'PM'
                  }
                ]
              },
              {
                staff_group_name:'Chicken Soup_2',
                category:[
                  {
                    staff_name:'soup_1',
                    working_hour: 'PM'
                  },
                  {
                    staff_name:'soup_2',
                    working_hour: 'AM'
                  }
                ]
              },
              {
                staff_group_name:'Chicken Soup_4',
              },
            ],
            [
              {
                staff_group_name:'Staff Group',
                count:'Staff Count',
              },
              {
                category:[
                  {
                    staff_name:'Sample_Staff_Group',
                    working_hour: 1
                  },
                ]
              },
            ],
            [
              {
                staff_group_name:'Chicken Soup_1',
                count:'Count',
                col_3:'Col_3',
              },
              {
                category:[
                  {
                    staff_nameme:'soup_1',
                    working_hour: 1,
                    col_3:'col_'
                  },
                  {
                    staff_name:'soup_2',
                    working_hour: 2,
                    col_3:'col_'
                  }
                ]
              },
              {
                category:[
                  {
                    staff_name:'soup_1',
                    working_hour: 1,
                    col_3:'col_'
                  },
                  {
                    staff_name:'soup_2',
                    working_hour: 2,
                    col_3:'col_'
                  }
                ]
              },
            ]
          ],
        ]

      }
    },
    methods:{
      detail(index,item){
          const restaurant_data = this.$store.state.restaurant_data[index]
          
          localStorage.setItem("restaurant_name",JSON.stringify(item)); 
          localStorage.setItem("data",JSON.stringify(restaurant_data));
          setTimeout(()=>{
            this.$router.push(
              {
                name:'detail',
                params: {
                  id:index
                }
              }
            )  
          },1000)
      }
    },
    mounted(){
      this.restaurants = this.$store.state.restaurant_name
      this.$store.dispatch("getRestaurantData");
    }
  }
</script>
<style>
  .cursor{
    cursor: pointer;
  }
</style>