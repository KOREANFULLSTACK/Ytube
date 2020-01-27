import axios from "axios";

const comment = document.querySelector(".video_comment_body");
const editCommentBtns = document.querySelectorAll(".editCommentBtn");
const addCommentForm = document.querySelector(".addCommentForm");
const deleteCommentBtn = document.querySelectorAll(".deleteCommentBtn");

const numCountPlus = () => {
  var numComment = Number(
    document.querySelector(".video_comment_view").textContent.split(" ")[0]
  );
  numComment += 1;
  var comment_view = document.querySelector(".video_comment_view");
  comment_view.innerHTML = `${numComment} comments`;
};

const numCountMinus = () => {
  var numComment = Number(
    document.querySelector(".video_comment_view").textContent.split(" ")[0]
  );
  numComment -= 1;
  var comment_view = document.querySelector(".video_comment_view");
  comment_view.innerHTML = `${numComment} comments`;
};

const createComment = text => {
  const video_comment_body = document.querySelector(".video_comment_body");
  const video_comment_view = document.querySelector(".video_comment_view");
  const video_comment_write_user = document.querySelector(
    ".video_comment_write_user"
  );

  //the number of comments
  numCountPlus();

  //create user form
  const video_comment_body_one = document.createElement("div");
  video_comment_body_one.className = "video_comment_body_one";
  const video_comment_body_one_user = document.createElement("div");
  video_comment_body_one.appendChild(video_comment_body_one_user);
  video_comment_body_one_user.className = "video_comment_body_one_user";

  const user_url = video_comment_write_user.querySelector("a");
  const user_image = user_url.querySelector("img");
  const user_name = user_url.querySelector("span");

  const new_user_url = document.createElement("a");
  new_user_url.href = user_url.href;
  video_comment_body_one_user.appendChild(new_user_url);
  const new_user_img = document.createElement("img");
  new_user_img.src = user_image.src;
  const new_user_name = document.createElement("span");
  new_user_name.textContent = user_name.textContent;
  new_user_url.appendChild(new_user_img);
  new_user_url.appendChild(new_user_name);

  //create comment form
  const video_comment_body_one_user_text = document.createElement("div");
  video_comment_body_one_user_text.className =
    "video_comment_body_one_user_text";

  const comment_text = document.createElement("div");
  comment_text.className = "comment_text";
  const comment_text_span = document.createElement("span");
  comment_text_span.innerText = text;
  comment_text.appendChild(comment_text_span);
  video_comment_body_one_user_text.appendChild(comment_text);
  const div_editBtn = document.createElement("div");
  div_editBtn.className = "editButton";
  const editBtn = document.createElement("button");
  const edit_i = document.createElement("i");
  edit_i.className = "fas fa-edit";
  div_editBtn.appendChild(editBtn);
  editBtn.appendChild(edit_i);

  const form = document.createElement("form");
  const delBtn = document.createElement("button");
  const del_i = document.createElement("i");
  del_i.className = "fas fa-times";
  delBtn.appendChild(del_i);
  form.appendChild(delBtn);
  video_comment_body_one_user_text.appendChild(div_editBtn);
  video_comment_body_one_user_text.appendChild(form);
  video_comment_body_one_user.appendChild(video_comment_body_one_user_text);
  video_comment_body.appendChild(video_comment_body_one);
};
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
  createComment(comment.value);
  comment.value = "";
};
const formHandler = (event, id) => {
  const comment = document.querySelector(".createdInput");
  event.preventDefault();
  sendEditComment(id);
};
function editHandler() {
  const comment_id = event.target.id;
  var target_comment = event.target.parentNode.parentNode.childNodes[0];

  //icon을 눌렀을 때의 예외처리
  if (target_comment.className === "editCommentBtn") {
    target_comment = target_comment.parentNode.parentNode.childNodes[0];
  }

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
  const video_comment_body = document.querySelector(".video_comment_body");
  event.preventDefault();
  console.log(event.target.parentNode.parentNode.parentNode);
  const deleteNode = event.target.parentNode.parentNode.parentNode;
  const id = event.target.childNodes[0].id;
  sendDelete(id);
  //fake
  deleteNode.remove();
  numCountMinus();
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
