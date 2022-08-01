<template>
	<div :class="['page_' + $route.name, {'is_contrasted': contrast}]">
		<transition name="fade">
			<SiteHeader v-if="(showMenu && $route.name === 'index') || $route.name !== 'index'" />	
		</transition>
		
		<Nuxt />

		<SiteFooter />
	</div>
</template>

<script>
	
	import { mapGetters } from 'vuex'

	export default{
		computed: {
			...mapGetters({
				showMenu: 'getMenuStatus',
				contrast: 'getContrast'
			})
		}
	}

</script>