<template>
	<main class="page pt--8">
		<SiteSubnav :pages="[]" />
		<BiennialList :biennials="biennials" />
	</main>
</template>

<script>
	
	import { Biennials } from '@/services/Home'

	export default{
		computed: {
			biennials(){ return [].concat(this.focus.biennials.edges.map(e => e.node)) }
		},

		async asyncData({ $axios, $Req, store }){
    const query = Biennials

      try{
        const res = await $axios($Req(query))
        
        store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Focus Theme', route: '/focus-theme'}
        ])

        return { focus: res.data.data }

      }catch(e){
        return { focus: e }
      }
  }
	}

</script>
