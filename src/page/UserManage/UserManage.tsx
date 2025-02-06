import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, Input, Table, message, Image } from "antd";
import "./UserManage.css";
import { ColumnsType } from "antd/es/table";
import { userSearch } from "../../interface/interfaces.ts";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

interface UserSearchResult {
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
  id: number;
}
const columns: ColumnsType<UserSearchResult> = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "头像",
    dataIndex: "headPic",
    render: (value) => {
      return value ? (
        <Image width={50} src={`http://localhost:3008/${value}`} />
      ) : (
        ""
      );
    },
  },
  {
    title: "昵称",
    dataIndex: "nickName",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "注册时间",
    dataIndex: "createTime",
  },
];

export function UserManage() {
  const [userList, setUserList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const searchUser = useCallback(
    async (values: SearchUser) => {
      console.log(values);
      const { email, nickName, username } = values;
      const res = await userSearch(username, nickName, email, pageNo, pageSize);
      const { users } = res.data.data;
      console.log("res.data", res.data);
      if (res.status === 201 || res.status === 200) {
        setUserList(
          users.map((item: UserSearchResult) => {
            return {
              key: item.username,
              ...item,
            };
          })
        );
      } else {
        message.error(res.data.data || "系统繁忙，请稍后再试");
      }
    },
    [pageNo, pageSize]
  );

  const changePage = useCallback(function(pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    searchUser({
      username: "",
      email: "",
      nickName: "",
    });
  }, [pageNo, pageSize]);

  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form onFinish={searchUser} name="search" layout="inline" colon={false}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="userManage-table">
        <Table
          columns={columns}
          dataSource={userList}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
}
