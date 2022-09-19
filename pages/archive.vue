<template>
	<main class="page pt--8">
		<SiteSubnav :pages="[]" />

		<nav class="section_inset mb--1">
			<!-- tags -->
			<ul class="ul--inline">
				<li 
					class="node_item mr--1_2 mb--1_2" 
					v-for="(tag, i) in taxonomy" 
					:key="'tag_' + tag.slug"
					v-if="(!showAllTags && i < 15) || showAllTags"
					:class="{active: activeFilters.includes(tag.slug)}"
				>
					<button 
						class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2"
						@click="setTag(tag.slug)"
					>
						<span v-html="tag.name"></span>
					</button>					
				</li>

				<li v-if="!showAllTags" class="mr--1_2 mb--1_2" @click="showAllTags = true">
					<button class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2">View All</button>
				</li>
			</ul>

		</nav>

		<nav class="section_inset">
			<!-- chronological / alphabetical -->
			<h2 
				class="fs--regular caps grey_text mb--1"
			><button 
				:class="{active: sortByYear}"
				@click="sortByYear = true"
			>Chronological</button> / <button 
				:class="{active: !sortByYear}"
				@click="sortByYear = false"
			>Alphabetical</button></h2>



			<ul v-if="sortByYear" class="ul--inline">
				<li 
					v-for="(y, i) in byYear" 
					:key="'yearnav_' + y.year"
					v-if="!y.year.includes('valid') && $CheckA(filteredPosts(y.posts))"
				>
					<button 
						class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 fs--small" 
						@click="jumpTo('#year_' + y.year)" v-html="y.year"></button>
				</li>
			</ul>	

			<ul v-else="sortByYear" class="ul--inline">
				<li 
					v-for="(y, i) in byLetter" 
					:key="'letternav_' + y.letter"
					v-if="$CheckA(filteredPosts(y.posts))"
				>
					<button 
						class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 fs--small" 
						@click="jumpTo('#letter_' + y.letter)" v-html="y.letter"></button>
				</li>
			</ul>	

		</nav>

		<section>

			<section 
				class="section_inset" v-for="(year, i) in byYear" :key="'year_'+i+'_'+year"
				v-if="sortByYear && $CheckA(filteredPosts(year.posts))" 
			>
				<h2 :id="'year_' + year.year" class="archive_section caps fs--large mt--1 pt--1 mb--1" v-html="(!year.year.includes('valid')) ? year.year : '—'"></h2>

				<section class="grid grid--sans pb--1">
					<nuxt-link 
						v-for="(node, j) in filteredPosts(year.posts)" 
						:key="year.year + '_' + i + node.slug + j"
						class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
						:to="'/'+ path(node.__typename) +'/' + node.slug">
						<span class="node_name" v-html="node.title"></span>
					</nuxt-link>
				</section>
			</section>

			<section 				
				class="section_inset" 
				v-for="(letter, i) in byLetter" 
				:key="'letter_'+i+'_'+letter"
				v-if="!sortByYear && $CheckA(filteredPosts(letter.posts))" 
			>
				<h2 :id="'letter_' + letter.letter" class="archive_section caps fs--large mt--1 pt--1 mb--1" v-html="letter.letter"></h2>
				<section class="grid grid--sans pb--1">
					<nuxt-link 
						v-for="(node, j) in filteredPosts(letter.posts)" 
						:key="'l_' +letter.letter + '_' + i + node.slug + j"
						class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
						:to="'/'+ path(node.__typename) +'/' + node.slug">
						<span class="node_name" v-html="node.title"></span>
					</nuxt-link>
				</section>
			</section>
		</section>
	</main>
</template>

<script>

	import { Archive, ArchiveMoreEvents } from '@/services/Archive'
	
	export default{
		head(){
			return this.$metatags({title: 'Archive'})
		},
		data(){
			return {
				sortByYear: true,
				showAllTags: false,
				additionalEvents: []
			}
		},
		mounted(){
			if(this.$Check(this.eventInfo) && this.eventInfo.hasNextPage){
				this.fetchMoreEvents(this.eventInfo.endCursor)
			}
		},
		methods: {
			jumpTo(target){
				this.$scrollToTarget({t: target})
			},

			setTag(slug){
				let tags = this.$route.query.tags
				if(this.$Check(tags)){
					const existingTags = tags.split(',')
					const i = existingTags.indexOf(slug)
					if(i > -1){
						// remove tag
						existingTags.splice(i, 1)
						tags = existingTags.join(',')
					}else{
						tags = tags + ',' + slug
					}
				}else{
					tags = slug
				}
				this.$router.replace({query: {...this.$route.query, tags: tags}})
			},

			async fetchMoreEvents(cursor){
				try{
					const res = await this.$axios(this.$Req(ArchiveMoreEvents(cursor)))

					const newEvents = res.data.data.events.edges.map(e => e.node)
					this.additionalEvents = [].concat(this.additionalEvents).concat(newEvents)

					if(res.data.data.events?.pageInfo?.hasNextPage){
						this.fetchMoreEvents(res.data.data.events.pageInfo.endCursor)
					}else{
						console.log('no more events')
					}

				}catch(e){
					console.log(e)
				}
			}
		},

		computed: {
			path: state => type => {
				if(type === 'exhibition'){
					return 'Exhibitions'
				}else if(type == 'Announcement'){
					return 'announcement'
				}else if(type == 'Event'){
					return 'events'
				}else if(type == 'Publication'){
					return 'publications'
				}else{
					return type
				}
			},

			filteredPosts: state => posts => {

				if(state.activeFilters.length == 0){
					return posts
				}else if(state.$CheckA(posts)){

					const filteredPosts = posts.filter(p => {
						const tags = p.sitewideTags
						if(state.$CheckA(tags.edges)){
							const slugs = tags.edges.filter(e => state.$Check(e) && state.$Check(e.node)).map(e => e.node.slug)
							const matchingSlugs = slugs.filter(s => state.activeFilters.includes(s))
							return state.$CheckA(matchingSlugs)
						}else{
							return false
						}
					})

					return filteredPosts

				}else{
					return []
				}
				
			},

			activeFilters(){
				const tags = this.$route.query.tags
				if(this.$Check(tags)){
					let activeTags = tags.split(',')
					return activeTags
				}else{
					return []
				}

			},

			byYear(){
				let byYears = []

				// sort by default year
				let posts = [].concat(this.allPosts).sort((a, b) => {
					const bDate = (this.$Check(b) && b.pageInfo && this.$Check(b.pageInfo.date)) ? b.pageInfo.date : '2000-01-01'
					const aDate = (this.$Check(a) && a.pageInfo && this.$Check(a.pageInfo.date)) ? a.pageInfo.date : '2000-01-01'
					return bDate.localeCompare(aDate)
				})


				posts.forEach(e => {
					const year = this.$Check(e) ? this.$moment(e.pageInfo.date).format('YYYY') : 'Unsorted'
					const iO = byYears.map(y => y.year).indexOf(year)
					if(iO >= 0){
						byYears[iO].posts.push(e)
					}else{
						byYears.push({
							year,
							posts: [e]
						})
					}
				})

				let sortedYears = byYears.sort((a, b) => {
					const bDate = b.year
					const aDate = a.year
					return bDate.valueOf() - aDate.valueOf()
				})

				return sortedYears

			},
			byLetter(){
				let byLetters = []

				let posts = [].concat(this.allPosts).sort((a, b) => {

					const bTitle = b.title.replace(/[^a-z]/gi, '');
					const aTitle = a.title.replace(/[^a-z]/gi, '');

					const bLetter = (this.$Check(b) && b.title !== null) ? bTitle[0].toUpperCase() : 'A'
					const aLetter = (this.$Check(a) && a.title !== null) ? aTitle[0].toUpperCase() : 'B'
					return aLetter.localeCompare(bLetter)
				})


				posts.forEach(e => {

					const eTitle = (this.$Check(e) && this.$Check(e.title)) ? e.title.replace(/[^a-z]/gi, '') : 'A'

					const letter = eTitle[0].toUpperCase()
					const iO = byLetters.map(y => y.letter).indexOf(letter)
					if(iO >= 0){
						byLetters[iO].posts.push(e)
					}else{
						byLetters.push({
							letter,
							posts: [e]
						})
					}
				})

				return byLetters

			},
			allPosts(){
				const posts = [].concat(this.events).concat(this.additionalEvents).concat(this.publications).concat(this.exhibitions).concat(this.announcements)

				return posts

			}
		},

		async asyncData({$axios, $Req, store}){

			const query = Archive

			try{
				const res = await $axios($Req(query))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Archive', route: '/archive'}
        ])

				const data = res.data.data
				
				const exhibitions = data.exhibitions.edges.map(e => e.node)
				const events = data.events.edges.map(e => e.node)
				const eventInfo = data.events.pageInfo

				const publications = data.publications.edges.map(e => e.node)
				const announcements = data.announcements.edges.map(e => e.node)
				
				const taxonomy = data.taxonomy.edges.map(e => e.node)



				return { exhibitions, events, publications, announcements, eventInfo, taxonomy }

      }catch(e){
				return { error: e }
			}
		}

	}

</script>

<style>
	
	.archive_section{
		border-top: var(--border);
	}

</style>