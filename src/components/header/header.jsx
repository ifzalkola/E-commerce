import React from "react";
import { connect } from "react-redux";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header-styles";
import { ReactComponent as Logo } from "../../assets/logo/crown.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { createStructuredSelector } from "reselect";
import { selectUserCurrent } from "../../redux/user/user-selectors";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { signOutStart } from "../../redux/user/user-actions";

const Header = (props) => {
  const { currentUser, hidden, signOut } = props;
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={() => {
              signOut();
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStatetoProps = createStructuredSelector({
  currentUser: selectUserCurrent,
  hidden: selectCartHidden,
});
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});
export default connect(mapStatetoProps, mapDispatchToProps)(Header);
