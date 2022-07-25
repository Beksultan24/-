const API = "http://localhost:8000/posts";

// ? переменные для инпутов (для добавления постов)

let img = document.querySelector("#img");
let likes = document.querySelector("#likes");
let descr = document.querySelector("#descr");
let btnAdd = document.querySelector("#btn-add");

// ? блок куда добовляются карточки с товарами
let list = document.querySelector("#post-list");

btnAdd.addEventListener("click", async () => {
  // собираем обьект для добавления в json-server
  let obj = {
    img: img.value,
    likes: likes.value,
    descr: descr.value,
  };

  // ? проверка на заполненость полей
  if (!obj.img.trim() || !obj.likes.trim() || !obj.descr.trim()) {
    alert("Заполните поля");
    return;
  }

  // ? запрос для добавления
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  img.value = "";
  descr.value = "";
  likes.value = "";
  render();
});

// ? Отображение
async function render() {
  let post = await fetch(`${API}`).then((res) => res.json());

  list.innerHTML = "";

  post.forEach((element) => {
    // console.log(element);
    let newElem = document.createElement("div");
    newElem.innerHTML = `<div class="card m-2" style="width: 25rem;">
      <img src=${element.img} class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text d-flex justify-content-center">${element.likes}</p>
        <p class="card-text d-flex justify-content-center">${element.descr}</p>
        <a href="#" class="btn btn-danger  d-flex justify-content-center mt-2 btn-edit"  id=${element.id} data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</a>
        <a href="#" class="btn btn-danger d-flex justify-content-center mt-2 btn-delete" id=${element.id}>Delete</a>
      </div>
    </div>`;
    list.append(newElem);
  });
}
render();

// ? удаление продукта
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let answer = confirm("Вы уверены?");

    if (answer) {
      let id = e.target.id;
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      render();
    }
// double click on the heart icon
$(".fa-heart").dblclick(function () {
  $(".notification-bubble").show(400);
});

$(document).on("scroll", function () {
  if ($(document).scrollTop() > 50) {
    $(".navigation").addClass("shrink");
  } else {
    $(".navigation").removeClass("shrink");
  }
});
