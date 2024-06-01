/* global Office */
import React, { useEffect } from 'react';

const OfficeFilePreview = ({ fileUrl }) => {
  useEffect(() => {
    // 加载 Office.js
    Office.onReady(() => {
      Office.context.document.setFilePropertiesAsync({ url: fileUrl });
    });
  }, [fileUrl]);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Office File Preview"
      ></iframe>
    </div>
  );
};

export default OfficeFilePreview;
