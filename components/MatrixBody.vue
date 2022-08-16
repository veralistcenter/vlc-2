<template>
	<section class="matrix_body">

		<nav class="section_inset mb--4">
			<ul class="ul--inline">
				<li 
					v-for="(b, i) in matrix" :key="'nav_' + i"
					v-if="b.title"
				>
					<button 
						class="btn--grey mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 mb--1_2"
						@click="jumpTo('#block_' + i)" 
						v-html="b.title"></button>
				</li>
			</ul>

		</nav>

		<component
			v-for="(block, i) in matrix"
			v-if="$Check(block)"
			:id="'block_' + i"
			:key="block.__typename + '__' + i"
			:is="type(block.__typename)"
			:block="block" 
		/>

	</section>
</template>

<script>
	
	export default{
		props: {
			matrix: Array
		},
		methods: {
			jumpTo(target){
				this.$scrollToTarget({t: target})
			}
		},
		computed:{
			type: state => t => {

				if(t.includes('Body_Richtext')){
					return 'MatrixRichtext'
				}else if(t.includes('Fellowship_Bodyfield_Body_RelatedNetwork')){
					return 'MatrixRelatedFellows'
				}else if(t.includes('Body_RelatedNetwork')){
					return 'MatrixNetwork'
				}else if(t.includes('Body_Footnotes')){
					return 'MatrixFootnotes'
				}else if(t.includes('Body_Button')){
					return 'MatrixButton'
				}else if(t.includes('Body_RelatedPages') || t.includes('Body_RelatedAnnouncements')){
					return 'MatrixGrid'
				}else if(t.includes('Body_SingleImage')){
					return 'MatrixImage'
				}else if(t.includes('Body_Gallery')){
					return 'MatrixCarousel'
				}else if(t.includes('Body_Accordian')){
					return 'MatrixAccordian'
				}else if(t.includes('Body_VideoPlayer')){
					return 'MatrixVideo'
				}else if(t.includes('Body_Pullquote')){
					return 'MatrixQuote'
				}else if(t.includes('Body_RelatedColumn')){
					return 'MatrixColumn'
				}else{
					return 'MatrixPre'
				}

				// still need video embed
				// still need audio embed
			}
		}
	}

</script>