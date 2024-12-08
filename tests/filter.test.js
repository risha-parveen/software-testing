import filter from '../src/filter'

describe('filter', () => {
  // Test null/undefined array handling
  test('handles null and undefined arrays', () => {
    expect(filter(null, x => x)).toEqual([])
    expect(filter(undefined, x => x)).toEqual([])
  })

  // Test basic filtering functionality and predicate arguments
  test('filters array with predicate receiving correct arguments', () => {
    const array = [1, 2, 3]
    const predicateArgs = []
    
    const result = filter(array, (value, index, arr) => {
      predicateArgs.push({ value, index, arr })
      return value % 2 === 0
    })

    // Test predicate arguments
    expect(predicateArgs).toEqual([
      { value: 1, index: 0, arr: array },
      { value: 2, index: 1, arr: array },
      { value: 3, index: 2, arr: array }
    ])

    // Test filtered result
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

  // Test empty array and no matches
  test('handles empty array and no matches', () => {
    expect(filter([], x => x)).toEqual([])
    expect(filter([1, 2, 3], x => x > 10)).toEqual([])
  })
})