const _ = require('lodash');
const jQuery = require('jquery/dist/jquery.slim');

const MODULE_NAME = 'Cutty';

class Cutty {
  constructor(config) {
    this.config = {
      debug: false,
      mediaqueries: {
        small: 'only screen and (min-width: 0px)',
        medium: 'only screen and (min-width: 640px)',
        large: 'only screen and (min-width: 992px)',
        xlarge: 'only screen and (min-width: 1440px)',
        xxlarge: 'only screen and (min-width: 1920px)',
        landscape: 'only screen and (orientation: landscape)',
        portrait: 'only screen and (orientation: portrait)',
        // http://css-tricks.com/snippets/css/retina-display-media-query
        retina:
          'only screen and (-webkit-min-device-pixel-ratio: 2), ' +
          'only screen and (min--moz-device-pixel-ratio: 2), ' +
          'only screen and (-o-min-device-pixel-ratio: 2/1), ' +
          'only screen and (min-device-pixel-ratio: 2), ' +
          'only screen and (min-resolution: 192dpi), ' +
          'only screen and (min-resolution: 2dppx)'
      },
      ...config
    };

    this.flags = {
      init: false,
      console: !!console
    };

    this.currentValues = [];
    this.events = [];
  }

  /**
   *
   * @returns {Cutty}
   */
  init() {
    if (this.flags.init) {
      return this;
    }

    this.log(MODULE_NAME + '.init()');

    this.flags.init = true;

    const self = this;

    jQuery(window).on(
      'resize.cutty',
      _.throttle(() => self.update(), 60)
    );

    self.update();

    return this;
  }

  /**
   *
   */
  destroy() {
    if (!this.flags.init) {
      return;
    }

    this.log(MODULE_NAME + '.destroy()');
  }

  /**
   *
   * @param {string} msg
   */
  log(msg) {
    if (this.config.debug && this.flags.console) {
      console.debug(msg);
    }
  }

  on(name, callback) {
    this.events.push({name, callback});

    return this;
  }

  /**
   *
   * @returns {void}
   */
  update() {
    this.log(MODULE_NAME + '.update()');

    const {mediaqueries} = this.config;

    const nextValues = Object.keys(mediaqueries).filter(
      (name) => matchMedia(mediaqueries[name]).matches
    );

    // If matched media queries has not changed, then do nothing further.
    if (_.isEqual(this.currentValues, nextValues)) {
      return;
    }

    const previousValues = [].concat(this.currentValues);

    this.currentValues = nextValues;

    this.events
      .filter((e) => e.name === 'update')
      .forEach((e) => e.callback(nextValues, previousValues));
  }

  /**
   *
   * @param   {string} srcset
   * @returns {Array}
   */
  parseSrcset(srcset) {
    return srcset.split(',').map((candidate) => {
      const parts = candidate.replace(/\s+/g, ' ').trim().split(' ');
      const url = parts[0];
      const names = parts.slice(1);

      return {url, names};
    });
  }

  /**
   *
   * @param   {Array} candidates
   * @param   {Array} mqNames
   * @returns {Object}
   */
  pickBestCandidate(candidates, mqNames) {
    if (!candidates.length) {
      return {};
    }

    const matched = candidates
      .map((candidate) => ({
        ...candidate,
        count: _.intersection(candidate.names, mqNames).length
      }))
      .filter((candidate) => candidate.count);

    if (!matched.length) {
      return candidates[0];
    }

    const sorted = _.sortBy(matched, ['count']);

    return sorted[sorted.length - 1];
  }
}

(window.NB = window.NB || {})[MODULE_NAME] = Cutty;
