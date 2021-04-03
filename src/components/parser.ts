import fs from 'fs'
import marked from 'marked'
import highlightjs from 'highlight.js'
import cheerio from 'cheerio'

marked.setOptions({
    highlight: function(code, lang) {
      return highlightjs.highlightAuto(code, [lang]).value;
    },               // シンタックスハイライトに使用する関数の設定
    pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
    gfm: true,       // GitHub Flavored Markdownを使用
    breaks: true,    // falseにすると改行入力は末尾の半角スペース2つになる
    sanitize: true,  // trueにすると特殊文字をエスケープする
    silent: false    // trueにするとパースに失敗してもExceptionを投げなくなる
  });
  
export default class MarkdownParser {

    constructor(){}

    async parse(path: string): Promise<{html: string | null, err: any}>{

        const file =  fs.readFileSync(path);
        if(!file) {
            return {html: null, err: 'File Reading Error.'};
        }

        const parsed = marked.parse(file.toString())

        return {html: parsed, err: null};
    }

    async split(body: string, splitTag: string): Promise<string> {

        const $ = cheerio.load(body);

        $(splitTag).each((i: number, elem: any) => {
            
        })

        return '<>';
    }
}