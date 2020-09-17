const Loki = require('lokijs');
const path = require('path');
const EventEmitter = require('events');

module.exports = class Store extends Loki {
  constructor(options) {
    super(options);
    // Create Event Bus
    const emitter = new EventEmitter();
    this.emitter = emitter;
    this.options = {
      recipeDir: path.join(process.cwd(), '__skafold_tmp__'),
      recipeName: 'recipe.yml',
    };
  }

  set(key, val) {
    this.options[key] = val;
  }

  get(key) {
    return this.options[key];
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

  collection(name) {
    return this.collections.find((collection) => collection.name === name);
  }

  async dispatch(event, payload) {
    if (!this.handlers.includes(event))
      return console.error(`Warning: No handler for event ${event}`);
    // Store all events
    this.collection('events').insert({ event, payload });
    return this.emitter.emit(event, payload, this);
  }
};
