import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurant_data:
    [
      { "res_id":1,
        "res_data" :
        [
          {
            "staff_group_name":"Waiter Group",
            "category":[
              {
                "staff_name":"waiter_1",
                "working_hour": "AM"
              },
              {
                "staff_name":"waiter_2",
                "working_hour": "PM"
              }
            ]
          },
          {
            "staff_group_name":"Kitchen Group",
            "category":[
              {
                "staff_name":"Kitchen_1",
                "working_hour": "AM"
              },
              {
                "staff_name":"Kitchen_2",
                "working_hour": "PM"
              }
            ]
          },
          {
            "staff_group_name":"Chicken Soup_2",
            "category":[
              {
                "staff_name":"soup_1",
                "working_hour": "PM"
              },
              {
                "staff_name":"soup_2",
                "working_hour": "AM"
              }
            ]
          },
          {
            "staff_group_name":"Chicken Soup_4"
          }
    
  
        ]
      },
      { "res_id":2,
        "res_data" :
        [
          {
            "staff_group_name":"Waiter Group",
            "category":[
              {
                "staff_name":"waiter_1",
                "working_hour": "AM"
              },
              {
                "staff_name":"waiter_2",
                "working_hour": "PM"
              }
            ]
          },
          {
            "staff_group_name":"Kitchen Group",
            "category":[
              {
                "staff_name":"Kitchen_1",
                "working_hour": "AM"
              },
              {
                "staff_name":"Kitchen_2",
                "working_hour": "PM"
              }
            ]
          },
          {
            "staff_group_name":"Chicken Soup_2",
            "category":[
              {
                "staff_name":"soup_1",
                "working_hour": "PM"
              },
              {
                "staff_name":"soup_2",
                "working_hour": "AM"
              }
            ]
          },
          {
            "staff_group_name":"Chicken Soup_4"
          }
    
  
        ]
      }
    ],
    restaurant_name:
    [
      {
        "name": "Restaurant_1",
        "staff_count": 4,
        "id":1
      },
      {
        "name": "Restaurant_2",
        "staff_count": 4,
        "id":2
      },
      {
        "name": "Restaurant_3",
        "staff_count": 4,
        "id":3
      },
      {
        "name": "Restaurant_4",
        "staff_count": 4,
        "id":4
      },
      {
        "name": "Restaurant_5",
        "staff_count": 4,
        "id":5
      },
      {
        "name": "Restaurant_6",
        "staff_count": 4,
        "id":6
      }
    ]
  },
  getters: {
  },
  mutations: {
    getRestaurantData(state,data){
      state.restaurant_data = data
    }
  },
  actions: {
    getRestaurantData({commit}){
      axios.get("http://localhost:3000/restaurants_data")
      .then(
        (res) =>{ 
          commit("getRestaurantData",res.data)
        }
      )
      .catch()
    },
  },
  modules: {
  }
})
