const assert = require('assert');
const app = require('../../src/app');

describe('\'email_reminder\' service', () => {
  it('registered the service', () => {
    const service = app.service('email-reminder');

    assert.ok(service, 'Registered the service');
  });
});
