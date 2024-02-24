<template>
	<main class="page pt--8">
		<h1 class="genath section_heading title mb--1">
			<span v-html="project.title"></span><br />
			<span v-html="project.projectInfo.dateRange.startingYear"></span>–<span v-html="project.projectInfo.dateRange.endingYear"></span>
		</h1>

		<section class="grid" v-if="project">
			<aside class="col col--1_4 mcol--full">
				<figure>
					<img
						class="biennial_img"
						v-if="$Check(project.featImage) && $Check(project.featImage.featuredImage)"
						:src="project.featImage.featuredImage.sourceUrl"
						:srcset="project.featImage.featuredImage.srcSet"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
						:alt="project.featImage.featuredImage.altText"
						:title="project.featImage.featuredImage.title"
					/>

					<figcaption 
						class="fs--small mt--1_4"
						v-if="$Check(project.featImage.imageCaption)" v-html="project.featImage.imageCaption"></figcaption>
					<figcaption 
						class="fs--small mt--1_4"
						v-else-if="$Check(project.featImage) && $Check(project.featImage?.featuredImage?.caption)" v-html="project.featImage.featuredImage.caption"></figcaption>

				</figure>
			</aside>
			<section class="col col--1_2 mcol--full mmt--1 fs--regular" v-html="project.projectInfo.fullDescription"></section>

		</section>

		<section v-if="project && $CheckA(taxonomy.networks)" class="section_inset mt--2 mb--2 pt--1 pb--1 border--top border--btm">
			<h2 class="fs--large">Network</h2>

			<ul class="ul--inline fs--regular mt--1">
				<li class="node_item mr--1_2 mb--1" v-for="(n, i) in taxonomy.networks" :key="'network' + i">
					<nuxt-link 
						:to="'/network/' + n.slug"
						class="block caps pb--1_2 pt--1_2 pr--1 pl--1_2"
					>
						<span class="node_indicator">⁕</span>
						<span v-html="n.title"></span>
					</nuxt-link>
				</li>
			</ul>

		</section>


		<section 
			class="mb--4"
			:class="!$CheckA(taxonomy.networks) ? 'mt--2' : 'mt--1'"
		>
			
			<GridThumbs :posts="relatedPosts" :size="'Quarter'" />

		</section>



	</main>
</template>

<script>
	
	import { Project } from '@/services/Project'


	export default{
		head(){

			const description = `${this.project.projectInfo.dateRange.startingYear}–${this.project.projectInfo.dateRange.endingYear}`

			const image = (this.$Check(this.project.featImage) && this.$Check(this.project.featImage.featuredImage)) ? this.project.featImage.featuredImage.sourceUrl : undefined


			return this.$metatags({
				title: this.project.title,
				description,
				image
			})
		},

		computed: {
			relatedPosts(){
				let posts = [].concat(this.taxonomy.events).concat(this.taxonomy.exhibitions).concat(this.taxonomy.announcements).concat(this.taxonomy.publications)
				const sortedPosts = posts.sort((a, b) => a.valueOf(a.pageInfo.date) - this.project.valueOf(a.pageInfo.date))
				return posts

			},
			taxonomy(){
				if(this.$Check(this.projectData.projectTaxonomy)){

					const t = this.projectData.projectTaxonomy

					return {
						networks: [].concat(t.networks.edges.map(n => n.node)),
						events: [].concat(t.events.edges.map(n => n.node)),
						exhibitions: [].concat(t.exhibitions.edges.map(n => n.node)),
						announcements: [].concat(t.announcements.edges.map(n => n.node)),
						publications: [].concat(t.publications.edges.map(n => n.node)),
					}

				}else{
					return {
						networks: [],
						events: [],
						exhibitions: [],
						announcements: [],
						publications: []
					}
				}
			},
			project(){ return this.projectData ? this.projectData.project : {} },
		},

		async asyncData({ $axios, $Req, store, params }){
    	const query = Project(params.project)

      try{
        const res = await $axios($Req(query))

        console.log(res)
        
        const title = res.data.data.project ? res.data.data.project.title : 'Project'
        const slug = res.data.data.project ? res.data.data.project.slug : ''

        store.commit('updatePath', [
        	{ title: 'Home', route: '/' },
        	{ title: 'Projects', route: '/' },
        	{ title: title, route: '/project/' + slug }
        ])

        return { projectData: res.data.data }

      }catch(e){
        return { project: e }
      }
  }
	}

</script>


<style>
	
	img.biennial_img{
		display: block;
		width: 100%;
	}

</style>