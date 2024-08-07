import { useEffect } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "./Dashboard.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import PowerBi from "./PowerBi";
import { useDispatch } from "react-redux";
import { UnreadNotification } from "../../Api/Notification/Notification";
import PowerBIReport from "./PowerBIReport";

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
  const reportId = "91a2b088-161f-4210-9ccc-065e5f7e1f08";
  const height = "500px";
  const width = "100%";
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=91a2b088-161f-4210-9ccc-065e5f7e1f08&groupId=c8232fa8-4519-436d-a539-655843dde2ee&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19";
  const accessToken ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyMjA3NTUyNSwibmJmIjoxNzIyMDc1NTI1LCJleHAiOjE3MjIwODA1NDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFkZDc0VWNEME95UWVyUzVPa01hQUxxRVRYZGhJUjJwNS9FMVI4OTdFZy9icWRCVi96RWZseFZoZE15NkZ1RVlmIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTkJaIiwiZ2l2ZW5fbmFtZSI6IlRlYW1uYXRpdmUiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTU0LjM1LjM0IiwibmFtZSI6IlRlYW1uYXRpdmUgTkJaIiwib2lkIjoiZjE5NGM3Y2UtYWY2Mi00ZjJhLTgyMjctMmZjYzU3MDZiN2VkIiwicHVpZCI6IjEwMDMyMDAzOTc4NEZEQjQiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUtJLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IlZwWGZtYm82WTZpQ1BGQUJOWTZ1czVtUmhFcE80ZzlTcmlZQ0ZjTFJjNjQiLCJ0aWQiOiIwN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQiLCJ1bmlxdWVfbmFtZSI6InRlYW1uYXRpdmVAbnViaXpuZXouY29tIiwidXBuIjoidGVhbW5hdGl2ZUBudWJpem5lei5jb20iLCJ1dGkiOiJadzQwakdHcUFraTQ1c1lUWDdZREFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAxOCJ9.QdgniJ8SiigFiDJqKjMsgX30OCMXPuSnPH4bpQel-E__W1r-gSvCw0Q1W3fw4d4r8a4po3uVFQu-wbsTMqZajGeEkW2bI_52i4DyNb4fhOST0cSJjtmMBm7uA8QQgMdMZIWQ8rovF9bSTrlXRvqr8Yz5jVI47pmPrCOI9CLtIwgntAr62tbfl0puY5gJ25lVRIJ6-caDicm6_Lu6mmIMWYLxtfavLshxs5u_maiSHUFbT5-0vkRAzojVox9A7EMDjAA0akURZyzL9_oDVQPAmi8Bqo1mwxWM8r-KvduKHazF5AiBKUuc6OoJ1hhhxQLlpv3fh5i19ujsPV6Ji3GKJA"
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
        <div className="bg-[#1F487C] h-[85vh] w-[100%] rounded-[2vw] relative">
          <div className=" absolute left-[12vw] w-[85%] h-[85vh]  top-0 pr-[2vw]">
            {/* <h1>hello</h1> */}
            <PowerBi />
            {/* <PowerBIReport embedUrl={embedUrl} accessToken={accessToken} /> */}
            {/* <PowerBIReport
              embedUrl={embedUrl}
              accessToken={accessToken}
              reportId={reportId}
              height={height}
              width={width}
            /> */}
          </div>
          <div className="bg-[#99a1ac] h-[70vh] w-[20%] absolute left-[-6vw] top-[3.5vw] rounded-[2vw]"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
