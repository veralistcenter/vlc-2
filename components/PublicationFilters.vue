<template>
	<nav class="section_inset mt--1 mb--4">
		<h2 class="genath g--small mb--1_2">Filter by 
			<button 
				@click="setPotential('contributors')" 
				class="underline"
				:class="{grey_text: (potential !== 'contributors' && potential !== false)}"
			>Contributor</button>, 
			<button 
				@click="setPotential('years')" 
				class="underline"
				:class="{grey_text: (potential !== 'years' && potential !== false)}"
			>Year Published</button>, 
			<button 
				v-if="$CheckA(formats)"
				@click="setPotential('formats')" 
				class="underline"
				:class="{grey_text: (potential !== 'formats' && potential !== false)}"
			>Format</button><span v-if="$CheckA(formats)">, </span>
			<button 
				@click="setPotential('tags')" 
				class="underline"
				:class="{grey_text: (potential !== 'tags' && potential !== false)}"
			>Tag</button>, 
			or <button 
				@click="setPotential('themes')" 
				class="underline"
				:class="{grey_text: (potential !== 'themes' && potential !== false)}"
			>Focus Theme</button>
		</h2>

		<section class="potential_filters mt--1" v-if="potential">
			<ul class="ul--inline">
				<li 
					v-for="(p, i) in list" 
					:key="'potential_'+ i"
					class="node_item mr--1_2 mb--1_2" 
					:class="{active: condensedFilters.includes(p.slug)}"
				>
					<button 
						@click="setFilter(p)" 
						class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2" 
						v-html="p.name"></button>
				</li>
			</ul>
		</section>

		<section class="active_filters mt--1" v-if="$CheckA(filters)">
			<ul class="ul--inline">
				<li class="genath g--small mr--1_2">{{count}} Results for </li>
				<li 
					v-for="(p, i) in filters" 
					:key="'active_'+ i"
					class="node_item mr--1_2 mb--1_2" 
				>
					<button @click="setFilter(p)" class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2 open">
						<span v-html="p.name"></span>
						<div class="cross_container">
							<div class="cross cross--vert"></div>
							<div class="cross cross--hor"></div>
						</div>
					</button>
				</li>
			</ul>
		</section>

	</nav>
</template>

<script>
	export default{
		props: {
			tags: Array,
			formats: Array,
			years: Array,
			themes: Array,
			contributors: Array,
			count: Number
		},
		data(){
			return {
				potential: false,
				filters: []
			}
		},
		computed: {
			list(){ return this[this.potential] },
			condensedFilters(){
				return [].concat(this.filters).map(f => f.slug)
			}
		},
		watch: {
			filters(newFilters){
				this.$emit('newFilters', newFilters)
			}
		},
		methods: {
			setFilter(filter){
				const i = this.condensedFilters.indexOf(filter.slug)
				if(i > -1){
					// exists, remove
					this.filters.splice(i, 1)
				}else{
					this.filters.push(filter)
				}
			},
			setPotential(string){
				this.potential = (this.potential === string) ? false : string
			}
		}
	}
</script>