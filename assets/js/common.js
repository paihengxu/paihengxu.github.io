$(document).ready(function () {
  // Add toggle functionality to publication details, scoped to each paper.
  function closeMediaCoverage(entry) {
    entry.find("div.media-coverage").removeClass("open").prop("hidden", true);
    entry.find("button.media-coverage").attr("aria-expanded", "false");
  }
  $("a.abstract").click(function () {
    closeMediaCoverage($(this).parent().parent());
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    closeMediaCoverage($(this).parent().parent());
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
  });
  $("button.media-coverage").click(function () {
    const entry = $(this).parent().parent();
    const panel = entry.find("div.media-coverage");
    const open = $(this).attr("aria-expanded") !== "true";
    entry.find(".abstract.hidden, .bibtex.hidden").removeClass("open");
    panel.prop("hidden", !open).toggleClass("open", open);
    $(this).attr("aria-expanded", String(open));
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let theme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (theme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });
});
