
export default class MakeIndex {

    private constructor() { }

    private static makeLink(page: string) {

        return `<a href='./${page}'>${page}</a>`;
    }

    public static make(pages: string[], sitename: string) {

        let css = '';

        let body = '';

        for(let p of pages) {
            body += this.makeLink(p);
            body += '<br/>'
        }

        const template = `
            <!DOCTYPE html>
            <html lang="ja">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>the list of ${sitename}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha256-916EbMg70RQy9LHiGkXzG8hSg9EdNy97GazNG/aiY1w=" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" integrity="sha256-3iu9jgsy9TpTwXKb7bNQzqWekRX7pPK+2OLj3R922fo=" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css" integrity="sha256-QiWfLIsCT02Sdwkogf6YMiQlj4NE84MKkzEMkZnMGdg=" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.min.css" integrity="sha256-vtR0hSWRc3Tb26iuN2oZHt3KRUomwTufNIf5/4oeCyg=" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hackmd/emojify.js@2.1.0/dist/css/basic/emojify.min.css" integrity="sha256-UOrvMOsSDSrW6szVLe8ZDZezBxh5IoIfgTwdNDgTjiU=" crossorigin="anonymous" />
                
                <style>
                ${css}
                </style>
                <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                <script>
                  $(function(){
                    $('a[href^=http]').attr('target' , '_blank');
                  });
                </script>
            </head>
            <body>
              <div class='markdown-body container'>
              
                <h1>The markdown file list of ${sitename}</h1>
                ${body}
              </div>
            </body>
            </html>
            `;

        return template;
    }
}
