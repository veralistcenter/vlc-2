<template>
	<nav>		
		<nuxt-link 
			v-for="(p, i) in projects" 
			:key="p.slug" 
			:to="'/projects/' + p.slug"
			v-html="p.title"
			class="center caps fs--regular btn--full btn--project"
		></nuxt-link>
	</nav>
</template>

<script>
		
		export default{
			props: {
				projects: Array
			},
		}


</script>