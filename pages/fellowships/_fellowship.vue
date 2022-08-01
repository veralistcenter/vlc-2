<template>
	<main class="page pt--8">
		
		<SiteSubnav 
			:statement="'Statement String'"
			:pages="pages"
		/>

		<MatrixBody :matrix="page.bodyField.body" />

	</main>
</template>

<script>

	import { FellowPages } from '@/services/Fellowships'
	
	export default{
		async asyncData({ $axios, $Req, $CheckA, store, params }){


			try{

				const query = FellowPages

        const res = await $axios($Req(query))
        
      
        const fpages = res.data.data.fellowships.edges.map(e => {
        	return { title: e.node.title, path: `/fellowships/${e.node.slug}`}
        })

        const thispages = res.data.data.fellowships.edges.map(e => e.node).filter(p => p.slug === params.fellowship)

        const thispage = $CheckA(thispages) ? thispages[0] : {}
        const thispagetitle = thispage.title !== undefined ? thispage.title : ''

        store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Fellowships', route: '/fellowships'},
        	{title: thispagetitle, route: `/fellowships/${params.fellowship}`}
        ])

        let pages = [
					{ title: 'Current', path: '/fellowships' }, 
					{ title: 'Past', path: '/fellowships/past' },
				]


        return {
					pages: [].concat(pages).concat(fpages),
					page: thispage
				}

      }catch (e){
      	return {error: e}
      }

		}
	}

</script>
