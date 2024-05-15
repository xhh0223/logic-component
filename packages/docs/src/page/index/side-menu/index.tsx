import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

const SideMenu = () => {
  const { pathname } = useLocation();
  const MenuKey = {
    select: "select",
    [`select-single`]: "/select-single",
    [`select-multiple`]: "/select-multiple",
    treeSelect: "tree-select",
    [`tree-select-single`]: "/tree-select-single",
    [`tree-select-multiple`]: "/tree-select-multiple",
    schemaDemo: "schemaDemo",
    schema: "/schema",
  };
  const sideMenuData: MenuProps["items"] = [
    {
      key: MenuKey.select,
      label: MenuKey.select,
      children: [
        {
          key: MenuKey["select-single"],
          label: <Link to={MenuKey["select-single"]}>select-single</Link>,
        },
        {
          key: MenuKey["select-multiple"],
          label: <Link to={MenuKey["select-multiple"]}>select-multiple</Link>,
        },
      ],
    },
    {
      key: MenuKey.treeSelect,
      label: MenuKey.treeSelect,
      children: [
        {
          key: MenuKey["tree-select-single"],
          label: (
            <Link to={MenuKey["tree-select-single"]}>tree-select-single</Link>
          ),
        },
        {
          key: MenuKey["tree-select-multiple"],
          label: (
            <Link to={MenuKey["tree-select-multiple"]}>
              tree-select-multiple
            </Link>
          ),
        },
      ],
    },
    {
      key: MenuKey.schemaDemo,
      label: MenuKey.schemaDemo,
      children: [
        {
          key: MenuKey["schema"],
          label: <Link to={MenuKey["schema"]}>schema</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      className="menu"
      defaultSelectedKeys={[pathname ?? MenuKey["select-single"]]}
      defaultOpenKeys={[MenuKey.select, MenuKey.treeSelect, MenuKey.schemaDemo]}
      mode="inline"
      items={sideMenuData}
    />
  );
};

export default SideMenu;
