const path = require('path');
const EventEmitter = require('events');
const { success, ERROR } = require('./constants/events');
const debug = require('debug')('skf:store');

module.exports = class Store {
  constructor() {
    // Create Event Bus
    const emitter = new EventEmitter();
    this.emitter = emitter;
    this.state = {
      defaultRecipeDir: path.join(__dirname, '__skafold_tmp__'),
      defaultRecipeName: 'recipe.yml',
      recipe: null,
    };
  }

  set(key, val) {
    this.state[key] = val;
  }

  get(key) {
    return this.state[key];
  }

  register(event, handler) {
    this.emitter.on(event, handler);
  }

  unregister(event, handler) {
    this.emitter.off(event, handler);
  }

  done(event) {
    return (err, nextEvent, payload) => {
      if (err) {
        if (!nextEvent) nextEvent = ERROR;
        return this.dispatch(nextEvent, err);
      }
      if (!nextEvent) nextEvent = success(event);
      return this.dispatch(nextEvent, payload);
    };
  }

  get handlers() {
    return this.emitter.eventNames();
  }

  dispatch(event, payload) {
    debug('dispatching', event);
    return this.emitter.emit(event, payload, this, this.done(event));
  }
};
