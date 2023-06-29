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

let ORDER_BY = 'DESC';
let ORDER_BY_COLUMN = 'links.id';
let REQ_TAG = '';
let USER = '';



const test_get_user_with_permission = () =>{

	const test_1 = () =>{
		// 'should throw an error when name is empty',
		let REQ = { body: { name: '', password: 'password' } };
		// 'should throw an error when password is empty',
		REQ = { body: { name: 'username', password: '' } };
		// 'should throw an error when name is undefined',
		REQ = { body: { password: 'password' } };
		// 'should throw an error when password is undefined',
		REQ = { body: { name: 'username' } };
		// 'should throw an error when name is null',
		REQ = { body: { name: null, password: 'password' } };
		// 'should throw an error when password is null',
		REQ = { body: { name: 'username', password: null } };
		// 'should throw an error when name length is greater than 20',
		REQ = { body: { name: 'usernameusernameusername', password: 'password' } };
		// 'should throw an error when password length is greater than 20',
		REQ = { body: { name: 'username', password: 'passwordpasswordpassword' } };
		// 'should throw an error when name length is less than 4',
		REQ = { body: { name: 'use', password: 'password' } };
		// 'should throw an error when password length is less than 4',
		REQ = { body: { name: 'username', password: 'pass' } };
		// 'should throw an error when name contains a space',
		REQ = { body: { name: 'user name', password: 'password' } };
		// 'should throw an error when password contains a space',
		REQ = { body: { name: 'username', password: 'pass word' } };
		// 'should throw an error when name contains a full-width space',
		REQ = { body: { name: 'user　name', password: 'password' } };
		// 'should throw an error when password contains a full-width space',
		REQ = { body: { name: 'username', password: 'pass　word' } };
		// 'should not throw an error when name and password are valid',
		REQ = { body: { name: 'username', password: 'password' } };
	}

	const test_2 = () =>{
	// expect(user.username).toEqual('testuser');
	user.username === 'testuser' ? "" : console.log('user.username is not testuser');
	// expect(user.user_permission).toEqual('admin');
	user.user_permission === 'admin' ? "" : console.log('user.user_permission is not admin');
	// expect(user.deletable).toEqual(1);
	user.deletable === 1 ? "" : console.log('user.deletable is not 1');
	// expect(user.writable).toEqual(1);
	user.writable === 1 ? "" : console.log('user.writable is not 1');
	// expect(user.readable).toEqual(1);
	user.readable === 1 ? "" : console.log('user.readable is not 1');
	// expect(user.likable).toEqual(1);
	user.likable === 1 ? "" : console.log('user.likable is not 1');
	// expect(user.commentable).toEqual(1);
	user.commentable === 1 ? "" : console.log('user.commentable is not 1');

	req = { body: { name: 'testuser', password: 'wrongpassword' } };
	user = get_user_with_permission(req, db);
	// expect(user).toBeNull();
	user === null ? "" : console.log('user is not null');


	req = { body: { name: 'nonexistentuser', password: 'password' } };
	user = get_user_with_permission(req, db);
	// expect(user).toBeNull();
	user === null ? "" : console.log('user is not null');


	req = { body: { name: "testuser'; DROP TABLE users; --", password: 'password' } };
	user = get_user_with_permission(req, db);
	// expect(user).toBeNull();
	user === null ? "" : console.log('user is not null');


	req = { body: { name: 'testuser', password: 'password' } };
	user = get_user_with_permission(req, db);
	// expect(user).not.toBeNull();
	user === null ? console.log('user is null') : "";
	}

}

const test_db_open = () =>{

	NAME = 'testuser';
	PASSWORD = 'password';

}
const test_db_close = () =>{
}
const test_insert_link = () =>{
	// get_user_with_permission周りのテストはここで全部やる
	const test_1 = () => {
		req = { body: { name: 'testtest_user', password: 'password' } };
		test_user = get_test_user_with_permission(req, db);
		// expect(test_user).not.toBeNull();
		test_user === null ? console.log('test_user is null') : "";
		// expect(test_user.writable).toEqual(1);
		test_user.writable === 1 ? "" : console.log('test_user.writable is not 1');
		// expect(test_user.test_user_permission).toEqual('admin');
		test_user.test_user_permission === 'admin' ? "" : console.log('test_user.test_user_permission is not admin');
		// expect(test_user.test_username).toEqual('testtest_user');
		test_user.test_username === 'testtest_user' ? "" : console.log('test_user.test_username is not testtest_user');
		// expect(test_user.commentable).toEqual(1);
		test_user.commentable === 1 ? "" : console.log('test_user.commentable is not 1');
		// expect(test_user.deletable).toEqual(1);
		test_user.deletable === 1 ? "" : console.log('test_user.deletable is not 1');
		// expect(test_user.likable).toEqual(1);
		test_user.likable === 1 ? "" : console.log('test_user.likable is not 1');
		// expect(test_user.readable).toEqual(1);
		test_user.readable === 1 ? "" : console.log('test_user.readable is not 1');
	}

	const test_2 = () => {
		// expect(error_check_for_insert_link(undefined)).toEqual({res: 'linkが空です', status: 400});
		error_check_for_insert_link(undefined) === null ? null : console.log('linkが空です error');
		// expect(error_check_for_insert_link('SELECT')).toEqual({res: 'SQLの予約語を含む場合はエラー', status: 400});
		error_check_for_insert_link('SELECT') === null ? null : console.log('SQLの予約語を含む場合はエラー error');
		// expect(error_check_for_insert_link('https::///google.co.jp')).toEqual({res: 'URLの形式が正しくありません', status: 400});
		error_check_for_insert_link('https::///google.co.jp') === null ? null : console.log('URLの形式が正しくありません error');
		// expect(error_check_for_insert_link('https://google.co.jp/'.repeat(1000))).toEqual({res: 'URLが長すぎます', status: 400});
		error_check_for_insert_link('https://google.co.jp/'.repeat(1000)) === null ? null : console.log('URLが長すぎます error');
		// expect(error_check_for_insert_link('https://hogehoge.com/')).toEqual({res: '許可されていないURLです', status: 400});
		error_check_for_insert_link('https://hogehoge.com/') === null ? null : console.log('許可されていないURLです error');
		// expect(error_check_for_insert_link('https://www.yahoo.co.jp/')).toEqual({res: 'OK', status: 200});
		error_check_for_insert_link('https://www.yahoo.co.jp/') === 'OK' ? null : console.log('OK error');
		// expect(error_check_for_insert_link('https://www.google.co.jp/')).toEqual({res: 'OK', status: 200});
		error_check_for_insert_link('https://www.google.co.jp/') === 'OK' ? null : console.log('OK error');
		// expect(error_check_for_insert_link('https://www.youtube.com/')).toEqual({res: 'OK', status: 200});
		error_check_for_insert_link('https://www.youtube.com/') === 'OK' ? null : console.log('OK error');
	}

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

// const test_inert_comment = () =>{
// 	const DATA_LIMIT = 100;

// 	const test_1 = ()=>{
// 	// 'should return an error message when the comment is undefined'
// 	let error = error_check_insert_comment(undefined, DATA_LIMIT);
// 	// expect(error).to.equal('commentが空の場合はエラー');
// 	error === 'commentが空の場合はエラー' ? "" : console.log('error is not commentが空の場合はエラー');
// 	};
// 	const test_2 = ()=>{
// 	// 'should return an error message when the comment length exceeds the data limit'
// 	let comment = 'a'.repeat(DATA_LIMIT + 1);
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('commentの文字数がdata_limitを超える場合はエラー');
// 	error === 'commentの文字数がdata_limitを超える場合はエラー' ? "" : console.log('error is not commentの文字数がdata_limitを超える場合はエラー');
// 	};
// 	const test_3 = ()=>{
// 	// 'should return an error message when the comment length is 0'
// 	error = error_check_insert_comment('', DATA_LIMIT);
// 	// expect(error).to.equal('0文字の場合はエラー');
// 	error === '0文字の場合はエラー' ? "" : console.log('error is not 0文字の場合はエラー');
// 	};
// 	const test_4 = ()=>{
// 	// 'should return an error message when the comment contains symbols'
// 	comment = 'This is a comment with symbols!@#$%^&*()_+-={}[]|\\:;"<>,.?/';
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('記号を含む場合はエラー');
// 	error === '記号を含む場合はエラー' ? "" : console.log('error is not 記号を含む場合はエラー');
// 	};
// 	const test_5 = ()=>{
// 	// 'should return an error message when the comment contains whitespace'
// 	comment = 'This is a comment with whitespace';
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('空白を含む場合はエラー');
// 	error === '空白を含む場合はエラー' ? "" : console.log('error is not 空白を含む場合はエラー');
// 	};
// 	const test_6 = ()=>{
// 	// 'should return an error message when the comment length is greater than 300'
// 	comment = 'a'.repeat(301);
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('300文字以上はエラー');
// 	error === '300文字以上はエラー' ? "" : console.log('error is not 300文字以上はエラー');
// 	};
// 	const test_7 = ()=>{
// 	// 'should return an error message when the comment contains a reserved SQL word'
// 	comment = 'SELECT * FROM comments';
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('SQLの予約語を含む場合はエラー');
// 	error === 'SQLの予約語を含む場合はエラー' ? "" : console.log('error is not SQLの予約語を含む場合はエラー');
// 	};
// 	const test_8 = ()=>{
// 	// 'should return OK when the comment is valid'
// 	comment = 'This is a valid comment';
// 	error = error_check_insert_comment(comment, DATA_LIMIT);
// 	// expect(error).to.equal('OK');
// 	error === 'OK' ? "" : console.log('error is not OK');
// 	};

// 	// db.prepare(`SELECT COUNT(*) AS count FROM comments WHERE test_user_id = ? AND link_id = ?`).get(test_user.test_user_id, req.body.link_id).count > 0 ? (()=>{throw new Error('既に同じcommentが存在する場合はエラー')})() : null;
// 	const test_9 = ()=>{
// 	// 'should return an error message when the comment already exists'
// 	error_check_insert_comment('This comment already exists', DATA_LIMIT);
// 	// 同じcommentを入れる
// 	error = error_check_insert_comment('This comment already exists', DATA_LIMIT);
// 	// expect(error).to.equal('既に同じcommentが存在する場合はエラー');
// 	error === '既に同じcommentが存在する場合はエラー' ? "" : console.log('error is not 既に同じcommentが存在する場合はエラー');
// 	};

// 	// expect(error).to.equal('既に同じcommentが存在する場合はエラー');
// }

// const test_inert_comment_reply = () =>{
// 	const test_1 = () =>{
// 		const DATA_LIMIT = 100;

// 		// 'should return an error message when the comment reply is undefined'
// 		let error = error_check_insert_comment_reply(undefined, DATA_LIMIT);
// 		// expect(error).to.equal('comment_replyが空の場合はエラー');
// 		error === 'comment_replyが空の場合はエラー' ? null : console.log('error_check_insert_comment_reply(undefined, DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply length exceeds the data limit'
// 		let commentReply = 'a'.repeat(DATA_LIMIT + 1);
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('comment_replyの文字数がdata_limitを超える場合はエラー');
// 		error === 'comment_replyの文字数がdata_limitを超える場合はエラー' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply length is 0'
// 		error = error_check_insert_comment_reply('', DATA_LIMIT);
// 		// expect(error).to.equal('0文字の場合はエラー');
// 		error === '0文字の場合はエラー' ? null : console.log('error_check_insert_comment_reply("", DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply contains symbols'
// 		commentReply = 'This is a comment reply with symbols!@#$%^&*()_+-={}[]|\\:;"<>,.?/';
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('記号を含む場合はエラー');
// 		error === '記号を含む場合はエラー' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply contains whitespace'
// 		commentReply = 'This is a comment reply with whitespace';
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('空白を含む場合はエラー');
// 		error === '空白を含む場合はエラー' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply length is greater than 10'
// 		commentReply = 'a'.repeat(11);
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('10文字以上はエラー');
// 		error === '10文字以上はエラー' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 		// 'should return an error message when the comment reply contains a reserved SQL word'
// 		commentReply = 'SELECT * FROM comments';
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('SQLの予約語を含む場合はエラー');
// 		error === 'SQLの予約語を含む場合はエラー' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 		// 'should return OK when the comment reply is valid'
// 		commentReply = 'This is a valid comment reply';
// 		error = error_check_insert_comment_reply(commentReply, DATA_LIMIT);
// 		// expect(error).to.equal('OK');
// 		error === 'OK' ? null : console.log('error_check_insert_comment_reply(commentReply, DATA_LIMIT) failed');

// 	}

// 	const test_2 = () =>{
// 		// 'should insert a new comment reply into the comment_replies table'
// 		const test_user = { test_user_id: 1 };
// 		const req = { body: { comment_id: 1, comment_reply: 'test reply' } };
// 		const now = () => new Date().toISOString();
// 		result === 1 ? null : console.log('insertCommentReply failed');

// 	}

// 	const test_3 = () =>{
// 		// 'should throw an error when a comment reply with the same test_user_id and comment_id already exists'
// 		const test_user = { test_user_id: 1 };
// 			const req = { body: { comment_id: 1 } };
// 		error === '既に同じcomment_replyが存在する場合はエラー' ? null : console.log('既に同じcomment_replyが存在する場合はエラー failed');

// 		// 'should not throw an error when a comment reply with the same test_user_id and comment_id does not exist'
// 			const test_user = { test_user_id: 1 };
// 			const req = { body: { comment_id: 2 } };
// 		error === '既に同じcomment_replyが存在する場合はエラー' ? null : console.log('既に同じcomment_replyが存在する場合はエラー failed');
		
// 	}

// 	const test_4 = () =>{

// 		// 'should return a JSON response with a success message and comment reply ID'
// 		const json = { result: 'success', comment_reply_id: 1 };
// 		const status = 200;
// 		const result = { lastInsertRowid: 1 };
// 		const expectedResponse = {
// 			result: 'success',
// 			comment_reply_id: result.lastInsertRowid
// 		};
// 		status === 200 && json.result === 'success'
// 			? ''
// 			: console.log('should return a JSON response with a success message and comment reply ID');
// 	}

// }

// const test_like_increment_or_decrement = () =>{
// 	const test_1 = () =>{
// 		// 'no existing test_user_id should return 400'
// 		const test_user = { test_user_id: 100 };
// 		const req = { body: { link_id: 1 } };
// 		const result = 
// 		result === undefined ? res.status(400).send('test_user does not exist') : null;

// 		// 'no existing link_id should return 400'
// 		const test_user = { test_user_id: 1 };
// 		const req = { body: { link_id: 100 } };
// 		const result =
// 		result === undefined ? res.status(400).send('Link does not exist') : null;
// 	}
// 	const test_2 = () => {
// 		// 'should throw an error when the test_user has already liked the link'
// 		let like_exists = { id: 1, test_user_id: 100, link_id: 100 };
// 			like_fetch();
// 		error === 'そんなlikeは無えよ' ? null : console.log('そんなlikeは無えよ無えよ error');


// 		// 'should not throw an error when the test_user has not liked the link before'
// 		like_exists = { id: 1, test_user_id: 1, link_id: 1 };
// 		like_fetch();
// 		error === 'そんなlikeは無えよ' ? console.log('そんなlikeは無えよ無えよ error') : null;
// 	}
	
// }



// testを作る
// switch(PATTERN_NUM){
// 		case 1: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1','user1']; break;
// 		case 2: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1',null]; break;
// 		case 3: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id',null,'user1']; break;
// 		case 4: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id','tag1','user1']; break;
// 		case 5: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id','tag1',null]; break;
// 		case 6: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id',null,'user1']; break;
// 		case 7: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['ASC','links.id',null,null]; break;

// 		case 0: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id','tag1','user1']; break;
// 		default: [ORDER_BY,ORDER_BY_COLUMN,REQ_TAG,USER] = ['DESC','links.id',null,null]; break;
// }
// 上記のswitch文で設定したパターンのテストを作る

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
		if(ORDER_BY) get_param_array.push(`order_by=${ORDER_BY}`);
		if(ORDER_BY_COLUMN) get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`);
		if(REQ_TAG) get_param_array.push(`tag=${REQ_TAG}`);
		if(USER) get_param_array.push(`user=${USER}`);
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
	hello_fetch_data = pre_result;
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

const fetch_insert_link = async () => {
	try {
		// LINKがURLの配列の文字列を含む場合はtrueを返す関数を1行で
		// is_include_WHITE_LIST_URL(LINK, WHITE_LIST_URL_ARRAY) ? RESPONSE = (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json() : (()=>{throw new Error('URL Error only' + WHITE_LIST_URL_ARRAY.join(" "))})();

		RESPONSE = await (await fetch('http://localhost:8000/insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();
		RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : fetch_hello({});
		console.log(RESPONSE.result);
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
		await fetch_get_tags_for_autocomplete();	
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
<input bind:value={LINK} type="text" placeholder="link_url">
<button on:click={fetch_insert_link}>insert_link</button>
</div>

<div>
	<!-- svelteにおいて
		asyncの関数をon:clickをトリガーに実行する場合は
		{() => FUNCTION_NAME()}
		と書く(キショイ書き方だと思った) -->
	<button on:click={() => fetch_hello({})}>clear condition</button>
	<button on:click={() => fetch_hello({USER_PARAM: 'user2'})}>user2</button>
	<!-- more_res_flatten_objをeachでfetch_helloのボタンを作る -->
	{#each more_res_flatten_obj as item, index}
		<button on:click={() => fetch_hello(
			{
				ORDER_BY_PARAM: item['ORDER_BY'],
				ORDER_BY_COLUMN_PARAM: item['ORDER_BY_COLUMN'],
				REQ_TAG_PARAM: item['REQ_TAG'],
				USER_PARAM: item['USER']
			}
		)}>{[item['ORDER_BY'],item['ORDER_BY_COLUMN'],item['REQ_TAG'],item['USER']].join("  ")}</button>
	{/each}
	
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