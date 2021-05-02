// オブジェクトのプロパティをキャメルケースに変換する
export const convertToCamelcase = (data: any): any | null => {
  if (isOtherThanObject(data)) {
    return data
  }
  if (Array.isArray(data)) {
    // 配列の場合、要素に再起処理を当てる
    return data.map((v) => {
      return convertToCamelcase(v)
    })
  } else {
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

// データの型
const isOtherThanObject = (data: any): boolean => {
  switch (typeof data) {
    case 'string':
      return true
    case 'boolean':
      return true
    case 'number':
      return true
    case 'object':
      return false
    default:
      return true
  }
}
