<template>
	<main class="page pt--8">
		<SiteSubnav :pages="pages" />

		<MatrixBody :matrix="page.bodyField.body" />

	</main>
</template>

<script>

	import { SupportPages } from '@/services/Support'
	
	export default{
		head(){
			return this.$metatags({title: this.page.title})
		},
		async asyncData({$axios, $Req, store, params, $CheckA}){
			
			const query = SupportPages

			try{
				const res = await $axios($Req(query))

				const pageList = res.data.data.supportPages.edges.map(e => e.node)
				const pageListReduced = pageList.filter(p => p.slug == params.support)
				const page = $CheckA(pageListReduced) ? pageListReduced[0] : {}

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Support', route: '/support'},
        	{title: page.title, route: `/support/${page.slug}` }
        ])

				let pages = [].concat(pageList).map((p, i) => {
					return { 
						title: p.title, 
						path: (i === 0) ? '/support' : `/support/${p.slug}`
					}
				})

        return {
        	pages,
        	page
        }

			}catch(e){
				return {error: e}
			}
		}
	}

</script>
