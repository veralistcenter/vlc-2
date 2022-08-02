<template>
	<div 
		class="vlc_page" 
		:class="['page_' + $route.name, {'is_contrasted': contrast}]"
		:style="bg"
	>
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
			bg(){

				let slug;
				const r = this.$route.name
				const { events, exhibitions, networks, fellowships, focus, prize, about, support, publications, archive } = this.slugs

				if(events.includes(r)){
					slug = 'events'
				}else if(exhibitions.includes(r)){
					slug = 'exhibitions'
				}else if(networks.includes(r)){
					slug = 'network'
				}else if(fellowships.includes(r)){
					slug = 'fellowships'
				}else if(focus.includes(r)){
					slug = 'focus-theme'
				}else if(prize.includes(r)){
					slug = 'prize'
				}else if(about.includes(r)){
					slug = 'about'
				}else if(support.includes(r)){
					slug = 'support'
				}else if(publications.includes(r)){
					slug = 'publications'
				}else if(archive.includes(r)){
					slug = 'archive'
				}else{
					slug = ''
				}

				const gs = this.gradients.filter(g => g.slug === slug && g.gradient !== false)

				if(this.$CheckA(gs)){
					return `--bg: linear-gradient(${gs[0].gradient.topColor}F2, ${gs[0].gradient.bottomColor}F2);`
				}else{
					return ''
				}

			},
			gradients(){
				return this.settings.pages.edges.map(p => {
					return {
						slug: p.node.slug,
						gradient: this.$CheckA(p.node.gradient.gradientPicker) ? p.node.gradient.gradientPicker[0].gradientPicker : false
					}
				})
			},
			...mapGetters({
				showMenu: 'getMenuStatus',
				contrast: 'getContrast',
				settings: 'getSettings',
				slugs: 'getSlugs'
			})
		}
	}

</script>

<style>

	.vlc_page{
		--bg: linear-gradient(rgba(255, 53, 53, 0.95), rgba(35, 83, 255, 0.95));
	}

	.vlc_page.is_contrasted{
		--bg: white !important;
	}
	
	.site_header:before,
	#homepage_menu:before,
	.site_footer:before{
		transition: background .2s ease-in-out;
		content: "";
		z-index: -1;
		pointer-events: none;
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--bg);
	}

</style>