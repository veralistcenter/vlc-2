<template>
	<main></main>
</template>

<script>
	export default{
		async asyncData({ redirect, params }){
			return redirect('/announcement/' + params.announcement)
		}
	}
</script>