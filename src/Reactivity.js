// Sistema de Reactividad
export const reactivitySystem = (() => {
  const dependencies = new Map();
  let currentComponent = null;

  // Proxy handler para reactividad
  const handler = {
    get(target, property) {
      if (currentComponent) {
        track(target, property);
      }
      return Reflect.get(target, property);
    },
    set(target, property, value) {
      Reflect.set(target, property, value);
      trigger(target, property);
      return true;
    }
  };

  function track(target, property) {
    const key = target.constructor.name + '.' + property;
    if (!dependencies.has(key)) {
      dependencies.set(key, new Set());
    }
    dependencies.get(key).add(currentComponent);
  }

  function trigger(target, property) {
    const key = target.constructor.name + '.' + property;
    if (dependencies.has(key)) {
      dependencies.get(key).forEach(component => {
        component._update();
      });
    }
  }

  return {
    reactive(obj) {
      return new Proxy(obj, handler);
    },

    effect(component) {
      currentComponent = component;
      component._update();
      currentComponent = null;
    }
  };
})();

// Ejemplo de actualización batch
function batchUpdate(callback) {
  reactivitySystem.pauseTracking();
  callback();
  reactivitySystem.resumeTracking();
}
/*
// Uso: para actulizaciones multiples
batchUpdate(() => {
  appState.count++;
  appState.user.age++;
});
*/
// Base Component
export class ReactiveComponent extends HTMLElement {
  constructor() {
    super();
    this.state = {};
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    reactivitySystem.effect(this);
  }

  _update() {
    this.render();
    this.onUpdate();
  }

  onUpdate() {}
  render() {}
}