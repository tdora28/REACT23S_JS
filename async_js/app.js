/*
// Example from MDN
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
};

const promise = fetchUsers();
promise.then((data) => {
  testFunction(data);
});

const testFunction = (data) => {
  for (const user of data) {
    console.log(user.name);
  }
};
*/

const heading = document.querySelector("h3");
const section = document.querySelector(".preview");
const todos = document.querySelector(".todos");

const createApiURL = (path) => {
  const server = "https://jsonplaceholder.typicode.com";
  return server + path;
};

const todo1URL = createApiURL("/todos/1");
fetch(todo1URL)
  .then((response) => response.json())
  .then((data) => console.log(data));

const getUser = async (id) => {
  // TODO check the input: id
  const userURL = createApiURL("/users/") + id;

  const user = await fetch(userURL).then((response) => response.json());

  return user;
};

const getTodo = async (id, callback) => {
  const todoURL = createApiURL("/todos/" + id);
  await fetch(todoURL)
    .then((response) => response.json())
    .then((json) => callback(json));
};

// TODO write callback function to console log the todo item
// TODO write a callback function to place the todo item on the webpage
const logTodo = (todo) => {
  console.log(todo);
};

const printTodo = (todo) => {
  const div = document.createElement("div");
  div.classList.add("todo");
  div.innerHTML = `
    <h4>${todo.id}) ${todo.title}</h4>
    <p>Completed: ${todo.completed ? "YES" : "NO"}</p>
  `;

  todos.appendChild(div);
};

getTodo(2, logTodo);
getTodo(1, printTodo);
getTodo(4, printTodo);
getTodo(8, printTodo);

const printUser = async (callback) => {
  let userTwo = await getUser(2);
  heading.textContent = userTwo.name;
  section.appendChild(callback(userTwo.address));
};

const createAddressBlock = (address) => {
  const elem = document.createElement("div");
  elem.innerHTML = `
    <p class="address">${address.street}&nbsp;${address.suite}<br />${address.city}</p>
    `;

  return elem;
};

printUser(createAddressBlock);
