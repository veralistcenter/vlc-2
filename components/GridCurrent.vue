<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading" v-html="current.title"></h1>
		<GridThumbs :posts="currentEvents" :size="size" />
	</section>
</template>


<script>
	
	export default{
		props: {
			current: Object,
			size: String,
			recentPosts: Array
		},
		computed: {
			currentEvents(){
				const m = this.$moment()
				const startDate = d => (m.isAfter(d) || this.$moment(d).isSame(m, 'day')) ? true : false
				const endDate = d => (m.isBefore(d) || this.$moment(d).isSame(m, 'day')) ? true : false

				return this.recentPosts.filter(e => startDate(e.pageInfo.date) && endDate(e.pageInfo.endDate))
			}
		}
	}

</script>