export const AddItemToCart = (cartItems, ItemToAdd) => {
  const existingItems = cartItems.find(
    (cartItem) => cartItem.id === ItemToAdd.id
  );
  if (existingItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === ItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...ItemToAdd, quantity: 1 }];
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
