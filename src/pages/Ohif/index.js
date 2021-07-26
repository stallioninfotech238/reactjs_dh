import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
const containerId = 'jd'
const componentRenderedOrUpdatedCallback = function () {
  console.log('OHIF Viewer rendered/updated');
};

let Ohif = (props) => {
  const [d, setD] = useState(false);
  var a;
  useEffect(() => {
    setTimeout(function () {
      a = window.OHIFViewer.installViewer(
        {
          routerBasename: '/',
          servers: {
            dicomWeb: [
              {
                name: 'DCM4CHEE',
                wadoUriRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/wado',
                qidoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
                wadoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
                qidoSupportsIncludeField: true,
                imageRendering: 'wadors',
                thumbnailRendering: 'wadors',
              },
            ],
          },
        }, containerId, componentRenderedOrUpdatedCallback);
      setD(true);
    }, 1000);
  }, []);
  return (
    <div className="container-fluid ohifPage">
      <div id='jd' />
      {d && <script>{a}
      </script>}
    </div>
  );
};
export default Ohif;
