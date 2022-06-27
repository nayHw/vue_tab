import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurant_data:[],
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
