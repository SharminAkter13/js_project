(async function () {
  // Load employee data from data.json
  const response = await fetch("data.json");
  const data = await response.json();
  let employees = data;
  let selectedEmployeeId = employees[0]?.id || -1;
  let selectedEmployee = employees[0] || {};

  // Get elements from the page
  const employeeList = document.querySelector(".employees__nlist");
  const employeeInfo = document.querySelector(".employees__sinfo");
  const createButton = document.querySelector(".createEmployee");
  const modal = document.querySelector(".addEmployee");
  const form = document.querySelector(".addEmployee_create");
  const dobInput = document.querySelector(".addEmployee_dob");

  // Set max date of birth (minimum age 18)
  const currentYear = new Date().getFullYear();
  const monthDay = new Date().toISOString().slice(5, 10);
  dobInput.max = (currentYear - 18) + "-" + monthDay;

  // Show the add employee modal
  createButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Hide modal when clicking outside the form
  modal.addEventListener("click", function (event) {
    if (event.target.className === "addEmployee") {
      modal.style.display = "none";
    }
  });

  // Handle add employee form submit
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const formData = new FormData(form);
    const newEmployee = {};
    for (const [key, value] of formData.entries()) {
      newEmployee[key] = value;
    }

    // Add ID and calculate age
    const lastEmployee = employees[employees.length - 1];
    newEmployee.id = lastEmployee ? lastEmployee.id + 1 : 1;
    newEmployee.age = currentYear - parseInt(newEmployee.dob.slice(0, 4));
    newEmployee.imageUrl = newEmployee.imageUrl || "gfg.png";

    // Add to employee list
    employees.push(newEmployee);
    form.reset();
    modal.style.display = "none";
    renderEmployees();
  });

  // Handle click on employee list (select or delete)
  employeeList.addEventListener("click", function (event) {
    const clickedElement = event.target;
    const parentId = clickedElement.parentNode.id || clickedElement.id;

    // Select employee
    if (clickedElement.tagName === "SPAN" && parentId !== selectedEmployeeId) {
      selectedEmployeeId = parentId;
      renderEmployees();
      renderSingleEmployee();
    }

    // Delete employee
    if (clickedElement.tagName === "I") {
      employees = employees.filter(function (emp) {
        return String(emp.id) !== parentId;
      });

      // If deleted employee was selected
      if (String(selectedEmployeeId) === parentId) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }

      renderEmployees();
    }
  });

  // Show all employees in the list
  function renderEmployees() {
    employeeList.innerHTML = "";

    employees.forEach(function (emp) {
      const span = document.createElement("span");
      span.className = "employees__names--item";
      span.id = emp.id;

      if (String(emp.id) === String(selectedEmployeeId)) {
        span.classList.add("selected");
        selectedEmployee = emp;
      }

      span.innerHTML = emp.firstName + " " + emp.lastName + 
        ' <i class="employeeDelete">&#10060;</i>';

      employeeList.appendChild(span);
    });
  }

  // Show details of selected employee
  function renderSingleEmployee() {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfo.innerHTML = `
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
        ${selectedEmployee.fName} ${selectedEmployee.lName} (${selectedEmployee.age})
      </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>
    `;
  }

  // Initial render
  renderEmployees();
  renderSingleEmployee();
})();
