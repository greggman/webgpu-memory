/* global mocha */
/* global URLSearchParams */
/* global window */

import './tests/buffer-tests.js';
import './tests/canvas-tests.js';
import './tests/device-tests.js';
import './tests/query-set-tests.js';
import './tests/texture-tests.js';

const settings = Object.fromEntries(new URLSearchParams(window.location.search).entries());
if (settings.reporter) {
  mocha.reporter(settings.reporter);
}
mocha.run((failures) => {
  window.testsPromiseInfo.resolve(failures);
});
