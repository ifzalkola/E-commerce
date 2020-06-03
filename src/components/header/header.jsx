import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.scss";
import { ReactComponent as Logo } from "../../assets/logo/crown.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { auth } from "../../firebase/firebase";
import { createStructuredSelector } from "reselect";
import { selectUserCurrent } from "../../redux/user/user-selectors";
import { selectCartHidden } from "../../redux/cart/cart-selectors";

const Header = (props) => {
  const { currentUser, hidden } = props;
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
            }}
          >
            SIGN OUT
          </div>
        ) : (
          <Link to="/signin" className="option">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectUserCurrent,
  hidden: selectCartHidden,
});

export default connect(mapStatetoProps)(Header);
