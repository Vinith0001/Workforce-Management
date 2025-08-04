document.addEventListener('DOMContentLoaded', function() {
    // Profile popup toggle (keep existing)
    const userIcon = document.getElementById('user-icon');
    const profilePopup = document.getElementById('profilePopup');
    const closePopup = document.getElementById('closePopup');
    
    if (userIcon && profilePopup && closePopup) {
        userIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
        });
        
        closePopup.addEventListener('click', function() {
            profilePopup.style.display = 'none';
        });
        
        document.addEventListener('click', function(e) {
            if (!profilePopup.contains(e.target) && e.target !== userIcon) {
                profilePopup.style.display = 'none';
            }
        });
    }

    // Block/Unblock functionality with popup
    let currentBlockButton = null;
    let currentBlockRow = null;
    const blockPopup = document.querySelector('.block-popup');
    const popupTitle = document.querySelector('.head-popup h2');
    const popupInput = document.querySelector('.head-popup input');
    const confirmBlockBtn = document.querySelector('.block-popup .btn.block');
    
    // Click handler for block/unblock buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.block')) {
            e.preventDefault();
            currentBlockButton = e.target.closest('.block');
            currentBlockRow = e.target.closest('tr');
            const statusElement = currentBlockRow.querySelector('.blocked');
            
            // Update popup based on current status
            if (statusElement.textContent.trim() === "Blocked") {
                popupTitle.textContent = "Specify the Unblock Reason";
                confirmBlockBtn.innerHTML = '<i class="fas fa-unlock"></i> Unblock';
            } else {
                popupTitle.textContent = "Specify the Block Reason";
                confirmBlockBtn.innerHTML = '<i class="fas fa-ban"></i> Block';
            }
            
            // Clear previous input and show popup
            popupInput.value = '';
            blockPopup.style.display = 'flex';
        }
    });

    // Confirm action button in popup
    if (confirmBlockBtn) {
        confirmBlockBtn.addEventListener('click', function() {
            if (currentBlockButton && currentBlockRow) {
                const statusElement = currentBlockRow.querySelector('.blocked');
                const reason = popupInput.value.trim();
                
                if (reason === '') {
                    alert('Please enter a reason');
                    return;
                }
                
                if (statusElement.textContent.trim() === "Blocked") {
                    // Unblock action
                    statusElement.textContent = "Active";
                    currentBlockButton.style.backgroundColor = "#dc143c";
                    currentBlockButton.innerHTML = '<i class="fas fa-ban"></i> Block';
                } else {
                    // Block action
                    statusElement.textContent = "Blocked";
                    currentBlockButton.style.backgroundColor = "#2ecc71";
                    currentBlockButton.innerHTML = '<i class="fas fa-unlock"></i> Unblock';
                }
                
                // Here you would typically send the reason to your server
                console.log(`Action: ${statusElement.textContent}, Reason: ${reason}`);
                
                blockPopup.style.display = 'none';
            }
        });
    }

    // Cancel button in popup
    const cancelBtn = document.querySelector('.block-popup .btn.cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            blockPopup.style.display = 'none';
        });
    }

    // Close popup when clicking outside
    if (blockPopup) {
        blockPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchVal = this.value.toLowerCase();
            const rows = document.querySelectorAll('#leaveTableBody tr');
            
            rows.forEach(row => {
                const name = row.cells[2].textContent.toLowerCase();
                row.style.display = name.includes(searchVal) ? '' : 'none';
            });
        });
    }
});