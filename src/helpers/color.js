const color = (eachItem) => {
  let value = eachItem.value
  let col
  switch (value) {
  case 1:
    col = '#0827EC'
    break
  case 2:
    col = '#18B00B'
    break
  case 3:
    col = '#EC3508'
    break
  case 4:
    col = '#3F0345'
    break
  case 5:
    col = '#03451C'
    break
  case 6:
    col = '#905A01'
    break
  default:
    col = '#fff'
    break
  }
  return col
}

export default color