# Student Management System

A modern, interactive web application for managing student records with real-time filtering, sorting, and validation.

## 🎯 Features

- **Add Student**: Create new student records with validation
- **View Records**: Display all students in a well-organized table
- **Delete Students**: Remove student records with a single click
- **Sort & Filter**:
  - Sort by Name, Grade, or Department
  - Filter by Passed/Failed status
- **Status Tracking**: Automatic status calculation based on grade
  - Passed (Grade ≥ 70)
  - Average (Grade 50-69)
  - Failed (Grade < 50)
- **Form Validation**: Real-time error checking for:
  - Student Name (required)
  - Student ID (required)
  - Email Address (valid format)
  - Grade (0-100)
- **Color-Coded Rows**:
  - Green (#1F5D56) for passed students with blur effect
  - Red (#9D3D44) for failed students with blur effect
  - Purple for average students
- **Responsive Design**: Optimized for single-page viewing without scrolling

## 📋 Table Structure

| Column     | Description               |
| ---------- | ------------------------- |
| Name       | Student's full name       |
| ID         | Unique student identifier |
| Email      | Student's email address   |
| Grade      | Percentage grade (0-100)  |
| Department | Department (SD, OS, EL)   |
| Status     | Pass/Fail/Average status  |
| Action     | Delete button             |

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with:
  - Flexbox layout
  - Gradient backgrounds
  - Backdrop blur effects
  - Smooth transitions
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event listeners
  - Array methods (filter, sort, find)
  - Form validation
- **Font Awesome**: Icon library for UI elements

## 📦 Project Structure

```
Student Management System/
├── index.html          # Main HTML file with form and table
├── style.css           # Stylesheet with themes and effects
├── script.js           # JavaScript logic and interactivity
└── README.md           # This file
```

## 🚀 How to Use

### 1. Add a Student

1. Fill in the form fields:
   - Enter student name
   - Enter student ID (e.g., STU001)
   - Enter email address
   - Enter grade (0-100)
   - Select department from dropdown
2. Click "+ Add Student" button
3. Form will validate automatically
4. Student will appear in the table

### 2. View Students

- All added students appear in the Student Records table
- Table shows all relevant information at a glance
- Color-coded background indicates student status

### 3. Sort Students

1. Use "Sort by" dropdown to select:
   - Name (alphabetical)
   - Grade (highest first)
   - Department (alphabetical)

### 4. Filter Students

1. Use "Filter by" dropdown to view:
   - Passed (grade ≥ 70)
   - Failed (grade < 50)

### 5. Delete a Student

- Click the trash icon (🗑️) in the Action column
- Student record will be removed immediately

## ✅ Form Validation

### Name Validation

- Required field
- Cannot be empty
- Error message displays if invalid

### ID Validation

- Required field
- Cannot be empty
- Error message displays if invalid

### Email Validation

- Must follow email format (example@domain.com)
- Standard email regex pattern used
- Real-time validation as you type

### Grade Validation

- Must be a number between 0-100
- Decimal values are accepted
- Error message displays if out of range

## 🎨 Color Scheme

### Status Colors

- **Passed**: `#1F5D56` (Dark Green) - 60% opacity with blur
- **Failed**: `#9D3D44` (Dark Red) - 60% opacity with blur
- **Average**: `#7c3aed` (Purple) - Subtle background

### Theme

- Dark mode with gradient background
- Primary Color: `#4f46e5` (Indigo)
- Secondary Color: `#8b5cf6` (Purple)
- Background: Dark Navy gradient
- Text: Light colors for contrast

## 📱 Responsive Design

The application is optimized for:

- Desktop displays
- Tablet screens
- Mobile devices (with single column layout)

Everything fits on a single page without horizontal or vertical scrolling.

## 🔒 Data Storage

**Note**: Student data is stored in browser memory only. Refreshing the page will clear all data. For persistent storage, integrate with a backend database.

## 🎓 Educational Purpose

This project demonstrates:

- DOM manipulation with JavaScript
- Form validation techniques
- Array filtering and sorting
- Event handling
- Modern CSS features
- Clean, readable code structure

## 📝 Future Enhancements

- [ ] Local storage for data persistence
- [ ] Export student data to CSV
- [ ] Search functionality
- [ ] Edit student records
- [ ] Advanced filtering options
- [ ] Grade statistics and analytics
- [ ] User authentication
- [ ] Backend API integration

## 👨‍💻 Development Notes

### Key JavaScript Functions

- `validateForm()` - Validates all form inputs
- `renderStudents()` - Renders student rows in table
- `applyFiltersAndSort()` - Applies filters and sorting
- `deleteStudent()` - Removes student from array
- `getStatus()` - Calculates pass/fail/average status

### CSS Classes

- `.row-passed` - Styling for passed student rows
- `.row-failed` - Styling for failed student rows
- `.row-average` - Styling for average student rows
- `.status` - Badge styling for status display

## 📄 License

This project is created for educational purposes in the DOM Lab.

## 📧 Contact & Support

For issues or questions, please contactUS: 01067051818

---

**Created**: January 2026  
**Version**: 1.0  
**Status**: Complete ✅

