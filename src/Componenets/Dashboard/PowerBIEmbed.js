import React, { useEffect, useRef } from 'react';
import { PowerBIEmbed as PowerBIEmbedClass, models } from 'powerbi-client';

const PowerBIReportEmbed = ({ accessToken, embedUrl, reportId }) => {
    const reportContainerRef = useRef(null);

    useEffect(() => {
        if (accessToken && embedUrl) {
            const config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
                accessToken: accessToken,
                embedUrl: embedUrl,
                id: reportId,
                settings: {
                    filterPaneEnabled: true,
                    navContentPaneEnabled: true,
                },
            };

            // Embed the Power BI report
            const powerbi = new PowerBIEmbedClass(reportContainerRef.current, config);
            powerbi.embed();
        }
    }, [accessToken, embedUrl, reportId]);

    return <div ref={reportContainerRef} style={{ height: '600px' }}></div>;
};

export default PowerBIReportEmbed;
