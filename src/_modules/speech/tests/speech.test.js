'use strict';

import Speech from '../speech';

describe('Speech View', function() {

  beforeEach(() => {
    this.speech = new Speech();
  });

  it('Should run a few assertions', () => {
    expect(this.speech);
  });

});
