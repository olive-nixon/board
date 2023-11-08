import Board from "@components/Board";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import useLocalStorage from "@hooks/useLocalStorage";
import { useState } from "react";

export default function Home() {
  // const [showSidebar, setShowSidebar] = useState(true);
  const [showSidebar, setShowSidebar] = useLocalStorage("togglestate", true);
  return (
    <div className="h-screen">
      <Header sidebarVisible={showSidebar} />
      <div className="flex board-height">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Board />
      </div>
    </div>
  );
}
