import Vue from "vue";
import { Mutation } from "vuex-module-decorators";
import firebase from "firebase/app";

export interface CollectionLoaderQuerySettings {
  limit?: number;
  getter?: () => firebase.firestore.Query;
  collectionName?: string;
}

export function CollectionLoader(name: string, querySettings: CollectionLoaderQuerySettings = {}) {
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
        Vue.set(this, name, null);
      } else {
        Vue.set(this, name, object);
      }
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
    const dataProcessingMethodGetter = descriptor.value;

    descriptor.value = function (...args: []) {
      const context = (this as any).context;

      if (context.state[unsubscribeName]) return;

      const promise = new Promise<void>((resolve) => {
        if (!querySettings.getter && !querySettings.collectionName) {
          querySettings.collectionName = name + "s";
        }

        let query: firebase.firestore.Query<firebase.firestore.DocumentData> = querySettings.getter
          ? querySettings.getter.apply(this, args)
          : firebase.firestore().collection(querySettings.collectionName as string);

        if (querySettings.limit) query = query.limit(querySettings.limit);

        const unsubscribeMethod = query.onSnapshot((snapshot) => {
          dataProcessingMethodGetter.apply(this, args)(snapshot.docs);
          resolve?.();
        });

        context.commit(setUnsubscribeMethodName, {
          method: () => {
            unsubscribeMethod();
            context.commit(setUnsubscribeMethodName, { method: undefined });
          },
        });
      });

      return promise;
    };

    return descriptor;
  };
}
