# Markdown Hosting

マークダウンで書かれたページをホスティングするサービス

## Docker Compose のサンプル

```docker-compose
version: '3'

services:
  app:
    image: hikaruright/md-hosting:0.2
    ports:
      - 3000:3000
    volumes:
      - ./sites:/app/sites
```

Markdownで書かれたページをsitesにcloneすることで、
Markdownをロードすることができます。

## URL例

```shell
/root
  /sites
    /sample-site
       /images
         image1.jpg
       content1.md
       content2.md
```

### 指定したMarkdownをすべて表示する

http://localhost:3000/sample-site/content1
 => content1.mdの内容を表示

### 指定したMarkdownのうち、特定のh2要素のみ表示する

``num=<何番めのh2か>``を数字で指定することで、
一部のh2要素のみを抽出して表示します。

http://localhost:3000/sample-site/content1?num=1
 => conent1.mdのうち、ひとつめのh2(##から始まる部分)に相当する部分のみを表示