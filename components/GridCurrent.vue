<template>
	<section class="section mt--2" v-if="$CheckA(currentEvents)">
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
				
				const isCurrent = pageInfo => {
					if(this.$Check(pageInfo.endDate)){
						return this.$moment().isAfter(this.$moment(pageInfo.date)) && (this.$moment().isBefore(this.$moment(pageInfo.endDate)) || this.$moment(pageInfo.endDate).isSame(this.$moment(), 'day')) ? true : false

					}else{
						return this.$moment(pageInfo.date).isSame(this.$moment(), 'day') ? true : false
					}
				}

				// const startDate = d => (m.isAfter(d) || this.$moment(d).isSame(m, 'day')) ? true : false
				// const endDate = d => (m.isBefore(d) || this.$moment(d).isSame(m, 'day')) ? true : false

				return this.recentPosts.filter(e => isCurrent(pageInfo))
			}
		}
	}

</script>