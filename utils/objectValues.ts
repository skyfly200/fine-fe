function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map(key => obj[key as keyof T])
}

export default objectValues
