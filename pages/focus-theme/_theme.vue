<template>
	<main class="page pt--8">
		<h1 class="genath section_heading title mb--1">
			<span v-html="b.title"></span><br />
			<span v-html="b.biennialInfo.dateRange.startingYear"></span>–<span v-html="b.biennialInfo.dateRange.endingYear"></span>
		</h1>
		

		<section class="grid">
				
			<aside class="col col--1_4 mcol--full">
				<figure>
					<img
						class="biennial_img"
						v-if="$Check(b.featImage) && $Check(b.featImage.featuredImage)"
						:src="b.featImage.featuredImage.sourceUrl"
						:srcset="b.featImage.featuredImage.srcSet"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
						:alt="b.featImage.featuredImage.altText"
						:title="b.featImage.featuredImage.title"
					/>

					<figcaption 
						class="fs--small mt--1_4"
						v-if="$Check(b.featImage.imageCaption)" v-html="b.featImage.imageCaption"></figcaption>
					<figcaption 
						class="fs--small mt--1_4"
						v-else-if="$Check(b.featImage) && $Check(b.featImage.featuredImage.caption)" v-html="b.featImage.featuredImage.caption"></figcaption>

				</figure>
			</aside>
			<section 
				class="col col--1_2 mcol--full mmt--1" 
			>
			
				<section class="fs--regular" v-html="b.biennialInfo.fullDescription"></section>

				<ProjectLink 
					class="mt--2"
					v-if="$CheckA(b.biennialInfo.associatedProject)" 
					:projects="b.biennialInfo.associatedProject" 
				/>

			</section>

			

		</section>

		<section v-if="$CheckA(taxonomy.networks)" class="section_inset mt--2 mb--2 pt--1 pb--1 border--top border--btm">
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


		<section class="mt--1 mb--4">
			<GridThumbs :posts="relatedPosts" :size="'Quarter'" />
		</section>

		<BiennialList :biennials="biennials" />

	</main>
</template>

<script>
	
	import { Biennials } from '@/services/Home'
	import { Biennial } from '@/services/Biennial'


	export default{
		head(){

			const description = `${this.b.biennialInfo.dateRange.startingYear}–${this.b.biennialInfo.dateRange.endingYear}`

			const image = (this.$Check(this.b.featImage) && this.$Check(this.b.featImage.featuredImage)) ? this.b.featImage.featuredImage.sourceUrl : undefined


			return this.$metatags({
				title: this.b.title,
				description,
				image
			})
		},

		computed: {
			relatedPosts(){
				let posts = []
					.concat(this.taxonomy.events)
					.concat(this.taxonomy.exhibitions)
					.concat(this.taxonomy.announcements)
					.concat(this.taxonomy.publications)
				
				const sortedPosts = posts
					.sort((a, b) => new Date(b.pageInfo.date) - new Date(a.pageInfo.date))
					// a.valueOf(a.pageInfo.date) - b.valueOf(a.pageInfo.date)
				
				return sortedPosts

			},
			taxonomy(){
				if(this.$Check(this.focus.biennialTaxonomy)){

					const t = this.focus.biennialTaxonomy

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
			b(){ return this.focus.biennial },
			biennials(){ return [].concat(this.focus.biennials.edges.map(e => e.node)) }
		},

		async asyncData({ $axios, $Req, store, params }){
    const query = Biennial(params.theme) + Biennials

      try{
        const res = await $axios($Req(query))
        
        const title = (res.data.data.biennial) ? res.data.data.biennial.title : 'Focus Theme'
        const slug = (res.data.data.biennial) ? res.data.data.biennial.slug : ''

        store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Focus Theme', route: '/focus-theme'},
        	{title: title, route: '/focus-theme/' + slug}
        ])

        return { focus: res.data.data }

      }catch(e){
        return { focus: e }
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