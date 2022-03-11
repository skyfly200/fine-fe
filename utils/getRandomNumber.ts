const getRandomNumber = (min: number = 0, max: number, exclude?: any[]): number => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  if (exclude) {
    return exclude.includes(num) ? getRandomNumber(min, max, exclude) : num
  }
  return num
}

export default getRandomNumber
