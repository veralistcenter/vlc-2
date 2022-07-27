import { Global } from '@/services/Home'

export const state = () => ({
	settings: false,
})


export const mutations = {
  updateSettings (state, object) { state.settings = object }
}

export const getters = {
  getSettings: state => state.settings,
}

export const actions = {
  async nuxtServerInit ({ commit }, { $axios, $Req }) {
    
    const query = Global

    try{
        const res = await $axios($Req(query))
        commit('updateSettings', res.data.data)
      }catch(e){
        return { error: e }
      }

    
  }
}