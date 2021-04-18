// const items = [
//   { item: '1', title: 'car', quantity: 1 },
//   { item: '2', title: 'apple', quantity: 10 },
//   { item: '3', title: 'tree', quantity: 3 },
// ]

// const item = '2'
// const quantity = 2

// const targetItem = items.find(i => i.item === item)
// const targetIndex = items.indexOf(targetItem)

// console.log(targetItem)
// // console.log(targetIndex)

// Object.assign(targetItem, { quantity: targetItem.quantity + quantity })

// console.log(targetItem)

// items.splice(targetIndex, 1, targetItem)

// console.log(items)

const cart = {
  quantity: 14,
  items: [
    { item: '1', title: 'car', quantity: 1 },
    { item: '2', title: 'apple', quantity: 10 },
    { item: '3', title: 'tree', quantity: 3 },
  ],
}
const itemId = '4'
const quantity = 100

const updateCart = (cart, item, quantity) => {
  cart.quantity += quantity
  const items = cart.items
  const targetItem = items.find(i => i.item === item)
  const targetIndex = items.indexOf(targetItem)
  if (targetItem) {
    const targetItemQuantity = targetItem.quantity
    Object.assign(targetItem, { quantity: targetItemQuantity + quantity })
    items.splice(targetIndex, 1, targetItem)
    return cart
  } else {
    const newItem = { item, quantity }
    items.push(newItem)
    return cart
  }
}

console.log(cart)
const newCart = updateCart(cart, itemId, quantity)
console.log(newCart)
