const list = [true, false, false, true]

list.sort((a, b) => {
  if (a) {
    return 1
  } else {
    return -1
  }
})

console.log(list)
