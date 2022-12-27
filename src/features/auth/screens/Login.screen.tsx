import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useLoginMutation } from '../redux';

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
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
