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
