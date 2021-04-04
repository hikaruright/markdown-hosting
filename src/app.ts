import express from 'express'
import MarkdownParser from './components/parser';
import path from 'path'
import { parse } from 'marked';

const app: express.Express = express();
const router = express.Router();

const parser = new MarkdownParser();

// publish static files.
app.use(express.static('sites'));

// getting format
app.get('/:site/:file', async (req, resp) => {
    // console.log(req.params.site);
    // console.log(req.params.file);
    // console.log(req.query.num);
    console.log(`read from ${req.params.site}/${req.params.file} of page ${req.query.num}`)
    
    const filePath = path.resolve(__dirname, '../', 'sites', req.params.site, req.params.file + '.md');

    let parsed = '';
    if(req.query.num) {
        // 一部
        const md = await parser.readTarget(filePath, '##', Number(req.query.num));
        parsed = parser.parseStr(md);
    } else {
        // 全部
        const md = await parser.parse(filePath);
        parsed = md.html || '';
    }

    console.log(parsed)

    resp.send(parsed);
});

// Starting Server.
app.listen(process.env.PORT || '3000', () => {
    console.log('process is started.');
});
