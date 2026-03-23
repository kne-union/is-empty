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
