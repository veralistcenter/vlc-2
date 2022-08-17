<template>
	<div class="search_wrapper" :class="{'show_search': showSearch}">
		<div class="search_input_wrapper" v-if="showSearch" :class="{'show_search': showSearch}">
			<input 
				ref="searchInput"
				class="genath" 
				type="text" 
				v-model="search" 
				placeholder="Searching..."
				@keydown.escape="cancelSearch"
				@keydown.enter="prepSearch"
			>			
		</div
		><button @click="prepSearch" class="search_toggle">
			<img src="/search.svg" />
		</button>
	</div>
</template>

<script>
	
	export default{
		data(){
			return {
				search: '',
				showSearch: false
			}
		},
		watch: {
			'showSearch': function(newSearch){
				if(newSearch === true){
					this.$nextTick(() => {
						this.$refs.searchInput.focus()
					})
				}
			},
			'$route.path': function(newpath){
				this.showSearch = false
			}
		},
		methods: {
			cancelSearch(){
				this.showSearch = false
			},
			prepSearch(e){
				e.preventDefault()

				if(!this.showSearch){
					this.showSearch = true
				}else{

					if(this.search === ''){ return }

					const searchQuery = this.search
					this.$router.push({ path: '/search', query: { search: searchQuery } })
				}

			}
		}
	}

</script>

<style>
	
	.search_wrapper{
		transition: all 0.2s ease-in;
		width: var(--menu_height);
		flex-basis: var(--menu_height);
		height: var(--menu_height);
		overflow: hidden;
	}

	.search_wrapper.show_search{
		width: calc(var(--margin) * 27);
		flex-basis: calc(var(--margin) * 27);
	}

	.search_input_wrapper{
		height: var(--menu_height);
		width: calc(var(--margin) * 23.5);
		display: inline-block;
		vertical-align: top;
	}

	@media screen and (max-width: 768px){
		.search_wrapper.show_search{
			width: calc(100vw - 7rem);
			flex-basis: calc(100vw - 7rem);
		}
		.search_input_wrapper{
			width: calc(100% - 3.5rem);
		}
	}

	.search_input_wrapper input{
		padding-left: .2rem;
		display: block;
		width: 100%;
		font-size: calc(var(--fs-g) * .9);
		line-height: var(--menu_height);
		height: var(--menu_height);
	}

</style>