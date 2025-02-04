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
function change_mode(e) {
  if (e.checked) {
    document.getElementById("TextArea").style.display = "none";
    document.getElementById("ImageArea").style.display = "";
    document.getElementById("ImgData").style.display = "";
    document.getElementById("text").style.display = "none";
  } else {
    document.getElementById("TextArea").style.display = "";
    document.getElementById("ImageArea").style.display = "none";
    document.getElementById("ImgData").style.display = "none";
    document.getElementById("text").style.display = "";
  }
}
async function get_image_src(image) {
  return await new Promise((resolve, reject) => {
    reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(image);
  });
}
async function change_textover_image(e) {
  file_name = e.files[0].name;
  document.getElementById("file_select").innerText = file_name;
  image_src = await get_image_src(e.files[0]);
  document.getElementById("ImgData").src = image_src;
}
function change_image_size(e) {
  document.getElementById("ImgData").style.width = `${e.value}%`;
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

const register = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js", {
        scope: "/",
      })
      .then((registration) => {
        console.log("Service worker registration succeeded: ", registration);
      })
      .catch((error) => {
        console.error("Service worker registration failed: ", error);
      });
  } else {
    console.log("Service workers are not supported.");
  }
};
register();
