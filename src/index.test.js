import { isNotEmpty, isEmpty, filterEmpty } from './index.js';

describe('isNotEmpty', () => {
  describe('对象类型', () => {
    it('空对象应返回 false', () => {
      expect(isNotEmpty({})).toBe(false);
    });

    it('有属性但值为假值的对象应返回 false', () => {
      expect(isNotEmpty({ a: null, b: undefined, c: '' })).toBe(false);
    });

    it('有真值属性的对象应返回 true', () => {
      expect(isNotEmpty({ a: 1 })).toBe(true);
      expect(isNotEmpty({ a: 'text' })).toBe(true);
      expect(isNotEmpty({ a: false, b: true })).toBe(true);
    });

    it('部分属性为真值时应返回 true', () => {
      expect(isNotEmpty({ a: null, b: 1 })).toBe(true);
    });
  });

  describe('数组类型', () => {
    it('空数组应返回 false', () => {
      expect(isNotEmpty([])).toBe(false);
    });

    it('非空数组应返回 true', () => {
      expect(isNotEmpty([1])).toBe(true);
      expect(isNotEmpty([null, 1])).toBe(true);
      expect(isNotEmpty([undefined, 'text'])).toBe(true);
    });

    it('仅包含空值的数组应返回 false', () => {
      expect(isNotEmpty([null])).toBe(false);
      expect(isNotEmpty([undefined])).toBe(false);
      expect(isNotEmpty([null, undefined])).toBe(false);
      expect(isNotEmpty([''])).toBe(false);
    });
  });

  describe('数字类型', () => {
    it('有效数字应返回 true', () => {
      expect(isNotEmpty(0)).toBe(true);
      expect(isNotEmpty(1)).toBe(true);
      expect(isNotEmpty(-1)).toBe(true);
      expect(isNotEmpty(3.14)).toBe(true);
    });

    it('NaN 应返回 false', () => {
      expect(isNotEmpty(NaN)).toBe(false);
    });
  });

  describe('其他类型', () => {
    it('null 应返回 false', () => {
      expect(isNotEmpty(null)).toBe(false);
    });

    it('undefined 应返回 false', () => {
      expect(isNotEmpty(undefined)).toBe(false);
    });

    it('空字符串应返回 false', () => {
      expect(isNotEmpty('')).toBe(false);
    });

    it('非空字符串应返回 true', () => {
      expect(isNotEmpty('text')).toBe(true);
      expect(isNotEmpty(' ')).toBe(true);
    });

    it('boolean 类型应返回 true', () => {
      expect(isNotEmpty(true)).toBe(true);
      expect(isNotEmpty(false)).toBe(true);
    });
  });
});

describe('isEmpty', () => {
  it('isEmpty 是 isNotEmpty 的反向', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('text')).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(NaN)).toBe(true);
  });
});

describe('filterEmpty', () => {
  describe('对象过滤', () => {
    it('应过滤掉空值的属性', () => {
      const input = {
        a: 1,
        b: null,
        c: undefined,
        d: '',
        e: 'text'
      };
      const result = filterEmpty(input);
      expect(result).toEqual({ a: 1, e: 'text' });
    });

    it('空对象应返回空对象', () => {
      expect(filterEmpty({})).toEqual({});
    });

    it('应递归过滤嵌套对象', () => {
      const input = {
        a: {
          b: null,
          c: 1
        },
        d: {
          e: ''
        }
      };
      const result = filterEmpty(input);
      expect(result).toEqual({ a: { c: 1 } });
    });

    it('应保留数字 0', () => {
      const input = { a: 0, b: null };
      const result = filterEmpty(input);
      expect(result).toEqual({ a: 0 });
    });

    it('应保留 false', () => {
      const input = { a: false, b: null };
      const result = filterEmpty(input);
      expect(result).toEqual({ a: false });
    });
  });

  describe('数组过滤', () => {
    it('应过滤数组中的空值', () => {
      const input = [1, null, 2, undefined, '', 3];
      const result = filterEmpty(input);
      expect(result).toEqual([1, 2, 3]);
    });

    it('空数组应返回空数组', () => {
      expect(filterEmpty([])).toEqual([]);
    });

    it('应递归过滤嵌套数组', () => {
      const input = [{ a: 1, b: null }, { c: '', d: 2 }, null];
      const result = filterEmpty(input);
      expect(result).toEqual([{ a: 1 }, { d: 2 }]);
    });

    it('应处理多维数组', () => {
      const input = [[1, null], [], [2]];
      const result = filterEmpty(input);
      expect(result).toEqual([[1], [2]]);
    });
  });

  describe('原始类型', () => {
    it('原始类型应原样返回', () => {
      expect(filterEmpty(1)).toBe(1);
      expect(filterEmpty('text')).toBe('text');
      expect(filterEmpty(true)).toBe(true);
    });
  });

  describe('默认参数', () => {
    it('无参数时应返回空对象', () => {
      expect(filterEmpty()).toEqual({});
    });
  });

  describe('复杂嵌套结构', () => {
    it('应正确处理复杂的嵌套结构', () => {
      const input = {
        a: {
          b: [1, null, { c: '', d: 2 }],
          e: null
        },
        f: [],
        g: { h: {} },
        i: 'text'
      };
      const result = filterEmpty(input);
      expect(result).toEqual({
        a: { b: [1, { d: 2 }] },
        i: 'text'
      });
    });
  });

  describe('对象值为数字 0 的场景', () => {
    it('应保留值为 0 的对象，过滤空对象', () => {
      const input = {
        scores: { a: 0, b: 0 },
        emptySection: { nested: {} },
        mixed: { valid: 0, invalid: {} }
      };
      const result = filterEmpty(input);
      expect(result).toEqual({
        scores: { a: 0, b: 0 },
        mixed: { valid: 0 }
      });
    });

    it('应正确处理深层嵌套中值为 0 的对象', () => {
      const input = {
        level1: {
          level2: {
            zeroValues: { x: 0, y: 0 },
            emptyObj: {}
          }
        }
      };
      const result = filterEmpty(input);
      expect(result).toEqual({
        level1: {
          level2: {
            zeroValues: { x: 0, y: 0 }
          }
        }
      });
    });

    it('应保留 false 值的对象，过滤空对象', () => {
      const input = {
        flags: { active: false, enabled: false },
        emptyFlags: {}
      };
      const result = filterEmpty(input);
      expect(result).toEqual({
        flags: { active: false, enabled: false }
      });
    });
  });
});
