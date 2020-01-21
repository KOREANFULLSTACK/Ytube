const comment = document.querySelector(".video_comment_body");
const classEdit = document.querySelector(".editButton");
const editButton = classEdit.querySelector("button");

function okHandler() {
  console.log("OK");
}
function editHandler() {
  const comment_id = event.target.id;
  const target_comment = event.target.parentNode.parentNode.childNodes[0];

  console.log(target_comment);
  const tmp = target_comment.childNodes[1].textContent;
  console.log("tmp : ", tmp);
  target_comment.removeChild(target_comment.childNodes[1]);
  console.log(tmp[0]);

  //새로운 form들 생성 form post/textarea/ button
  const form = document.createElement("FORM");
  form.action = `/comment/${comment_id}/delete`;
  form.method = "post";

  const textarea = document.createElement("TEXTAREA");
  const text = document.createTextNode(tmp);
  textarea.name = "text";
  textarea.appendChild(text);

  const okButton = document.createElement("button"); //type subbit
  okButton.type = "submit";

  const icon = document.createElement("i");
  icon.className = "fas fa-check";
  okButton.appendChild(icon);
  //있었던 고정된 텍스트 제거. comment_text에 추가함.
  target_comment.appendChild(form);
  form.appendChild(textarea);
  form.appendChild(okButton);

  //있었던 수정버튼 제거
  const classEdit = event.target.parentNode;
  classEdit.removeChild(classEdit.childNodes[0]);

  //새로운버튼생성 form post방식형태로 submit 그리고 새로생긴 버튼에 event리스너 줘야돼
}

function init() {
  if (editButton) {
    editButton.addEventListener("click", editHandler);
  }
}

if (comment) {
  init();
}

//tmp.childNodes[1].textContent "와 바다다!"
