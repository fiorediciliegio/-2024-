import React, { useEffect } from 'react';
import { loadOfficeDocument } from '../constants/officeHelpers.js';

const OfficeFilePreview = ({ fileUrl }) => {
  useEffect(() => {
    loadOfficeDocument(fileUrl);
  }, [fileUrl]);

  return <div id="office-container" style={{ width: '100%', height: '500px' }}></div>;
};

export default OfficeFilePreview;
