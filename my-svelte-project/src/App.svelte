<!-- vue.js to svelte
2 way data bind(v-model)
v-for
@click
$refs
mounted
async/await
-->
<script>
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';

let hello_fetch_data = [];
const fetch_hello = async () => hello_fetch_data = await (await fetch("http://localhost:8000/read_all")).json();
onMount(fetch_hello);
afterUpdate(fetch_hello);

const get_POST_object = (BODY_OBJ) => {
  return {
	method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(BODY_OBJ)
	}
};

let NAME = 'user1';
let PASSWORD = 'user_pass1';
let LINK = 'https://yanaka.dev/';
let COMMENT = 'comment1';
let COMMENT_REPLY = 'comment_reply1';
let TAG = 'tag1';
const fetch_insert_link = async () => await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK })).json();

const fetch_delete_link = async (LINK_ID) => await fetch('http://localhost:8000/delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID })).json();
const fetch_like_increment_or_decrement = async (LINK_ID) => await fetch('http://localhost:8000/like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID })).json();
const fetch_insert_comment = async (LINK_ID) => await fetch('http://localhost:8000/insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, comment: COMMENT })).json();
const fetch_delete_comment = async (COMMENT_ID) => await fetch('http://localhost:8000/delete_comment', get_POST_object({ name: NAME, password: PASSWORD, id: COMMENT_ID })).json();
const fetch_insert_comment_reply = async (COMMENT_ID) => await fetch('http://localhost:8000/insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID, comment_reply: COMMENT_REPLY })).json();
const fetch_delete_comment_reply = async (COMMENT_REPLY_ID) => await fetch('http://localhost:8000/delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, id: COMMENT_REPLY_ID })).json();
const fetch_insert_tag = async (LINK_ID) => await fetch('http://localhost:8000/insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG })).json();
const fetch_get_tags_for_autocomplete = async () => await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD, tag: TAG })).json();
const fetch_delete_tag = async (LINK_ID, TAG_ID) => await fetch('http://localhost:8000/delete_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, id: TAG_ID })).json();



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



<!-- <input bind:this={name} bind:value={name} type="text" placeholder="name"> -->
<input bind:value={NAME} type="text" placeholder="name">
<input bind:value={PASSWORD} type="text" placeholder="password">
<input bind:value={LINK} type="text" placeholder="link_url">
<!-- comment, comment_reply, tagも同様にinputを作る	 -->
<input bind:value={COMMENT} type="text" placeholder="comment">
<input bind:value={COMMENT_REPLY} type="text" placeholder="comment_reply">
<input bind:value={TAG} type="text" placeholder="tag">


<button on:click={fetch_insert_link}>insert_link</button>



<ul>
{#each hello_fetch_data as item, index}
<li>
	<ul>
	{#each Object.entries(item) as ary, key}
	<li>
		{typeof ary[1] === 'object' ? [] : ary[1]}

		<ul>
		{#each (typeof ary[1] === 'object' ? ary[1] : []) as in_ary}
			{#each Object.entries(in_ary) as in_ary2}
			<li>{in_ary2[0]}: {in_ary2[1]}</li>
			{/each}
		{/each}
		</ul>
	</li>
	{/each}
	</ul>
</li>
{/each}
</ul>


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