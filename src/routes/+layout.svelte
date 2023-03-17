<script>
	import Header from './Header.svelte';
	import '$lib/css/styles.scss';
	import Footer from "./Footer.svelte";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style >
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		flex: 1;
		@apply flex flex-col w-full pt-12 m-0 box-border;
	}
</style>
