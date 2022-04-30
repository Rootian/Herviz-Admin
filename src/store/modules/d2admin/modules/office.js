import axios from "axios";

export default {
  namespaced: true,
  state: {

  },
  actions: {
    /**
     * @description Get Office list
     * @param {Object} context
     * @param {*} info info
     */
    async loadOfficeList () {
      return axios.get(process.env.VUE_APP_API + '/office/listMenu')
    },

  }
}
