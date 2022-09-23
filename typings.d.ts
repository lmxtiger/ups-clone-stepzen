type Customer = {
  email: string,
  name: string,
}

type CustomerWithID = {
  name: string,
  value: Customer,
}

type Order = {
  carrier: string,
  createdAt: string,
  shippingCost: number,
  trackingId: string,
  trackingItems: TrackingItems,
  Address: string,
  City: string,
  Lat: number,
  Lng: number,
}

type OrderList = {
  name: string,
  value: Order,
}

type Items = {
  item_id: string,
  name: string
  price: number,
  quantity: number,
}

type TrackingItems = {
  customer_id: string,
  customer: Customer,
  items: Items[],
}

type OrderResponse = {
  value: Order
}

type CustomerResponse = {
  name: string,
  value: Customer
}