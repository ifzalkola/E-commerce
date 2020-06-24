import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyByv23Ft5g16L5WpZPNtbf2iEu0j9e5s0I",
  authDomain: "e-commerce-4c8fb.firebaseapp.com",
  databaseURL: "https://e-commerce-4c8fb.firebaseio.com",
  projectId: "e-commerce-4c8fb",
  storageBucket: "e-commerce-4c8fb.appspot.com",
  messagingSenderId: "430488080691",
  appId: "1:430488080691:web:fc39dde6b1cb78add7ae46",
  measurementId: "G-MV9N1MH4HJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  const { displayName, email } = userAuth;
  const createdAt = new Date();
  if (!snapShot.exists) {
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  return userRef;
};

export const addCollectionandDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newdocRef = collectionRef.doc();
    batch.set(newdocRef, obj);
  });
  return await batch.commit();
};
export const convertCollectionsSnapshotToMap = (collection) => {
  const transformedCollections = collection.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
