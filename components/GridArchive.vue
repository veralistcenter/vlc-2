<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading" v-html="archive.archiveTitle"></h1>
		<GridThumbs v-if="$CheckA(posts)" :posts="posts" :size="calcSize" />

	</section>
</template>

<script>

	import { FeaturedArchive } from '@/services/Archive'
	
	export default{
		props: {
			archive: Object
		},
		mounted(){
			if(this.archive.displayMethod){
				this.fetchArchivedPosts()
			}
		},
		data(){
			return {
				posts: []
			}
		},
		computed: {
			calcSize(){

				const quarter = ['Four', 'Eight', 'Twelve']
				const sixth = ['Sixteen']
				const half = ['Two']

				if(quarter.includes(this.archive.displayAmount)){
					return 'Quarter'
				}else if(sixth.includes(this.archive.displayAmount)){
					return 'Sixth'
				}else if(half.includes(this.archive.displayAmount)){
					return 'Half'
				}else{
					return 'Quarter'
				}
				
			}
		},
		methods: {
			async fetchArchivedPosts(){

				try{
					const res = await this.$axios(this.$Req(FeaturedArchive))

					const d = res.data.data

					const events = d.events.edges.map(e => e.node).filter(e => e.archiveSelection.selectedArchiveEvent == true)
					const exhibitions = d.exhibitions.edges.map(e => e.node).filter(e => e.exhibitionArchiveSelection.selectedArchiveExhibition == true)
					const publications = d.publications.edges.map(e => e.node).filter(e => e.archiveSelectionPublication.selectedArchivePublication == true)


					const posts = [].concat(events).concat(exhibitions).concat(publications)

					function shuffle(array) {
					  let currentIndex = array.length,  randomIndex;

					  // While there remain elements to shuffle.
					  while (currentIndex != 0) {

					    // Pick a remaining element.
					    randomIndex = Math.floor(Math.random() * currentIndex);
					    currentIndex--;

					    // And swap it with the current element.
					    [array[currentIndex], array[randomIndex]] = [
					      array[randomIndex], array[currentIndex]];
					  }

					  return array;
					}

					let shuffled = shuffle(posts)

					const l = this.archive.displayAmount
					if(l == 'Two'){
						shuffled.length = 2
					}else if(l == 'Four'){
						shuffled.length = 4
					}else if(l == 'Eight'){
						shuffled.length = 8
					}else if(l == 'Twelve'){
						shuffled.length = 12
					}else if(l == 'Sixteen'){
						shuffled.length = 16
					}

					this.posts = shuffled

				}catch(e){
					console.log('error', e)
				}

			}
		}
	}

</script>