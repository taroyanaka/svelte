https://taroyanaka.github.io/svelte/

taroyanaka: svelteの導入方法

GitHub Copilot: Svelteは、npmを使用してインストールできます。以下の手順に従って、Svelteをインストールしてください。

1. Node.jsをインストールします。Node.jsは、Svelteを実行するために必要です。Node.jsをインストールするには、[公式サイト](https://nodejs.org/)からダウンロードしてください。

2. コマンドラインで、以下のコマンドを実行して、Svelteのテンプレートを作成します。

   ```
   npx degit sveltejs/template my-svelte-project
   ```

   このコマンドは、Svelteのテンプレートを `my-svelte-project` ディレクトリにダウンロードします。

3. `my-svelte-project` ディレクトリに移動し、以下のコマンドを実行して、Svelteを起動します。

   ```
   cd my-svelte-project
   npm install
   npm run dev
   ```

   これで、Svelteアプリケーションが起動されます。ブラウザで `http://localhost:5000` を開くと、アプリケーションが表示されます。

以上の手順で、Svelteをインストールして、アプリケーションを作成することができます。

taroyanaka: svelteをgithub pagesでデプロイする方法

GitHub Copilot: SvelteアプリケーションをGitHub Pagesにデプロイするには、以下の手順を実行してください。

1. Svelteアプリケーションをビルドします。Svelteアプリケーションをビルドするには、以下のコマンドを実行してください。

   ```
   npm run build
   ```

   これにより、`public` ディレクトリにビルドされたアプリケーションが生成されます。

2. GitHubリポジトリを作成します。GitHubリポジトリを作成するには、[GitHub](https://github.com/)にアクセスして、新しいリポジトリを作成してください。

3. ローカルのSvelteアプリケーションをGitHubリポジトリにプッシュします。以下のコマンドを実行して、ローカルのSvelteアプリケーションをGitHubリポジトリにプッシュしてください。

   ```
   🙅‍♀️
   git remote add origin https://github.com/username/repo-name.git

    🙆‍♀️
   git remote add origin https://github.com/taroyanaka/svelte.git
   git branch -M main
   git push -u origin main
   ```

   これにより、ローカルのSvelteアプリケーションがGitHubリポジトリにプッシュされます。

4. GitHub Pagesを有効にします。GitHub Pagesを有効にするには、以下の手順を実行してください。

   - リポジトリの設定を開きます。
   - ページのセクションに移動します。
   - 
    🙅‍♀️間違い: ソースを main ブランチに設定します。
    🙆‍♀️正解: githubのsettingsのpagesのブランチの項目は gh-pages /(root)

   - ルートを `/(root)` に設定します。
   - `Save` をクリックして変更を保存します。

5. ビルドされたSvelteアプリケーションをGitHub Pagesにデプロイします。以下の手順を実行して、ビルドされたSvelteアプリケーションをGitHub Pagesにデプロイしてください。

   - `gh-pages` パッケージをインストールします。

     ```
     npm install gh-pages --save-dev
     ```

   - 🙅‍♀️ `package.json` ファイルに、以下のスクリプトを追加します。
   - 🙆‍♀️ `package.json` ファイルの "scripts": に、以下のスクリプトを追加します。

     ```
     🙁 "deploy": "gh-pages -d public"
     😃 "deploy": "npm run build && gh-pages -d public"
     ```

   - 以下のコマンドを実行して、SvelteアプリケーションをGitHub Pagesにデプロイします。

     ```
     npm run deploy
     ```

これで、SvelteアプリケーションがGitHub Pagesにデプロイされます。デプロイが完了したら、ブラウザで `https://username.github.io/repo-name/` を開いて、アプリケーションを確認してください。






追記
index.htmlが
src='/build/bundle.jsや
href='/build/bundle.css'のように
絶対パス指定になっているので相対パス指定に変更する

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>Svelte app</title>

	<link rel='icon' type='image/png' href='./favicon.png'>
	<link rel='stylesheet' href='./global.css'>
	<link rel='stylesheet' href='./build/bundle.css'>

	<script defer src='./build/bundle.js'></script>
</head>

<body>
</body>
</html>