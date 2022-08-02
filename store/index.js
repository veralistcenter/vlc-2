import { Global, AllPages } from '@/services/Home'

export const state = () => ({
	settings: false,
  paths: [],
  showMenu: false,
  contrast: false,
  slugs: {
    events: ['events', 'events-past', 'events-tab-type'],
    exhibitions: ['exhibitions', 'exhibitions-past'],
    networks: ['network', 'network-individuals', 'network-organizations'],
    fellowships: ['fellowships', 'fellowships-past', 'fellowships-fellowship'],
    focus: ['focus-theme'],
    prize: ['prize'],
    about: ['about', 'about-about'],
    support: ['support', 'support-support'],
    publications: ['publications', 'publications-publication'],
    archive: ['archive']
  }
})


export const mutations = {
  updateSettings (state, object) { state.settings = object },
  updatePath(state, array) { state.paths = array },
  toggleMenu(state, boolean){ state.showMenu = boolean },
  toggleContrast(state){ 
    if(state.contrast){
      state.contrast = false
    }else{
      state.contrast = true
    }
  },

}

export const getters = {
  getSettings: state => state.settings,
  getPaths: state => state.paths,
  getMenuStatus: state => state.showMenu,
  getContrast: state => state.contrast,
  getSlugs: state => state.slugs
}

export const actions = {
  async nuxtServerInit ({ commit }, { $axios, $Req }) {
    
    const query = Global + ' ' + AllPages

    try{
        const res = await $axios($Req(query))
        commit('updateSettings', res.data.data)
      }catch(e){
        return { error: e }
      }

    
  }
}