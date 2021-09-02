import Vue from "vue";
import { Mutation } from "vuex-module-decorators";

export function DocLoader(name: string, multiple: boolean = false) {
  return function (target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const namePascal = name.charAt(0).toUpperCase() + name.substr(1);
    const loadMethodName = "load" + namePascal;
    const setMethodName = "set" + namePascal;
    const setUnsubscribeMethodName = "set" + namePascal + "Unsubscribe";
    const unsubscribeName = loadMethodName + "Unsubscribe";

    // SET METHOD
    const setMethod = function (this: any, object: any) {
      if (object === null) {
        if (this[unsubscribeName]) this[unsubscribeName]();
        Vue.set(this, unsubscribeName, null);
        if (!multiple) Vue.set(this, name, null);
      } else if (multiple) Vue.set(this[name], object.id, object);
      else Vue.set(this, name, object);
    };
    Object.defineProperty(target, setMethodName, { value: setMethod });
    Mutation(target, setMethodName, {
      configurable: true,
      enumerable: false,
      value: setMethod,
      writable: true,
    });

    // SET UNSUBSCRIBE METHOD
    const setUnsubscribeMethod = function (this: any, { method }: { method: () => void }) {
      Vue.set(this, unsubscribeName, method);
    };
    Object.defineProperty(target, setUnsubscribeMethodName, {
      value: setUnsubscribeMethod,
    });
    Mutation(target, setUnsubscribeMethodName, {
      configurable: true,
      enumerable: false,
      value: setUnsubscribeMethod,
      writable: true,
    });

    // LOAD METHOD
    const loadMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const context = (this as any).context;
      if (context.state[unsubscribeName]) return;

      const unsubscribeMethod = loadMethod.apply(this, args);

      context.commit(setUnsubscribeMethodName, {
        method: () => {
          unsubscribeMethod?.();
          context.commit(setUnsubscribeMethodName, { method: undefined });
        },
      });
    };

    return descriptor;
  };
}
