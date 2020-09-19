const path = require('path');
const EventEmitter = require('events');

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
    return function (err, result) {
      console.log('event done', event, result);
    };
  }

  get handlers() {
    return this.emitter.eventNames();
  }

  dispatch(event, payload) {
    if (!this.handlers.includes(event))
      throw new Error(`Handler not registered for ${event}`);
    return this.emitter.emit(event, payload, this, this.done(event));
  }
};
