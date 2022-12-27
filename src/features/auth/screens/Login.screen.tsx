import React, { useEffect } from 'react';
import { Button, Form, Input, Layout, message, Typography } from 'antd';
import { useLoginMutation } from '../redux';

const { Title } = Typography;

export const LoginScreen = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        // TODO: transform error response
        // @ts-ignore
        content: error?.data?.message as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const onFinish = (values: { email: string; password: string }) => {
    login({ email: values.email, password: values.password });
  };

  const onFinishFailed = errorInfo => {
    console.error({ errorInfo });
    // messageApi.open({
    //   type: 'error',
    //   // TODO: transform error response
    //   // @ts-ignore
    //   content: error?.data?.message as string,
    // });
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Content style={{ padding: '100px' }}>
        {contextHolder}
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
        >
          <Title>Sign in</Title>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: '100%' }}
              loading={isLoading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
