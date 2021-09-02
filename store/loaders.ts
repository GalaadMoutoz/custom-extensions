import Vue from "vue";
import { Module, VuexModule, Action } from "vuex-module-decorators";
import firebase from "firebase/app";
import { DocLoader, FirestoreData } from "@/extensions/vuex-firestore/src";
import DummyDoc from "~/types/dummy-doc";

Vue.prototype.$dummyDoc = function (): DummyDoc {
  return (this as Vue).$store.state.loaders.dummyDoc as DummyDoc;
};

declare module "vue/types/vue" {
  interface Vue {
    $dummyDoc(): DummyDoc;
  }
}

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class SurveyModule extends VuexModule {
  dummyDoc = new DummyDoc();

  @Action({ rawError: true })
  @DocLoader("dummyDoc")
  loadDummyDoc() {
    return firebase
      .firestore()
      .collection("dummy")
      .doc("doc")
      .onSnapshot((snapshot) => {
        const dummyDoc = FirestoreData.fromSnapshot(DummyDoc, snapshot);
        this.context.commit("setDummyDoc", dummyDoc);

        if (!snapshot.exists) snapshot.ref.set(dummyDoc.clone());
      });
  }
}
