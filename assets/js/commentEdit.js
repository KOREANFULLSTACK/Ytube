import axios from "axios";

const comment = document.querySelector(".video_comment_body");
const editCommentBtns = document.querySelectorAll(".editCommentBtn");
const addCommentForm = document.querySelector(".addCommentForm");
const deleteCommentBtn = document.querySelectorAll(".deleteCommentBtn");

const sendEditComment = id => {
  const comment = document.querySelector(".createdInput");
  const response = axios({
    method: "post",
    url: `/api/${id}/edit`,
    data: {
      comment: comment.value //req.body.comment에 comment.value가 들어감!
    }
  });
  console.log(response);
};

const sendAddComment = comment => {
  const Id = window.location.href.split("?")[0];

  const videoId = Id.split("/videos/")[1];

  const response = axios({
    method: "post",
    url: `/api/${videoId}/add`,
    data: {
      comment: comment
    }
  });
  console.log(response);
};
const addCommentHandle = event => {
  event.preventDefault();
  var comment = addCommentForm.querySelector("input");
  sendAddComment(comment.value);
  comment.value = "";
};
const formHandler = (event, id) => {
  event.preventDefault();
  sendEditComment(id);
};
function editHandler() {
  const comment_id = event.target.id;
  const target_comment = event.target.parentNode.parentNode.childNodes[0];

  console.log("target", event.target);
  console.log("target_comment", target_comment);

  const tmp = target_comment.childNodes[1].textContent;
  target_comment.removeChild(target_comment.childNodes[1]);

  const form = document.createElement("FORM");
  const input = document.createElement("input");
  const text = document.createTextNode(tmp);
  input.name = "text";
  input.className = "createdInput";
  input.id = comment_id;
  input.value = tmp;

  target_comment.appendChild(form);
  form.appendChild(input);

  form.addEventListener("submit", formHandler.bind(null, event, comment_id));

  //있었던 수정버튼 제거
  const removeThing = event.target.parentNode;
  removeThing.removeChild(removeThing.childNodes[0]);
}

const sendDelete = id => {
  const response = axios({
    method: "post",
    url: `/api/${id}/delete`
  });
  console.log(response);
};
const deleteHandler = event => {
  event.preventDefault();
  console.log(event.target);
  const id = event.target.childNodes[0].id;
  sendDelete(id);
};

function init() {
  for (var i = 0; i < editCommentBtns.length; i++)
    editCommentBtns[i].addEventListener("click", editHandler);

  if (addCommentForm)
    addCommentForm.addEventListener("submit", addCommentHandle);

  if (deleteCommentBtn) {
    for (var i = 0; i < deleteCommentBtn.length; i++)
      deleteCommentBtn[i].parentNode.addEventListener("submit", deleteHandler);
  }
}

if (comment) {
  init();
}
