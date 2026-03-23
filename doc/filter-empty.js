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
