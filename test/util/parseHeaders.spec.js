import {
  parseHeaders,
  removeTailHtml
} from '@/util/parseHeaders'

describe('parseHeaders', () => {
  test('should unescape html', () => {
    const input = '&lt;div&gt;'
    expect(parseHeaders(input)).toBe('<div>')
  })

  test('should remove markdown tokens correctly', () => {
    const asserts = {
      // #238
      '[vue](vuejs.org)': 'vue',
      '`vue`': 'vue',
      '*vue*': 'vue',
      '**vue**': 'vue',
      '***vue***': 'vue',
      '_vue_': 'vue',
      '\\_vue\\_': '_vue_',
      '\\*vue\\*': '*vue*',

      // #564 For multiple markdown tokens
      '`a` and `b`': 'a and b',
      '***bold and italic***': 'bold and italic',
      '**bold** and *italic*': 'bold and italic'
    }
    Object.keys(asserts).forEach(input => {
      expect(parseHeaders(input)).toBe(asserts[input])
    })
  })

  test('should remove tail html correctly', () => {
    expect(removeTailHtml('# H1 <div></div>>')).toBe('# H1')
  })
})
