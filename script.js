// ===== State =====
let students = [];

// ===== DOM Elements =====
const studentForm = document.getElementById("student-form");
const studentNameInput = document.getElementById("student-name");
const studentIdInput = document.getElementById("student-id");
const studentEmailInput = document.getElementById("student-email");
const studentGradeInput = document.getElementById("student-grade");
const studentDepartmentSelect = document.getElementById("student-department");
const studentsTableBody = document.getElementById("students-table-body");
const sortBySelect = document.getElementById("sort-by");
const filterBySelect = document.getElementById("filter-by");
const searchInput = document.getElementById("search-input");
const toastContainer = document.getElementById("toast-container");

// Stat elements
const statTotal = document.getElementById("stat-total");
const statAvg = document.getElementById("stat-avg");
const statPassed = document.getElementById("stat-passed");
const statFailed = document.getElementById("stat-failed");

// ===== Toast Notifications =====
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon =
    type === "success"
      ? '<i class="fa-solid fa-circle-check"></i>'
      : '<i class="fa-solid fa-circle-exclamation"></i>';
  toast.innerHTML = `${icon} ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    toast.addEventListener("animationend", () => toast.remove());
  }, 2500);
}

// ===== Validation =====
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

  if (!validateName(studentNameInput.value)) {
    showError(studentNameInput, "Please enter a valid name");
    isValid = false;
  } else {
    clearError(studentNameInput);
  }

  if (!validateId(studentIdInput.value)) {
    showError(studentIdInput, "Please enter a valid ID");
    isValid = false;
  } else {
    clearError(studentIdInput);
  }

  if (!validateEmail(studentEmailInput.value)) {
    showError(studentEmailInput, "Please enter a valid email");
    isValid = false;
  } else {
    clearError(studentEmailInput);
  }

  if (!validateGrade(parseInt(studentGradeInput.value))) {
    showError(studentGradeInput, "Grade must be between 0–100");
    isValid = false;
  } else {
    clearError(studentGradeInput);
  }

  return isValid;
}

// ===== Helpers =====
function getStatus(grade) {
  if (grade >= 70) return "passed";
  if (grade >= 50) return "average";
  return "failed";
}

function getGradeClass(grade) {
  if (grade >= 70) return "grade-high";
  if (grade >= 50) return "grade-mid";
  return "grade-low";
}

// ===== Update Stats Dashboard =====
function updateStats() {
  const total = students.length;
  const avg =
    total > 0
      ? Math.round(students.reduce((sum, s) => sum + s.grade, 0) / total)
      : 0;
  const passed = students.filter((s) => s.status === "passed").length;
  const failed = students.filter((s) => s.status === "failed").length;

  animateValue(statTotal, parseInt(statTotal.textContent) || 0, total);
  statAvg.textContent = avg + "%";
  animateValue(statPassed, parseInt(statPassed.textContent) || 0, passed);
  animateValue(statFailed, parseInt(statFailed.textContent) || 0, failed);
}

function animateValue(el, start, end) {
  if (start === end) return;
  const duration = 300;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(start + (end - start) * progress);
    el.textContent = el === statAvg ? value + "%" : value;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ===== Render Students =====
function renderStudents(filteredStudents = students) {
  if (filteredStudents.length === 0) {
    studentsTableBody.innerHTML = `
      <tr class="no-records">
        <td colspan="7">
          <div class="empty-state">
            <i class="fa-solid fa-user-graduate"></i>
            <p>No students found</p>
            <span>Try adjusting your filters or add a new student</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  studentsTableBody.innerHTML = "";
  filteredStudents.forEach((student, index) => {
    const statusText =
      student.status === "passed"
        ? "Passed"
        : student.status === "failed"
          ? "Failed"
          : "Average";

    const row = document.createElement("tr");
    row.style.animationDelay = `${index * 0.04}s`;
    row.innerHTML = `
      <td data-label="Name">${student.name}</td>
      <td data-label="ID">${student.id}</td>
      <td data-label="Email">${student.email}</td>
      <td data-label="Grade">
        <div class="grade-cell">
          <span>${student.grade}%</span>
          <div class="grade-bar">
            <div class="grade-bar-fill ${getGradeClass(student.grade)}" style="width: ${student.grade}%"></div>
          </div>
        </div>
      </td>
      <td data-label="Department">${student.department}</td>
      <td data-label="Status"><span class="status status-${student.status}">${statusText}</span></td>
      <td data-label="Action"><button class="action-btn" data-id="${student.id}" title="Delete"><i class="fa-solid fa-trash-can"></i></button></td>`;
    studentsTableBody.appendChild(row);
  });

  // Delete handlers
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      deleteStudent(this.getAttribute("data-id"));
    });
  });
}

// ===== Add Student =====
studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const newStudent = {
    id: studentIdInput.value.trim(),
    name: studentNameInput.value.trim(),
    email: studentEmailInput.value.trim(),
    grade: parseInt(studentGradeInput.value),
    department: studentDepartmentSelect.value,
    status: getStatus(parseInt(studentGradeInput.value)),
  };

  // Duplicate check
  if (
    students.find((s) => s.name.toLowerCase() === newStudent.name.toLowerCase())
  ) {
    showError(studentNameInput, "Student name already exists");
    showToast("Student name already exists", "error");
    return;
  }

  students.push(newStudent);
  applyFiltersAndSort();
  updateStats();
  studentForm.reset();
  showToast(`${newStudent.name} added successfully`);
});

// ===== Delete Student =====
function deleteStudent(studentId) {
  const student = students.find((s) => s.id === studentId);
  students = students.filter((s) => s.id !== studentId);
  applyFiltersAndSort();
  updateStats();
  if (student) showToast(`${student.name} removed`, "error");
}

// ===== Filter, Sort & Search =====
function applyFiltersAndSort() {
  let filtered = [...students];

  // Search
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.department.toLowerCase().includes(query),
    );
  }

  // Filter
  const filterValue = filterBySelect.value;
  if (filterValue === "passed") {
    filtered = filtered.filter((s) => s.status === "passed");
  } else if (filterValue === "failed") {
    filtered = filtered.filter((s) => s.status === "failed");
  }

  // Sort
  const sortValue = sortBySelect.value;
  if (sortValue === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "grade") {
    filtered.sort((a, b) => b.grade - a.grade);
  } else if (sortValue === "department") {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderStudents(filtered);
}

// ===== Event Listeners =====
sortBySelect.addEventListener("change", applyFiltersAndSort);
filterBySelect.addEventListener("change", applyFiltersAndSort);
searchInput.addEventListener("input", applyFiltersAndSort);

// Real-time validation
studentNameInput.addEventListener("input", function () {
  if (validateName(this.value)) clearError(this);
});
studentIdInput.addEventListener("input", function () {
  if (validateId(this.value)) clearError(this);
});
studentEmailInput.addEventListener("input", function () {
  if (validateEmail(this.value)) clearError(this);
});
studentGradeInput.addEventListener("input", function () {
  if (validateGrade(parseInt(this.value))) clearError(this);
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (theme === "light") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// ===== Init =====
renderStudents();
updateStats();
