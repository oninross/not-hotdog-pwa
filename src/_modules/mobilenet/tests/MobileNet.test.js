'use strict';

import MobileNet from '../mobilenet';

describe('MobileNet View', function() {

  beforeEach(() => {
    this.MobileNet = new MobileNet();
  });

  it('Should run a few assertions', () => {
    expect(this.MobileNet);
  });

});
