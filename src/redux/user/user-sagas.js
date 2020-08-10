import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  emailSignInStart,
  signUpSuccess,
} from "./user-actions";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase";
import userActionTypes from "./user-types";
export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* GoogleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* EmailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    put(signInFailure(error));
  }
}
export function* signUp({payload: {displayName, email, password}}){
  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email,password);
    yield createUserProfileDocument(user, { displayName });
    yield put(signUpSuccess())
    yield put(emailSignInStart({email,password}))
  } catch (error) {
    yield put(signUpFailure(error))
  }
}
export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onGoogleSignIn() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, GoogleSignIn);
}
export function* onEmailSignIn() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, EmailSignIn);
}
export function* onSignOut() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}
export function* onSignUp(){
  yield takeLatest(userActionTypes.SIGN_UP_START,signUp)
}
export default function* userSaga() {
  yield all([
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onSignOut),
    call(onSignUp)
  ]);
}
