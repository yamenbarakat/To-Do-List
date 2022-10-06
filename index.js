const textInput = document.querySelector(".add-task-container input");
const addTask = document.querySelector(".add-task-container .add-task");
const output = document.querySelector(".output");
const toDoList = document.querySelector(".to-do-list");
const outputContainer = document.querySelector(".output-container");

// if there are items in local storage, show them
if (localStorage.length > 0) {
  for (let i of Object.keys(localStorage)) {
    addNewTask(localStorage.getItem(i));
  }

  addTask.addEventListener("click", () => {
    // if the input empty stop the function
    if (!/\w/.test(textInput.value)) {
      return;
    }

    // add new task
    addNewTask(textInput.value);

    // save the value in localStorage
    localStorage.setItem(textInput.value, textInput.value);

    // clear the textInput value
    textInput.value = "";
  });

  function addNewTask(inputTxt) {
    // show outputContainer by removing hide class
    outputContainer.classList.remove("hide");

    // add a div to be a container for a single output
    const output = document.createElement("div");

    // add a class to it
    output.className = "output";

    // create p element
    const p = document.createElement("p");

    // add the value of the input in p
    p.textContent = inputTxt;

    // create a delete button
    const deleteBtn = document.createElement("button");

    // add a class, dataset value and content to the button
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.value = inputTxt;

    // append p and button to the output
    output.append(p, deleteBtn);

    // append the output to the outputContainer
    outputContainer.append(output);

    // add evenet listener to delete button for deleting the task and the item from localStorage
    deleteBtn.addEventListener("click", (e) => {
      // rerange itemes number
      localStorage.removeItem(e.target.dataset.value);
      e.target.parentElement.remove();
      if (outputContainer.firstElementChild === null) {
        outputContainer.classList.add("hide");
      }
    });
  }
}
