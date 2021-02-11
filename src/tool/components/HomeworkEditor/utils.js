const headerHeight = 66;
const modalPadding = 20;
const infoMargin = 40 + 34;
const footerHeight = 60 + 2 * 16;

const minHeight = 540;
const minWidth = 1000;

export const generateChartEditorStyles = () => {
  const { height: chartInfoHeight } = document.querySelector(".chart-info").getBoundingClientRect();
  let { left, top, width, height } = document.querySelector(".app").getBoundingClientRect();

  width = Math.round(width);
  height = Math.round(height);
  left = Math.round(left);
  top = Math.round(top);

  const editorTop = top + headerHeight + chartInfoHeight + infoMargin - modalPadding;
  const editorHeight = Math.max(minHeight, height - headerHeight - chartInfoHeight - infoMargin);

  let transform = "";

  if (width < minWidth) {
    transform = `transform: scale(${width / minWidth});`;
    width = minWidth;
  }

  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = `
    .google-visualization-charteditor-dialog {
      left: ${left}px !important;
      top: ${editorTop}px !important;
      width: ${width}px !important;
      height: ${editorHeight}px !important;
      transform-origin: top left;
      ${transform}
    }
  `;

  document.head.appendChild(style);

  const chartHeight = editorHeight - footerHeight;

  return { height: chartHeight };
}