const pickRandomItem = (arr: any[], index: number) => {
  let newArray = [...arr]
  if (index) {
    newArray.splice(index, 1)
  }
  return newArray[Math.floor(Math.random() * newArray.length)]
}

export default pickRandomItem
