const headerHeight = 66;
const modalPadding = 30;
const infoMargin = 40 + 34;

export const generateChartEditorStyles = () => {
  const { height: chartInfoHeight } = document.querySelector(".chart-info").getBoundingClientRect();
  const { left, top, width, height } = document.querySelector(".app").getBoundingClientRect();

  const editorTop = top + headerHeight + chartInfoHeight + infoMargin - modalPadding;
  const editorHeight = height - headerHeight - chartInfoHeight - infoMargin;

  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = `
    .google-visualization-charteditor-dialog {
      left: ${left}px !important;
      top: ${editorTop}px !important;
      width: ${width}px !important;
      height: ${editorHeight}px !important;
    }
  `;

  document.head.appendChild(style);

  return { height: editorHeight };
}