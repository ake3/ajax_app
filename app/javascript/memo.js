const buildHTML = (XHR) => {       /アロー関数(functionを省略)/
  const item = XHR.response.post;  /;は文章の終わりを示す、省略可(現場によりルールが異なる)/
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
  </div>`
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null; /エラー時に以下の処理を行わないようにするための記述/
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XMR));
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);