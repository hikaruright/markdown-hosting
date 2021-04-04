import fs from 'fs'
import marked from 'marked'
import highlightjs from 'highlight.js'
import readline from 'readline'

marked.setOptions({
    highlight: function (code, lang) {
        return highlightjs.highlightAuto(code, [lang]).value;
    },               // シンタックスハイライトに使用する関数の設定
    pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
    gfm: true,       // GitHub Flavored Markdownを使用
    breaks: true,    // falseにすると改行入力は末尾の半角スペース2つになる
    // sanitize: true,  // trueにすると特殊文字をエスケープする
    silent: false    // trueにするとパースに失敗してもExceptionを投げなくなる
});

/**
 * Markdownパーサ
 */
export default class MarkdownParser {

    constructor() { }

    /**
     * 対象のページで分割して取得
     * @param path ファイルパス
     * @param target 分割対象のタグ(## や ### を指定)
     * @param place 取得するページ分割番号
     * @returns Markdown要素
     */
    async readTarget(path: string, target: string, place: number): Promise<string> {

        return new Promise((resolve, reject) => {

            try {
                const file = fs.createReadStream(path);

                const reader = readline.createInterface({ input: file });
                let retStr = '';

                // Reading with each lines
                let i = 0;
                reader.on("line", (data) => {
                    // console.log(data);
                    const regex = new RegExp(`^${target} .*`);
                    const match = data.match(regex);
                    if (match) {
                        // console.log('match');
                        i = i + 1;
                    }
                    if (i === place) {
                        retStr += data + '\n';
                    }
                });
                reader.on('close', () => {
                    resolve(retStr);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Markdown to HTML
     * @param doc Markdownドキュメント
     * @returns HTML
     */
    parseStr(doc: string): string {

        return marked.parse(doc);
    }

    /**
     * ファイルを読み込みHTMLへパース
     * @param path ファイルパス
     * @returns HTML
     */
    async parse(path: string): Promise<{ html: string | null, err: any }> {

        return new Promise((resolve, reject) => {
            try{
                const file = fs.readFileSync(path);
                if (!file) {
                    return { html: null, err: 'File Reading Error.' };
                }
        
                const parsed = marked.parse(file.toString())
        
                resolve({ html: parsed, err: null });
            } catch(e) {
                reject({ html: null, err: e});
            }
        })
    }
}