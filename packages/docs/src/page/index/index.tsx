import { Flex } from "antd";
import { Outlet } from "react-router-dom";

import SideMenu from "./side-menu";

const Index = () => {
  return (
    <>
      <Flex align="center">
        <h1>logic-component</h1>
        <a target="" style={{ marginLeft: "auto" }}>
          github
        </a>
      </Flex>
      <Flex>
        <SideMenu />
        <div>
          <Outlet />
        </div>
      </Flex>
    </>
  );
};

export default Index;
