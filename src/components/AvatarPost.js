
import React from "react";

export default function AvatarPost({ attachment, author }) {
  let avatarContent;

  // Nếu có attachment, hiển thị hình ảnh; ngược lại, hiển thị chữ cái đầu của tác giả
  if (attachment) {
    avatarContent = <img alt="Avt" src={attachment} style={avatarStyle} />;
  } else {
    // Lấy chữ cái đầu của tên tác giả (nếu có)
    const initials = author ? author.charAt(0).toUpperCase() : "";
    // Tạo một div với chữ cái đầu và màu nền xanh
    avatarContent = (
      <div style={{ ...avatarStyle, backgroundColor: "#2196F3" }}>
        {initials}
      </div>
    );
  }

  return avatarContent;
}

// Style cho avatar, bao gồm kích thước, độ tròn, và các thuộc tính khác
const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "40px",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
};