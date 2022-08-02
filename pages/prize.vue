<template>
	<main class="page pt--8">
		<SiteSubnav :pages="[]" />		
		<MatrixBody v-if="$Check(prize) && $Check(prize.bodyField)" :matrix="prize.bodyField.body" />
	</main>
</template>

<script>

	import { mapGetters } from 'vuex'
	
	export default{
		computed:{
			prize(){
				return this.settings.pages.edges.map(e => e.node).filter(p => p.slug == 'prize')[0]
			},
			...mapGetters({
				settings: 'getSettings'
			})
		},
		async asyncData({$axios, $Req, store}){
			store.commit('updatePath', [
      	{title: 'Home', route: '/'},
      	{title: 'Prize', route: '/prize'}
      ])
		}
	}

</script>
