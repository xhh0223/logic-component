import ReactDOM from "react-dom/client";
import SelectSingleDemo1 from "./select-single-demo1";
import TreeSelectSingleDemo1 from "./tree-select-single-demo1";

const mountDemo = (
  components: Array<{ component: React.FC; elementId: string }>
) => {
  components.forEach(({ component: Component, elementId }) => {
    ReactDOM.createRoot(document.getElementById(elementId)).render(
      <Component />
    );
  });
};

const mountInfo = [
  {
    component: SelectSingleDemo1,
    elementId: "select-single-demo1",
  },
  {
    component: SelectSingleDemo1,
    elementId: "demo2",
  },
  {
    component: TreeSelectSingleDemo1,
    elementId: "demo1",
  },
];

jQuery("#demo").append(
  ...mountInfo.map((i) => `<div id=${i.elementId}></div>`)
);

jQuery("#demo-navs>ul>li").each((i, e) => {
  const id = mountInfo[i].elementId;
  e.id = id;
  jQuery(id).hide();
  jQuery(e).on("click", () => {
    jQuery(id).show();
    jQuery(id).siblings().hide();
  });
});

mountDemo(mountInfo);
