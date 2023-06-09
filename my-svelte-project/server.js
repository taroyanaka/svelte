// -- sqlite3で全てのテーブルとそのデータを削除するクエリ
// DROP TABLE IF EXISTS user_permission;
// DROP TABLE IF EXISTS users;
// DROP TABLE IF EXISTS links;
// DROP TABLE IF EXISTS likes;
// DROP TABLE IF EXISTS links_tags;
// DROP TABLE IF EXISTS tags;
// DROP TABLE IF EXISTS comments;
// DROP TABLE IF EXISTS comment_replies;


// -- ja: データ制限量
// -- en: Data limit

// -- ユーザーの権限のテーブル。カラムはIDはと名前と作成日と更新日を持つ。IDは自動的に増加する
// -- カラムの中には、一般ユーザー、ゲストユーザーがある
// -- ゲストユーザーはreadだけできる。一般ユーザーはread,write,deleteができる
// CREATE TABLE user_permission (
//   id INTEGER PRIMARY KEY,

//   permission TEXT NOT NULL,
//   readable INTEGER NOT NULL,
//   writable INTEGER NOT NULL,
//   deletable INTEGER NOT NULL, 
//   likable INTEGER NOT NULL,
//   commentable INTEGER NOT NULL,
//   data_limit INTEGER NOT NULL,

//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL
// );

// -- ユーザーのテーブル。カラムはIDはと名前とパスワードと作成日と更新日を持つ。IDは自動的に増加する
// CREATE TABLE users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_permission_id INTEGER NOT NULL,
//   username TEXT NOT NULL,
//   userpassword TEXT NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (user_permission_id) REFERENCES user_permission(id)
// );

// -- linksというブログのようなサービスのテーブル。IDは自動的に増加する。userのIDを外部キーとして持つ
// CREATE TABLE links (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   link TEXT NOT NULL,
//   user_id INTEGER NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );


// -- likesというブログの高評価ボタンのようなサービスのテーブル。IDは自動的に増加する。linkのIDを外部キーとして持つ
// CREATE TABLE likes (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   link_id INTEGER NOT NULL,
//   user_id INTEGER NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (link_id) REFERENCES link(id)
// );

// -- linksとtagsの中間テーブル
// CREATE TABLE links_tags (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   link_id INTEGER NOT NULL,
//   tag_id INTEGER NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL
// );

// -- tagsというブログのタグのようなサービスのテーブル。IDは自動的に増加する。links_tagsを外部キーとして持つ
// CREATE TABLE tags (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   tag TEXT NOT NULL
// );

// CREATE TABLE comments (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   link_id INTEGER NOT NULL,
//   user_id INTEGER NOT NULL,
//   comment TEXT NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (link_id) REFERENCES link(id)
// );

// CREATE TABLE comment_replies (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   comment_id INTEGER NOT NULL,
//   user_id INTEGER NOT NULL,
//   reply TEXT NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (comment_id) REFERENCES comments(id)
// );



// -- user_permissionにレコード挿入する
// INSERT INTO user_permission (id, permission,
// readable,
// writable,
// deletable,
// likable,
// commentable,
// data_limit,
// created_at, updated_at) VALUES (1, 'guest', 1, 0, 0, 0, 0,
// 200,
// DATETIME('now'), DATETIME('now'));
// INSERT INTO user_permission (id, permission,
// readable,
// writable,
// deletable,
// likable,
// commentable,
// data_limit,
// created_at, updated_at) VALUES (2, 'user', 1, 1, 1, 1, 1,
// 40000,
// DATETIME('now'), DATETIME('now'));

// INSERT INTO user_permission (id, permission,
// readable,
// writable,
// deletable,
// likable,
// commentable,
// data_limit,
// created_at, updated_at) VALUES (3, 'pro', 1, 1, 1, 1, 1,
// 400000,
// DATETIME('now'), DATETIME('now'));


// -- usersにデータをレコード挿入する
// INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (1, 'GUEST', 'GUEST_PASS', DATETIME('now'), DATETIME('now'));
// INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (2, 'user1', 'user_pass1', DATETIME('now'), DATETIME('now'));
// INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (2, 'user2', 'user_pass2', DATETIME('now'), DATETIME('now'));
// INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (3, 'pro1', 'pro_pass1', DATETIME('now'), DATETIME('now'));

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const R = require('ramda');
const express = require('express');
const sqlite = require('better-sqlite3');
const db = new sqlite('./duct.sqlite3');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
const e = require('express');
app.use(cors());
const port = 8000;
app.listen(port, "0.0.0.0", () => console.log(`App listening!! at http://localhost:${port}`) );
// app.listen(port, () => console.log(`App listening!! at http://localhost:${port}`) );

const now = () => new Date().toISOString();
// expressの一般的なエラーのレスポンス。引数としてエラー文字列を含めて呼び出す
const error_response = (res, error_message) => res.json({error: error_message});

const get_user_with_permission = (REQ) =>  db.prepare(`
SELECT users.id AS user_id, users.username AS username, user_permission.permission AS user_permission,
user_permission.deletable AS deletable,
user_permission.writable AS writable,
user_permission.readable AS readable,
user_permission.likable AS likable,
user_permission.commentable AS commentable
FROM users
LEFT JOIN user_permission ON users.user_permission_id = user_permission.id
WHERE users.username = ? AND users.userpassword = ?
`).get(REQ.body.name, REQ.body.password);

app.get('/', (req, res) => {
    console.log('Hello World, this is the TEST mode!!!!');
    res.json({message: 'Hello World, this is the TEST mode!!!!'});
});


// linkテーブル以下のデータを取得する
app.get('/read_all', (req, res) => {
  try {
    const pre_result = db.prepare(`
    SELECT
    links.id AS id, links.link AS link, links.created_at AS created_at, links.updated_at AS updated_at,
    users.id AS user_id, users.username AS username,
    (SELECT COUNT(*) FROM likes WHERE likes.link_id = links.id) AS like_count
    FROM links
    LEFT JOIN users ON links.user_id = users.id
    LEFT JOIN likes ON links.id = likes.link_id
    ORDER BY links.id DESC
        `).all();

    const result = pre_result.map(parent => {
      const tags = db.prepare(`
        SELECT
        tags.id AS id, tags.tag AS tag
        FROM tags
        LEFT JOIN links_tags ON tags.id = links_tags.tag_id
        WHERE links_tags.link_id = ?
      `).all(parent.id);

      const comments = db.prepare(`
        SELECT
        comments.id AS id, comments.comment AS comment, comments.created_at AS created_at, comments.updated_at AS updated_at,
        users.id AS user_id, users.username AS username
        FROM comments
        LEFT JOIN links ON comments.link_id = links.id
        LEFT JOIN users ON comments.user_id = users.id
        WHERE links.id = ?
      `).all(parent.id);

        const comments_and_replies = comments.map(comment => {
            const comment_replies = db.prepare(`
            SELECT
            comment_replies.id AS id, comment_replies.comment AS comment, comment_replies.created_at AS created_at, comment_replies.updated_at AS updated_at,
            users.id AS user_id, users.username AS username
            FROM comment_replies
            LEFT JOIN comments ON comment_replies.comment_id = comments.id
            LEFT JOIN users ON comment_replies.user_id = users.id
            WHERE comments.id = ?
            `).all(comment.id);
            return {
                ...comment,
                comment_replies,
            }
        });

      return {
        ...parent,
        tags,
        comments_and_replies,
      };
    });

    // res.json(pre_result);
    res.json(result);
    // console.log(result);
  } catch (error) {
    console.log(error);
    error_response(res, '原因不明のエラー' + error);
  }
});

// linkにデータをレコード挿入するエンドポイント
app.post('/insert_link', (req, res) => {
    try {
        const user = get_user_with_permission(req);
        user || user.writable ? null : (()=>{throw new Error('権限がありません')})();
        const result = db.prepare(`
        INSERT INTO links (user_id, link, created_at, updated_at) VALUES (?, ?, ?, ?)
        `).run(user.user_id, req.body.link, now(), now());
        res.json(result);
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

// linkのデータを削除する
app.post('/delete_link', (req, res) => {
    try {
        const user = get_user_with_permission(req);
        user || user.deletable ? null : (()=>{throw new Error('権限がありません')})();
        // linkに紐づくlike、comment、comment_replyを削除する
        db.prepare(`DELETE FROM likes WHERE link_id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        db.prepare(`DELETE FROM comment_replies WHERE link_id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        db.prepare(`DELETE FROM comments WHERE link_id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        // linkに紐づくlinks_tagsを削除し、tagが他のlinkに紐づいていなければ、tagも削除する
        const tags = db.prepare(`SELECT * FROM links_tags WHERE link_id = ?`).all(req.body.id) || [];
        tags.forEach(tag => {
            const tag_links = db.prepare(`SELECT * FROM links_tags WHERE tag_id = ?`).all(tag.tag_id);
            tag_links.length === 1 ? db.prepare(`DELETE FROM tags WHERE id = ?`).run(tag.tag_id) : null;
        });
        db.prepare(`DELETE FROM links_tags WHERE link_id = ?`).run(req.body.id);
        // linkを削除する
        const result = db.prepare(`DELETE FROM links WHERE id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        res.json(result);
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

// linkに紐づくlikeをインクリメントする、既にlikeが存在する場合はデクリメントする、1ユーザー1linkにつき1likeまで。
app.post('/like_increment_or_decrement', (req, res) => {
    try {
        const user = get_user_with_permission(req);
        user || user.likable ? null : (()=>{throw new Error('権限がありません')})();
        db.prepare(`SELECT * FROM likes WHERE user_id = ? AND link_id = ?`).get(user.user_id, req.body.link_id)
            ? db.prepare(`DELETE FROM likes WHERE user_id = ? AND link_id = ?`).run(user.user_id, req.body.link_id)
            : db.prepare(`INSERT INTO likes (user_id, link_id, created_at, updated_at) VALUES (?, ?, ?, ?)`).run(user.user_id, req.body.link_id, now(), now());
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});



// tagにデータをレコード挿入するエンドポイント
// 既に存在する場合は、既存のタグを返す
// 存在しない場合は、新規にタグを作成して返す
// 既存のタグを返す場合は、links_tagsにレコードを挿入する
// 新規にタグを作成して返す場合は、tagsにレコードを挿入して、links_tagsにレコードを挿入する
app.post('/insert_tag', (req, res) => {
    try {
    const error_check = (tag) => {
        const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
        switch (true) {
            case tag === undefined: return {res: 'tagが空です', status: false};
            case tag.match(/[!-/:-@[-`{-~]/g): return {res: '記号を含む場合はエラー', status: false};
            case tag.match(/\s/g): return {res: '空白を含む場合はエラー', status: false};
            case tag.length > 7: return {res: '7文字以上はエラー', status: false};
            case reserved_words.includes(tag): return {res: 'SQLの予約語を含む場合はエラー', status: false};
            default: return {res: 'OK', status: true};
        }
    }
    const error_check_result = error_check(req.body.tag);
    error_check_result.status ? null : (()=>{throw new Error(error_check_result.res)})();
    const user = get_user_with_permission(req);
    user || user.writable ? null : (()=>{throw new Error('権限がありません')})();

    const tag = db.prepare(`SELECT id, tag FROM tags WHERE tag = ?`).get(req.body.tag);
    const insert_tag = () => db.prepare(`INSERT INTO links_tags (link_id, tag_id, created_at, updated_at) VALUES (?, ?, ?, ?)`).run(req.body.link_id, tag.id, now(), now());
    const make_tag_and_insert_tag = () => {
        db.prepare(`INSERT INTO tags (tag) VALUES (?)`).run(req.body.tag);
        const newTag = db.prepare(`SELECT id, tag FROM tags WHERE tag = ?`).get(req.body.tag);
        db.prepare(`INSERT INTO links_tags (link_id, tag_id, created_at, updated_at) VALUES (?, ?, ?, ?)`).run(req.body.link_id, newTag.id, now(), now());
        return newTag;
    }
    tag ? insert_tag() : make_tag_and_insert_tag();
    res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

app.post('/get_tags_for_autocomplete', (req, res) => {
    try {
    console.log(req.body.tag);
    const user = get_user_with_permission(req);
    user.readable === 1 ? null : (()=>{throw new Error('読み込み権限がありません')})();
    const tags = db.prepare(`SELECT * FROM tags WHERE tag LIKE '%${req.body.tag}%' LIMIT 100`).all();
    res.json({message: 'success', tags});
    } catch (error) {
    console.log(error);
    error_response(res, 'ERROR: ' + error);
    }
});

// tagのデータを削除する
// 他に紐づくlinkが有る場合は、links_tagsのレコードを削除する
// 他に紐づくlinkが無い場合は、tagsのレコードとlinks_tagsのレコードを削除する
//   // tagの所有権(tagを作成したユーザー、もしくはlinkにタグを追加したユーザー)の仕様が決まらないため、一旦コメントアウト
// app.post('/delete_tag', (req, res) => {
//     try {
//         const user = get_user_with_permission(req);
//         user || user.deletable ? null : (()=>{throw new Error('権限がありません')})();
//         const result = db.prepare(`SELECT COUNT(*) AS count FROM links_tags WHERE tag_id = ?`).get(req.body.id);
//         result.count > 1
//             ? db.prepare(`DELETE FROM links_tags WHERE tag_id = ? AND link_id = ?`).run(req.body.id, req.body.link_id)
//             : (db.prepare(`DELETE FROM links_tags WHERE tag_id = ?`).run(req.body.id), db.prepare(`DELETE FROM tags WHERE id = ?`).run(req.body.id));
//     res.json({message: 'success'});
//     } catch (error) {
//         console.log(error);
//         error_response(res, '原因不明のエラー' + error);
//     }
// });


// commentsのデータを挿入する
// 1ユーザーにつき1つのlinkに対して1つのcommentしか挿入できない。
// commentの文字数はuser_permissionのdata_limitに依存する。commentの文字数がdata_limitを超える場合はエラー
// 空の場合はエラー。記号を含む場合はエラー。空白を含む場合はエラー。SQLの予約語を含む場合はエラー。
// 300文字以上はエラー。既に同じcommentが存在する場合はエラー
app.post('/insert_comment', (req, res) => {
    try {
        const error_check = (comment, DATA_LIMIT) => {
            const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
            switch (true) {
                case comment === undefined: return {res: 'commentが空の場合はエラー', status: false};
                case comment.length > DATA_LIMIT: return {res: 'commentの文字数がdata_limitを超える場合はエラー', status: false};
                case comment.length === 0: return {res: '0文字の場合はエラー', status: false};
                case comment.match(/[!-/:-@[-`{-~]/g): return {res: '記号を含む場合はエラー', status: false};
                case comment.match(/\s/g): return {res: '空白を含む場合はエラー', status: false};
                case comment.length > 300: return {res: '300文字以上はエラー', status: false};
                case reserved_words.includes(comment): return {res: 'SQLの予約語を含む場合はエラー', status: false};
                default: return {res: 'OK', status: true};
            }
        }
        const user = get_user_with_permission(req);
        user || user.commentable ? null : (()=>{throw new Error('権限がありません')})();

        const error_check_result = error_check(req.body.comment, user.data_limit);
        error_check_result.status ? null : (()=>{throw new Error(error_check_result.res)})();

        db.prepare(`SELECT COUNT(*) AS count FROM comments WHERE user_id = ? AND link_id = ?`).get(user.user_id, req.body.link_id).count > 0 ? (()=>{throw new Error('既に同じcommentが存在する場合はエラー')})() : null;

        const result = db.prepare(`INSERT INTO comments (user_id, link_id, comment, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`).run(user.user_id, req.body.link_id, req.body.comment, now(), now());
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

app.post('/delete_comment', (req, res) => {
    try {
        const user = get_user_with_permission(req);
        user || user.commentable ? null : (()=>{throw new Error('権限がありません')})();
        // commentに紐づくcomment_replyがある場合は、comment_replyのレコードを削除する
        db.prepare(`DELETE FROM comment_replies WHERE comment_id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        db.prepare(`DELETE FROM comments WHERE id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

// comment_repliesのデータを挿入する
// 1ユーザーにつき1つのcommentに対して1つのcomment_replyしか挿入できない。
// comment_replyの文字数はuser_permissionのdata_limitに依存する。comment_replyの文字数がdata_limitを超える場合はエラー
// 空の場合はエラー。記号を含む場合はエラー。空白を含む場合はエラー。SQLの予約語を含む場合はエラー。
// 10文字以上はエラー。既に同じcomment_replyが存在する場合はエラー
app.post('/insert_comment_reply', (req, res) => {
    try {
        const error_check = (comment_reply, DATA_LIMIT) => {
            const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
            switch (true) {
                case comment_reply === undefined: return {res: 'comment_replyが空の場合はエラー', status: false};
                case comment_reply.length > DATA_LIMIT: return {res: 'comment_replyの文字数がdata_limitを超える場合はエラー', status: false};
                case comment_reply.length === 0: return {res: '0文字の場合はエラー', status: false};
                case comment_reply.match(/[!-/:-@[-`{-~]/g): return {res: '記号を含む場合はエラー', status: false};
                case comment_reply.match(/\s/g): return {res: '空白を含む場合はエラー', status: false};
                case comment_reply.length > 10: return {res: '10文字以上はエラー', status: false};
                case reserved_words.includes(comment_reply): return {res: 'SQLの予約語を含む場合はエラー', status: false};
                default: return {res: 'OK', status: true};
            }
        }
        const user = get_user_with_permission(req);
        user || user.commentable ? null : (()=>{throw new Error('権限がありません')})();

        const error_check_result = error_check(req.body.comment_reply, user.data_limit);
        error_check_result.status ? null : (()=>{throw new Error(error_check_result.res)})();

        db.prepare(`SELECT COUNT(*) AS count FROM comment_replies WHERE user_id = ? AND comment_id = ?`).get(user.user_id, req.body.comment_id).count > 0 ? (()=>{throw new Error('既に同じcomment_replyが存在する場合はエラー')})() : null;

        const result = db.prepare(`INSERT INTO comment_replies (user_id, comment_id, comment_reply, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`).run(user.user_id, req.body.comment_id, req.body.comment_reply, now(), now());
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

app.post('/delete_comment_reply', (req, res) => {
    try {
        const user = get_user_with_permission(req);
        user || user.commentable ? null : (()=>{throw new Error('権限がありません')})();
        db.prepare(`DELETE FROM comment_replies WHERE id = ? AND user_id = ?`).run(req.body.id, user.user_id);
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        error_response(res, '原因不明のエラー' + error);
    }
});

