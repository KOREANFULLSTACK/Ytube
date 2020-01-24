import axios from "axios";

const comment = document.querySelector(".video_comment_body");
const classEdit = document.querySelector(".editButton");
const editCommentBtn = document.querySelector(".editCommentBtn");
const addCommentForm = document.querySelector(".addCommentForm");
const deleteCommentBtn = document.querySelector(".deleteCommentBtn");

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/add`,
    method: "post",
    data: {
      comment: comment
    }
  });
  console.log(response);
};
const addCommentHandle = event => {
  event.preventDefault();

  var comment = addCommentForm.querySelector("input");
  sendComment(comment.value);
  comment.value = "";
};
function editHandler() {
  // event.preventDefault(); //submit이 실행되지 않도록!

  const comment_id = event.target.id;
  const target_comment = event.target.parentNode.parentNode.childNodes[0];

  const tmp = target_comment.childNodes[1].textContent;
  target_comment.removeChild(target_comment.childNodes[1]);
  //새로운 form들 생성 form post/textarea/ button
  const form = document.createElement("FORM");
  form.action = `/api/${comment_id}/edit`;
  form.method = "post";

  const textarea = document.createElement("TEXTAREA");
  const text = document.createTextNode(tmp);
  textarea.name = "text";
  textarea.appendChild(text);

  const okCommetBtn = document.createElement("button"); //type subbit

  const icon = document.createElement("i");
  icon.className = "fas fa-check";
  okCommetBtn.appendChild(icon);
  //있었던 고정된 텍스트 제거. comment_text에 추가함.
  target_comment.appendChild(form);
  form.appendChild(textarea);
  form.appendChild(okCommetBtn);

  //있었던 수정버튼 제거
  const classEdit = event.target.parentNode;
  classEdit.removeChild(classEdit.childNodes[0]);
}

function init() {
  if (!classEdit.querySelector("button")) {
  } else {
    classEdit.querySelector("button").addEventListener("click", editHandler);
    addCommentForm.addEventListener("submit", addCommentHandle);
  }
}

if (comment && classEdit) {
  init();
}
