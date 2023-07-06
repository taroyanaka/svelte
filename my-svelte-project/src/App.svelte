<script>
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';

// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}

let hello_fetch_data = [];
let NAME = 'user1';
let TEST_MODE = 'TEST_MODE';
// let TEST_MODE = 'PRODUCTION_MODE';
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
let SUCCESS_MESSAGE = '';

let ORDER_BY = 'DESC';
let ORDER_BY_COLUMN = 'links.id';
let REQ_TAG = '';
let USER = '';


const test_db_init_on_start = async () =>{
try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch('http://localhost:8000/test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	console.log(RESPONSE.result);
} catch (error) {
	ERROR_MESSAGE = error.message;
}
}

const test_db_init_on_end = async () =>{
try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch('http://localhost:8000/test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	console.log(RESPONSE.result);
} catch (error) {
	ERROR_MESSAGE = error.message;
}
}

let ERROR_MESSAGE_STACK = [];
// let OK_STACK = []; // 'OK stack'?? is that a 🦸 name??
let SUCCESS_MESSAGE_STACK = [];
const test_sample_for_LINK = async () =>{
    // LINK = 'SELECT';
    LINK = 'https::///google.co.jp';
	await fetch_insert_link();
    // ERROR_MESSAGE === 'SQLの予約語を含む場合はエラー'
    ERROR_MESSAGE === 'URLの形式が正しくありません'
		? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', 'URLの形式が正しくありません']))
		: console.log('NG');
}
const test_for_LINK = async (
	{
		Data='SELECT',
		Exe_fn=fetch_insert_link,
		Expect_result='SQLの予約語を含む場合はエラー'
	}
	) =>{
		LINK = Data;
		await Exe_fn();
		SUCCESS_MESSAGE === 'success'
		? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', Data + 'はOK']))
		: null;
		ERROR_MESSAGE === Expect_result
			? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
			: console.log('NG');
}
const test_sample_exe = async ()=>{
	await test_db_init_on_start();
	await test_for_LINK({
		Data: 'SELECT',
		Exe_fn: fetch_insert_link,
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	await test_for_LINK({
		Data: 'https::///google.co.jp',
		Exe_fn: fetch_insert_link,
		Expect_result: 'URLの形式が正しくありません'
	});
// expect(error_check_for_insert_link('https://google.co.jp/'.repeat(1000))).toEqual({res: 'URLが長すぎます', status: 400});
// error_check_for_insert_link('https://google.co.jp/'.repeat(1000)) === null ? null : console.log('URLが長すぎます error');

	await test_for_LINK({
		Data: 'https://google.co.jp/'.repeat(1000),
		Exe_fn: fetch_insert_link,
		Expect_result: 'URLが長すぎます'
	});

// expect(error_check_for_insert_link('https://hogehoge.com/')).toEqual({res: '許可されていないURLです', status: 400});
// error_check_for_insert_link('https://hogehoge.com/') === null ? null : console.log('許可されていないURLです error');
	await test_for_LINK({
		Data: 'https://hogehoge.com/',
		Exe_fn: fetch_insert_link,
		Expect_result: '許可されていないURLです'
	});


// expect(error_check_for_insert_link('https://www.yahoo.co.jp/')).toEqual({res: 'OK', status: 200});
// error_check_for_insert_link('https://www.yahoo.co.jp/') === 'OK' ? null : console.log('OK error');
	await test_for_LINK({
		Data: 'https://www.yahoo.co.jp/',
		Exe_fn: fetch_insert_link,
		Expect_result: 'OK'
	});
// expect(error_check_for_insert_link('https://www.google.co.jp/')).toEqual({res: 'OK', status: 200});
// error_check_for_insert_link('https://www.google.co.jp/') === 'OK' ? null : console.log('OK error');
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Exe_fn: fetch_insert_link,
		Expect_result: 'OK'
	});


// expect(error_check_for_insert_link('https://www.youtube.com/')).toEqual({res: 'OK', status: 200});
// error_check_for_insert_link('https://www.youtube.com/') === 'OK' ? null : console.log('OK error');
	await test_for_LINK({
		Data: 'https://www.youtube.com/',
		Exe_fn: fetch_insert_link,
		Expect_result: 'OK'
	});

	// すでに登録されているURLを登録しようとした場合はエラー
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Exe_fn: fetch_insert_link,
		Expect_result: '同じlinkが存在します'
	});

	console.log(ERROR_MESSAGE_STACK);
	console.log(SUCCESS_MESSAGE_STACK);
	await test_db_init_on_end();
}

const test_insert_link = () =>{
	const test_3 = () =>{
		const link_exists = db.prepare(`SELECT * FROM links WHERE link = ?`).get('https://www.google.co.jp/');
		// expect(link_exists).not.toBeNull();
		link_exists === null ? console.log('link_exists is null') : "";
		const link_not_exists = db.prepare(`SELECT * FROM links WHERE link = ?`).get('https://www.yahoo.co.jp/');
		// expect(link_not_exists).toBeUndefined();
		link_not_exists === undefined ? "" : console.log('link_not_exists is not undefined');
	}

	const test_4 = () => {
		let result = error_check_for_insert_tag(undefined);
		result.status === false ? "" : console.log('result.status is not false');
		result.res === 'tagが空です' ? "" : console.log('result.res is not tagが空です');

		result = error_check_for_insert_tag('test!');
		result.status === false ? ''  : console.log('result.status is not false');
		result.res === '記号を含む場合はエラー' ? '' : console.log('result.res is not 記号を含む場合はエラー');

		result = error_check_for_insert_tag('test tag');
		result.status === false ? '' : console.log('result.status is not false');
		result.res === '空白を含む場合はエラー' ? '' : console.log('result.res is not 空白を含む場合はエラー');

		result = error_check_for_insert_tag('testlong');
		result.status === false ? '' : console.log('result.status is not false');
		result.res === '7文字以上はエラー' ? '' : console.log('result.res is not 7文字以上はエラー');

		result = error_check_for_insert_tag('SELECT');
		result.status === false ? '' : console.log('result.status is not false');
		result.res === 'SQLの予約語を含む場合はエラー' ? '' : console.log('result.res is not SQLの予約語を含む場合はエラー');

		result = error_check_for_insert_tag('test');
		result.status === true ? '' : console.log('result.status is not true');
		result.res === 'OK' ? '' : console.log('result.res is not OK');
	};

}


// ramda.jsで全ての組み合わせを作る関数
// R.xprod(['DESC','ASC'], ['links.id','links.name'], ['tag1','tag2','tag3'], ['user1','user2','user3']);
const pre_res = R.xprod(['tag1','tag2','tag3'], ['user1','user2','user3']);
// pre_resに['links.id','like_count']を追加する
const res = R.xprod(['links.id','like_count'], pre_res);
// resに['DESC','ASC']を追加する
const more_res = R.xprod(['DESC','ASC'], res);
// more_resをそれぞれR.flattenする
const more_res_flatten = more_res.map((item) => R.flatten(item));
// more_res_flattenをそれぞれconst fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {　の形式にする
const more_res_flatten_obj = more_res_flatten.map((item) => {
	return {
		ORDER_BY: item[0],
		ORDER_BY_COLUMN: item[1],
		REQ_TAG: item[2],
		USER: item[3],
	}
});

const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {

	try {
	console.log(
		ORDER_BY_PARAM,
		ORDER_BY_COLUMN_PARAM,
		REQ_TAG_PARAM,
		USER_PARAM
	)
	// const PATTERN_NUM = PATTERN_NUM_PARAM ? PATTERN_NUM_PARAM : 0;
	// ORDER_BY, ORDER_BY_COLUMN, REQ_TAG, USER これらの変数を設定してread_all_testのエンドポイントを叩く
	ORDER_BY = ORDER_BY_PARAM; // ? ORDER_BY_PARAM : 'DESC';
	ORDER_BY_COLUMN = ORDER_BY_COLUMN_PARAM; // ? ORDER_BY_COLUMN_PARAM : 'links.id';
	REQ_TAG = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
	USER = USER_PARAM; // ? USER_PARAM : null;
	// [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id',null,null];

	// console.log([ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER]);
	// getパラメーターを作る関数。[ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER]にnullが含まれている場合はパラメーターに含めない
	const make_get_param = () => {
		const get_param_array = [];
		if(ORDER_BY) {get_param_array.push(`order_by=${ORDER_BY}`)};
		if(ORDER_BY_COLUMN) {get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`)};
		if(REQ_TAG) {get_param_array.push(`tag=${REQ_TAG}`)};
		if(USER) {get_param_array.push(`user=${USER}`)};
		// const endpoint = 'http://localhost:8000/read_all_test';
		const endpoint = 'http://localhost:8000/read_all';
		// const endpoint = 'http://localhost:8000/read_all2';
		const get_param = get_param_array.join('&');
		return `${endpoint}?${get_param}`;
	};
	// console.log(make_get_param());
	const res = await (await fetch(make_get_param())).json();
	// resのjsonが{result: 'fail', error: error.message}の場合はエラーを投げる
	if(res.result === 'fail') throw new Error(res.error);
	const pre_result = await (await fetch(make_get_param())).json();
	// pre_resultが空の場合はエラーを投げる
	if(pre_result.length === 0) throw new Error('条件に一致するデータがありませんでした');
	hello_fetch_data = pre_result.message;
	} catch (error) {
		console.log(error);
		ERROR_MESSAGE = error.message;
	}

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
let hoge = null;
const fetch_insert_link = async () => {
	try {
		// LINKがURLの配列の文字列を含む場合はtrueを返す関数を1行で
		// is_include_WHITE_LIST_URL(LINK, WHITE_LIST_URL_ARRAY) ? RESPONSE = (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json() : (()=>{throw new Error('URL Error only' + WHITE_LIST_URL_ARRAY.join(" "))})();

		RESPONSE = await (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();

		console.log(RESPONSE);
		// hoge = RESPONSE.text();

		// RESPONSE.result === 'success' ? SUCCESS_MESSAGE = RESPONSE.result : null;
		RESPONSE.status === 400 ? console.log(
				'RESPONSE.status: RESPONSE.status === 400'
			) : null;

			RESPONSE.status === 200 ? SUCCESS_MESSAGE = RESPONSE.result : null;
		RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.message)})() : fetch_hello({});
		console.log(RESPONSE.result);
	} catch (error) {
		ERROR_MESSAGE = error.message;
		console.log(error);
		console.log(error.message);
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
	try {
	TAG = TAG_VAL.value;
	console.log(TAG);
	RESPONSE = await (await fetch('http://localhost:8000/insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : fetch_hello({});
	console.log(RESPONSE.result);
	// fetch_hello({});
	} catch (error) {
		// console.log(error);
		ERROR_MESSAGE = error.message;
	}
};

const fetch_get_tags_for_autocomplete = async () => {
	const json = (await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
					.json();
	const RES = await json;
	ALL_TAGS = await RES.tags;
};

const remove_error_message = () => ERROR_MESSAGE = "";



// onMount(fetch_hello({}));
onMount(async () => {
	try {
		await fetch_hello({});
		// await fetch_get_tags_for_autocomplete();	
	} catch (error) {
		console.log(error);		
	}
});

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
<input bind:value={TEST_MODE} type="text" placeholder="TEST_MODE">
<input bind:value={LINK} type="text" placeholder="link_url" class="link">
<button on:click={fetch_insert_link} class="insert_link">insert_link</button>
</div>

<div>
	<!-- svelteにおいて
		asyncの関数をon:clickをトリガーに実行する場合は
		{() => FUNCTION_NAME()}
		と書く(キショイ書き方だと思った) -->
	<button on:click={() => test_db_init_on_start()}>test_db_init_on_start</button>
	<button on:click={() => test_db_init_on_end()}>test_db_init_on_end</button>
	<button on:click={() => test_sample_exe()}>test_sample_exe</button>

	<button on:click={() => fetch_hello({})}>clear condition</button>
	<button on:click={() => fetch_hello({USER_PARAM: 'user2'})}>user2</button>
	<!-- more_res_flatten_objをeachでfetch_helloのボタンを作る -->
	<!-- {#each more_res_flatten_obj as item, index}
		<button on:click={() => fetch_hello(
			{
				ORDER_BY_PARAM: item['ORDER_BY'],
				ORDER_BY_COLUMN_PARAM: item['ORDER_BY_COLUMN'],
				REQ_TAG_PARAM: item['REQ_TAG'],
				USER_PARAM: item['USER']
			}
		)}>{[item['ORDER_BY'],item['ORDER_BY_COLUMN'],item['REQ_TAG'],item['USER']].join("  ")}</button>
	{/each} -->
	
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

		<!-- <div> -->
			<!-- <input bind:this={TAG_VAL} list="autocomplete_list" type="text" name="" id="hoge" bind:value={TAG} placeholder="tag" on:input={fetch_get_tags_for_autocomplete}> -->
			<!-- <datalist id="autocomplete_list"> -->
				<!-- {#each ALL_TAGS as item, index} -->
				<!-- <option value={item.tag}> -->
				<!-- {/each} -->
			<!-- </datalist> -->
			<!-- <button on:click={fetch_insert_tag(item.id)}>fetch_insert_tag</button> -->
		<!-- </div> -->

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