import { lazy } from "react";
import ReactDOM from "react-dom/client";

const mountDemo = (
  components: Array<{ component: React.FC; elementId: string }>
) => {
  components.forEach(({ component: Component, elementId }) => {
    ReactDOM.createRoot(document.getElementById(elementId)).render(
      <Component />
    );
  });
};

// @ts-ignore
const mountInfo = Object.entries(import.meta.glob("./*/index.tsx")).map(
  ([path, fn]) => {
    const elementId = path.replace(/.[\//](.+)[\//]\index.tsx/, "$1");
    return {
      elementId,
      component: lazy(fn as any),
    };
  }
);

/** 左侧菜单与组件绑定好关系 */
jQuery("#demo").append(
  ...mountInfo.map((i, index) => {
    jQuery(jQuery("#demo-navs>ul>li").get(index))
      .attr(`${i.elementId}`, "")
      .on("click", () => {
        jQuery(`#${i.elementId}`).show();
        jQuery(`#${i.elementId}`)
          .siblings()
          .each((_, e) => {
            if (jQuery(e).attr("id")) {
              jQuery(e).hide();
            }
          });
      });
    return `<div id=${i.elementId}></div>`;
  })
);
/** 挂在demo */
mountDemo(mountInfo);

/** 初始化隐藏demo */
mountInfo.forEach((i) => {
  jQuery(`#${i.elementId}`).hide();
});
