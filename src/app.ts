import express from 'express'
import MarkdownParser from './components/parser'
import path from 'path'
import MakeHTML from './components/make-html'
import MakeIndex from './components/make-index'
import fs from 'fs'

const app: express.Express = express();
const router = express.Router();

const parser = new MarkdownParser();

// gettings list of markdown files
app.get('/:site/list', async (req, resp) => {
    
    try {
        const site = req.params.site;

        console.log(`show list of ${site}`);
    
        const dirPath = path.resolve(__dirname, '../', 'sites', req.params.site);
    
        const files = fs.readdirSync(dirPath).filter(val => val.endsWith('.md'))
    
        resp.send(MakeIndex.make(files, site));
    }catch(e) {
        console.error(e);
        resp.status(404);
        resp.send('Error.');
    }
})

// getting format
app.get('/:site/:file', async (req, resp) => {
    // console.log(req.params.site);
    // console.log(req.params.file);
    // console.log(req.query.num);
    console.log(`read from ${req.params.site}/${req.params.file} of page ${req.query.num}`)

    let filename = req.params.file;
    const filePath = path.resolve(__dirname, '../', 'sites', req.params.site, filename);

    if(filename.endsWith('.md')) {
        // nothing to do.
        // console.log('primitive ')
    }if (filename.includes('.')) {
        // console.log('return static file.');
        resp.sendFile(filePath);
        return;
    }else if (!filename.endsWith('.md')) {
        // console.log('the markdown');
        filename += '.md';
    }

    let parsed = '';
    if(req.query.num) {
        // 一部
        const md = await parser.readTarget(filePath, '##', Number(req.query.num)).catch(any => '');
        parsed = parser.parseStr(md);
    } else {
        // 全部
        const md = await parser.parse(filePath).catch(err => err);
        parsed = md.html || '';
    }

    resp.send(MakeHTML.make(parsed));
});

// publish static files.
app.use(express.static('sites'));


// Starting Server.
app.listen(process.env.PORT || '3000', () => {
    console.log('process is started.');
});
