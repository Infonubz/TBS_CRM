import "./NewPowerbi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function NewPowerbi() {
  return (
    <div className="App">
      <header className="">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            // id: "f8b29529-d035-4c97-ad20-b2d85cfe1151",
            // embedUrl:"https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",          
            // accessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNTUzMjU4NiwibmJmIjoxNzI1NTMyNTg2LCJleHAiOjE3MjU1Mzc3MzEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUE3bHZYVWI1SEx2UThHV2Ywdjc1cWpxelJ2elFBQTY0ZnU4UVQyY1U2YWl0NW9rOWN6ZEswaWpObmJlSWNkOFNGIiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiNDlmODFhZmEtYjEwMi00MzFjLWJkOGMtYWUwMzk3Zjc3NjgzIiwiZmFtaWx5X25hbWUiOiJOdWJpem5leiIsImdpdmVuX25hbWUiOiJWaWdhc2hpbmkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTg2LjIyMS4xMjciLCJuYW1lIjoiVmlnYXNoaW5pIE51Yml6bmV6Iiwib2lkIjoiNjg2NTFhNDctZTg2Ny00YTVkLThhNDgtZmFjNWIzNzA3ZGQ2IiwicHVpZCI6IjEwMDMyMDAyQjg0RUZGQTMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUZzLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im1VUlUxcnlrRXplV19CYzlWNWpCMTNyV09UQmVWN3o2SW0zRi1HX2NCVHMiLCJ0aWQiOiIwN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQiLCJ1bmlxdWVfbmFtZSI6InZpZ2FzaGluaUBudWJpem5lei5jb20iLCJ1cG4iOiJ2aWdhc2hpbmlAbnViaXpuZXouY29tIiwidXRpIjoidlB2a0ZXOEdxVXFnTHQySFd6OThBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMTYifQ.hnsz-khW8S5CH6aC1ISUdb5PPkl7ck31Bsmhg4GCzk6wjqQzNF-ISmDaLEW9sBDWqNu9YJRqRKb9EiXhLsQFV33n70mdsS3zB23wGhN-xfjxrnQ8ydAbTf0MQRlTtqWozNw0IXYrFGjwY2ocqIjdtvfx6ML943idoLvxnQmKrWQ2r2iHx_6snHYo4PxN0O0iit4XjCELmKY55X7k7Gctffbznekn_buTYqtkixMumgI3wMDibp6jBmYwLK7FpkRqgxOlT-JqpawujE83CX5_z8JmI5ZQ-zbh-RmwwAwslOqKQ8q83KlKu4oSwdwbthi9Bc-DbcXu3mQkw0__4OFPaw",
            id: "f8b29529-d035-4c97-ad20-b2d85cfe1151",
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
            accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyIsImtpZCI6Ik1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNzI0NzAzMiwibmJmIjoxNzI3MjQ3MDMyLCJleHAiOjE3MjcyNTIzNDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WUFBQUFlSm9PSlVnbEV3aENqR2d5VXdoNloxYlVFSS9Gdm9Rcmh1eHJscXJhZHg0WGlCSGhzTmlEbzNJcjlRNk82R0w3IiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiNDlmODFhZmEtYjEwMi00MzFjLWJkOGMtYWUwMzk3Zjc3NjgzIiwiZmFtaWx5X25hbWUiOiJOdWJpem5leiIsImdpdmVuX25hbWUiOiJWaWdhc2hpbmkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTg2LjIyMS4xMjciLCJuYW1lIjoiVmlnYXNoaW5pIE51Yml6bmV6Iiwib2lkIjoiNjg2NTFhNDctZTg2Ny00YTVkLThhNDgtZmFjNWIzNzA3ZGQ2IiwicHVpZCI6IjEwMDMyMDAyQjg0RUZGQTMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUZzLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im1VUlUxcnlrRXplV19CYzlWNWpCMTNyV09UQmVWN3o2SW0zRi1HX2NCVHMiLCJ0aWQiOiIwN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQiLCJ1bmlxdWVfbmFtZSI6InZpZ2FzaGluaUBudWJpem5lei5jb20iLCJ1cG4iOiJ2aWdhc2hpbmlAbnViaXpuZXouY29tIiwidXRpIjoidEJsNWJmQUs2a2UwV1VLeXpQazZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMjQifQ.CHrsS42_Rai56l0qKm5ITDHUkkOCcP0APpMFROvC_kZOsg--uuX51htDEGwte7lM5Q0svIjtJlEaHvK-B9RF79PlXnkwK42uLSQqIMGkcC1u7jJMy36EpSiRclR5LWHT3dMa-_l_1MmesXtWtB7oeBTqfMZ71VIXVs1fY56Fq1XsC7pZixNv8bNC5sIIJ7gHapFwmYvfU7j8ARy8KXgGOHMIbvl8dZjxvuSnGoJurUG6ueQLwH6PveoiIoHqgaMXOu3U2frScb3eTpO9ArW_hU1pP5tmDf00s5jUgkAHshtb8vkwLiYMK9Xbhntup9BdQ0-eIIHW_4t9bQtQaZCDZA",
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                bookmarks: {
                  visible: false,
                },
                fields: {
                  expanded: false,
                },
                filters: {
                  expanded: false,
                  visible: false,
                },
                pageNavigation: {
                  expanded: false,
                  visible: false,
                  filterPaneEnabled: false,
                  navContentPaneEnabled: false,
                  pageView: "fitToWidth", // Adjust page view to fit to width
                  layoutType: models.LayoutType.custom, // Custom layout for better responsiveness
                },
                selection: {
                  visible: true,
                },
                syncSlicers: {
                  visible: false,
                },
                visualizations: {
                  expanded: true,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              ["loaded", () => console.log("Report loaded")],
              ["rendered", () => console.log("Report rendered")],
              ["error", (event) => console.log(event.detail)],
              ["visualClicked", () => console.log("Visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName="reportClass" // Corrected to a string value
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}

export default NewPowerbi;
