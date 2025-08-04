
  const tasks = [
    { name: "Submit Report", deadline: "2025-07-10", status: "Not Started" }
  ];
  let currentTask = null;
  let uploadTime = null;

  function renderTasks() {
    const tbody = document.getElementById("task-table-body");
    tbody.innerHTML = "";
    tasks.forEach((task, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${task.name}</td>
        <td>${task.deadline}</td>
        <td><span class="badge">${task.status}</span></td>
        <td><button class="blue" onclick="startTask(${i})">Start</button></td>`;
      tbody.appendChild(tr);
    });
  }
  renderTasks();

  function startTask(index) {
    currentTask = tasks[index];
    currentTask.status = "Pending";
    showUploadSection();
    showToast("Task Started");
    updateStatusTracker();
    renderTasks();
  }

  function showUploadSection() {
    document.getElementById("upload-section").classList.remove("hidden");
  }

  const fileInput = document.getElementById("file-input");
  const fileNameDisplay = document.getElementById("file-name");
  const uploadBtn = document.getElementById("upload-btn");
  const completeBtn = document.getElementById("complete-btn");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      fileNameDisplay.textContent = file.name;
      uploadBtn.disabled = false;
    }
  });

  uploadBtn.addEventListener("click", () => {
    uploadTime = new Date().toLocaleString();
    document.getElementById("upload-time").textContent = "Uploaded at: " + uploadTime;
    completeBtn.disabled = false;
    document.getElementById("upload-status").textContent = "Yes";
    showToast("Document Uploaded");
    updateProgress(70);
  });

  completeBtn.addEventListener("click", () => {
    currentTask.status = "Completed";
    showToast("Task marked as completed and sent to Admin for review.");
    updateProgress(100);
    document.getElementById("upload-section").classList.add("hidden");
    addToHistory(currentTask.name, "Completed", new Date().toLocaleDateString(), uploadTime);
    renderTasks();
  });

  function updateProgress(val) {
    document.getElementById("progress").style.width = `${val}%`;
  }

  function updateStatusTracker() {
    const timeLeft = "1h 30m";
    document.getElementById("time-left").textContent = timeLeft;
    document.getElementById("upload-status").textContent = "No";
    updateProgress(30);
  }

  function addToHistory(title, status, start, submitted) {
    const tbody = document.getElementById("history-table-body");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${title}</td>
      <td>${status}</td>
      <td>${start}</td>
      <td>${submitted}</td>
      <td><button>🔍 View</button></td>`;
    tbody.appendChild(tr);
  }

  function showToast(msg) {
    const toast = document.getElementById("notification");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }

document.querySelectorAll('.start').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    disableActions(row);
    
    showToast('Task Started ✅');
  });
});

document.querySelectorAll('.completed').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    disableActions(row);
    showToast("Task Started");
  });
});

function disableActions(row) {
  row.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = 0.5;
    btn.style.cursor = 'not-allowed';
  });
}