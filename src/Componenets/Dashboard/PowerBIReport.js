import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const PowerBIReport = ({ embedUrl, accessToken, reportId, height, width }) => {
  return (
    <div style={{ height: height, width: width }}>
      <PowerBIEmbed
        embedConfig={{
          type: 'report', // Embed type
          id: reportId, // Report ID
          embedUrl: embedUrl,
          accessToken: accessToken,
          tokenType: models.TokenType.Aad, // or models.TokenType.Embed if using an embed token
          settings: {
            panes: {
              filters: {
                visible: false
              },
              pageNavigation: {
                visible: false
              }
            }
          }
        }}
        cssClassName={"report-style-class"}
        getEmbeddedComponent={(embeddedReport) => {
          console.log('Report embedded successfully:', embeddedReport);
        }}
        style={{ height: '200px', width: '100%' }}
      />
    </div>
  );
};

export default PowerBIReport;
