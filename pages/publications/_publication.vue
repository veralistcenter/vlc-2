<template>
	<main class="page pt--7">
		<PublicationHeader :pub="publication" />
		<MatrixBody v-if='$CheckA(publication.bodyField.body)' :matrix="publication.bodyField.body" />

		<!-- network -->


		<section class="mt--4" v-if="$CheckA(publication.related.relatedPages)">
			<h2 class="fs--large section_heading" v-html="publication.related.relatedPagesTitle"></h2>
			<GridThumbs 
				:size="publication.related.relatedPagesSize" 
				:posts="publication.related.relatedPages" 
			/>
		</section>
	</main>
</template>

<script>
	
	import { Publication } from '@/services/Publications'

	export default{
		async asyncData({$axios, $Req, store, params}){
			const query = Publication(params.publication)

			try{
				const res = await $axios($Req(query))

				const publication = res.data.data.publication


        const type = res.data.data.publication.publicationTypes.edges.map(e => e.node)

        let paths = [
        	{title: 'Home', route: '/'},
        	{title: 'Publications', route: '/publications'},
        ]

        if(type.length > 0){

        	paths.push({title: type[0].name, route: '/publications/type/' + type[0].slug })
        	paths.push({title: publication.title, route: '/publications/' + params.publication })

        }else{
        	paths.push({title: publication.title, route: '/publications/' + params.publication })
        }

        store.commit('updatePath', paths)


				return {
					publication
				}
			}catch(e){
				return {error: e}
			}
		}
	}

</script>
