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
    // console.log(result.html);

});



test('split with markdown', async() => {
    const filepath = path.resolve(__dirname,'../../', 'sites', 'test', 'multisplit.md');

    const parser = new MarkdownParser();

    const output = await parser.readTarget(filepath, '##', 1);

    expect(output.split('\n')[0]).toBe('## Testing Framework');
});

test('split with markdown2', async() => {
    const filepath = path.resolve(__dirname,'../../', 'sites', 'test', 'multisplit.md');

    const parser = new MarkdownParser();

    const output = await parser.readTarget(filepath, '##', 2);

    expect(output.split('\n')[0]).toBe('## Sample Link');
});

