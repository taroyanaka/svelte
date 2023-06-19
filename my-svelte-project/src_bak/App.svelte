<script>
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';

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
let TAG_VAL = "";
const WHITE_LIST_URL_ARRAY = [
	'https://www.yahoo.co.jp/',
	'https://www.google.co.jp/',
	'https://www.youtube.com/',
];
let ERROR_MESSAGE = "";

let ORDER_BY = 'DESC';
let ORDER_BY_COLUMN = 'links.id';
let REQ_TAG = '';
let USER = '';



const fetch_hello = async (PATTERN_NUM_PARAM) => {
	const PATTERN_NUM = PATTERN_NUM_PARAM ? PATTERN_NUM_PARAM : 0;
	// ORDER_BY, ORDER_BY_COLUMN, REQ_TAG, USER これらの変数を設定してread_all_testのエンドポイントを叩く
	switch(PATTERN_NUM){
		case 1: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1','user1']; break;
		case 2: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1',null]; break;
		case 3: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id',null,'user1']; break;
		case 4: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id','tag1','user1']; break;
		case 5: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id','tag1',null]; break;
		case 6: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id',null,'user1']; break;
		case 7: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id',null,null]; break;

		case 0: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1','user1']; break;
		default: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id',null,null]; break;
	}
	// console.log([ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER]);
	// getパラメーターを作る関数。[ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER]にnullが含まれている場合はパラメーターに含めない
	const make_get_param = () => {
		const get_param_array = [];
		if(ORDER_BY) get_param_array.push(`order_by=${ORDER_BY}`);
		if(ORDER_BY_COLUMN) get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`);
		if(REQ_TAG) get_param_array.push(`tag=${REQ_TAG}`);
		if(USER) get_param_array.push(`user=${USER}`);
		// const endpoint = 'http://localhost:8000/read_all_test';
		const endpoint = 'http://localhost:8000/read_all';
		const get_param = get_param_array.join('&');
		return `${endpoint}?${get_param}`;
	};
	// console.log(make_get_param());
	hello_fetch_data = await (await fetch(make_get_param())).json();
};

const get_POST_object = (BODY_OBJ) => {
  return {
	method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(BODY_OBJ)
	}
};



// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));

const fetch_insert_link = async () => {
	try {
		// LINKがURLの配列の文字列を含む場合はtrueを返す関数を1行で
		is_include_WHITE_LIST_URL(LINK, WHITE_LIST_URL_ARRAY) ? RESPONSE = (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json() : (()=>{throw new Error('URL Error only' + WHITE_LIST_URL_ARRAY.join(" "))})();
		fetch_hello();
	} catch (error) {
		// console.log(error);
		ERROR_MESSAGE = error.message;
	}
};

const fetch_delete_link = async (LINK_ID) => (await fetch('http://localhost:8000/delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID }))).json();
// const fetch_delete_link = async (LINK_ID) => console.log(LINK_ID);

const fetch_like_increment_or_decrement = async (LINK_ID) => RESPONSE = (await fetch('http://localhost:8000/like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID }))).json();
const fetch_insert_comment = async (LINK_ID) => RESPONSE = (await fetch('http://localhost:8000/insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, comment: COMMENT }))).json();
const fetch_delete_comment = async (COMMENT_ID) => RESPONSE = (await fetch('http://localhost:8000/delete_comment', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID }))).json();
const fetch_insert_comment_reply = async (COMMENT_ID) => RESPONSE = (await fetch('http://localhost:8000/insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID, comment_reply: COMMENT_REPLY }))).json();
const fetch_delete_comment_reply = async (COMMENT_REPLY_ID) => RESPONSE = (await fetch('http://localhost:8000/delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_reply_id: COMMENT_REPLY_ID }))).json();

const fetch_insert_tag = async (LINK_ID) => {
	TAG = TAG_VAL.value;
	RESPONSE = (await fetch('http://localhost:8000/insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
};

const fetch_get_tags_for_autocomplete = async () => {
	const json = (await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
					.json();
	const RES = await json;
	ALL_TAGS = await RES.tags;
};

const remove_error_message = () => ERROR_MESSAGE = "";



onMount(fetch_hello);
// afterUpdate(fetch_hello);
</script>





<!-- ERROR_MESSAGEを表示するdivタグ。クリックしたら非表示になる -->
<div>
	{ERROR_MESSAGE}
	{#if ERROR_MESSAGE}
		<button on:click={remove_error_message}>remove_error_message</button>
	{/if}
</div>


<div>
<input bind:value={ORDER_BY} type="text" placeholder="ORDER_BY">
<input bind:value={ORDER_BY_COLUMN} type="text" placeholder="ORDER_BY_COLUMN">
<input bind:value={REQ_TAG} type="text" placeholder="REQ_TAG">
<input bind:value={USER} type="text" placeholder="USER">
</div>

<div>
<input bind:value={NAME} type="text" placeholder="name">
<input bind:value={PASSWORD} type="text" placeholder="password">
<input bind:value={LINK} type="text" placeholder="link_url">
<button on:click={fetch_insert_link}>insert_link</button>
</div>

<div>
	<!-- svelteにおいて
		asyncの関数をon:clickをトリガーに実行する場合は
		{() => FUNCTION_NAME()}
		と書く(キショイ書き方だと思った) -->
  <button on:click={() => fetch_hello()}>clear condition</button>
</div>


<ul>
	{#each hello_fetch_data as item, index}
	<li>		
		<!-- <div>id: {item.id}</div> -->
		<div>tag: 
			{#each item.tags as tags, INDEX}
			<!-- <span>id: {tags.id}</span> -->
			<span>{tags.tag}, </span>
			{/each}
		</div>

		<div>
			<input bind:this={TAG_VAL} list="autocomplete_list" type="text" name="" id="hoge" bind:value={TAG} placeholder="tag" on:input={fetch_get_tags_for_autocomplete}>
			<datalist id="autocomplete_list">
				{#each ALL_TAGS as item, index}
				<option value={item.tag}>
				{/each}
			</datalist>
			<button on:click={fetch_insert_tag(item.id)}>fetch_insert_tag</button>
		</div>

		<a href={item.link} target="_blank">{item.link}</a>
		<div>created_at: {item.created_at}</div>
		<!-- <div>updated_at: {item.updated_at}</div> -->
		<!-- <div>user_id: {item.user_id}</div> -->
		<div>username: {item.username}</div>

		<!-- <div>like_count: {item.like_count}</div> -->
		<!-- like_countの数だけ😇が表示される -->
		{#each Array(item.like_count) as item, index}
		<span>😇</span>
		{/each}
		<button on:click={fetch_like_increment_or_decrement(item.id)}>like_increment_or_decrement</button>

		<div>
			<input type="text" name="" id="" bind:value={COMMENT} placeholder="comment">
			<button on:click={fetch_insert_comment(item.id)}>fetch_insert_comment</button>
		</div>

		<ul class="comment_zone">{#each item.comments_and_replies as comments_and_reply, INDEX}
			<li>comment: {comments_and_reply[INDEX]['comment']}</li>
			<li>created_at: {comments_and_reply[INDEX]['created_at']}</li>
			<!-- <li>id: {comments_and_reply[INDEX]['id']}</li> -->
			<button on:click={fetch_delete_comment(comments_and_reply[INDEX]['id'])}>fetch_delete_comment</button>
			<li>updated_at: {comments_and_reply[INDEX]['updated_at']}</li>
			<!-- <li>user_id: {comments_and_reply[INDEX]['user_id']}</li> -->
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

<style>
	.comment_zone, .reply_zone{
		margin-left: 2rem;
	}

	@media (min-width: 640px) {
		div {
			max-width: none;
		}
	}
</style>