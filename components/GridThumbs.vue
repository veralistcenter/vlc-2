<template>
	<section class="grid mt--1">
		<component
			class="col col--tile mb--2"
			:class="colWidth"
			v-for="(post, i) in posts"
			:key="post.__typename + '__' + i"
			:is="postType(post.__typename)"
			:event="post"
			:exhibition="post"
			:announcement="post"
			:network="post"
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
					return 'col--1_4 mcol--1_2 thumb_quarter'
				}else if(this.size == 'Sixth' || this.size == 'Eighth'){
					return 'col--1_6 mcol--1_2 thumb_sixth'
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
		background: black;
		color: white;
	}

	.thumb_time.past_event{
		background: var(--light_grey);
		color: white;
	}


	.thumb_sixth *:not(.genath){
		font-family: var(--sans);
		font-size: var(--fs-s);
		line-height: var(--lh-s);
		letter-spacing: var(--ls-s);
	}


</style>