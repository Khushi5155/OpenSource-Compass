let programs = [];

// Load JSON data
fetch("program.json")
    .then(res => res.json())
    .then(data => {
        programs = data;
        renderPrograms();
    });

function renderPrograms(filtered = programs) {
    const container = document.getElementById("programsContainer");
    container.innerHTML = filtered.map(p => `
        <div class="program-card" onclick="openModal(${p.id})">
            <div class="program-header">
                <h3>${p.name}</h3>
                <span class="program-status status-${p.status.toLowerCase()}">${p.status}</span>
            </div>
            <p>${p.description}</p>
            <div class="badge">${p.difficulty}</div>
        </div>
    `).join("");
}

function openModal(id) {
    const program = programs.find(p => p.id === id);
    document.getElementById("modalBody").innerHTML = `
        <h2>${program.name}</h2>
        <p>${program.description}</p>
        <h3>Issues</h3>
        <ul>${program.issues_list.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
    document.getElementById("programModal").style.display = "block";
}

function closeModal() {
    document.getElementById("programModal").style.display = "none";
}

/* Filters */
document.getElementById("difficultyFilter").addEventListener("change", filterPrograms);
document.getElementById("statusFilter").addEventListener("change", filterPrograms);
document.getElementById("searchBox").addEventListener("input", filterPrograms);

function filterPrograms() {
    const d = difficultyFilter.value;
    const s = statusFilter.value;
    const q = searchBox.value.toLowerCase();

    const filtered = programs.filter(p =>
        (!d || p.difficulty === d) &&
        (!s || p.status === s) &&
        (!q || p.name.toLowerCase().includes(q))
    );

    renderPrograms(filtered);
}
