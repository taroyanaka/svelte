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
