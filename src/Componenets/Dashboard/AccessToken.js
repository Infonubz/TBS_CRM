import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios'; // Import axios

const PowerBIReport = () => {
  const [accessToken, setAccessToken] = useState('');

  // Function to fetch the access token from your backend using axios
  const getAccessToken = async () => {
    try {
      const response = await axios.get('/api/getPowerBIToken'); // Replace with your actual API endpoint
      return response.data.accessToken; // Assuming your backend returns the token in the `accessToken` field
    } catch (error) {
      console.error('Error fetching access token:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };
    fetchAccessToken();
  }, []);

  const embedConfig = {
    type: 'report',
    id: 'your-report-id', // Replace with your report ID
    embedUrl: 'your-embed-url', // Replace with your embed URL
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    },
  };

  return (
    <PowerBIEmbed
      embedConfig={embedConfig}
      cssClassName="report-style-class"
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
};

export default PowerBIReport;
