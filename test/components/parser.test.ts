import MarkdownParser from '../../src/components/parser'
import path from 'path'

test('create', () => {
    new MarkdownParser()
})


test('argment error(path is null.)', () => {


})

test('reading succeed', async () => {
    const filepath = path.resolve(__dirname,'../../', 'sites', 'test', 'index.md');

    const result = await new MarkdownParser().parse(filepath);
    console.log(result.html);
});
