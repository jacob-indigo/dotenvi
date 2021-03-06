const { Rewriter } = require('./rewriter');
const { resolvers } = require('./resolvers');


describe('Rewriter', () => {
  it('Rewrites constants', () => {
    const document = {
      'explicit': {
        'value': '${constant:hello}'
      },
      'implicit': {
        'value': 'hello'
      }
    };

    const rewriter = new Rewriter({ resolvers: resolvers });
    return rewriter.rewrite(document).then((output) => {
      expect(output['explicit']).toBe(output['implicit']);
    });
  });

  it('Rewrites environment variables', () => {
    process.env['TEST'] = 'hello';
    const document = {
      'test': {
        'value': '${env:TEST}'
      }
    };

    const rewriter = new Rewriter({ resolvers: resolvers });
    return rewriter.rewrite(document).then((output) => {
      expect(output['test']).toBe('hello');
    });
  });

});
