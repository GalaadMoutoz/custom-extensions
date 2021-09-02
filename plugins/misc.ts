// interface Array<T> {
//   sortBy(propertyName: string): Array<T>;
// }

// Array.prototype.sortBy = function(propertyName: string) {
//   return this.sort((a, b) => {
//     if (a[propertyName] < b[propertyName]) return -1;
//     if (a[propertyName] > b[propertyName]) return 1;
//     return 0;
//   });
// };

import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $deepValue: (obj: any, path: string) => any;
  }
}

Vue.prototype.$deepValue = function (obj: any, path: string) {
  const subs = path.split(".");
  for (let i = 0; i < subs.length; i++) {
    // if (!Object.keys(obj).includes(subs[i])) return "";
    obj = obj[subs[i]];
  }
  return obj;
};

export default () => {};
