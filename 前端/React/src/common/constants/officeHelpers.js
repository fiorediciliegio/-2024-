import * as Office from '@microsoft/office-js';

export const loadOfficeDocument = (url) => {
  Office.initialize = () => {
    Office.context.document.createDocument(url, {
      container: document.getElementById('office-container'),
      height: '500px',
      width: '100%',
    });
  };
};
