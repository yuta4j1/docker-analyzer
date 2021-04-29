export const convertToCamelcase = (data: any): any | null => {
  if (typeof data !== 'object') {
    return null
  }
  return Object.keys(data).reduce((acc, curr) => {
    if (typeof data[curr] === 'object') {
      if (data[curr] === null) {
        return acc
      }
      acc[stringConvertToCamelcase(curr)] = convertToCamelcase(data[curr])
      return acc
    }
    acc[stringConvertToCamelcase(curr)] = data[curr]
    return acc
  }, {})
}

const stringConvertToCamelcase = (str: string): string => {
  return str
    .split('')
    .map((v, i) => {
      if (i === 0) {
        return v.toLocaleLowerCase()
      } else {
        return v
      }
    })
    .join('')
}
