<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading" v-html="recently.title"></h1>
		<GridThumbs :posts="recentlyEvents" :size="size" />
	</section>
</template>


<script>
	
	export default{
		props: {
			size: String,
			recently: Object,
			recentPosts: Array
		},
		computed: {
			recentlyEvents(){
				const m = this.$moment()
				const startDate = d => (m.isAfter(d)) ? true : false
				const endDate = d => (m.isAfter(d)) ? true : false
				let posts = [].concat(this.recentPosts.filter(e => startDate(e.pageInfo.date) && endDate(e.pageInfo.endDate)))
				if(posts.length > 8){
					posts.length = 8
				}
				return posts
			}
		}
	}

</script>