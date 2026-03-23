### isNotEmpty

```typescript
function isNotEmpty(value: any): boolean
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| value | any | 需要判断的值 |

### 返回值

返回 `boolean`，表示值是否为非空。

### 判断规则

| 类型 | 非空条件 |
|------|----------|
| 对象 | 至少有一个属性的值为真值（递归判断） |
| 数组 | 至少有一个元素的值为真值（递归判断） |
| 数字 | 有效数字（非 NaN） |
| 字符串 | 非空字符串 |
| boolean | 始终返回 true |
| null/undefined | 返回 false |

### 示例

```javascript
import { isNotEmpty } from '@kne/is-empty';

isNotEmpty({});                    // false
isNotEmpty({ a: 1 });              // true
isNotEmpty({ a: null, b: 1 });     // true
isNotEmpty([]);                    // false
isNotEmpty([1]);                   // true
isNotEmpty([null]);                // false
isNotEmpty(0);                     // true
isNotEmpty(NaN);                   // false
isNotEmpty('');                    // false
isNotEmpty('text');                // true
isNotEmpty(null);                  // false
isNotEmpty(undefined);             // false
isNotEmpty(true);                  // true
isNotEmpty(false);                 // true
```

---

## isEmpty

判断值是否为空，是 `isNotEmpty` 的反向函数。

### 函数签名

```typescript
function isEmpty(value: any): boolean
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| value | any | 需要判断的值 |

### 返回值

返回 `boolean`，表示值是否为空。

### 示例

```javascript
import { isEmpty } from '@kne/is-empty';

isEmpty({});           // true
isEmpty({ a: 1 });     // false
isEmpty([]);           // true
isEmpty([1]);          // false
isEmpty('');           // true
isEmpty('text');       // false
isEmpty(0);            // false
isEmpty(NaN);          // true
isEmpty(null);         // true
isEmpty(undefined);    // true
```

---

## filterEmpty

递归过滤对象或数组中的空值。

### 函数签名

```typescript
function filterEmpty(value?: object | array): object | array | any
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | object \| array | `{}` | 需要过滤的值 |

### 返回值

返回过滤后的值，空对象和空数组会被移除。

### 过滤规则

以下值会被过滤：
- `null`
- `undefined`
- 空字符串 `''`
- 空对象 `{}`
- 空数组 `[]`
- 仅包含上述空值的对象或数组

以下值会被保留：
- 数字 `0`
- 布尔值 `false`
- 非空字符串
- 非空对象
- 非空数组

### 示例

```javascript
import { filterEmpty } from '@kne/is-empty';

// 过滤对象中的空值
filterEmpty({ a: 1, b: null, c: undefined, d: '', e: 'text' });
// 返回: { a: 1, e: 'text' }

// 过滤数组中的空值
filterEmpty([1, null, 2, undefined, '', 3]);
// 返回: [1, 2, 3]

// 递归过滤嵌套对象
filterEmpty({
  a: { b: null, c: 1 },
  d: { e: '' }
});
// 返回: { a: { c: 1 } }

// 递归过滤嵌套数组
filterEmpty([{ a: 1, b: null }, { c: '', d: 2 }, null]);
// 返回: [{ a: 1 }, { d: 2 }]

// 保留数字 0
filterEmpty({ a: 0, b: null });
// 返回: { a: 0 }

// 保留布尔值 false
filterEmpty({ a: false, b: null });
// 返回: { a: false }

// 无参数调用
filterEmpty();
// 返回: {}
```
