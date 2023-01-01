import React, { useEffect } from 'react';
import { Button, Form, Input, Layout, message, Typography } from 'antd';

import { getErrorMessage } from 'redux/utils';

import { LoginPayload } from 'features/auth/types';
import { useLoginMutation } from 'features/auth/redux';

export const LoginScreen = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        content: getErrorMessage(error) || 'Something went wrong',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: 'success',
        content: 'Login successful. Redirecting...',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onFinish = async (values: LoginPayload) => {
    login({ email: values.email, password: values.password });
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Content style={{ padding: '100px' }}>
        {contextHolder}
        <Form
          name="basic"
          autoComplete="on"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
        >
          <Typography.Title>Sign in</Typography.Title>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!',
              },
            ]}
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
