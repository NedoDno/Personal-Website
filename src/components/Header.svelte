<script>
	import { page } from '$app/stores';
</script>

<header>
        <h1>Margarita Ginzburg</h1>
        <p>2nd year student at Innopolis University</p>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/comic' ? 'page' : undefined}>
				<a href="/comic">Comic from lab 2</a>
			</li>
		</ul>
</header>

<style>
	li {
		
		display: inline;
		background-color: #00000000;
		margin: 5px 0;
		padding: 10px;
		border-radius: 5px;
	}
	a{
		color: #ffffff;
	}
</style>