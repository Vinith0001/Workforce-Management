
// Mock data for request history
const mockRequests = [
    {
        id: 'REQ-001',
        project: 'Project Alpha',
        type: 'Access Request',
        date: '2024-01-15',
        status: 'approved'
    },
    {
        id: 'REQ-002',
        project: 'Project Beta',
        type: 'Bug Report',
        date: '2024-01-10',
        status: 'in-progress'
    },
    {
        id: 'REQ-003',
        project: 'Project Gamma',
        type: 'Deadline Extension',
        date: '2024-01-05',
        status: 'pending'
    },
    {
        id: 'REQ-004',
        project: 'Project Delta',
        type: 'Resource Request',
        date: '2023-12-28',
        status: 'rejected'
    },
    {
        id: 'REQ-005',
        project: 'Project Omega',
        type: 'Clarification',
        date: '2023-12-20',
        status: 'approved'
    }
];

// Global variables
let uploadedFiles = [];
let requestCounter = 6; // Starting from 6 since we have 5 mock requests

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    populateRequestHistory();
    updateSubmitButton();
});

function initializeEventListeners() {
    // Project selection
    const projectDropdown = document.getElementById('project-dropdown');
    projectDropdown.addEventListener('change', handleProjectChange);
    
    // Request type selection
    const requestTypeInputs = document.querySelectorAll('input[name="request-type"]');
    requestTypeInputs.forEach(input => {
        input.addEventListener('change', updateSubmitButton);
    });
    
    // Request details
    const requestDetails = document.getElementById('request-details');
    requestDetails.addEventListener('input', updateSubmitButton);
    
    // File upload functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Submit button
    const submitBtn = document.getElementById('submit-request');
    submitBtn.addEventListener('click', handleSubmitRequest);
    
    // History filter
    const statusFilter = document.getElementById('status-filter');
    statusFilter.addEventListener('change', filterRequests);
    
    // Modal functionality
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.getElementById('close-modal');
    const modalOk = document.getElementById('modal-ok');
    
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    modalOk.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Project selection functions
function handleProjectChange(e) {
    const selectedOption = e.target.selectedOptions[0];
    const projectIdInput = document.getElementById('project-id');
    
    if (selectedOption && selectedOption.dataset.id) {
        projectIdInput.value = selectedOption.dataset.id;
    } else {
        projectIdInput.value = '';
    }
    
    updateSubmitButton();
}

// File upload functions
function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('upload-area').classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    document.getElementById('upload-area').classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('upload-area').classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function processFiles(files) {
    const validFiles = files.filter(validateFile);
    
    validFiles.forEach(file => {
        const fileObj = {
            file: file,
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size
        };
        
        uploadedFiles.push(fileObj);
        addFileToUI(fileObj);
    });
    
    if (validFiles.length > 0) {
        showToast(`${validFiles.length} file(s) uploaded successfully!`);
    }
}

function validateFile(file) {
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'text/plain'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload PDF, DOCX, XLSX, PNG, JPG, or TXT files.', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showToast('File too large. Please upload files smaller than 5MB.', 'error');
        return false;
    }
    
    return true;
}

function addFileToUI(fileObj) {
    const uploadedFilesDiv = document.getElementById('uploaded-files');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.id = `file-${fileObj.id}`;
    
    fileItem.innerHTML = `
        <div class="file-info-group">
            <i class="fas fa-file-text file-icon"></i>
            <div class="file-details">
                <h4>${fileObj.name}</h4>
                <p>${(fileObj.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
        <button class="remove-btn" onclick="removeFile('${fileObj.id}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    uploadedFilesDiv.appendChild(fileItem);
}

function removeFile(fileId) {
    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
    const fileElement = document.getElementById(`file-${fileId}`);
    if (fileElement) {
        fileElement.remove();
    }
}

// Form validation and submission
function updateSubmitButton() {
    const project = document.getElementById('project-dropdown').value;
    const requestType = document.querySelector('input[name="request-type"]:checked');
    const requestDetails = document.getElementById('request-details').value.trim();
    const submitBtn = document.getElementById('submit-request');
    
    const isValid = project && requestType && requestDetails;
    submitBtn.disabled = !isValid;
}

function handleSubmitRequest() {
    const project = document.getElementById('project-dropdown').value;
    const projectText = document.getElementById('project-dropdown').selectedOptions[0].text;
    const requestType = document.querySelector('input[name="request-type"]:checked').value;
    const requestDetails = document.getElementById('request-details').value.trim();
    
    // Generate new request ID
    const newRequestId = `REQ-${String(requestCounter).padStart(3, '0')}`;
    requestCounter++;
    
    // Create new request object
    const newRequest = {
        id: newRequestId,
        project: projectText,
        type: formatRequestType(requestType),
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    
    // Add to mock data
    mockRequests.unshift(newRequest);
    
    // Show confirmation modal
    document.getElementById('new-request-id').textContent = newRequestId;
    document.getElementById('confirmation-modal').classList.add('show');
    
    // Reset form
    resetForm();
    
    // Refresh history table
    populateRequestHistory();
}

function formatRequestType(type) {
    return type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function resetForm() {
    document.getElementById('project-dropdown').value = '';
    document.getElementById('project-id').value = '';
    document.querySelectorAll('input[name="request-type"]').forEach(input => {
        input.checked = false;
    });
    document.getElementById('request-details').value = '';
    document.getElementById('file-input').value = '';
    
    // Clear uploaded files
    uploadedFiles = [];
    document.getElementById('uploaded-files').innerHTML = '';
    
    updateSubmitButton();
}

// History table functions
function populateRequestHistory() {
    const tbody = document.getElementById('history-tbody');
    tbody.innerHTML = '';
    
    mockRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${request.id}</strong></td>
            <td>${request.project}</td>
            <td>${request.type}</td>
            <td>${request.date}</td>
            <td><span class="status-badge ${request.status}">${capitalizeFirst(request.status)}</span></td>
            <td>
                <button class="action-btn" onclick="viewRequest('${request.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="downloadRequest('${request.id}')" title="Download">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterRequests() {
    const filterValue = document.getElementById('status-filter').value;
    const tbody = document.getElementById('history-tbody');
    const noRequests = document.getElementById('no-requests');
    
    let filteredRequests = mockRequests;
    if (filterValue !== 'all') {
        filteredRequests = mockRequests.filter(request => request.status === filterValue);
    }
    
    tbody.innerHTML = '';
    
    if (filteredRequests.length === 0) {
        noRequests.style.display = 'block';
    } else {
        noRequests.style.display = 'none';
        
        filteredRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${request.id}</strong></td>
                <td>${request.project}</td>
                <td>${request.type}</td>
                <td>${request.date}</td>
                <td><span class="status-badge ${request.status}">${capitalizeFirst(request.status)}</span></td>
                <td>
                    <button class="action-btn" onclick="viewRequest('${request.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="downloadRequest('${request.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function viewRequest(id) {
    const request = mockRequests.find(r => r.id === id);
    if (request) {
        showToast(`Viewing details for ${request.id}: ${request.type} - ${request.project}`);
    }
}

function downloadRequest(id) {
    const request = mockRequests.find(r => r.id === id);
    if (request) {
        showToast(`Downloading ${request.id} - ${request.type}`);
    }
}

// Utility functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function capitalizeFirst(str) {
    if (str === 'in-progress') {
        return 'In Progress';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
