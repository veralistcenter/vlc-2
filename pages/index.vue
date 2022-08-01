<template>
  <main class="page">
    <SiteMenuExpanded id="homepage_menu" />
    <HomepageCarousel class="primary_carousel" v-if="$CheckA(gallery)" :gallery="gallery" />

    <component
      v-for="(block, i) in matrix"
      :is="blockType(block.__typename)"
      :size="block.cardSize"
      :recently="block.recently"
      :current="block.current"
      :recentPosts="recentPosts"
      :manual="block.manual"
      :text="block.text"
      :network="block.networkPreviewGroup"
      :networkNodes="networks"
      :biennialTitle="block.biennialTitle"
      :biennials="biennials"
    />

  </main>
</template>

<script>

import { Home } from '@/services/Home'

export default {
  name: 'IndexPage',

  computed: {
    homepage(){ return this.home.acfOptions.homepage },
    recentEvents(){ return [].concat(this.home.recentEvents.edges.map(e => e.node)) },
    recentExhibitions(){ return [].concat(this.home.recentExhibitions.edges.map(e => e.node)) },
    recentAnnouncements(){ return [].concat(this.home.recentAnnouncements.edges.map(e => e.node)) },
    gallery(){ return this.homepage.gallery },
    matrix(){ return this.homepage.previewSections },
    biennials(){ return [].concat(this.home.biennials.edges.map(e => e.node))},
    networks(){ return [].concat(this.home.networks.edges.map(e => e.node))},

    recentPosts(){
      return []
      .concat(this.recentEvents)
      .concat(this.recentExhibitions)
      .concat(this.recentAnnouncements)
    },

    blockType: state => type => {

      if(type == 'AcfOptions_Homepage_PreviewSections_HomepageGallery'){
        return 'HomepageCarousel'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_Recently'){
        return 'GridRecently'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_HomepageText'){
        return 'HomepageText'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_Current'){
        return 'GridCurrent'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_Manual'){
        return 'GridManual'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_NetworkPreview'){
        return 'NetworkList'
      }else if(type == 'AcfOptions_Homepage_PreviewSections_BiennialFocus'){
        return 'HomepageBiennials'
      }else{
        return 'p'
      }

    }

  },
  mounted(){
    this.$nextTick(() => {
      this.scrolling()
    })
  },
  beforeDestroy(){
    this.$store.commit('toggleMenu', true)
  },
  methods: {
    scrolling(e){
      let ticking = false,
          previousVal = 0

      let menu = document.querySelector('#homepage_menu')

      const toggleMenu = scrollY => {
        const bottom = menu.getBoundingClientRect().bottom
        if(bottom < 40){
          this.$store.commit('toggleMenu', true)
        }else{
          this.$store.commit('toggleMenu', false)
        }
        
        previousVal = scrollY
      }
      window.addEventListener('scroll', function(e){
        if (!ticking) {
          window.requestAnimationFrame(function() {
            toggleMenu(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      })
    }
  },

  async asyncData({ $axios, $Req }){
    const query = Home

      try{
        const res = await $axios($Req(query))
        return { home: res.data.data }

      }catch(e){
        return { home: e }
      }
  }
}
</script>
