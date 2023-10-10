import React, { useState } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import MuntilImage from "../Mutil-Image";

const { Meta } = Card;

const CardDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showModal} />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Modal
        title="Chi tiết Card"
        visible={isModalVisible} // Use `visible` instead of `open`
        onCancel={handleCancel}
        footer={null}
      >
        {/* Include the MuntilImg component inside the Modal */}
        <MuntilImage />
      </Modal>
    </>
  );
};

export default CardDetail;
