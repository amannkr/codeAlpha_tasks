// ::: Select element ::: //
const taskIn = document.querySelector(".taskInput");
const dateIn = document.querySelector(".dateInput");
const addBtn = document.querySelector(".addBtn");
const alertMess = document.querySelector(".alertMess");
const added = document.querySelector(".added");
const notAdded = document.querySelector(".notAdded");
const textCentre = document.querySelector(".text-centre");
const tableBody = document.getElementById("tableBody");

let nrow = 0;
let countDel = 1;
let chkDel = 0;

// ::: Create Buttons ::: //
const createBtn = function (name) {
  const btn = document.createElement("BUTTON");
  btn.innerText = name.charAt(0).toUpperCase() + name.slice(1);
  btn.className = `${name}Btn`;
  return btn;
};

// ::: Task Adding to Table ::: //
const taskAdding = function (task, due, editBtn, checkBtn, delBtn) {
  // Create new row
  let row = document.createElement("tr");

  // Add Cells
  let c1 = document.createElement("td");
  let c2 = document.createElement("td");
  let c3 = document.createElement("td");
  let c4 = document.createElement("td");
  c4.className = `tableBtn`;

  // Insert data to cells
  c1.innerText = task;
  c2.innerText = due;
  c3.innerText = "Pending";
  c4.append(createBtn("edit"));
  c4.append(createBtn("check"));
  c4.append(createBtn("delete"));

  // Append cells to row
  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);
  row.appendChild(c4);

  // Append row to table body
  tableBody.appendChild(row);
  nrow++;
};

// ::: Edit Button Working ::: //
const editTask = function (editBtns, editBtn, checkBtn, delBtn) {
  editBtns.forEach(function (task) {
    task.addEventListener("click", function (e) {
      e.preventDefault();

      let idx;
      idx = Number(task?.parentElement?.parentElement?.rowIndex) - 1;

      if (idx >= 1) {
        console.log(idx);

        let taskName = tableBody?.rows[idx]?.cells[0]?.innerHTML;
        taskIn.value = taskName;

        if (tableBody?.rows[idx]?.cells[1]?.innerHTML === "No due Date") {
          console.log(`here`);
          taskIn.focus();
        } else {
          console.log(`here i am`);
          let taskDate = tableBody?.rows[idx]?.cells[1]?.innerHTML;
          dateIn.value = taskDate;
          dateIn.focus();
        }

        tableBody.deleteRow(idx);
        idx = -1;
        nrow--;
        if (textCentre.classList.contains("hidden") && nrow < 1) {
          textCentre.classList.remove("hidden");
        }
      }
    });
  });
};

// ::: Check Button Working ::: //
const checkTask = function (checkBtns, editBtn, checkBtn, delBtn) {
  checkBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();

      let idx = Number(b?.parentElement?.parentElement?.rowIndex) - 1;
      tableBody.rows[idx].cells[2].innerText = "Complete";
    });
  });
};

// ::: Delete Button Working ::: //
const deleteTask = function (d, editBtn, checkBtn, delBtn) {
  let idx = Number(d?.parentElement?.parentElement?.rowIndex) - 1;
  if (idx >= 1) {
    tableBody.deleteRow(idx);
    nrow--;
    idx = -1;
    if (textCentre.classList.contains("hidden") && nrow < 1) {
      textCentre.classList.remove("hidden");
    }
  }
};

// ::: Add Button Working ::: //
const taskAdds = function (task, due) {
  // ::: Task Added ::: //
  taskAdding(task, due);

  // ::: Edit Task ::: //
  const editBtns = document.querySelectorAll(".editBtn");
  editTask(editBtns);

  // ::: Complete Task ::: //
  const checkBtns = document.querySelectorAll(".checkBtn");
  checkTask(checkBtns);

  // ::: Delete Task ::: //
  const delBtns = document.querySelectorAll(".deleteBtn");

  delBtns.forEach(function (d) {
    d.addEventListener("click", () => {
      deleteTask(d);
    });
  });
};

// ::: Alert Message Working ::: //
const alert = function (added, notAdded) {
  if (taskIn.value !== ``) {
    notAdded.classList.add("hidden");
    added.classList.remove("hidden");
    added.classList.add("show");
    alertMess.style.backgroundColor = "rgb(54, 211, 153)";
    setTimeout(() => {
      notAdded.classList.add("hidden");
      added.classList.add("hidden");
      added.classList.remove("show");
    }, 3000);
  } else {
    notAdded.classList.remove("hidden");
    notAdded.classList.remove("show");
    added.classList.add("hidden");
    alertMess.style.backgroundColor = "rgb(248, 114, 114)";
    setTimeout(() => {
      notAdded.classList.add("hidden");
      added.classList.add("hidden");
    }, 3000);
  }
};

// ::: Add Button ::: //
addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Alert Message
  alert(added, notAdded);

  // Task Found?
  if (taskIn.value !== ``) {
    textCentre.classList.add("hidden");
  } else if (
    taskIn.value === `` &&
    textCentre.classList.contains("hidden" && nrow <= 0)
  ) {
    textCentre.classList.remove("hidden");
  }

  // Task Added
  if (taskIn.value !== `` && dateIn.value !== ``) {
    taskAdds(taskIn.value, dateIn.value);
  } else if (taskIn.value !== `` && dateIn.value === ``) {
    taskAdds(taskIn.value, `No due Date`);
  }

  // Clear
  taskIn.value = ``;
  dateIn.value = ``;
});
