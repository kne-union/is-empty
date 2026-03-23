用于判断数据是否为空，考虑了数组和对象的情况。

## 核心特性

- **isNotEmpty**: 判断值是否为非空，支持对象、数组、字符串、数字等多种类型
- **isEmpty**: 判断值是否为空，是 isNotEmpty 的反向函数
- **filterEmpty**: 递归过滤对象或数组中的空值，常用于表单数据处理

## 判断规则

### 对象类型

对象需要有至少一个属性的值为真值才被视为非空，判断会递归进行：

```javascript
isNotEmpty({});                    // false - 空对象
isNotEmpty({ a: null });           // false - 属性值为假值
isNotEmpty({ a: 1 });              // true - 有真值属性
isNotEmpty({ a: { b: 1 } });       // true - 嵌套对象有真值
isNotEmpty({ a: { b: null } });    // false - 嵌套对象无真值
```

### 数组类型

数组需要有至少一个元素的值为真值才被视为非空：

```javascript
isNotEmpty([]);                    // false - 空数组
isNotEmpty([null]);                // false - 元素为假值
isNotEmpty([1]);                   // true - 有真值元素
isNotEmpty([null, 1]);             // true - 有真值元素
```

### 其他类型

| 类型             | 非空条件                 |
|----------------|----------------------|
| 数字             | 有效数字（非 NaN），`0` 也是非空 |
| 字符串            | 非空字符串，空格也是非空         |
| boolean        | 始终为非空，`false` 也是非空   |
| null/undefined | 始终为空                 |

## 使用场景

- 表单数据验证和清理
- API 请求参数过滤
- 条件渲染判断
- 数据清洗和处理
