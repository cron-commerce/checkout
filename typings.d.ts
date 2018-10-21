interface Account {
  id: number,
  email: string,
}

interface Address {
  address1: string,
}

interface Item {
  id: number,
  price: number,
  title: string,
}

interface Cart {
  items: Item[],
}
