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


let ORDER_BY = 'ASC';
// let ORDER_BY_COLUMN = 'links.id';
let ORDER_BY_COLUMN = 'id';
let REQ_TAG = '';
let USER = '';

let ERROR_MESSAGE = "";
let SUCCESS_MESSAGE = '';
let ERROR_MESSAGE_STACK = [];
let SUCCESS_MESSAGE_STACK = [];
let COLLECT_VALUE = [{'value': 0},{'value2': 1}];



const test_db_init_only_set_name_password_test_mode = async () =>{
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
}
const test_db_init_on_start = async () =>{
	try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch('http://localhost:8000/test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	} catch (error) {
	ERROR_MESSAGE = error.message;
	}
}
const test_db_init_on_end = async () =>{
	try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch('http://localhost:8000/test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	} catch (error) {
	ERROR_MESSAGE = error.message;
	}
}

const message_stacker = (Data, Expect_result) =>{
	SUCCESS_MESSAGE === 'success'
		? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', (Data?Data+'は':'') + 'OK']))
		: null;
	ERROR_MESSAGE === Expect_result
		? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
		: console.log('NG');
}
const test_for_LINK = async (
	{
		Data='SELECT',
		Expect_result='SQLの予約語を含む場合はエラー'
	}
	) =>{
	LINK = Data;
	await fetch_insert_link();
	message_stacker(Data, Expect_result);
}

const test_for_TAG = async (
	{
		Data='test!',
		Param_of_link_id=1,
		Expect_result='記号を含む場合はエラー'
	}
	) =>{
	await fetch_insert_tag(Param_of_link_id, Data);
	message_stacker(Data, Expect_result);
}

const test_for_COMMENT = async (
	{
		Data=('a'.repeat(51)),
		Param_of_link_id=1,
		Expect_result='commentの文字数がdata_limitを超える場合はエラー'
	}
	) =>{
	COMMENT = Data;
	await fetch_insert_comment(Param_of_link_id);
	message_stacker(Data, Expect_result);
}

const test_for_COMMENT_REPLY = async (
	{
		Data=('a'.repeat(51)),
		Param_of_comment_id=1,
		Expect_result='commentの文字数がdata_limitを超える場合はエラー'
	}
) =>{
	COMMENT_REPLY = Data;
	await fetch_insert_comment_reply(Param_of_comment_id);
	message_stacker(Data, Expect_result);
}

const test_for_LIKE_INCREMENT_OR_DECREMENT = async (
	{
		Data='',
		Param_of_link_id=1,
		Expect_result='success'
	}
) =>{
	await fetch_like_increment_or_decrement(Param_of_link_id);
	message_stacker(Data, Expect_result);
}

const test_sample_exe = async () => {
	await test_db_init_on_start();
	await test_for_LINK({
		Data: 'SELECT',
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	await test_for_LINK({
		Data: 'https::///google.co.jp',
		Expect_result: 'URLの形式が正しくありません'
	});
	await test_for_LINK({
		Data: 'https://hogehoge.com/',
		Expect_result: '許可されていないURLです'
	});
	await test_for_LINK({
		Data: 'https://www.yahoo.co.jp/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.youtube.com/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Expect_result: '同じlinkが存在します'
	});
	
	console.log(ERROR_MESSAGE_STACK);
	console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe2 = async () => {
	await test_for_TAG({
		Param_of_link_id: 1,
		Expect_result: '記号を含む場合はエラー'
	});
	await test_for_TAG({
		Data: 'test!',
		Param_of_link_id: 1,
		Expect_result: '記号を含む場合はエラー'
	});
	await test_for_TAG({
		Data: 'test tag',
		Param_of_link_id: 1,
		Expect_result: '空白を含む場合はエラー'
	});
	await test_for_TAG({
		Data: 'testlong',
		Param_of_link_id: 1,
		Expect_result: '7文字以上はエラー'
	});
	await test_for_TAG({
		Data: 'SELECT',
		Param_of_link_id: 1,
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	await test_for_TAG({
		Data: 'test',
		Param_of_link_id: 1,
		Expect_result: 'OK'
	});
	// 既に同じタグがついています
	await test_for_TAG({
		Data: 'test',
		Param_of_link_id: 1,
		Expect_result: '既に同じタグがついています'
	});
	// 別のlinkへのtagはエラーにならない
	await test_for_TAG({
		Data: 'test',
		Param_of_link_id: 2,
		Expect_result: 'OK'
	});
	// 既に同じタグがついています
	await test_for_TAG({
		Data: 'test',
		Param_of_link_id: 2,
		Expect_result: '既に同じタグがついています'
	});

	await test_for_TAG({
		Data: 'TEST',
		Param_of_link_id: 1,
		Expect_result: 'OK'
	});

	console.log(ERROR_MESSAGE_STACK);
	console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe3 = async () => {
	// 'commentの文字数がdata_limitを超える場合はエラー'
	// 'should return "commentの文字数がdata_limit(test userは1000)を超える場合はエラー" when comment length is greater than data limit'
	// error_check_insert_comment('a'.repeat(1500), 50);

	await test_for_COMMENT({
		Data: 'a'.repeat(1500),
		Param_of_link_id: 1,
		Expect_result: 'commentの文字数がdata_limit(test userは50)を超える場合はエラー'
	});
	// 'should return "0文字の場合はエラー" when comment length is 0'
	// error_check_insert_comment('', 100);
	await test_for_COMMENT({
		Data: '',
		Param_of_link_id: 1,
		Expect_result: '0文字の場合はエラー'
	});
	// 'should return "空白を含む場合はエラー" when comment contains spaces'
	// error_check_insert_comment('This is a comment with spaces', 100);
	await test_for_COMMENT({
		Data: 'This is a comment with spaces',
		Param_of_link_id: 1,
		Expect_result: '空白を含む場合はエラー'
	});
	// 'should return "記号を含む場合はエラー" when comment contains symbols'
	// error_check_insert_comment('This is a comment with ! symbol', 100);
	await test_for_COMMENT({
		Data: 'This!Symbol',
		Param_of_link_id: 1,
		Expect_result: '記号を含む場合はエラー'
	});
	// 'should return "300文字以上はエラー" when comment length is greater than 300'
	// error_check_insert_comment('a'.repeat(301), 100);
	await test_for_COMMENT({
		Data: 'a'.repeat(301),
		Param_of_link_id: 1,
		Expect_result: '300文字以上はエラー'
	});
	// 'should return "SQLの予約語を含む場合はエラー" when comment contains SQL reserved words'
	// error_check_insert_comment('SELECT * FROM comments', 100);
	await test_for_COMMENT({
		Data: 'SELECT * FROM comments',
		Param_of_link_id: 1,
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	// 'should return "OK" when comment is valid'
	// error_check_insert_comment('This is a valid comment', 100);
	await test_for_COMMENT({
		Data: 'ThisIsaValidComment',
		Param_of_link_id: 1,
		Expect_result: 'OK'
	});
}

const test_sample_exe4 = async () => {
	// 'comment_replyが空の場合はエラー'
	// 'comment_replyの文字数がdata_limitを超える場合はエラー'
	await test_for_COMMENT_REPLY({
		Data: 'a'.repeat(1500),
		Param_of_comment_id: 1,
		Expect_result: 'comment_replyの文字数がdata_limit(test userは50)を超える場合はエラー'
	});
	// '0文字の場合はエラー'
	await test_for_COMMENT_REPLY({
		Data: '',
		Param_of_comment_id: 1,
		Expect_result: '0文字の場合はエラー'
	});
	// '記号を含む場合はエラー'
	await test_for_COMMENT_REPLY({
		Data: 'This!Symbol',
		Param_of_comment_id: 1,
		Expect_result: '記号を含む場合はエラー'
	});
	// '空白を含む場合はエラー'
	await test_for_COMMENT_REPLY({
		Data: 'spa ces',
		Param_of_comment_id: 1,
		Expect_result: '空白を含む場合はエラー'
	});
	// '10文字以上はエラー'
	await test_for_COMMENT_REPLY({
		Data: 'a'.repeat(11),
		Param_of_comment_id: 1,
		Expect_result: '10文字以上はエラー'
	});
	// 'SQLの予約語を含む場合はエラー'
	await test_for_COMMENT_REPLY({
		Data: 'SELECT * FROM comments',
		Param_of_comment_id: 1,
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	// 'OK'
	await test_for_COMMENT_REPLY({
		Data: 'ValidRep',
		Param_of_comment_id: 1,
		Expect_result: 'OK'
	});
	// 同じユーザーから同じcommentへのreplyが既に存在する場合はエラー
	await test_for_COMMENT_REPLY({
		Data: 'ValidRep',
		Param_of_comment_id: 1,
		Expect_result: '同じユーザーから同じcommentへのreplyが既に存在する場合はエラー'
	});
}

const test_sample_exe5 = async () => {
	// link_idがありません
	await test_for_LIKE_INCREMENT_OR_DECREMENT({
		Param_of_link_id: 1000000000,
		Expect_result: 'link_idがありません'
	});
	// message.response = 'increment_it';
	await test_for_LIKE_INCREMENT_OR_DECREMENT({
		Param_of_link_id: 1,
		Expect_result: 'success'
	});
	// message.response = 'decrement_it';
	await test_for_LIKE_INCREMENT_OR_DECREMENT({
		Param_of_link_id: 1,
		Expect_result: 'success'
	});
	// do like again
	await test_for_LIKE_INCREMENT_OR_DECREMENT({
		Param_of_link_id: 1,
		Expect_result: 'success'
	});
}

const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='id', REQ_TAG_PARAM, USER_PARAM}) => {
	console.log(ORDER_BY_COLUMN_PARAM);
	try {
	ORDER_BY = ORDER_BY_PARAM; // ? ORDER_BY_PARAM : 'DESC';
	ORDER_BY_COLUMN = ORDER_BY_COLUMN_PARAM; // ? ORDER_BY_COLUMN_PARAM : 'links.id';
	REQ_TAG = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
	USER = USER_PARAM; // ? USER_PARAM : null;
	const make_get_param = () => {
		const get_param_array = [];
		if(ORDER_BY) {get_param_array.push(`order_by=${ORDER_BY}`)};
		if(ORDER_BY_COLUMN) {get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`)};
		if(REQ_TAG) {get_param_array.push(`tag=${REQ_TAG}`)};
		if(USER) {get_param_array.push(`user=${USER}`)};
		const endpoint = 'http://localhost:8000/read_all';
		const get_param = get_param_array.join('&');
		return `${endpoint}?${get_param}`;
	};
	const res = await (await fetch(make_get_param())).json();
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


const response_handling = async (RESPONSE) => {
	try {
	// RESPONSE.status === 400 ? console.log('RESPONSE.status: RESPONSE.status === 400') : null;
	RESPONSE.status === 200 ? SUCCESS_MESSAGE = RESPONSE.result : null;
	(RESPONSE.result === 'fail' || RESPONSE.status === 400) ? (()=>{throw new Error(RESPONSE.message)})() : (await fetch_hello({}));
	} catch (error) {
		(()=>{throw new Error(error.message)})();
	}
}

// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));
let hoge = null;
const fetch_insert_link = async () => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
const fetch_delete_link = async (LINK_ID) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
}
const fetch_like_increment_or_decrement = async (LINK_ID) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID }))).json()
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
const fetch_insert_comment = async (Link_id) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: Link_id, comment: COMMENT }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
const fetch_delete_comment = async (COMMENT_ID) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/delete_comment', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
}
const fetch_insert_comment_reply = async (Comment_id) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: Comment_id, comment_reply: COMMENT_REPLY }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
const fetch_delete_comment_reply = async (Comment_reply_id) => {
	try {
	RESPONSE = await (await fetch('http://localhost:8000/delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_reply_id: Comment_reply_id }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
const fetch_insert_tag = async (LINK_ID, TAG_PARAM) => {
	try {
	TAG = TAG_PARAM || TAG_VAL.value;
	RESPONSE = await (await fetch('http://localhost:8000/insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};


const fetch_get_collect_value_for_test = async () => {
	try {
	const RESULT_OF_TEST = await (await fetch('http://localhost:8000/get_collect_value_for_test', get_POST_object({ name: NAME, password: PASSWORD }))).json();
	COLLECT_VALUE = RESULT_OF_TEST.message;
	} catch (error) {
	console.log(error);
	}
};

const fetch_get_tags_for_autocomplete = async () => {
	const json = await (await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
					.json();
	const RES = await json;
	ALL_TAGS = await RES.message;
};

const remove_error_message = () => ERROR_MESSAGE = "";

// <button on:click={() => ORDER_BY_COLUMN === 'links.id' ? ORDER_BY_COLUMN = 'created_at' : ORDER_BY_COLUMN === 'created_at' ? ORDER_BY_COLUMN = 'updated_at' : ORDER_BY_COLUMN = 'links.id'}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>
// const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {
const order_by_column_and_fetch_hello = async () => {
	switch (true) {
		case ORDER_BY_COLUMN === 'id' : ORDER_BY_COLUMN = 'created_at'; break;
		case ORDER_BY_COLUMN === 'created_at' : ORDER_BY_COLUMN = 'updated_at'; break;
		case ORDER_BY_COLUMN === 'updated_at' :  ORDER_BY_COLUMN = 'id'; break;
		default: ORDER_BY_COLUMN = 'id'; break;
	}
	await fetch_hello({
		ORDER_BY_PARAM: ORDER_BY,
		ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
		REQ_TAG_PARAM: 'TEST',
	});
};
const order_by_and_fetch_hello = async () => {
	switch (true) {
		case ORDER_BY === 'ASC' : ORDER_BY = 'DESC'; break;
		case ORDER_BY === 'DESC' :  ORDER_BY = 'ASC'; break;
		default: ORDER_BY_COLUMN = 'DESC'; break;
	}
	await fetch_hello({
		ORDER_BY_PARAM: ORDER_BY,
		ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
		// REQ_TAG_PARAM: 'TEST',
	});
};
const req_tag_and_fetch_hello = async (TAG) => {
	REQ_TAG = TAG;
	await fetch_hello({
		REQ_TAG_PARAM: REQ_TAG,
	});
};
const user_and_fetch_hello = async (USER) => {
	const USER_VAL = USER ? USER : 'user1';
	await fetch_hello({
		USER_PARAM: USER_VAL,
	});
};

// onMount(fetch_hello({}));
onMount(async () => {
	try {
		await fetch_hello({});
		await fetch_get_tags_for_autocomplete();	
	} catch (error) {
		console.log(error);		
	}
});

// afterUpdate(fetch_hello);
</script>





<input bind:value={NAME} type="text" placeholder="name">
<input bind:value={PASSWORD} type="text" placeholder="password">
<!-- <div>
	{ERROR_MESSAGE}
	{#if ERROR_MESSAGE}
		<button on:click={remove_error_message}>remove_error_message</button>
	{/if}
</div>
<div>
	{#each COLLECT_VALUE as obj}
		<div>
			{#each Object.keys(obj) as key}
				<div>
					{key}: {obj[key]}
				</div>
			{/each}
		</div>
	{/each}
</div>
<div>
	<input bind:value={REQ_TAG} type="text" placeholder="REQ_TAG">
	<input bind:value={USER} type="text" placeholder="USER">
</div>
<div>
	<input bind:value={TEST_MODE} type="text" placeholder="TEST_MODE">
</div>
<div>
	<button on:click={() => fetch_get_collect_value_for_test()}>fetch_get_collect_value_for_test</button>
	<button on:click={() => test_db_init_only_set_name_password_test_mode()}>test_db_init_only_set_name_password_test_mode</button>
	<button on:click={() => test_db_init_on_start()}>test_db_init_on_start</button>
	<button on:click={() => test_db_init_on_end()}>test_db_init_on_end</button>
	<button on:click={() => test_sample_exe()}>test_sample_exe</button>
	<button on:click={() => test_sample_exe2()}>test_sample_exe2</button>
	<button on:click={() => test_sample_exe3()}>test_sample_exe3</button>
	<button on:click={() => test_sample_exe4()}>test_sample_exe4</button>
	<button on:click={() => test_sample_exe5()}>test_sample_exe5</button>
</div> -->




<div>
	<input bind:value={LINK} type="text" placeholder="link_url" class="link">
	<button on:click={fetch_insert_link} class="insert_link">insert_link</button>
	<button on:click={() => fetch_hello({})}>clear condition</button>

	<!-- <input bind:value={ORDER_BY} type="text" placeholder="ORDER_BY"> -->
	<!-- ORDER_BYをDESCとASCをswitchする(デフォルトはDESC) -->
	<!-- <button on:click={() => ORDER_BY === 'DESC' ? ORDER_BY = 'ASC' : ORDER_BY = 'DESC'}>ORDER_BY: {ORDER_BY}</button> -->
	<button on:click={() => order_by_and_fetch_hello()}>ORDER_BY: {ORDER_BY}</button>
	<!-- ['links.id', 'created_at', 'updated_at'] -->
	<!-- <input bind:value={ORDER_BY_COLUMN} type="text" placeholder="ORDER_BY_COLUMN"> -->
	<!-- ORDER_BY_COLUMNをlinks.id, created_at, updated_atをswitchする(デフォルトはlinks.id) -->
	<!-- <button on:click={() => ORDER_BY_COLUMN === 'links.id' ? ORDER_BY_COLUMN = 'created_at' : ORDER_BY_COLUMN === 'created_at' ? ORDER_BY_COLUMN = 'updated_at' : ORDER_BY_COLUMN = 'links.id'}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button> -->
	<button on:click={() => order_by_column_and_fetch_hello()}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>
</div>

<ul>
	{#each hello_fetch_data as item, index}
	<li>		
		<!-- <div>id: {item.id}</div> -->
		<div>tag: 
			{#each item.tags as tags, INDEX}
			<!-- <span>id: {tags.id}</span> -->
			<!-- <span>{tags.tag}, </span> -->
			<button on:click={() => req_tag_and_fetch_hello(tags.tag)}>{tags.tag}</button>
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

		<button on:click={fetch_delete_link(item.id)}>fetch_delete_link</button>
		<a href={item.link} target="_blank">{item.link}</a>
		<div>created_at: {item.created_at}</div>
		<!-- <div>updated_at: {item.updated_at}</div> -->
		<!-- <div>user_id: {item.user_id}</div> -->

		<!-- <div>username: {item.username}</div> -->
		<button on:click={() => user_and_fetch_hello(item.username)}>{item.username}</button>

		<!-- <div>like_count: {item.like_count}</div> -->
		<!-- like_countの数だけ😇が表示される -->
		<!-- {#each Array(item.like_count) as item, index} -->
		{#each item.likes as item, index}
		<span>😇</span>
		{/each}
		<button on:click={fetch_like_increment_or_decrement(item.id)}>like_increment_or_decrement</button>

		<div>
			<input type="text" name="" id="" bind:value={COMMENT} placeholder="comment">
			<button on:click={fetch_insert_comment(item.id)}>fetch_insert_comment</button>
		</div>

		<ul class="comment_zone">{#each item.comments_and_replies as comments_and_reply, INDEX}
			<!-- <li>KOME: {comments_and_reply}</li> -->
			<!-- <li>KOME1: {comments_and_reply['reply']}</li> -->
			<!-- <li>KOME2: {comments_and_reply['comment']}</li> -->

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