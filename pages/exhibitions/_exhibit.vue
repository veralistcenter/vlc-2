<template>
	<main class="page pt--8">
		<h1>exhibit...</h1>

		<details><pre>{{exhibit}}</pre></details>

		<MatrixBody v-if='$CheckA(exhibit.bodyField.body)' :matrix="exhibit.bodyField.body" />

	</main>
</template>

<script>

	import { Exhibition } from '@/services/Exhibitions'
	
	export default{

		async asyncData({$axios, $Req, store, params}){

			const query = Exhibition(params.exhibit)

			try{
				const res = await $axios($Req(query))

				return {
					exhibit: res.data.data.exhibit
				}
			}catch(e){
				return {error: e}
			}
		}

	}

</script>
