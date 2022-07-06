<template>
	<main class="page">
		
		<h1>events</h1>
		<pre>{{test}}</pre>
		

	</main>
</template>

<script>

		import { Events } from '@/services/Events.js'

	
	export default{
		async asyncData({$axios, $Req}){

			const query = Events

			try{
				const res = await $axios($Req(query))
				return { test: res.data.data }

			}catch(e){
				return { test: e }
			}

		}
	}

</script>
