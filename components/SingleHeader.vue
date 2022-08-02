<template>
	<header class="single_header">
		<div class="grid">
			<section class="col col--1_2 pb--1">
				<figure 
					class="header_image"
					v-if="$Check(post.featImage.featuredImage)"
				>
					<img 
						:src="post.featImage.featuredImage.sourceUrl"
						:alt="post.featImage.featuredImage.altText"
						:srcset="post.featImage.featuredImage.srcSet"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
					>
					<figcaption style="visibility: hidden; overflow: hidden; height: 0px;" class="mt--1_2 fs--small" v-html="post.featImage.featuredImage.caption"></figcaption>
				</figure>
			</section>
			<section class="col col--1_2 col--end">
				<h1 class="fs--small caps" v-html="types"></h1>
				<h2 class="genath title" v-html="post.title"></h2>
				<h3 class="genath title" v-html="$Check(post.pageInfo.timeOverride) ? post.pageInfo.timeOverride : $Dated({start: post.pageInfo.date, end: post.pageInfo.endDate })"></h3>
				<h4 class="genath title" v-html="$Check(post.pageInfo.timeOverride) ? post.pageInfo.timeOverride : timeRange"></h4>
				
				<ul class="ul--inline mt--1" v-if="$CheckA(tags)">
					<li 
						v-for="(tag, i) in tags" 
						:key="'tag_'+ i"
						class="mr--1_2 fs--regular" 
					>
							<nuxt-link 
								class="btn--inline--grey caps"
								:to="'/archive?tag=' +tag.slug" 
								v-html="tag.name"></nuxt-link>
						</li>
				</ul>

			</section>
		</div>

		<div class="border--btm"></div>
		<aside 
			role="caption" 
			v-if="$Check(post.featImage.featuredImage)" class="section_inset mt--1_2 fs--small">
			<p v-html="post.featImage.featuredImage.caption"></p>
		</aside>
	</header>
</template>

<script>
	
	export default{
		props: {
			post: Object
		},
		computed:{
			types(){
				if(this.post.eventTypes){
					return this.$CheckA(this.post.eventTypes.edges) ? this.post.eventTypes.edges.map(e => e.node.name).join(', ') : 'Event'
				}else if(this.post.exhibitionTypes){
					return this.$CheckA(this.post.exhibitionTypes.edges) ? this.post.exhibitionTypes.edges.map(e => e.node.name).join(', ') : 'Exhibition'
				}
			},
			tags(){
				if(this.$CheckA(this.post.sitewideTags.edges)){
					return this.post.sitewideTags.edges.map(e => e.node)
				}
			},
			timeRange(){
				const { timeEnd, timeStart } = this.post.pageInfo
				if(this.$Check(timeEnd) && !this.$Check(timeStart)){
					return timeEnd
				}else if(!this.$Check(timeEnd) && this.$Check(timeStart)){
					return timeStart
				}else if(!this.$Check(timeEnd) && !this.$Check(timeStart)){
					return ''
				}else{
					if(timeEnd.includes('pm') && timeStart.includes('pm')){
						return `${timeStart.replace(' pm', '')}–${timeEnd.replace(' ', '')} ET`
					}else if(timeEnd.includes('am') && timeStart.includes('am')){
						return `${timeStart.replace(' am', '')}–${timeEnd.replace(' ', '')} ET`
					}else{
						return `${timeStart.replace(' ', '')}–${timeEnd.replace(' ', '')} ET`
					}
				}
			}
		}
	}

</script>