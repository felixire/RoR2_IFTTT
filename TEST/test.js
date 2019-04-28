const expect = require('chai').expect
const server = require('../index');

describe('test', () => {
  it('should add a actual test', () => {
    expect('ci with travis').to.equal('ci with travis');
  });
});