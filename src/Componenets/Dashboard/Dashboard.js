import { useEffect } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "./Dashboard.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import PowerBi from "./PowerBi";
import { useDispatch } from "react-redux";
import { GetNotificationData, UnreadNotification } from "../../Api/Notification/Notification";
import PowerBIReport from "./PowerBIReport";
import NewPowerbi from "./NewPowerbi";
// import NewPowerbi from "./NewPowerBi";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    UnreadNotification(dispatch);
  }, []);

  useEffect(() => {
    // Function to prevent zoom on touch events
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Function to prevent double tap zoom
    const preventDoubleTapZoom = (e) => {
      e.preventDefault();
    };

    // Add event listeners for touchstart and double tap
    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("dblclick", preventDoubleTapZoom, {
      passive: false,
    });

    // Add event listener for wheel event to prevent zoom on Ctrl + scroll
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Add event listeners for gesture events on Safari
    const preventGestureZoom = (e) => {
      e.preventDefault();
    };
    document.addEventListener("gesturestart", preventGestureZoom);
    document.addEventListener("gesturechange", preventGestureZoom);
    document.addEventListener("gestureend", preventGestureZoom);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("dblclick", preventDoubleTapZoom);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", preventGestureZoom);
      document.removeEventListener("gesturechange", preventGestureZoom);
      document.removeEventListener("gestureend", preventGestureZoom);
    };
  }, []);
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(metaTag);

    // Disable pinch-to-zoom
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventZoom);
    };
  }, []);
  useEffect(() => {
    GetNotificationData(dispatch);
  }, []);

  const reportId = 'f8b29529-d035-4c97-ad20-b2d85cfe1151';
  const height = "500px";
  const width = "100%";
  const embedUrl =
  "https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19";
  const accessToken ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNjIwNjI1NywibmJmIjoxNzI2MjA2MjU3LCJleHAiOjE3MjYyMTAxNTcsImFpbyI6IkUyZGdZQkIydnRtVW1MWHBuQVAzQzVHbktVd25BQT09IiwiYXBwaWQiOiI1ZGJkODFiZC0yNGMyLTQwYmMtYmVlNi1iZjBlMzQ1Mjk0OTEiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI1ZTNiMTE4Ny0yOGFjLTRiOWMtYThkZC03MmE0YmY2NzQ1NDMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUFBLiIsInN1YiI6IjVlM2IxMTg3LTI4YWMtNGI5Yy1hOGRkLTcyYTRiZjY3NDU0MyIsInRpZCI6IjA3YmIzOWVkLTljOTAtNGY0Zi04ZWE3LWRhZTVhYjUwMDZkNCIsInV0aSI6Ikw1UzVIX09VTjB5X0pCYlY5TE1nQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDI2In0.Ofc3nHFtY_dc0RpyVUQ90a7jXdkxOvQMMllVaOLiyCzhYqNA5gs2zN-XfLSppEcpbt424f_qO6RNRzdRPjYGl4tQuiWAvJ5Chs_34HzQ_-MKhkgYfYBPCFjNDRY8ZnAc1_DaF-0oeS4xJew3L2ML_bO87bVtv6Epp9-ihSo2eOdECojyV7MWd9CKCxCW0DN4UbfIjMj6ZrR_wgmgk6UBZFT-KJ4sIyo-08Q6iCJ0kPaxavm1CdSsHRfj2jQyVgch7BIFdciyv2dkD3Ed1xAwNtUsfCHr2zrN5GZri9J8zUwp9fe803-1uBFk324l4vbRwOXhSQIYpPe-4wmJU2_BJg"
  return (
    <div className="">
      <div
        className="h-screen w-screen pl-[10vw] pr-[2vw] pt-[2vw]"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <h1 className="text-[3vw]">Dashboard</h1> */}
        <div className="h-[85vh] w-[100%] rounded-[2vw] relative">
          <div className=" absolute w-[87.8vw] h-[85vw] top-[0.1vw] pr-[2vw]">
            {/* <h1>hello</h1> */}
            {/* <PowerBi /> */}
            {/* <PowerBIReport embedUrl={embedUrl} accessToken={accessToken} /> */}
            
            <NewPowerbi embedUrl={embedUrl} accessToken={accessToken} />
            {/* <PowerBIReport
              embedUrl={embedUrl}
              accessToken={accessToken}
              reportId={reportId}
              height={height}
              width={width}
            /> */}
          </div>
        {/* <div className="bg-[#99a1ac] h-[70vh] w-[15%] absolute left-[-6vw] top-[3.5vw] rounded-[2vw]"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
