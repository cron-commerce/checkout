export default (cart: Cart) => ({
  items: cart.items.map(item => ({
    quantity: item.quantity,
    variant_id: item.variant_id,
  })),
})
