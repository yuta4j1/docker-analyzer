import { convertToCamelcase } from '../json'

describe('json.ts', () => {
  it('convertToCamelcase', () => {
    const test = {
      Hoge: 'aaa',
      FugaFuga: 'bbb',
      Neet: 1,
      Foo: {
        Neko: 'myaaa',
        Inu: 'wannnu',
      },
    }
    const result = {
      hoge: 'aaa',
      fugaFuga: 'bbb',
      neet: 1,
      foo: {
        neko: 'myaaa',
        inu: 'wannnu',
      },
    }
    expect(result).toStrictEqual(convertToCamelcase(test))
  })
})
