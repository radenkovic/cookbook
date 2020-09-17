const path = require('path');
const EventEmitter = require('events');

module.exports = class Store {
  constructor() {
    // Create Event Bus
    const emitter = new EventEmitter();
    this.emitter = emitter;
    this.state = {
      defaultRecipeDir: path.join(process.cwd(), '__skafold_tmp__'),
      defaultRecipeName: 'recipe.yml',
      recipe: null,
      files: [],
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

  get handlers() {
    return this.emitter.eventNames();
  }

  async dispatch(event, payload) {
    return this.emitter.emit(event, payload, this);
  }
};
