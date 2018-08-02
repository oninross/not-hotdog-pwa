'use strict';

import Snap from '../snap';

describe('Snap View', function() {

  beforeEach(() => {
    this.snap = new Snap();
  });

  it('Should run a few assertions', () => {
    expect(this.snap);
  });

});
