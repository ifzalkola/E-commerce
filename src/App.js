import React from "react";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import "./pages/sign-in-and-sign-up/sign-in-and-sign-up.scss";
import Header from "./components/header/header";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { setCurrentUser } from "./redux/user/user-actions";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import "./App.css";

class App extends React.Component {
  unsubscribe = null;
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser({
          currentUser: userAuth,
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/signin" component={SignInAndSignUp}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
