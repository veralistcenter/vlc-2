<template>
  <main class="page">
    <pre>{{globals}}</pre>    
  </main>
</template>

<script>

import { Global } from '@/services/Home'

export default {
  name: 'IndexPage',
  async asyncData({ $axios, $Req }){
    const query = Global

      try{
        const res = await $axios($Req(query))
        return { globals: res.data.data }

      }catch(e){
        return { globals: e }
      }
  }
}
</script>
