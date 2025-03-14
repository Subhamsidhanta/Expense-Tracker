## Expense Tracker

A simple, responsive, and feature-rich expense tracking web application built with HTML, CSS, and JavaScript.

## Overview
Flow of Funds is a lightweight, user-friendly expense tracker designed to help you manage your daily and monthly spending. Whether you're budgeting for groceries, travel, or bills, this app provides a clean interface to log, edit, and analyze your expenses. With features like daily spending limits, monthly history, and a responsive design, it’s perfect for personal finance management on any device.

## Features
### Expense Management
- Add expenses with name, amount, category, and date.
- Edit or delete individual expenses with ease.
- Delete all expenses manually with a single button.

### Categories
- Predefined options: **Food, Travel, Shopping, Bills, Entertainment, Other**.

### Daily Spending Limit
- Highlights days in red if total spending exceeds **₹60**; otherwise, normal color.

### Monthly Insights
- Tracks total monthly spending in **Indian Rupees (₹)**.
- Shows the category with the highest spending.
- Resets expenses automatically on the last day of the month and stores the monthly total.

### Filtering & Sorting
- Sort expenses by **date, category, or amount (ascending/descending)**.

### Data Persistence
- Saves expenses and monthly history using **localStorage** for persistence across sessions.

### Responsive Design
- Adapts seamlessly to **desktop, tablet, and mobile screens**.

### Dark Mode
- Toggle between **light and dark themes** with smooth transitions.

### Animations
- Powered by **GSAP** for subtle, engaging load and update animations.

## Tech Stack
- **HTML5**: Structure and layout.
- **CSS3**: Styling with custom properties (`--vars`), media queries, and transitions.
- **JavaScript**: Core logic, DOM manipulation, and local storage.
- **GSAP**: Smooth animations for enhanced user experience.
- **Fonts**: Poppins (headings) and Inter (body) via Google Fonts.

## Installation
### Clone or Download
Clone the repository:
```bash
git clone https://github.com/Subhamsidhanta/flow-of-funds.git
```
Or download the ZIP file and extract it.

### Navigate to the Project Folder
```bash
cd flow-of-funds
```

### Open the Application
Open `index.html` in a web browser directly, or:

Use a local server (recommended for best performance):
```bash
npx live-server
```
(*Requires Node.js and npm installed.*)

## Dependencies
- No manual installation required! The project uses a CDN for GSAP:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  ```

## Usage
### Add an Expense
1. Fill in the **expense name, amount, category, and date** in the "Add Expense" form.
2. Click **"Add Expense"** to log it.

### View Daily Spending
- Check the **"Daily Spending"** list to see totals per day.
- Days exceeding **₹60** are highlighted in red.

### Manage Expenses
- **Edit or delete** individual expenses from the "All Expenses" list.
- Use the **"Delete All Expenses"** button to clear all current expenses.

### Filter Expenses
- Select a **filter type** (date, category, amount) and **sort ascending or descending**.

### Toggle Theme
- Click **"Dark Mode" / "Light Mode"** to switch themes.

### Monthly Reset
- On the **last day of the month**, expenses reset automatically, and the total is saved to history (**viewable in localStorage**).

## Project Structure
```
flow-of-funds/
├── index.html       # Main HTML file
├── styles.css       # Stylesheet with responsive design
├── script.js        # JavaScript logic and functionality
└── README.md        # Project documentation
```

## Screenshots
| Light Mode | Dark Mode |
|------------|----------|
| *(Insert Light Mode Screenshot)* | *(Insert Dark Mode Screenshot)* |

*(Replace placeholder links with actual screenshots by hosting images on a service like GitHub or Imgur.)*

## How It Works
- **Data Storage**: Expenses and monthly history are stored in **localStorage** as JSON.
- **Daily Limits**: JavaScript calculates daily totals and applies the over-limit class for days > **₹60**.
- **Monthly Reset**: Checks the date on load; if it’s the last day, saves the total and resets expenses.
- **Responsiveness**: CSS uses `clamp()`, **flexbox**, and **media queries** to adapt to screen sizes.
- **Animations**: **GSAP** handles entrance animations for a polished feel.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a **pull request** with a detailed description.

## Future Enhancements
- Display **monthly spending history** in the UI.
- Add **export/import functionality** for expenses.
- Implement **real-time notifications** for spending limits.
- Support **multiple currencies** beyond ₹.

## License
This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it as you see fit!

## Acknowledgments
- **GSAP**: For awesome animation capabilities.
- **Google Fonts**: For beautiful typography.
- **You**: For using and supporting this project!

---
Built with 💻 and ☕ by **Your Name** on **March 14, 2025**.
