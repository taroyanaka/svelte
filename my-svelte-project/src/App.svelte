<!-- vue.js to svelte
2 way data bind(v-model)
v-for
@click
$refs
mounted
async/await
-->
<script>
let hello_fetch_data = [];
const fetch_hello = async () => {
	// const response = await fetch("http://localhost:8000/");
	const response = await fetch("http://localhost:8000/read_all");
	const data = await response.json();
	// hello_fetch_data = data.message;
	hello_fetch_data = data;
};

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
// ja: svelteの変数や関数にchromeのdev toolのconsoleからアクセスする方法
// en: How to access svelte variables and functions from chrome dev tool console
const show_data_from_chrome_console = () => console.log(window.app.$capture_state().ramda_js_sample);
</script>



<div>
	<button on:click={fetch_hello}>fetch_hello</button>
	<!-- <button on:mount={fetch_hello}>fetch_hello</button> -->
	<!-- <p>{hello_fetch_data}</p> -->
	<ul>
		{#each hello_fetch_data as item, index}
			<!-- <li key={index}>{item}</li> -->
			<li>{item['id']}</li>
			<li>{Object.keys(item)}</li>
			<!-- <li>{item[Object.keys(item)]}</li> -->
			<!-- <li>{index}</li> -->
		{/each}
	</ul>
</div>

<span>edit: </span>
<a href="https://github.com/taroyanaka/svelte/blob/main/my-svelte-project/src/App.svelte">https://github.com/taroyanaka/svelte/blob/main/my-svelte-project/src/App.svelte</a>

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

<button on:click={show_data_from_chrome_console}>
	show_data_from_chrome_console:
	"window.app.$capture_state().ANY_PROPERTY_OR_FN_NAME"
</button>

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