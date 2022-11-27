import React from "react";
import { Space } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import { primary_color } from "../../utils/constants";
function OverviewTab({ title, backButton, onbuttonclick, dividerText }) {
  return (
    <div>
      <Space>
        {backButton ? (
          <LeftCircleFilled
            style={{ fontSize: "20px", color: primary_color }}
            onClick={() => onbuttonclick()}
          />
        ) : (
          <div></div>
        )}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: primary_color,
          }}
        >
          {title}
        </div>
        {dividerText != null ? (
          <>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>|</div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: primary_color,
              }}
            >
              {dividerText}
            </div>
          </>
        ) : (
          <></>
        )}
      </Space>

      <div
        style={{
          width: "auto",
          backgroundColor: primary_color,
          height: "2px",
        }}
      ></div>
      <div style={{ marginBottom: 20 }}></div>
    </div>
  );
}

export default OverviewTab;
