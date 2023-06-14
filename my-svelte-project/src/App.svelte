<script>
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';
    import { bubble } from 'svelte/internal';

let message = "Hello Svelte!";
let items = ["item1", "item2", "item3"];
let myInput_for_refs_sample;
// let mounted_sample = "mounted_sample Svelte!";
let fetch_message = "";

// $: if(fetch_message) {fetch_hello();console.log("fetch_message");}


let hello_fetch_data = [];
let NAME = 'user1';
let PASSWORD = 'user_pass1';
let LINK = 'https://yanaka.dev/';
let COMMENT = 'comment1';
let COMMENT_REPLY = 'reply1';
let TAG = 'tag1';
let ALL_TAGS = [];
let RESPONSE;

const fetch_hello = async () => hello_fetch_data = await (await fetch("http://localhost:8000/read_all")).json();

const get_POST_object = (BODY_OBJ) => {
  return {
	method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(BODY_OBJ)
	}
};

const fetch_insert_link = async () => (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();

const fetch_delete_link = async (LINK_ID) => (await fetch('http://localhost:8000/delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID }))).json();
// const fetch_delete_link = async (LINK_ID) => console.log(LINK_ID);

const fetch_like_increment_or_decrement = async (LINK_ID) => RESPONSE = (await fetch('http://localhost:8000/like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID }))).json();
const fetch_insert_comment = async (LINK_ID) => RESPONSE = (await fetch('http://localhost:8000/insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, comment: COMMENT }))).json();
const fetch_delete_comment = async (COMMENT_ID) => RESPONSE = (await fetch('http://localhost:8000/delete_comment', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID }))).json();
const fetch_insert_comment_reply = async (COMMENT_ID) => RESPONSE = (await fetch('http://localhost:8000/insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID, comment_reply: COMMENT_REPLY }))).json();
const fetch_delete_comment_reply = async (COMMENT_REPLY_ID) => RESPONSE = (await fetch('http://localhost:8000/delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_reply_id: COMMENT_REPLY_ID }))).json();

const fetch_insert_tag = async (LINK_ID) => RESPONSE = (await fetch('http://localhost:8000/insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();

const fetch_get_tags_for_autocomplete = async () => {
	const json = (await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
					.json();
	const RES = await json;
	ALL_TAGS = await RES.tags;
};
// const fetch_delete_tag = async (LINK_ID, TAG_ID) => RESPONSE = (await fetch('http://localhost:8000/delete_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, id: TAG_ID }))).json();

// let ramda_js_sample = R.add(40, 2);
// const refs_sample = () => myInput_for_refs_sample.focus();
const refs_sample = () => console.log(myInput_for_refs_sample.value);
const handleMount = () => console.log("Component mounted.");
const fetchData = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const data = await response.json();
	fetch_message = data.title;
};
const show_data_from_chrome_console = () => console.log(window.app.$capture_state().ramda_js_sample);

onMount(fetch_hello);
afterUpdate(fetch_hello);

let the_val = "";
const get_the_val = () => console.log(the_val.value);
</script>


<!-- fetch_get_tags_for_autocomplete -->
<div>
	<!-- <input bind:this={myInput_for_refs_sample} /> -->
	<!-- <button on:click={refs_sample}>Focus input</button> -->
	<input bind:this={the_val} list="autocomplete_list" type="text" name="" id="hoge" bind:value={TAG} placeholder="tag" on:input={fetch_get_tags_for_autocomplete}>
    <datalist id="autocomplete_list">
		{#each ALL_TAGS as item, index}
		<option value={item.tag}>
		{/each}
    </datalist>
	<button on:click={get_the_val}>get_the_val</button>
</div>

<ul>
	{#each hello_fetch_data as item, index}
	<li>
		<input type="text" name="" id="" bind:value={COMMENT} placeholder="comment">
		<button on:click={fetch_insert_comment(item.id)}>fetch_insert_comment</button>


		<button on:click={fetch_insert_tag(item.id)}>fetch_insert_tag</button>
		

		<div>id: {item.id}</div>
		<div>tag:
			{#each item.tags as tags, INDEX}
			<!-- <div>id: {tags.id}</div> -->
			<div>tag: {tags.tag}</div>
			{/each}
		</div>	
		<div>link: {item.link}</div>
		<div>created_at: {item.created_at}</div>
		<div>updated_at: {item.updated_at}</div>
		<div>user_id: {item.user_id}</div>
		<div>username: {item.username}</div>
		<div>like_count: {item.like_count}</div>
		<button on:click={fetch_like_increment_or_decrement(item.id)}>like_increment_or_decrement</button>

		<ul class="comment_zone">{#each item.comments_and_replies as comments_and_reply, INDEX}
			<li>comment: {comments_and_reply[INDEX]['comment']}</li>
			<li>created_at: {comments_and_reply[INDEX]['created_at']}</li>
			<li>id: {comments_and_reply[INDEX]['id']}</li>
			<button on:click={fetch_delete_comment(comments_and_reply[INDEX]['id'])}>fetch_delete_comment</button>
			<li>updated_at: {comments_and_reply[INDEX]['updated_at']}</li>
			<li>user_id: {comments_and_reply[INDEX]['user_id']}</li>
			<li>username: {comments_and_reply[INDEX]['username']}</li>

			<!-- fetch_insert_comment_reply -->
			<input bind:value={COMMENT_REPLY} type="text" placeholder="comment_reply">
			<button on:click={fetch_insert_comment_reply(comments_and_reply[INDEX]['id'])}>fetch_insert_comment_reply</button>
			<li class="reply_zone">comment_replies:
				<ul>{#each comments_and_reply['comment_replies'] as comment_reply, INDEX}
					<!-- <li>comment_reply: {comment_reply['comment_reply']}</li> -->
					<!-- <li>created_at: {comment_reply['created_at']}</li> -->
					<!-- <li>id: {comment_reply['id']}</li> -->
					<li>reply: {comment_reply['reply']}</li>
					<!-- <li>updated_at: {comment_reply['updated_at']}</li> -->
					<!-- <li>user_id: {comment_reply['user_id']}</li> -->
					<li>username: {comment_reply['username']}</li>
					<button on:click={fetch_delete_comment_reply(comment_reply['id'])}>fetch_delete_comment_reply</button>
				{/each}</ul>
			</li>
		{/each}</ul>
	</li>
	{/each}
</ul>
<input bind:value={NAME} type="text" placeholder="name">
<input bind:value={PASSWORD} type="text" placeholder="password">
<input bind:value={LINK} type="text" placeholder="link_url">
<input bind:value={COMMENT} type="text" placeholder="comment">
<input bind:value={COMMENT_REPLY} type="text" placeholder="comment_reply">
<input bind:value={TAG} type="text" placeholder="tag">
<button on:click={fetch_insert_link}>insert_link</button>

<span>edit: </span>
<a href="https://github.com/taroyanaka/svelte/blob/main/my-svelte-project/src/App.svelte">https://github.com/taroyanaka/svelte/blob/main/my-svelte-project/src/App.svelte</a>
<!-- <p>ramda.js sample: {ramda_js_sample}</p> -->
<div>
	<input bind:value={message} />
	<p>{message}</p>
</div>  
<ul>
{#each items as item, index}
	<li key={index}>{item}</li>
{/each}
</ul>
<div>
	<input bind:this={myInput_for_refs_sample} />
	<button on:click={refs_sample}>Focus input</button>
</div>
<!-- <div on:mount={handleMount}> -->
	<!-- <p>{mounted_sample}</p> -->
<!-- </div> -->
<div>
	<button on:click={fetchData}>fetchData</button>
	<p>{fetch_message}</p>
</div>

<button on:click={show_data_from_chrome_console}>
	show_data_from_chrome_console:
	"window.app.$capture_state().ANY_PROPERTY_OR_FN_NAME"
</button>

<style>
	/* div {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	} */
	.comment_zone, .reply_zone{
		margin-left: 2rem;
	}

	@media (min-width: 640px) {
		div {
			max-width: none;
		}
	}
</style>