document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    // Sample holidays data (replace with your actual data)
    const holidays = [
        { name: "New Year's Day", date: new Date(currentDate.getFullYear(), 0, 1) },
        { name: "Independence Day", date: new Date(currentDate.getFullYear(), 6, 4) },
        { name: "Christmas Day", date: new Date(currentDate.getFullYear(), 11, 25) },
        // Add more holidays as needed
    ];
    
    renderCalendar(currentDate, holidays);
    
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate, holidays);
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate, holidays);
    });
});

function renderCalendar(date, holidays) {
    const monthYear = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendar');
    const holidaysTable = document.getElementById('holidaysTableBody');
    
    // Clear existing days (keeping day headers)
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }
    
    // Set month/year title
    monthYear.textContent = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
    }).format(date);
    
    // Get first day of month and total days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < startingDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days of month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
        
        dayElement.className = 'calendar-day';
        if (i === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            dayElement.classList.add('current-day');
        }
        
        dayElement.innerHTML = `<div class="day-number">${i}</div>`;
        
        // Check if this day is a holiday
        const dayHolidays = holidays.filter(holiday => 
            holiday.date.getDate() === i &&
            holiday.date.getMonth() === date.getMonth() &&
            holiday.date.getFullYear() === date.getFullYear()
        );
        
        if (dayHolidays.length > 0) {
            dayElement.innerHTML += `<div class="holiday-marker"></div>`;
            dayHolidays.forEach(holiday => {
                dayElement.innerHTML += `<div class="holiday-event">${holiday.name}</div>`;
            });
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Filter holidays for current month only
    const currentMonthHolidays = holidays.filter(holiday => 
        holiday.date.getMonth() === date.getMonth() &&
        holiday.date.getFullYear() === date.getFullYear()
    );
    
    // Populate holidays table with only current month's holidays
    holidaysTable.innerHTML = '';
    currentMonthHolidays.forEach(holiday => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${holiday.date.getDate()} ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(holiday.date)}</td>
            <td>${holiday.name}</td>
        `;
        holidaysTable.appendChild(row);
    });
    
    // Show message if no holidays this month
    if (currentMonthHolidays.length === 0) {
        holidaysTable.innerHTML = '<tr><td colspan="2">No holidays this month</td></tr>';
    }
}
// Leave Application Popup JS
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const leavePopup = document.querySelector('.leave-popup-overlay');
    const leaveForm = document.querySelector('.leave-application-container');
    const openLeavePopupButtons = document.querySelectorAll('.open-leave-popup');
    const closeLeavePopupButton = document.querySelector('.leave-cancel-btn');
    const submitLeaveButton = document.querySelector('.leave-submit-btn');
    
    // Form inputs
    const fromDateInput = document.querySelector('.leave-date-input:nth-of-type(1)');
    const toDateInput = document.querySelector('.leave-date-input:nth-of-type(2)');
    const descriptionInput = document.querySelector('.leave-description-input');

    // Function to open the popup
    function openLeavePopup() {
        leavePopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the popup
    function closeLeavePopup() {
        leavePopup.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Function to clear form values
    function clearLeaveForm() {
        fromDateInput.value = '';
        toDateInput.value = '';
        descriptionInput.value = '';
    }

    // Event listeners for opening the popup
    if (openLeavePopupButtons) {
        openLeavePopupButtons.forEach(button => {
            button.addEventListener('click', openLeavePopup);
        });
    }
    
    // Event listener for closing the popup
    if (closeLeavePopupButton) {
        closeLeavePopupButton.addEventListener('click', function() {
            closeLeavePopup();
            clearLeaveForm(); // Clear form when canceling
        });
    }
    
    // Close popup when clicking outside the form
    leavePopup.addEventListener('click', function(e) {
        if (e.target === leavePopup) {
            closeLeavePopup();
            clearLeaveForm(); // Clear form when clicking outside
        }
    });

    // Form submission handler
    if (submitLeaveButton) {
        submitLeaveButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const fromDate = fromDateInput.value;
            const toDate = toDateInput.value;
            const description = descriptionInput.value;
            
            // Basic validation
            if (!fromDate || !toDate) {
                alert('Please select both date ranges');
                return;
            }
            
            if (new Date(toDate) < new Date(fromDate)) {
                alert('End date must be after start date');
                return;
            }
            
            if (!description) {
                alert('Please enter a description');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Leave Application Submitted:', {
                fromDate,
                toDate,
                description
            });
            
            // Show success message
            alert('Leave application submitted successfully!');
            
            // Clear form values
            clearLeaveForm();
            
            // Close popup
            closeLeavePopup();
        });
    }
});
const leavePopup = document.querySelector('.leave-popup-overlay');
function applyleave(){
    leavePopup.style.display='flex'
}