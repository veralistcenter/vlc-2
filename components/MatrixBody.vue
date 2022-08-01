<template>
	<section>
		<details class="section_inset"><pre>{{matrix}}</pre></details>

		<component
			v-for="(block, i) in matrix"
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
		computed:{
			type: state => t => {
				if(t.includes('Body_Richtext')){
					return 'MatrixRichtext'
				}else if(t.includes('Fellowship_Bodyfield_Body_RelatedNetwork')){
					return 'MatrixRelatedFellows'
				}
			}
		}
	}

</script>