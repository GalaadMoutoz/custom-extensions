import Vue from "vue";
import { Module, VuexModule, Action } from "vuex-module-decorators";
import firebase from "firebase/app";
import { DocLoader, FirestoreData } from "@/extensions/vuex-firestore/src";
import DummyDoc from "~/types/dummy-doc";
import { CollectionLoader } from "@/extensions/vuex-firestore/lib";

Vue.prototype.$dummyDoc = function (): DummyDoc {
  return (this as Vue).$store.state.loaders.dummyDoc as DummyDoc;
};

declare module "vue/types/vue" {
  interface Vue {
    $dummyDoc(): DummyDoc;
  }
}

Vue.prototype.$dummyCollection = function (): DummyDoc {
  return (this as Vue).$store.state.loaders.dummyCollection as DummyDoc;
};

declare module "vue/types/vue" {
  interface Vue {
    $dummyCollection(): DummyDoc;
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

  dummyCollection: DummyDoc[] = [];

  @Action({ rawError: true })
  @CollectionLoader("dummyCollection")
  loadDummyCollection() {
    return (docs: firebase.firestore.DocumentSnapshot[]) => {
      const dummyCollection = docs.map((doc) => FirestoreData.fromSnapshot(DummyDoc, doc));

      this.context.commit("setSurveyQuestions", dummyCollection);
    };
  }
}
