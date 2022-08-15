<template>
	<main class="page pt--8">
		
		<SiteSubnav 
			:statement="'Events statement'"
			:pages="pages"
		/>

		<MatrixBody :matrix="type.bodyField.body" />

	</main>
</template>

<script>
	
	import { EventTabs } from '@/services/Events.js'

	export default{

		head(){
			return this.$metatags({title: this.type.title})
		},

		async asyncData({$axios, $Req, store, params, $CheckA}){

			try{


				const res = await $axios($Req(EventTabs))


        let pages = [
					{ title: 'Current', path: '/events' }, 
					{ title: 'Past', path: '/events/past' }
				]

				const tabs = res.data.data.eventTabs.edges.map(e => {
					return {
						title: e.node.title,
						path: `/events/tab/${e.node.slug}`
					}
				})

				const thispages = res.data.data.eventTabs.edges.map(e => e.node).filter(t => t.slug === params.type)

				pages = pages.concat(tabs)

				let page = $CheckA(thispages) ? thispages[0] : {}

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Events', route: '/events'},
        	{title: page.title, route: `/events/tab/${page.slug}`}
        ])

				return { 
					pages,
					type: page
				}


			}catch (e){
				return { error: e }
			}

		}
	}

</script>
