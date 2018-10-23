interface Address {
  address1: string,
  address2: string,
  city: string,
  country: string,
  firstName: string,
  lastName: string,
  province: string,
  zip: string,
}

interface Item {
  id: number,
  price: number,
  quantity: number,
  title: string,
  variant_id: number,
}

interface Cart {
  items: Item[],
}

interface ShippingRate {
  title: string,
  code: string,
  price: number,
  description: string,
  currency: string,
}