const API = "http://localhost:8000/posts";

// ? переменные для инпутов (для добавления постов)

let img1 = document.querySelector("#img1");
let img2 = document.querySelector("#img2");
let likes = document.querySelector("#likes");
let descr = document.querySelector("#descr");
let btnAdd = document.querySelector("#btn-add");

// ? переменные для инпутов (для редактирования постов)
let editImg1 = document.querySelector("#edit-Img1");
let editImg2 = document.querySelector("#edit-Img2");
let editLikes = document.querySelector("#edit-likes");
let editDescr = document.querySelector("#edit-descr");
let btnSaveEdit = document.querySelector("#btn-save-edit");

// ? блок куда добовляются карточки с постами
let list = document.querySelector("#post-list");

btnAdd.addEventListener("click", async () => {
  // собираем обьект для добавления в json-server
  let obj = {
    img1: img1.value,
    img2: img2.value,
    likes: likes.value,
    descr: descr.value,
  };

  // ? проверка на заполненость полей
  if (
    !obj.img1.trim() ||
    !obj.img2.trim() ||
    !obj.likes.trim() ||
    !obj.descr.trim()
  ) {
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

  img1.value = "";
  img2.value = "";
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
    // newElem.innerHTML = `<div class="card m-2" style="width: 25rem;">
    //   <img src=${element.img} class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <p class="card-text d-flex justify-content-center">${element.likes}</p>
    //     <p class="card-text d-flex justify-content-center">${element.descr}</p>
    //     <a href="#" class="btn btn-danger  d-flex justify-content-center mt-2 btn-edit"  id=${element.id} data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</a>
    //     <a href="#" class="btn btn-danger d-flex justify-content-center mt-2 btn-delete" id=${element.id}>Delete</a>
    //   </div>
    // </div>`;
    // list.append(newElem);

    newElem.innerHTML = `<div class="card m-5" style="width: 24rem">
          <img
            id="ava-beks"
            src=${element.img1}
            alt=""
            class="card-img-top"
        </div>

        <img
          class="card-img-top-bottom"
          id="img-beks img-thumbnail"
          src=${element.img2}
          alt="Card image cap"
        />

        <div class="card-body2">
          <p>${element.likes}</p>
          <p>${element.descr}</p>
          <a href="#" class="btn btn-light d-flex justify-content-center mt-2 btn-edit" id=${element.id} style="width: 20px" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="https://cdn3.iconfinder.com/data/icons/slicons-line-essentials/24/more_horizontal-512.png" style="width: 20px" alt="three dots"></a>
          <a href="#" class="btn btn-danger d-flex justify-content-center mt-2 btn-delete" id=${element.id} style="width: 50px">Delete</a>
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
  }
});

// ! редактирование

// ? для запонения полей модалки
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editImg1.value = data.img1;
        editImg2.value = data.img2;
        editLikes.value = data.likes;
        editDescr.value = data.descr;
        btnSaveEdit.setAttribute("id", data.id);
      });
  }
});

// ? кнопка из модалки для  сохранения изменений

btnSaveEdit.addEventListener("click", (e) => {
  console.log(e.target.id);
  let id = e.target.id;
  let img1 = editImg1.value;
  let img2 = editImg2.value;
  let likes = editLikes.value;
  let descr = editDescr.value;

  let edittedProduct = {
    img1: img1,
    img2: img2,
    likes: likes,
    descr: descr,
  };

  saveEdit(edittedProduct, id);
});

async function saveEdit(edittedProduct, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(edittedProduct),
  });
  render();
}
