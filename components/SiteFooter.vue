<template>
	<footer class="site_footer grid mt--4 pb--8 pt--1">
		<section class="col col--1_4">
			<nuxt-link class="menu_logo_small" to="/">
				<img src="/tns-vlc-logo-2.svg" />
			</nuxt-link>
		</section>
		<section class="col col--1_4 fs--small" v-html="footer.columnOne"></section>
		<section class="col col--1_4 fs--small" v-html="footer.columnTwo"></section>
		<section class="col col--1_4 col--end fs--small" v-html="footer.columnThree"></section>
	</footer>
</template>

<script>

	import { mapGetters } from 'vuex'
	
	export default{
		computed: {
			footer(){ return this.settings.acfOptions.footer },
			...mapGetters({
				settings: 'getSettings'
			})
		}
	}

</script>

<style>
	
	.site_footer{
		border-top: var(--border);
	}

	.menu_logo_small{
		display: block;
		height: 3.5rem;
		text-align: left;
	}

	.menu_logo_small img{
		display: block;
		height: 100%;
	}

</style>