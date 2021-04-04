import fs from 'fs'

const css = `

body {
  padding: 1.2em;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  
  h2 {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #e1e1e1;
  }
  
  h3 {
    font-size: 1.3em;
    font-weight: bold;
  }
  
  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  p, ul {
    margin-top: 0;
    margin-bottom: 16px;
  }
  
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #e1e1e1;
    border-radius: 6px;
  }  
`;

export default class MakeHTML {

    private constructor() {}

    public static make(body: string) {

        let title = 'Page';

        const template = `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
            ${css}
            </style>
        </head>
        <body>
            ${body}
        </body>
        </html>
        `;

        return template;
    }
}