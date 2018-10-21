interface Item {
  id: number,
  price: number,
  title: string,
}

interface Cart {
  items: Item[],
}

interface User {
  id: number,
  email: string,
}