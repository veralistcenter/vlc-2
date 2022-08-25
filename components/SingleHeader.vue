<template>
	<header class="single_header">
		<div class="grid" :class="{'grid--center': !$Check(post.featImage.featuredImage)}">
			<section class="col col--1_2 mcol--full pb--1" v-if="$Check(post.featImage.featuredImage)">
				<figure 
					class="header_image"
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
			<section 
				class="col mcol--full col--end"
				:class="{'col--1_2': $Check(post.featImage.featuredImage), 'col--header': !$Check(post.featImage.featuredImage)}"
			>
				<h1 class="fs--small caps" v-if="$Check(types)" v-html="types"></h1>
				<h2 class="genath title" v-html="post.title"></h2>
				<h3 class="genath title" v-if="$Check(post.pageInfo.date)" v-html="$Dated({start: post.pageInfo.date, end: post.pageInfo.endDate })"></h3>
				<h4 class="genath title" v-html="$Check(post.pageInfo.timeOverride) ? post.pageInfo.timeOverride : timeRange"></h4>

				<section 
					class="mt--1 max--500 fs--small" 
					v-if="$Check(post.pageInfo.previewInfo.description)" 
					v-html="post.pageInfo.previewInfo.description"></section>

				<section
					class="mt--1 max--500 fs--small"
					v-if="$Check(post.pageInfo.previewInfo.primaryDescription)"
					v-html="post.pageInfo.previewInfo.primaryDescription"
				></section>
				
				<ul class="ul--inline mt--1 mb--1" v-if="$CheckA(tags)">
					<li 
						v-for="(tag, i) in tags" 
						:key="'tag_'+ i"
						class="mr--1_2 fs--small" 
					>
							<nuxt-link 
								class="btn--inline--grey caps"
								:to="'/archive?tags=' +tag.slug" 
								v-html="tag.name"></nuxt-link>
						</li>
				</ul>

				<section class="fs--regular mb--1" v-if="$Check(post.pageInfo.previewInfo.button) && $Check(post.pageInfo.previewInfo.button.buttonLink)">
					<a 
						target="_blank" 
						class="fs--regular btn--full" 
						:href="post.pageInfo.previewInfo.button.buttonLink" 
						v-html="post.pageInfo.previewInfo.button.buttonName"
					></a>
				</section>

				<section
					class="mt--1 max--500 fs--small"
					v-if="$Check(post.pageInfo.previewInfo.secondaryDescription)"
					v-html="post.pageInfo.previewInfo.secondaryDescription"
				></section>

				<BiennialLink 
					class="mt--2"
					v-if="$CheckA(post.pageInfo.previewInfo.associatedBiennial)" 
					:biennials="post.pageInfo.previewInfo.associatedBiennial" 
				/>

			</section>
		</div>

		<div class="border--btm"></div>
		<aside 
			role="caption" 
			v-if="$Check(post.featImage.featuredImage)" class="section_inset image_caption max--auto mt--1_2 fs--small">
			<div 
				v-if="$Check(post.featImage.imageCaption)" 
				v-html="post.featImage.imageCaption"></div>
			<div v-else v-html="post.featImage.featuredImage.caption"></div>
		</aside>
	</header>
</template>

<script>
	
	export default{

		head(){

			let description = undefined

			if(this.$Check(this.post.pageInfo.previewInfo.description)){
				description = this.post.pageInfo.previewInfo.description
			}else{
				description = this.$Check(this.post.pageInfo.timeOverride) ? this.post.pageInfo.timeOverride : this.$Dated({start: this.post.pageInfo.date, end: this.post.pageInfo.endDate })
			}

			return this.$metatags({
				title: this.post.title,
				image: this.$Check(this.post.featImage.featuredImage) ? this.post.featImage.featuredImage.sourceUrl : undefined,
				description: description
			})
		},

		props: {
			post: Object
		},
		computed:{
			types(){
				if(this.$Check(this.post.eventTypes)){
					return this.$CheckA(this.post.eventTypes.edges) ? this.post.eventTypes.edges.map(e => e.node.name).join(', ') : 'Event'
				}else if(this.$Check(this.post.exhibitionTypes)){
					return this.$CheckA(this.post.exhibitionTypes.edges) ? this.post.exhibitionTypes.edges.map(e => e.node.name).join(', ') : 'Exhibition'
				}else if(this.post.__typename === 'Announcement'){
					return 'Announcement'
				}
			},
			tags(){
				if(this.$Check(this.post.sitewideTags) && this.$CheckA(this.post.sitewideTags.edges)){
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

<style>
	
	.image_caption a{
		text-decoration: underline;
		text-decoration-thickness: 1.5px;
		text-underline-offset: 2px;
	}

	@media screen and (any-hover: hover){
		.image_caption a{
			text-decoration: none;
		}
	}

</style>