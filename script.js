function change_image(e) {
  id = e.src;
  p = Array.from(e.parentNode.children);
  p.map((e) => {
    if (e.src !== id) {
      e.className = "hover:scale-101 w-2/5 h-2/5 m-2";
    } else {
      e.className = "border border-2 m-2 hover:scale-101 w-2/5 h-2/5";
    }
  });
  document.getElementById("background").src = id;
}
function change_text(e) {
  if (document.getElementById("StrictColWrite").checked) {
    document.getElementById("text").innerText = e.value.split("").join("\n");
  } else {
    document.getElementById("text").innerText = e.value;
  }
}
function change_size(e) {
  document.getElementById("text").style.fontSize = `${(e.value / 100) * 3.75}rem`;
}
async function export_image() {
  //   canvas = await html2canvas(document.getElementById("result"));
  const a = document.createElement("a");
  //   a.download = `${document.getElementById("text").innerText}.png`;
  //   a.crossorigin = "anonymous";
  //   a.href = canvas.toDataURL("image/png");
  //   a.click();
  domtoimage.toPng(document.getElementById("result")).then(function (dataUrl) {
    a.download = `${document.getElementById("text").innerText}.png`;
    a.crossorigin = "anonymous";
    a.href = dataUrl;
    a.click();
  });
}
alert(
  "현재 모종의 이유로 모바일에서 이미지가 정상적으로 다운로드 되지 않는 문제가 있습니다. 모바일 이용자 여러분께서는 아쉽지만 pc나 태블릿등을 사용해 주시길 부탁드립니다."
);
