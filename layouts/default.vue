<template>
	<div 
		class="vlc_page" 
		:class="['page_' + $route.name, {'is_contrasted': contrast}]"
		:style="bg"
		ref="page"
	>

		<button @click="skipToContent" class="skip_to" tabindex="1">Skip to Content</button>

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
					return `--bg: linear-gradient(${gs[0].gradient.topColor}FA, ${gs[0].gradient.bottomColor}FA);`
				}else{
					return ''
				}

			},
			gradients(){
				return this.settings?.pages?.edges.map(p => {
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
		},
		mounted(){
			this.$nextTick(() => {
				this.setUpUserway()
				this.replaceFileLinks()
			})
		},
		watch: {
			'$route.path': function(newPath){
				this.$nextTick(() => {
					this.replaceFileLinks()
				})
			}
		},
		methods: {
			replaceFileLinks(){
				const p = this.$refs.page
				const as = p.querySelectorAll('a[href*="wp-content/uploads"]')
				console.log(as)

				as.forEach(a => {
					const link = a.getAttribute('href')
					a.setAttribute('href', link.replace('www.veralist', 'admin.veralist').replace('staging.veralist', 'admin.veralist').replace('://veralist', '://admin.veralist'))
				})

			},
			skipToContent(){
				const nodes  = document.querySelectorAll('main.page:not(.homepage_index) a, main.page:not(.homepage_index) button, .primary_carousel a, .primary_carousel button, .matrix_block a, .matrix_block button')

				nodes[0].focus()
			},

			setUpUserway(){

				if(document){
					(function(d){var s = d.createElement("script");s.setAttribute("data-account", "YgSAx9OhpA");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)
				}else{
					setTimeout(this.setUpUserway, 1000)
				}

				
			}
		}
	}

</script>

<style>

	.skip_to{
		position: fixed;
		top: -100vh;
		left: -100vw;
	}

	.skip_to:focus{
		top: var(--edge);
		left: var(--edge);
		z-index: 10000;
		background: white;
		padding: var(--margin) var(--margin);
		border: var(--border);
	}

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