# 🎓 StudentHub — Student Management System

A sleek, modern web app for managing student records — featuring a real-time dashboard, theme switching, search, toast notifications, and a fully responsive mobile-first design.

## 📸 Preview

![StudentHub Preview](mockup.png)

---

## ✨ Features

| Feature                 | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| **Dashboard Stats**     | Live counters for Total Students, Average Grade, Passed & Failed    |
| **Add Student**         | Form with real-time validation (name, ID, email, grade, department) |
| **Search**              | Instant search across name, ID, email, and department               |
| **Sort & Filter**       | Sort by name/grade/department · Filter by passed/failed             |
| **Grade Bars**          | Visual progress bars color-coded by performance                     |
| **Status Badges**       | Pill badges with dot indicators — Passed / Average / Failed         |
| **Delete Records**      | One-click removal with confirmation toast                           |
| **Dark / Light Theme**  | Toggle with persistence via `localStorage`                          |
| **Toast Notifications** | Slide-in alerts for add/delete actions                              |
| **Responsive Design**   | Optimized for mobile, tablet, laptop & desktop                      |
| **Mobile Card Layout**  | Table transforms into stacked cards on small screens                |

---

## 🎨 Design

### Color Palette — Green Theme

| Token      | Dark Mode             | Light Mode           |
| ---------- | --------------------- | -------------------- |
| Background | `#0a1210` deep forest | `#f0faf4` soft mint  |
| Cards      | `#142420` dark teal   | `#ffffff` white      |
| Accent     | `#22c55e` emerald     | `#16a34a` green      |
| Gradient   | `#22c55e → #86efac`   | `#16a34a → #4ade80`  |
| Text       | `#e8f5e9` mint white  | `#052e16` deep green |

### Status Colors

| Status     | Grade  | Color |
| ---------- | ------ | ----- |
| ✅ Passed  | ≥ 70%  | Green |
| ⚠️ Average | 50–69% | Amber |
| ❌ Failed  | < 50%  | Red   |

---

## 📱 Responsive Breakpoints

| Breakpoint    | Target           | Layout                               |
| ------------- | ---------------- | ------------------------------------ |
| `≥ 1440px`    | Large desktop    | Wide 2-column, bigger spacing        |
| `≤ 1279px`    | Laptop           | Tighter sidebar                      |
| `≤ 1024px`    | Tablet landscape | Single column, 2-col form grid       |
| `≤ 768px`     | Tablet portrait  | 2-col stats, full-width controls     |
| `≤ 640px`     | Mobile           | Stacked header, **card-based table** |
| `≤ 480px`     | Small mobile     | Compact stats & typography           |
| `≤ 360px`     | Mini mobile      | Single-column everything             |
| Touch devices | Phones & tablets | Larger tap targets, no hover effects |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, `@media` queries, animations
- **JavaScript (ES6+)** — DOM manipulation, `localStorage`, `requestAnimationFrame`
- **[Font Awesome 6.5](https://fontawesome.com/)** — Icon library
- **[Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)** — Typography

---

## 📦 Project Structure

```
Student-Management-System/
├── index.html      # App layout & structure
├── style.css       # Themes, responsive styles, animations
├── script.js       # Logic: CRUD, validation, search, theme toggle
├── mockup.png      # Project preview screenshot
└── README.md       # This file
```

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/masy43/Student-Management-System.git
   ```

2. **Open in browser**

   ```bash
   cd Student-Management-System
   start index.html       # Windows
   open index.html        # macOS
   xdg-open index.html    # Linux
   ```

   Or use **Live Server** in VS Code.

---

## 📖 Usage

### Add a Student

Fill in the form → click **+ Add Student** → record appears in the table with a success toast.

### Search

Type in the header search box — filters instantly across all fields.

### Sort & Filter

Use the dropdowns above the table to sort by Name/Grade/Department or filter by Passed/Failed.

### Switch Theme

Click the 🌙 / ☀️ button in the header. Your preference is saved.

### Delete

Click the 🗑️ button on any row — record is removed with a toast notification.

---

## 🔑 Key Functions

| Function                | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `renderStudents()`      | Renders table rows (or mobile cards) with grade bars |
| `validateForm()`        | Validates all inputs with inline error messages      |
| `applyFiltersAndSort()` | Combines search + filter + sort pipeline             |
| `updateStats()`         | Animates dashboard stat counters                     |
| `showToast()`           | Displays slide-in notifications                      |
| `setTheme()`            | Toggles dark/light theme with `localStorage`         |

---

## 📝 Future Enhancements

- [ ] `localStorage` data persistence
- [ ] Edit student records inline
- [ ] Export to CSV / PDF
- [ ] Grade analytics charts
- [ ] Backend API integration
- [ ] User authentication

---

## 📄 License

Created for educational purposes.

## 📧 Contact

For issues or questions: **01067051818**

---

**Created**: January 2026 · **Updated**: February 2026
**Version**: 2.0 · **Status**: Complete ✅
