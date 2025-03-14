// Load data from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let monthlyHistory = JSON.parse(localStorage.getItem('monthlyHistory')) || {};
let lastReset = localStorage.getItem('lastReset') || null;
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Function to get current month in YYYY-MM format
function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Function to check if it's the last day of the month
function isLastDayOfMonth() {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return now.getDate() === lastDay;
}

// Check and reset expenses at month end
function checkAndResetExpenses() {
  const currentMonth = getCurrentMonth();
  if (isLastDayOfMonth() && lastReset !== currentMonth) {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    monthlyHistory[currentMonth] = total.toFixed(2);
    localStorage.setItem('monthlyHistory', JSON.stringify(monthlyHistory));
    
    expenses = [];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('lastReset', currentMonth);
    lastReset = currentMonth;
  }
}

// Set date input to today
function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').value = today;
}

// Apply initial theme
if (isDarkMode) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('themeToggle').textContent = 'Light Mode';
} else {
  document.documentElement.removeAttribute('data-theme');
  document.getElementById('themeToggle').textContent = 'Dark Mode';
}

// GSAP animations on page load
gsap.from('.header', { duration: 1, y: -50, opacity: 0, ease: 'power2.out' });
gsap.from('.form-container', { duration: 1, x: -100, opacity: 0, delay: 0.2, ease: 'power2.out' });
gsap.from('.filter-container', { duration: 1, x: -100, opacity: 0, delay: 0.3, ease: 'power2.out' });
gsap.from('.insights', { duration: 1, x: 100, opacity: 0, delay: 0.4, ease: 'power2.out' });

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('themeToggle').textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('themeToggle').textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// Form submission
document.getElementById('expenseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  const expense = { id: Date.now(), name, amount, category, date };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  updateInsights();
  gsap.from('.insights', { duration: 0.5, scale: 0.95, ease: 'bounce.out' });

  e.target.reset();
  setTodayDate();
});

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateInsights();
}

// Edit expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  document.getElementById('name').value = expense.name;
  document.getElementById('amount').value = expense.amount;
  document.getElementById('category').value = expense.category;
  document.getElementById('date').value = expense.date;

  deleteExpense(id);
}

// Delete all expenses
document.getElementById('deleteAll').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all expenses?')) {
    expenses = [];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateInsights();
  }
});

// Filter expenses
document.getElementById('sortAsc').addEventListener('click', () => sortExpenses('asc'));
document.getElementById('sortDesc').addEventListener('click', () => sortExpenses('desc'));

function sortExpenses(direction) {
  const filterType = document.getElementById('filterType').value;
  expenses.sort((a, b) => {
    if (filterType === 'date') return direction === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    if (filterType === 'category') return direction === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
    if (filterType === 'amount') return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    return 0;
  });
  updateInsights();
}

// Update insights dashboard
function updateInsights() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById('total').textContent = `₹${total.toFixed(2)}`;

  // Daily spending summary
  const dailySpending = expenses.reduce((acc, exp) => {
    acc[exp.date] = (acc[exp.date] || 0) + exp.amount;
    return acc;
  }, {});

  const dailyList = document.getElementById('dailyList');
  dailyList.innerHTML = '';
  Object.entries(dailySpending).forEach(([date, amount]) => {
    const li = document.createElement('li');
    li.className = amount > 60 ? 'over-limit' : '';
    li.innerHTML = `<span>${date}</span><span>₹${amount.toFixed(2)}</span>`;
    dailyList.appendChild(li);
    gsap.from(li, { duration: 0.5, opacity: 0, y: 20, ease: 'power2.out' });
  });

  // All expenses list
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';
  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${exp.name}</span>
      <span>${exp.category}</span>
      <span>₹${exp.amount.toFixed(2)}</span>
      <span>${exp.date}</span>
      <button onclick="editExpense(${exp.id})">Edit</button>
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    expenseList.appendChild(li);
    gsap.from(li, { duration: 0.5, opacity: 0, y: 20, ease: 'power2.out' });
  });

  const maxCategory = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {})
  ).reduce((a, b) => (a[1] > b[1] ? a : b), ['', 0]);
  const insight = maxCategory[0]
    ? `You spent the most on ${maxCategory[0]} (₹${maxCategory[1].toFixed(2)}).`
    : 'Add some expenses to see insights!';
  document.getElementById('insight').textContent = insight;
}

// Initialize
checkAndResetExpenses();
setTodayDate();
updateInsights();