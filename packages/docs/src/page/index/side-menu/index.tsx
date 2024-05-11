import { Menu, MenuProps } from "antd";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./index.scss";
const SideMenu = () => {
  const nav = useNavigate();
  const sideMenuData: MenuProps["items"] = [
    {
      key: "1",
      label: "select",
      children: [
        {
          key: "1-1",
          label: <Link to={"/select-single-demo1"}>select-single</Link>,
        },
        {
          key: "1-2",
          label: <Link to={"/select-multiple-demo1"}>select-multiple</Link>,
        },
      ],
    },
    {
      key: "2",
      label: "tree-select",
      children: [
        {
          key: "2-1",
          label: (
            <Link to={"/tree-select-single-demo1"}>
              tree-select-single-demo1
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Menu
      className="menu"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["1", "2"]}
      mode="inline"
      items={sideMenuData}
    />
  );
};

export default SideMenu;
