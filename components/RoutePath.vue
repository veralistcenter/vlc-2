<template>
	<nav class="page_path pb--1_2 pt--1_2 pl--1 pr--1" v-if="$route.name !== 'index' && paths.length > 0">
		<p class="caps fs--small">
			<nuxt-link 
				v-for="(p, i) in paths" 
				:key="'path'+i"
				class="path_item"
				:to="p.route"
				v-html="p.title"
			></nuxt-link>


		</p>
	</nav>
</template>

<script>

	import { mapGetters } from 'vuex'
	
	export default{
		computed: {
			...mapGetters({
				paths: 'getPaths'
			})
		}
	}

</script>