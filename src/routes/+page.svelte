<script>
	import Bio from '../components/Bio.svelte';
</script>

<svelte:head>
	<title>Bio</title>
	<meta name="description" content="Information about main person in this website" />
	<meta name="author" content="Margarita Ginzburg" />
</svelte:head>

<section>
  <Bio />  
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
