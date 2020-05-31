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
