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
				const isRecent = pageInfo => {
					if(this.$Check(pageInfo.endDate)){
						return (this.$moment().isAfter(this.$moment(pageInfo.endDate))) ? true : false
					}else if(this.$Check(pageInfo.date)){
						return (this.$moment().isAfter(this.$moment(pageInfo.date))) ? true : false
					}else{
						return false
					}
				}

				let posts = [].concat(this.recentPosts.filter(e => isRecent(e.pageInfo)).sort((a, b) => a.valueOf(a.pageInfo.date) - b.valueOf(a.pageInfo.date)))
				if(posts.length > 8){
					posts.length = 8
				}
				return posts
			}
		}
	}

</script>