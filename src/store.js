import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      {
        name: "Dog Shelter",
        date: "Tuesday, July 31 2018",
        volunteersNeeded: 2,
        signedUp: false,
      },
      {
        name: "Dog Shelter",
        date: "Tuesday, July 31 2018",
        volunteersNeeded: 12,
        signedUp: true,
      }
    ]
  },
  getters: {
    getEvents(state) {
      return state.events;
    }
  },
  mutations: {

  },
  actions: {

  }
})
