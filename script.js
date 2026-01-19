// Initialize students array
let students = [];

// DOM elements
const studentForm = document.getElementById("student-form");
const studentNameInput = document.getElementById("student-name");
const studentIdInput = document.getElementById("student-id");
const studentEmailInput = document.getElementById("student-email");
const studentGradeInput = document.getElementById("student-grade");
const studentDepartmentSelect = document.getElementById("student-department");
const studentsTableBody = document.getElementById("students-table-body");
const sortBySelect = document.getElementById("sort-by");
const filterBySelect = document.getElementById("filter-by");

// Validation functions
function validateName(name) {
  return name && name.trim().length > 0;
}

function validateId(id) {
  return id && id.trim().length > 0;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email);
}

function validateGrade(grade) {
  return grade >= 0 && grade <= 100;
}

function showError(inputElement, message) {
  inputElement.classList.add("error");
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function clearError(inputElement) {
  inputElement.classList.remove("error");
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.style.display = "none";
  }
}

function validateForm() {
  let isValid = true;

  // Validate name
  if (!validateName(studentNameInput.value)) {
    showError(studentNameInput, "Please enter a valid name");
    isValid = false;
  } else {
    clearError(studentNameInput);
  }

  // Validate ID
  if (!validateId(studentIdInput.value)) {
    showError(studentIdInput, "Please enter a valid ID");
    isValid = false;
  } else {
    clearError(studentIdInput);
  }

  // Validate email
  if (!validateEmail(studentEmailInput.value)) {
    showError(studentEmailInput, "Please enter a valid email");
    isValid = false;
  } else {
    clearError(studentEmailInput);
  }

  // Validate grade
  if (!validateGrade(parseInt(studentGradeInput.value))) {
    showError(studentGradeInput, "Grade must be between 0-100");
    isValid = false;
  } else {
    clearError(studentGradeInput);
  }

  return isValid;
}

// Get status based on grade
function getStatus(grade) {
  if (grade >= 70) {
    return "passed";
  } else if (grade >= 50) {
    return "average";
  } else {
    return "failed";
  }
}

// Render students in table
function renderStudents(filteredStudents = students) {
  if (filteredStudents.length === 0) {
    studentsTableBody.innerHTML = `
                    <tr class="no-records">
                        <td colspan="7">No students found matching your criteria.</td>
                    </tr>
                `;
    return;
  }

  studentsTableBody.innerHTML = "";
  filteredStudents.forEach((student) => {
    const statusClass = `status-${student.status}`;
    const statusText =
      student.status === "passed"
        ? "Passed"
        : student.status === "failed"
          ? "Failed"
          : "Average";

    const row = document.createElement("tr");
    row.classList.add(`row-${student.status}`);
    row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.email}</td>
                    <td>${student.grade}%</td>
                    <td>${student.department}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td><button class="action-btn" data-id="${student.id}"><i class="fa-solid fa-trash-can"></i></button></td>
                `;
    studentsTableBody.appendChild(row);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.getAttribute("data-id");
      deleteStudent(studentId);
    });
  });
}

// Add student
studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const newStudent = {
    id: studentIdInput.value.trim(),
    name: studentNameInput.value.trim(),
    email: studentEmailInput.value.trim(),
    grade: parseInt(studentGradeInput.value),
    department: studentDepartmentSelect.value,
    status: getStatus(parseInt(studentGradeInput.value)),
  };

  // Check for duplicate name
  const existingStudent = students.find(
    (s) => s.name.toLowerCase() === newStudent.name.toLowerCase(),
  );
  if (existingStudent) {
    showError(studentNameInput, "Student name already exists");
    return;
  }

  students.push(newStudent);
  renderStudents();

  // Reset form
  studentForm.reset();

  // Show success notification (simulated)
  const originalButtonText = studentForm.querySelector("button").textContent;
  studentForm.querySelector("button").textContent = "✓ Added!";
  setTimeout(() => {
    studentForm.querySelector("button").textContent = originalButtonText;
  }, 1500);
});

// Delete student
function deleteStudent(studentId) {
  students = students.filter((student) => student.id !== studentId);
  renderStudents();
}

// Filter and sort functionality
function applyFiltersAndSort() {
  let filteredStudents = [...students];

  // Apply filter
  const filterValue = filterBySelect.value;
  if (filterValue === "passed") {
    filteredStudents = filteredStudents.filter(
      (student) => student.status === "passed",
    );
  } else if (filterValue === "failed") {
    filteredStudents = filteredStudents.filter(
      (student) => student.status === "failed",
    );
  }

  // Apply sort
  const sortByValue = sortBySelect.value;
  if (sortByValue === "name") {
    filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortByValue === "grade") {
    filteredStudents.sort((a, b) => b.grade - a.grade);
  } else if (sortByValue === "department") {
    filteredStudents.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderStudents(filteredStudents);
}

// Event listeners for filters and sort
sortBySelect.addEventListener("change", applyFiltersAndSort);
filterBySelect.addEventListener("change", applyFiltersAndSort);

// Initialize the page
renderStudents();

// Add real-time validation as user types
studentNameInput.addEventListener("input", function () {
  if (validateName(this.value)) {
    clearError(this);
  }
});

studentIdInput.addEventListener("input", function () {
  if (validateId(this.value)) {
    clearError(this);
  }
});

studentEmailInput.addEventListener("input", function () {
  if (validateEmail(this.value)) {
    clearError(this);
  }
});

studentGradeInput.addEventListener("input", function () {
  if (validateGrade(parseInt(this.value))) {
    clearError(this);
  }
});
