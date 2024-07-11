<script lang="ts">
	import Comic from '../../components/Comic.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Comic </title>
	<meta name="Comic" content="Comic from the lab 2" />
</svelte:head>

<div>
  <Comic comicInfo={data.comicInfo}/>  
</div>
