jQuery("[data-select]")
  .first()
  .on("click", () => {
    const demo = jQuery("[data-select-demo]").first();
    if (!demo.attr("src")) {
      demo.attr("src", " ../select-demo/index.html");
    }
    demo.show();
  });
jQuery("[data-select]").trigger("click");
