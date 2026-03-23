# is-empty

### 描述

用于判断和过滤空值的工具库，支持对象、数组的递归判断，保留数字0和布尔值false

### 安装

```shell
npm i --save @kne/is-empty
```

### 概述

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


### 示例

#### 示例代码

- 基础用法
- 展示 isEmpty、isNotEmpty、filterEmpty 的基本使用方法
- _IsEmpty(@kne/current-lib_is-empty)[import * as _IsEmpty from "@kne/is-empty"],antd(antd)

```jsx
const { isEmpty, isNotEmpty, filterEmpty } = _IsEmpty;
const { Flex, Typography, Card, Descriptions } = antd;
const { Text, Title } = Typography;

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Card title="isEmpty 示例" size="small">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="isEmpty({})">{isEmpty({}).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty({ a: 1 })">{isEmpty({ a: 1 }).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty([])">{isEmpty([]).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty([1])">{isEmpty([1]).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty(null)">{isEmpty(null).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty('')">{isEmpty('').toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty(0)">{isEmpty(0).toString()}</Descriptions.Item>
          <Descriptions.Item label="isEmpty(NaN)">{isEmpty(NaN).toString()}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="isNotEmpty 示例" size="small">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="isNotEmpty({})">{isNotEmpty({}).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty({ a: 1 })">{isNotEmpty({ a: 1 }).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty([])">{isNotEmpty([]).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty([1])">{isNotEmpty([1]).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty(null)">{isNotEmpty(null).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty('')">{isNotEmpty('').toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty(0)">{isNotEmpty(0).toString()}</Descriptions.Item>
          <Descriptions.Item label="isNotEmpty('text')">{isNotEmpty('text').toString()}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="filterEmpty 示例" size="small">
        <Flex vertical gap={8}>
          <Text code>{"filterEmpty({ a: 1, b: null, c: undefined, d: '', e: 'text' })"}</Text>
          <Text>{JSON.stringify(filterEmpty({ a: 1, b: null, c: undefined, d: '', e: 'text' }))}</Text>
        </Flex>
      </Card>
    </Flex>
  );
};

render(<BaseExample />);

```

- isNotEmpty 判断非空
- isNotEmpty 函数用于判断值是否为非空，支持对象、数组、字符串等多种类型
- _IsEmpty(@kne/current-lib_is-empty)[import * as _IsEmpty from "@kne/is-empty"],antd(antd)

```jsx
const { isNotEmpty } = _IsEmpty;
const { Flex, Typography, Card, Table, Tag, Divider } = antd;
const { Text, Title } = Typography;

const IsNotEmptyExample = () => {
  const testCases = [
    // 对象类型
    { category: '对象类型', value: {}, description: '空对象', expected: false },
    { category: '对象类型', value: { a: null, b: undefined, c: '' }, description: '所有属性为假值', expected: false },
    { category: '对象类型', value: { a: 1 }, description: '有真值属性', expected: true },
    { category: '对象类型', value: { a: null, b: 1 }, description: '部分属性为真值', expected: true },
    { category: '对象类型', value: { a: false, b: true }, description: 'boolean 属性', expected: true },

    // 数组类型
    { category: '数组类型', value: [], description: '空数组', expected: false },
    { category: '数组类型', value: [1], description: '非空数组', expected: true },
    { category: '数组类型', value: [null], description: '仅包含 null', expected: false },
    { category: '数组类型', value: [undefined], description: '仅包含 undefined', expected: false },
    { category: '数组类型', value: [null, 1], description: '包含真值元素', expected: true },

    // 数字类型
    { category: '数字类型', value: 0, description: '数字 0', expected: true },
    { category: '数字类型', value: 1, description: '正整数', expected: true },
    { category: '数字类型', value: -1, description: '负整数', expected: true },
    { category: '数字类型', value: NaN, description: 'NaN', expected: false },

    // 字符串类型
    { category: '字符串类型', value: '', description: '空字符串', expected: false },
    { category: '字符串类型', value: 'text', description: '非空字符串', expected: true },
    { category: '字符串类型', value: ' ', description: '空格字符串', expected: true },

    // 其他类型
    { category: '其他类型', value: null, description: 'null', expected: false },
    { category: '其他类型', value: undefined, description: 'undefined', expected: false },
    { category: '其他类型', value: true, description: 'boolean true', expected: true },
    { category: '其他类型', value: false, description: 'boolean false', expected: true },
  ];

  const columns = [
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      width: 200,
      render: (value) => <Text code>{JSON.stringify(value)}</Text>
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '预期结果',
      dataIndex: 'expected',
      key: 'expected',
      width: 100,
      render: (expected) => (
        <Tag color={expected ? 'green' : 'red'}>
          {expected ? 'true' : 'false'}
        </Tag>
      )
    },
    {
      title: '实际结果',
      key: 'actual',
      width: 100,
      render: (_, record) => {
        const result = isNotEmpty(record.value);
        const isCorrect = result === record.expected;
        return (
          <Tag color={isCorrect ? 'green' : 'red'}>
            {result.toString()}
          </Tag>
        );
      }
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Card size="small">
        <Text>
          <Text strong>isNotEmpty</Text> 用于判断值是否为非空。
          对于对象，需要至少有一个真值属性才返回 true；
          对于数组，需要至少有一个真值元素才返回 true。
        </Text>
      </Card>
      <Table
        columns={columns}
        dataSource={testCases}
        rowKey={(record, index) => index}
        pagination={false}
        size="small"
      />
    </Flex>
  );
};

render(<IsNotEmptyExample />);

```

- isEmpty 判断为空
- isEmpty 函数是 isNotEmpty 的反向，用于判断值是否为空
- _IsEmpty(@kne/current-lib_is-empty)[import * as _IsEmpty from "@kne/is-empty"],antd(antd)

```jsx
const { isEmpty } = _IsEmpty;
const { Flex, Typography, Card, Table, Tag, Divider } = antd;
const { Text, Title } = Typography;

const IsEmptyExample = () => {
  const testCases = [
    // 对象类型
    { category: '对象类型', value: {}, description: '空对象', expected: true },
    { category: '对象类型', value: { a: null, b: undefined, c: '' }, description: '所有属性为假值', expected: true },
    { category: '对象类型', value: { a: 1 }, description: '有真值属性', expected: false },

    // 数组类型
    { category: '数组类型', value: [], description: '空数组', expected: true },
    { category: '数组类型', value: [1], description: '非空数组', expected: false },
    { category: '数组类型', value: [null], description: '仅包含 null', expected: true },

    // 数字类型
    { category: '数字类型', value: 0, description: '数字 0', expected: false },
    { category: '数字类型', value: NaN, description: 'NaN', expected: true },

    // 字符串类型
    { category: '字符串类型', value: '', description: '空字符串', expected: true },
    { category: '字符串类型', value: 'text', description: '非空字符串', expected: false },

    // 其他类型
    { category: '其他类型', value: null, description: 'null', expected: true },
    { category: '其他类型', value: undefined, description: 'undefined', expected: true },
    { category: '其他类型', value: true, description: 'boolean true', expected: false },
    { category: '其他类型', value: false, description: 'boolean false', expected: false },
  ];

  const columns = [
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      width: 200,
      render: (value) => <Text code>{JSON.stringify(value)}</Text>
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '预期结果',
      dataIndex: 'expected',
      key: 'expected',
      width: 100,
      render: (expected) => (
        <Tag color={expected ? 'green' : 'red'}>
          {expected ? 'true' : 'false'}
        </Tag>
      )
    },
    {
      title: '实际结果',
      key: 'actual',
      width: 100,
      render: (_, record) => {
        const result = isEmpty(record.value);
        const isCorrect = result === record.expected;
        return (
          <Tag color={isCorrect ? 'green' : 'red'}>
            {result.toString()}
          </Tag>
        );
      }
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Card size="small">
        <Text>
          <Text strong>isEmpty</Text> 是 <Text strong>isNotEmpty</Text> 的反向函数，
          用于判断值是否为空。两个函数结果互为相反。
        </Text>
      </Card>
      <Table
        columns={columns}
        dataSource={testCases}
        rowKey={(record, index) => index}
        pagination={false}
        size="small"
      />
    </Flex>
  );
};

render(<IsEmptyExample />);

```

- filterEmpty 过滤空值
- filterEmpty 函数用于递归过滤对象或数组中的空值，常用于表单数据处理
- _IsEmpty(@kne/current-lib_is-empty)[import * as _IsEmpty from "@kne/is-empty"],antd(antd)

```jsx
const { filterEmpty, isNotEmpty } = _IsEmpty;
const { Flex, Typography, Card, Divider, Input, Form, Button, Space, message } = antd;
const { Text, Title, Paragraph } = Typography;
const { useState } = React;

const FilterEmptyExample = () => {
  // 模拟表单数据
  const [formData, setFormData] = useState({
    name: '张三',
    age: null,
    email: '',
    phone: '13800138000',
    address: {
      province: '北京市',
      city: null,
      district: '',
      detail: '朝阳区xxx街道'
    },
    tags: ['标签1', null, '标签2', ''],
    attachments: [],
    remark: undefined
  });

  const handleFilter = () => {
    const filtered = filterEmpty(formData);
    message.success('过滤完成，请查看控制台');
    console.log('原始数据:', formData);
    console.log('过滤后数据:', filtered);
  };

  // 递归过滤示例
  const nestedExample = {
    level1: {
      level2: {
        validData: { x: 0, y: 0 },
        emptyObj: {},
        nullValue: null
      },
      emptyArray: []
    },
    items: [
      { id: 1, name: '项目1', desc: null },
      { id: 2, name: '', desc: '描述2' },
      null,
      { id: 3, name: '项目3', desc: '' }
    ]
  };

  const filteredNested = filterEmpty(nestedExample);

  return (
    <Flex vertical gap={24}>
      <Card title="对象过滤" size="small">
        <Flex vertical gap={12}>
          <Text strong>原始对象:</Text>
          <Paragraph code style={{ marginBottom: 8 }}>
            {JSON.stringify(formData, null, 2)}
          </Paragraph>
          <Divider style={{ margin: '8px 0' }} />
          <Text strong>过滤后对象:</Text>
          <Paragraph code style={{ marginBottom: 8 }}>
            {JSON.stringify(filterEmpty(formData), null, 2)}
          </Paragraph>
          <Text type="secondary">
            注意：null、undefined、空字符串被过滤，数字 0 和 false 被保留
          </Text>
        </Flex>
      </Card>

      <Card title="数组过滤" size="small">
        <Flex vertical gap={12}>
          <Text strong>原始数组:</Text>
          <Text code>{JSON.stringify([1, null, 2, undefined, '', 3])}</Text>
          <Text strong>过滤后数组:</Text>
          <Text code>{JSON.stringify(filterEmpty([1, null, 2, undefined, '', 3]))}</Text>
        </Flex>
      </Card>

      <Card title="递归过滤嵌套结构" size="small">
        <Flex vertical gap={12}>
          <Text strong>原始数据:</Text>
          <Paragraph code style={{ marginBottom: 8, fontSize: 12 }}>
            {JSON.stringify(nestedExample, null, 2)}
          </Paragraph>
          <Divider style={{ margin: '8px 0' }} />
          <Text strong>过滤后数据:</Text>
          <Paragraph code style={{ marginBottom: 8, fontSize: 12 }}>
            {JSON.stringify(filteredNested, null, 2)}
          </Paragraph>
          <Text type="secondary">
            递归过滤会处理所有嵌套的对象和数组，空对象和空数组在过滤后如果变为空也会被移除
          </Text>
        </Flex>
      </Card>

      <Card title="特殊值处理" size="small">
        <Flex vertical gap={8}>
          <Text>数字 0 处理:</Text>
          <Text code>{'filterEmpty({ a: 0, b: null }) → ' + JSON.stringify(filterEmpty({ a: 0, b: null }))}</Text>
          <Divider style={{ margin: '8px 0' }} />
          <Text>布尔值 false 处理:</Text>
          <Text code>{'filterEmpty({ a: false, b: null }) → ' + JSON.stringify(filterEmpty({ a: false, b: null }))}</Text>
          <Divider style={{ margin: '8px 0' }} />
          <Text>空对象过滤:</Text>
          <Text code>{'filterEmpty({ nested: {} }) → ' + JSON.stringify(filterEmpty({ nested: {} }))}</Text>
        </Flex>
      </Card>

      <Card title="使用场景 - 表单提交前清理" size="small">
        <Text type="secondary">
          在表单提交前，使用 filterEmpty 清理掉用户未填写的字段，避免提交大量空值到后端。
        </Text>
        <Flex style={{ marginTop: 12 }}>
          <Button type="primary" onClick={handleFilter}>
            模拟提交（查看控制台）
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

render(<FilterEmptyExample />);

```

### API

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
