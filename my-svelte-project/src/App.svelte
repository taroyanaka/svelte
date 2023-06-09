<!-- vue.js to svelte
2 way data bind(v-model)
v-for
@click
$refs
mounted
async/await
-->
<script>
let ramda_js_sample = R.add(40, 2);
let message = "Hello Svelte!";
let items = ["item1", "item2", "item3"];
const handleClick = () => console.log("Button clicked");
let myInput_for_refs_sample;
const refs_sample = () => myInput_for_refs_sample.focus();
let mounted_sample = "mounted_sample Svelte!";
const handleMount = () => console.log("Component mounted.");
let fetch_message = "";
const fetchData = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const data = await response.json();
	fetch_message = data.title;
};
</script>





<p>ramda.js sample: {ramda_js_sample}</p>

<div>
	<input bind:value={message} />
	<p>{message}</p>
</div>  

<ul>
{#each items as item, index}
	<li key={index}>{item}</li>
{/each}
</ul>

<button on:click={handleClick}>Click me</button>

<div>
	<input bind:this={myInput_for_refs_sample} />
	<button on:click={refs_sample}>Focus input</button>
</div>

<div on:mount={handleMount}>
	<p>{mounted_sample}</p>
</div>

<div>
	<button on:click={fetchData}>fetchData</button>
	<p>{fetch_message}</p>
</div>





<style>
	div {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		div {
			max-width: none;
		}
	}
</style>