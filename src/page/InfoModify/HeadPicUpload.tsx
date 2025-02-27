/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2025-01-08 17:05:55
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-02-01 11:50:14
 * @FilePath: /meeting_room_booking_system_frontend_user/src/page/InfoModify/HeadPicUpload.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";

interface HeadPicUploadProps {
  value?: string;
  onChange?: Function;
}

let onChange: Function;

const props: DraggerProps = {
  name: "file",
  action: "http://localhost:3008/user/upload",
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      onChange(info.file.response.data);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};

const dragger = (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
  </Dragger>
);

export function HeadPicUpload(props: HeadPicUploadProps) {
  onChange = props.onChange!;

  console.log("props?.value", props?.value);
  return props?.value ? (
    <div>
      <img
        src={"http://localhost:3008/" + props.value}
        alt="头像"
        width="100"
        height="100"
      />
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
}
