import React from "react"; // 你可以将 Figma 中的样式复制到这个 CSS 文件中

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "white",
        borderRight: "1px #E0E0E0 solid",
      }}
    >
      <div
        style={{
          height: 260,
          left: 8,
          top: 78,
          position: "absolute",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 4,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              width: 208,
              height: 24,
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "600",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            Management
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 18,
                height: 20,
                left: 3,
                top: 2,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 6,
                height: 10,
                left: 9,
                top: 12,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            项目
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 16,
                height: 16,
                left: 3,
                top: 3,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 4.35,
                height: 4.35,
                left: 16.65,
                top: 16.65,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            人员
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 4,
                height: 4,
                left: 10,
                top: 10,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 20,
                height: 14.14,
                left: 2,
                top: 4.93,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            成本
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 4,
                height: 4,
                left: 10,
                top: 10,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 20,
                height: 14.14,
                left: 2,
                top: 4.93,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            质量
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 4,
                height: 4,
                left: 10,
                top: 10,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 20,
                height: 14.14,
                left: 2,
                top: 4.93,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            安全
          </div>
        </div>
      </div>
      <div
        style={{
          height: 168,
          left: 8,
          top: 354,
          position: "absolute",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 8,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "600",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            Archive
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 13,
                height: 0,
                left: 8,
                top: 6,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 13,
                height: 0,
                left: 8,
                top: 12,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 13,
                height: 0,
                left: 8,
                top: 18,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 0.01,
                height: 0,
                left: 3,
                top: 6,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 0.01,
                height: 0,
                left: 3,
                top: 12,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 0.01,
                height: 0,
                left: 3,
                top: 18,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            文档
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 12,
                height: 15,
                left: 9,
                top: 3,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 6,
                height: 6,
                left: 3,
                top: 15,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 6,
                height: 6,
                left: 15,
                top: 13,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            图纸
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            background: "white",
            borderRadius: 8,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div
              style={{
                width: 20,
                height: 20,
                left: 2,
                top: 2,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 8,
                height: 2,
                left: 8,
                top: 14,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 0.01,
                height: 0,
                left: 9,
                top: 9,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
            <div
              style={{
                width: 0.01,
                height: 0,
                left: 15,
                top: 9,
                position: "absolute",
                border: "2px black solid",
              }}
            ></div>
          </div>
          <div
            style={{
              flex: "1 1 0",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "500",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            照片
          </div>
        </div>
      </div>
      <div
        style={{
          left: 24,
          top: 24,
          position: "absolute",
          color: "black",
          fontSize: 20,
          fontFamily: "Inter",
          fontWeight: "600",
          lineHeight: 30,
          wordWrap: "break-word",
        }}
      >
        ManageYourProject
      </div>
    </div>
  );
}

export default App;
