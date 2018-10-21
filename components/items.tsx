import Item from './item'

export default ({cart}: {cart: Cart}) => <div>
  {cart.items.map(item => <Item key={item.id} item={item} />)}
</div>
