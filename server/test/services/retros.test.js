const assert = require('assert');
const app = require('../../src/app');

describe('\'retros\' service', () => {
  it('registered the service', () => {
    const service = app.service('retros');

    assert.ok(service, 'Registered the service');
  });
});
