import filter from '../src/filter'

describe('filter', () => {
  test('handles filtering out all the values from array', ()=> {
    expect(filter([1, 2, 3], x => x)).toEqual([1, 2, 3])
  })

  // Test basic filtering functionality and predicate arguments
  test('filters array with predicate receiving correct arguments', () => {
    const array = [1, 2, 3]
    const predicateArgs = []
    
    const result = filter(array, (value, index, arr) => {
      predicateArgs.push({ value, index, arr })
      return value % 2 === 0
    })

    expect(predicateArgs).toEqual([
      { value: 1, index: 0, arr: array },
      { value: 2, index: 1, arr: array },
      { value: 3, index: 2, arr: array }
    ])

    expect(result).toEqual([2])
  })

  // Test the documentation example
  test('filters objects as shown in documentation', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred', 'active': false }
    ]
    const result = filter(users, ({ active }) => active)
    expect(result).toEqual([{ 'user': 'barney', 'active': true }])
  })

  test('handles when there are no matches', () => {
    // 
    expect(filter([1, 2, 3], x => x > 10)).toEqual([])
  })

  test('handles when an empty array is provided', () => {
    expect(filter([], x => x)).toEqual([])
  })

  test('handles null array', () => {
    expect(filter(null, x => x)).toEqual([])
  })

  test('handles undefined array', () => {
    expect(filter(undefined, x => x)).toEqual([])
  })
})