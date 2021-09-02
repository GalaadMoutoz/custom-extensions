// import Vue from "vue";
// import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
// import firebase from "firebase/app";
// import { CollectionLoader } from "@/modules/utils/collection-loader-decorator";
// import DataObject from "@/modules/utils/data-object";
// import { DocLoader } from "~/modules/utils/doc-loader-decorator";

// Vue.prototype.$surveyCategories = function (level = -1): SurveyCategory[] {
//   const categories = (this as Vue).$store.state.survey.surveyCategories as SurveyCategory[];

//   if (level !== -1) return categories.filter((x) => x.level === level);
//   return categories;
// };

// Vue.prototype.$surveyQuestions = function (): SurveyQuestion[] {
//   return (this as Vue).$store.state.survey.surveyQuestions;
// };

// Vue.prototype.$surveyAnswers = function (): SurveyAnswers {
//   return (this as Vue).$store.state.survey.surveyAnswers;
// };

// declare module "vue/types/vue" {
//   interface Vue {
//     $surveyCategories(level?: number): SurveyCategory[];
//     $surveyQuestions(): SurveyQuestion[];
//     $surveyAnswers(): SurveyAnswers;
//   }
// }

// @Module({
//   stateFactory: true,
//   namespaced: true,
// })
// export default class SurveyModule extends VuexModule {
//   @Mutation
//   unsubscribeAll() {
//     const promises = [
//       (this as any).loadSurveyCategoriesUnsubscribe?.(),
//       (this as any).loadSurveyQuestionsUnsubscribe?.(),
//       (this as any).loadSurveyAnswersUnsubscribe?.(),
//     ];

//     this.surveyCategories = [];
//     this.surveyQuestions = [];
//     this.surveyAnswers = new SurveyAnswers();

//     return Promise.all(promises);
//   }

//   surveyCategories: SurveyCategory[] = [];
//   surveyCategoriesQuery = {
//     limit: 999,
//     getter: () => firebase.firestore().collection("survey-categories"),
//     collection: "survey-categories",
//   };

//   @Action
//   @CollectionLoader("surveyCategories")
//   loadSurveyCategories() {
//     return (docs: any) => {
//       const objects: SurveyCategory[] = docs.map((doc: any) => SurveyCategory.fromSnapshot(doc));
//       this.context.commit("setSurveyCategories", objects);
//     };
//   }

//   surveyQuestions: SurveyQuestion[] = [];
//   surveyQuestionsQuery = {
//     limit: 999,
//     getter: () => firebase.firestore().collection("survey-questions"),
//     collection: "survey-questions",
//   };

//   @Action
//   @CollectionLoader("surveyQuestions")
//   loadSurveyQuestions() {
//     return (docs: any) => {
//       const objects: SurveyQuestion[] = docs.map((doc: any) => DataObject.fromFirebase(SurveyQuestion, doc));
//       this.context.commit("setSurveyQuestions", objects);
//     };
//   }

//   surveyAnswers = new SurveyAnswers();

//   @Action
//   @DocLoader("surveyAnswers")
//   loadSurveyAnswers({ userId }: { userId: string }) {
//     return firebase
//       .firestore()
//       .collection("survey-answers")
//       .doc(userId)
//       .onSnapshot((doc) => {
//         const surveyAnswers = DataObject.fromFirebase(SurveyAnswers, doc);
//         this.context.commit("setSurveyAnswers", surveyAnswers);

//         if (!doc.exists) doc.ref.set(surveyAnswers.clone());
//       });
//   }
// }
