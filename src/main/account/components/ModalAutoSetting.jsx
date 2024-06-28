import React from 'react';
import ProForm, { ModalForm, ProFormDependency, ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

export default (props) => {

  const { onDone, editData, trigger } = props;

  return (
    <ModalForm
      title={editData?.id ? '编辑' : '新建'}
      // visible={!!editData}
    
      initialValues={editData || {}}
      modalProps={{
        onCancel: () => onDone(false),
        destroyOnClose: true,
        maskClosable: false,
      }}
      trigger={trigger}
      onFinish={async(values) => {
        // const [success,] = await submit(values);
        // if (!success) return;
        // onDone(true);
        // message.success('提交成功');
        // return true;
      }}
    >
      <ProFormText hidden	name="id" />
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="窗口名称"
          placeholder="请输入"
          rules={[{ required: true, message: '请输入账号名称', },]}
        />
        <ProFormText
          width="md"
          name="ip"
          label="代理ip"
          placeholder="请输入"
          // rules={[{ required: true, message: '请输入', },]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="ipAccount"
          label="代理账号"
          placeholder="请输入"
          // rules={[{ required: true, message: '请输入账号名称', },]}
        />
        <ProFormText
          width="md"
          name="ipPassword"
          label="代理密码"
          placeholder="请输入"
          // rules={[{ required: true, message: '请输入', },]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
