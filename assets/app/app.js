const inputSearch = document.querySelector("#Search");
const inputAdd = document.querySelector("#add");
const submit = document.querySelector(".submit");
const check = document.querySelector("#check");
const doing = document.querySelector(".doing");
const ul = document.querySelector("ul");
const DeleteEvent = ` <button class="Delete">حذف</button> `;
const actionzone = document.querySelector(".content");
const darkmod = document.querySelector(".dark-mod");

// ایونت مخصوص اضافه شدن محتوا به پروژه
submit.addEventListener("click", function (e) {
  const newtext = document.createElement("p");
  newtext.className = "doing";
  newtext.textContent = inputAdd.value;

  const row = document.createElement("div");
  row.className = "row";
  row.appendChild(newtext);
  row.innerHTML += DeleteEvent;

  actionzone.appendChild(row);

  //صدا زدن فانکشن مخصوص ثبت
  innerLocalStorage(inputAdd.value);

  inputAdd.value = "";

  e.preventDefault();
});
inputAdd.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const newtext = document.createElement("p");
    newtext.className = "doing";
    newtext.textContent = inputAdd.value;

    const row = document.createElement("div");
    row.className = "row";
    row.appendChild(newtext);
    row.innerHTML += DeleteEvent;

    actionzone.appendChild(row);
    innerLocalStorage(inputAdd.value);

    inputAdd.value = "";

    e.preventDefault();
  }
});
//  بخش فعال کردن دکمه حذف به همراه حذف از لوکال استورج

ul.addEventListener("click", function (e) {
  if (e.target.className === "Delete") {
    e.target.parentElement.remove();
    removeLocalStorageItem(e.target.parentElement.children[0].textContent);
  }
});

//حذف از لوکال استورج//
removeLocalStorageItem = (item) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === item) {
      tasks.splice(i, 1);
    }
  }

  if (tasks.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("tasks", tasks);
  }
};
//بخش مربوط به چک باکس

check.addEventListener("click", function (e) {
  if (check.checked === true) {
    ul.style.display = "none";
  } else {
    ul.style.display = "flex";
  }
});
// بخش مربوط به اینپوت سرچ

inputSearch.addEventListener("keyup", function (e) {
  for (let index of ul.children) {
    if (index.firstElementChild.textContent.indexOf(inputSearch.value) !== -1) {
      index.style.display = "flex";
    } else {
      index.style.display = "none";
    }
  }
});

//فانکشن مخصوص لود کردن لوکال استوریج به دام

document.addEventListener("DOMContentLoaded", function (e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }
  for (let item of tasks) {
    const newtext = document.createElement("p");
    newtext.className = "doing";
    newtext.textContent = item;
    const row = document.createElement("div");
    row.className = "row";
    row.appendChild(newtext);
    row.innerHTML += DeleteEvent;

    actionzone.appendChild(row);
  }
});

// بخش ثابت کردن محتوا در پروژه
function innerLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }
  tasks.push(task);

  localStorage.setItem("tasks", tasks);
}

darkmod.addEventListener("click", function (e) {
  e = document.body;
  e.classList.toggle("dark-mode");
});
