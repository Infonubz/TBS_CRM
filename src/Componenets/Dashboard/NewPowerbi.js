// import "./NewPowerbi.css";
// import { PowerBIEmbed } from "powerbi-client-react";
// import { models } from "powerbi-client";

// function NewPowerbi() {
//   return (
//     <div className="App">
//       <header className="">
//         <PowerBIEmbed
//           embedConfig={{
//             type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
//             // id: "f8b29529-d035-4c97-ad20-b2d85cfe1151",
//             // embedUrl:"https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",          
//             // accessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNTUzMjU4NiwibmJmIjoxNzI1NTMyNTg2LCJleHAiOjE3MjU1Mzc3MzEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUE3bHZYVWI1SEx2UThHV2Ywdjc1cWpxelJ2elFBQTY0ZnU4UVQyY1U2YWl0NW9rOWN6ZEswaWpObmJlSWNkOFNGIiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiNDlmODFhZmEtYjEwMi00MzFjLWJkOGMtYWUwMzk3Zjc3NjgzIiwiZmFtaWx5X25hbWUiOiJOdWJpem5leiIsImdpdmVuX25hbWUiOiJWaWdhc2hpbmkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTg2LjIyMS4xMjciLCJuYW1lIjoiVmlnYXNoaW5pIE51Yml6bmV6Iiwib2lkIjoiNjg2NTFhNDctZTg2Ny00YTVkLThhNDgtZmFjNWIzNzA3ZGQ2IiwicHVpZCI6IjEwMDMyMDAyQjg0RUZGQTMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUZzLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im1VUlUxcnlrRXplV19CYzlWNWpCMTNyV09UQmVWN3o2SW0zRi1HX2NCVHMiLCJ0aWQiOiIwN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQiLCJ1bmlxdWVfbmFtZSI6InZpZ2FzaGluaUBudWJpem5lei5jb20iLCJ1cG4iOiJ2aWdhc2hpbmlAbnViaXpuZXouY29tIiwidXRpIjoidlB2a0ZXOEdxVXFnTHQySFd6OThBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMTYifQ.hnsz-khW8S5CH6aC1ISUdb5PPkl7ck31Bsmhg4GCzk6wjqQzNF-ISmDaLEW9sBDWqNu9YJRqRKb9EiXhLsQFV33n70mdsS3zB23wGhN-xfjxrnQ8ydAbTf0MQRlTtqWozNw0IXYrFGjwY2ocqIjdtvfx6ML943idoLvxnQmKrWQ2r2iHx_6snHYo4PxN0O0iit4XjCELmKY55X7k7Gctffbznekn_buTYqtkixMumgI3wMDibp6jBmYwLK7FpkRqgxOlT-JqpawujE83CX5_z8JmI5ZQ-zbh-RmwwAwslOqKQ8q83KlKu4oSwdwbthi9Bc-DbcXu3mQkw0__4OFPaw",
//             // id: "279264e7-5394-4a94-b8eb-da9c65967003",
//             embedUrl: "https://app.powerbi.com/reportEmbed?reportId={279264e7-5394-4a94-b8eb-da9c65967003}&groupId={4678ecce-a887-4d9c-ac37-082258bcafaa}&config={%22accessToken%22:%22{H4sIAAAAAAAEAB2UR66DVgAA7_K3LxKYZoiUBR1MN50dzTTTywOi3D0_2c9qpJm_f-z0-o5p8fPnz8ltmEUwX74jZbbLU5Xd4SsaFrkIe-rDclRqvhNhmdOWuv0yA0fiUkWP-7wpndlCz4aLrn4clv5eqsQ3s_Rvut0IYgbKxSw5Kjt0vQ9e_lCFEB9HEioUE8uYWQeSEEccxXzB3Ts8HpHC-tK55V7FlYxf8Q1y-drb22y6NOYIR5M37Fvf56AVzcnJwaTqQgeo8yMt-7KZ3FbtRKhw0Tz5kb6a4ttJcv4peEYt1ahJUNfzjXI3HUOh5m6txQb0ZtQPus7GK1DOUQxE_Q7V-kXHJigwpafHdu4ndhR0STcOW4HvqDHoLeWP0scT0dj6HDFHgxmuLM6f3bTH2kC7QMMfOV2ErKhTWXOiro8B_p0S2cPwUI3aS9exCJvuAjZrBZxOT6J3BKKPkP5ha7WHLNUbkSH7yQJ2Pbq7hs5UxAm9JeezitmWWY2YVzKDVhWcDvNx56f57YNJRT1DXx7RUy5byUVwom0XYV152R9n5kN9uNujXYu1sUy71CN8QR9qjqxdkOYD9gxs_MjSU6FN76lDSUo0NNccNhSzd2k8X41wTcLjfUyQJxr3flZzdBm4L4ckoStlQrTaCVYhgnkpKXfZ1GNuc5i3p7gVRqkYTQZLBUEjET0JeZKSygC44nEi8XgwVX-jn_37AJ2mmZslFodVPyRV4q0L7HirM7brEv7qdLVImkGisqfop9PV2ZGvb1FzSU5ADUcWEqI_MJ16GFxywI7WhzqghcciFsuwnbw5Vr63wm3hwoVBXsr3BRN_IWV-Ud5eGvm9_YYXTTab78YOXaJM5dbPdE590rpfZS_NXHFjGmZPfYt37sBuENIuwiSVx7Ob9eGp8GnwU6oQmlxEdooQEiMB_bOp30l5T1piva2m6eRl_Ovnjx9-uaZt1MrrN71tyZ67rGGgMMIljjnFWiJ_z9hZFBl379nUPC_9oje3KObgybYENtvGxnZapHhRQaxfB8Ro4TQcnZyXR6KjrvJjNu2Tz1y4vnXEzZ5zRXwZVV-MJuvLrv546fjAZlJ-tWU2LaqJiQC_QFK4dgEaRcqKkPKvRZhbHBta7WPrIeB0T0JNed87U3KmkurgLI1VT7zl5vuQkB40sYRFkLmrgeBjfpHYTaEEdyAECZWeln9MdXXBnTwHKgyRwWfDCitJlwoKieq0uO-48pIGjHV0jE9ir69FdxAJ7wHSDUYEy-5bHF8mXUlqPgzHOddzqP-2gDranIVHPBvBpafYXkICsn1Q_fW_5muqy0UNfi0X67HmkSKvVIsgYEaLmjYg-z_lNtWQbvtS_mICrF7j6mzM6flg_Xxv05AuiR3rnEzgbThggvTbqz8A7zCR4O4mZQmLsnU1CCGWF8JanugekVi6Gxx_fWNwJtOT50D4eG5BA7I9eQr0AxHrT4XmNi3A3-8CmUefbm1PACW_6Q1lfld-H1kNN9a9iBejV5w0ppQgcnyOJ_yGtAR3bbZNiWY9tHstCS8IEbd9Jf3qABO8ghbnETeohiNnW72JYsD5zRcXGvfa2dy1NrwXJ16DTkq5ny01ayUfvoWT0iLfJifQlzqBvCEEyZvSLMbj8Gbs1E8_7KjwsNPuXJ0mEe4QbL9poj0ZkbE1foSVlWwp3tn48i-7JCac865p8N0m-0_zP_8CJYusA24GAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzI5OTI1OTI0LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=}%22}",
//             // accessToken:"H4sIAAAAAAAEAB2UR66DVgAA7_K3LxKYZoiUBR1MN50dzTTTywOi3D0_2c9qpJm_f-z0-o5p8fPnz8ltmEUwX74jZbbLU5Xd4SsaFrkIe-rDclRqvhNhmdOWuv0yA0fiUkWP-7wpndlCz4aLrn4clv5eqsQ3s_Rvut0IYgbKxSw5Kjt0vQ9e_lCFEB9HEioUE8uYWQeSEEccxXzB3Ts8HpHC-tK55V7FlYxf8Q1y-drb22y6NOYIR5M37Fvf56AVzcnJwaTqQgeo8yMt-7KZ3FbtRKhw0Tz5kb6a4ttJcv4peEYt1ahJUNfzjXI3HUOh5m6txQb0ZtQPus7GK1DOUQxE_Q7V-kXHJigwpafHdu4ndhR0STcOW4HvqDHoLeWP0scT0dj6HDFHgxmuLM6f3bTH2kC7QMMfOV2ErKhTWXOiro8B_p0S2cPwUI3aS9exCJvuAjZrBZxOT6J3BKKPkP5ha7WHLNUbkSH7yQJ2Pbq7hs5UxAm9JeezitmWWY2YVzKDVhWcDvNx56f57YNJRT1DXx7RUy5byUVwom0XYV152R9n5kN9uNujXYu1sUy71CN8QR9qjqxdkOYD9gxs_MjSU6FN76lDSUo0NNccNhSzd2k8X41wTcLjfUyQJxr3flZzdBm4L4ckoStlQrTaCVYhgnkpKXfZ1GNuc5i3p7gVRqkYTQZLBUEjET0JeZKSygC44nEi8XgwVX-jn_37AJ2mmZslFodVPyRV4q0L7HirM7brEv7qdLVImkGisqfop9PV2ZGvb1FzSU5ADUcWEqI_MJ16GFxywI7WhzqghcciFsuwnbw5Vr63wm3hwoVBXsr3BRN_IWV-Ud5eGvm9_YYXTTab78YOXaJM5dbPdE590rpfZS_NXHFjGmZPfYt37sBuENIuwiSVx7Ob9eGp8GnwU6oQmlxEdooQEiMB_bOp30l5T1piva2m6eRl_Ovnjx9-uaZt1MrrN71tyZ67rGGgMMIljjnFWiJ_z9hZFBl379nUPC_9oje3KObgybYENtvGxnZapHhRQaxfB8Ro4TQcnZyXR6KjrvJjNu2Tz1y4vnXEzZ5zRXwZVV-MJuvLrv546fjAZlJ-tWU2LaqJiQC_QFK4dgEaRcqKkPKvRZhbHBta7WPrIeB0T0JNed87U3KmkurgLI1VT7zl5vuQkB40sYRFkLmrgeBjfpHYTaEEdyAECZWeln9MdXXBnTwHKgyRwWfDCitJlwoKieq0uO-48pIGjHV0jE9ir69FdxAJ7wHSDUYEy-5bHF8mXUlqPgzHOddzqP-2gDranIVHPBvBpafYXkICsn1Q_fW_5muqy0UNfi0X67HmkSKvVIsgYEaLmjYg-z_lNtWQbvtS_mICrF7j6mzM6flg_Xxv05AuiR3rnEzgbThggvTbqz8A7zCR4O4mZQmLsnU1CCGWF8JanugekVi6Gxx_fWNwJtOT50D4eG5BA7I9eQr0AxHrT4XmNi3A3-8CmUefbm1PACW_6Q1lfld-H1kNN9a9iBejV5w0ppQgcnyOJ_yGtAR3bbZNiWY9tHstCS8IEbd9Jf3qABO8ghbnETeohiNnW72JYsD5zRcXGvfa2dy1NrwXJ16DTkq5ny01ayUfvoWT0iLfJifQlzqBvCEEyZvSLMbj8Gbs1E8_7KjwsNPuXJ0mEe4QbL9poj0ZkbE1foSVlWwp3tn48i-7JCac865p8N0m-0_zP_8CJYusA24GAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzI5OTI1OTI0LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
//             tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
//             settings: {
//               panes: {
//                 bookmarks: {
//                   visible: false,
//                 },
//                 fields: {
//                   expanded: false,
//                 },
//                 filters: {
//                   expanded: false,
//                   visible: false,
//                 },
//                 pageNavigation: {
//                   expanded: false,
//                   visible: false,
//                   filterPaneEnabled: false,
//                   navContentPaneEnabled: false,
//                   pageView: "fitToWidth", // Adjust page view to fit to width
//                   layoutType: models.LayoutType.custom, // Custom layout for better responsiveness
//                 },
//                 selection: {
//                   visible: true,
//                 },
//                 syncSlicers: {
//                   visible: false,
//                 },
//                 visualizations: {
//                   expanded: true,
//                 },
//               },
//             },
//           }}
//           eventHandlers={
//             new Map([
//               ["loaded", () => console.log("Report loaded")],
//               ["rendered", () => console.log("Report rendered")],
//               ["error", (event) => console.log(event.detail)],
//               ["visualClicked", () => console.log("Visual clicked")],
//               ["pageChanged", (event) => console.log(event)],
//             ])
//           }
//           cssClassName="reportClass" // Corrected to a string value
//           getEmbeddedComponent={(embeddedReport) => {
//             window.report = embeddedReport;
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default NewPowerbi;
import React, { useEffect, useRef } from 'react';
import * as powerbi from 'powerbi-client';

const NewPowerbi = () => {
  const embedRef = useRef(null);

  useEffect(() => {
    if (embedRef.current) {
      // Define embed configuration
      const embedConfig = {
        type: 'report', // Use 'dashboard' or other types as needed
        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=279264e7-5394-4a94-b8eb-da9c65967003&groupId=4678ecce-a887-4d9c-ac37-082258bcafaa",
        accessToken: "H4sIAAAAAAAEAB2UR66DVgAA7_K3LxKYZoiUBR1MN50dzTTTywOi3D0_2c9qpJm_f-z0-o5p8fPnz8ltmEUwX74jZbbLU5Xd4SsaFrkIe-rDclRqvhNhmdOWuv0yA0fiUkWP-7wpndlCz4aLrn4clv5eqsQ3s_Rvut0IYgbKxSw5Kjt0vQ9e_lCFEB9HEioUE8uYWQeSEEccxXzB3Ts8HpHC-tK55V7FlYxf8Q1y-drb22y6NOYIR5M37Fvf56AVzcnJwaTqQgeo8yMt-7KZ3FbtRKhw0Tz5kb6a4ttJcv4peEYt1ahJUNfzjXI3HUOh5m6txQb0ZtQPus7GK1DOUQxE_Q7V-kXHJigwpafHdu4ndhR0STcOW4HvqDHoLeWP0scT0dj6HDFHgxmuLM6f3bTH2kC7QMMfOV2ErKhTWXOiro8B_p0S2cPwUI3aS9exCJvuAjZrBZxOT6J3BKKPkP5ha7WHLNUbkSH7yQJ2Pbq7hs5UxAm9JeezitmWWY2YVzKDVhWcDvNx56f57YNJRT1DXx7RUy5byUVwom0XYV152R9n5kN9uNujXYu1sUy71CN8QR9qjqxdkOYD9gxs_MjSU6FN76lDSUo0NNccNhSzd2k8X41wTcLjfUyQJxr3flZzdBm4L4ckoStlQrTaCVYhgnkpKXfZ1GNuc5i3p7gVRqkYTQZLBUEjET0JeZKSygC44nEi8XgwVX-jn_37AJ2mmZslFodVPyRV4q0L7HirM7brEv7qdLVImkGisqfop9PV2ZGvb1FzSU5ADUcWEqI_MJ16GFxywI7WhzqghcciFsuwnbw5Vr63wm3hwoVBXsr3BRN_IWV-Ud5eGvm9_YYXTTab78YOXaJM5dbPdE590rpfZS_NXHFjGmZPfYt37sBuENIuwiSVx7Ob9eGp8GnwU6oQmlxEdooQEiMB_bOp30l5T1piva2m6eRl_Ovnjx9-uaZt1MrrN71tyZ67rGGgMMIljjnFWiJ_z9hZFBl379nUPC_9oje3KObgybYENtvGxnZapHhRQaxfB8Ro4TQcnZyXR6KjrvJjNu2Tz1y4vnXEzZ5zRXwZVV-MJuvLrv546fjAZlJ-tWU2LaqJiQC_QFK4dgEaRcqKkPKvRZhbHBta7WPrIeB0T0JNed87U3KmkurgLI1VT7zl5vuQkB40sYRFkLmrgeBjfpHYTaEEdyAECZWeln9MdXXBnTwHKgyRwWfDCitJlwoKieq0uO-48pIGjHV0jE9ir69FdxAJ7wHSDUYEy-5bHF8mXUlqPgzHOddzqP-2gDranIVHPBvBpafYXkICsn1Q_fW_5muqy0UNfi0X67HmkSKvVIsgYEaLmjYg-z_lNtWQbvtS_mICrF7j6mzM6flg_Xxv05AuiR3rnEzgbThggvTbqz8A7zCR4O4mZQmLsnU1CCGWF8JanugekVi6Gxx_fWNwJtOT50D4eG5BA7I9eQr0AxHrT4XmNi3A3-8CmUefbm1PACW_6Q1lfld-H1kNN9a9iBejV5w0ppQgcnyOJ_yGtAR3bbZNiWY9tHstCS8IEbd9Jf3qABO8ghbnETeohiNnW72JYsD5zRcXGvfa2dy1NrwXJ16DTkq5ny01ayUfvoWT0iLfJifQlzqBvCEEyZvSLMbj8Gbs1E8_7KjwsNPuXJ0mEe4QbL9poj0ZkbE1foSVlWwp3tn48i-7JCac865p8N0m-0_zP_8CJYusA24GAAA=", // Your access token here
        tokenType: powerbi.models.TokenType.Embed,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
        }
      };

      // Embed the report in the div
      const powerbiService = new powerbi.service.Service(powerbi.factories.hpmFactory, powerbi.factories.wpmpFactory, powerbi.factories.routerFactory);
      powerbiService.embed(embedRef.current, embedConfig);
    }
  }, []);

  return (
    <div>
      <h1>Power BI Report</h1>
      <div ref={embedRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default NewPowerbi;
