<template>
	<section class="grid mt--1">
		<component
			class="col col--tile mb--2"
			:class="colWidth"
			v-for="(post, i) in posts"
			v-if="$Check(post)"
			:key="post.__typename + '__' + i"
			:is="postType(post.__typename)"
			:event="post"
			:exhibition="post"
			:announcement="post"
			:network="post"
			:pub="post"
		/>		
	</section>
</template>

<script>
	export default{
		props: {
			size: String,
			posts: Array
		},
		computed: {
			colWidth(){
				if(this.size == 'Half'){
					return 'col--1_2 mcol--full thumb_half'
				}else if(this.size == 'Quarter'){
					return 'col--1_4 mcol--1_2 mcol--tile thumb_quarter'
				}else if(this.size == 'Sixth' || this.size == 'Eighth'){
					return 'col--1_6 mcol--1_2 mcol--tile thumb_sixth'
				}else if(this.size == 'Full'){
					return 'col--full mcol--1_2 mcol--tile'
				}
			},
			postType: state => type => {

				if(type == 'Event'){
					return 'ThumbEvent'
				}else if(type == 'Exhibition'){
					return 'ThumbExhibition'
				}else if(type == 'Publication'){
					return 'ThumbPublication'
				}else if(type == 'Announcement'){
					return 'ThumbAnnouncement'
				}else if(type == 'Network'){
					return 'ThumbNetwork'
				}

			}
		}
	}

</script>

<style>
	
	.thumb{

	}

	@media screen and (any-hover){
		.thumb img{
			transition: filter 0.1s ease-in-out;
		}
		.thumb:hover img{
			filter: grayscale(100%);
		}

		.thumb p,
		.thumb h1,
		.thumb h2,
		.thumb h3,
		.thumb h4{
			transition: color 0.1s ease-in-out;
		}

		.thumb:hover p,
		.thumb:hover h1,
		.thumb:hover h2,
		.thumb:hover h3,
		.thumb:hover h4:not(.thumb_time){
			color: var(--lg_text);
		}

	}

	.thumb img{
		display: block;
		width: 100%;
	}

	.thumb_time{
		width: calc(100% + var(--margin) + var(--margin) + 1px);
		transform: translateX(calc(-1 * var(--margin) - 1px)) translateY(1px);
		box-sizing: border-box;
	}

	.thumb_time.current_event{
		color: black;
	}

	.thumb_time.past_event{
		color: var(--lg_text);
	}


	.thumb_sixth *:not(.genath){
		font-family: var(--sans);
		font-size: var(--fs-s);
		line-height: var(--lh-s);
		letter-spacing: var(--ls-s);
	}


</style>