import firebase from "firebase/app";

export default class FirestoreData {
  id = "";
  path = "";
  docExists = false;

  public ref() {
    return firebase.firestore().doc(this.path);
  }

  public clone(keepId = false): any {
    const clone = JSON.parse(JSON.stringify(this));
    if (!keepId) delete clone.id;
    delete clone.path;
    delete clone.docExists;
    return clone;
  }

  public async deleteFromDatabase(): Promise<void> {
    if (this.path) await this.ref().delete();
  }

  static fromSnapshot<T extends FirestoreData>(
    Ctor: new () => T,
    snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ): T {
    const obj = Object.assign(new Ctor(), snapshot.data());
    obj.id = snapshot.id;
    obj.path = snapshot.ref.path;
    obj.docExists = snapshot.exists;
    return obj;
  }
}
