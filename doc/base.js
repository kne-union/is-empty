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
