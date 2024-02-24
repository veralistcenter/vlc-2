<template>
	<main></main>
</template>

<script>
	export default{
		async asyncData({ redirect, params }){
			return redirect(`/focus-theme/${params.focus}`)
		}
	}
</script>