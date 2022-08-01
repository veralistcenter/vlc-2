<template>
	<main class="page pt--8">
		<h1>event...</h1>

		<details><pre>{{event}}</pre></details>

		<MatrixBody v-if='$CheckA(event.bodyField.body)' :matrix="event.bodyField.body" />

	</main>
</template>

<script>

	import { Event } from '@/services/Events'
	
	export default{

		async asyncData({$axios, $Req, store, params}){

			const query = Event(params.event)

			try{
				const res = await $axios($Req(query))

				return {
					event: res.data.data.event
				}
			}catch(e){
				return {error: e}
			}
		}

	}

</script>
