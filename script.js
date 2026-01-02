const adviceText = document.getElementById("advice-text");
const adviceBtn = document.getElementById("get-advice-btn");
const adviceBadge = document.getElementById("advice-badge");
const adviceTableBody = document.querySelector("#advice-metadata tbody");

// Funcție pentru generarea unui badge aleatoriu
function getRandomBadge() {
    const badges = ["✨", "💡", "🌟", "🌀", "🔥", "🎯"];
    return badges[Math.floor(Math.random() * badges.length)];
}

// Funcție pentru generarea unei culori aleatorii pentru badge
function getRandomColor() {
    const colors = ["#f6a5c0", "#a5d8ff", "#ffd6a5", "#c8ffa5", "#ffa5d8"];
    return colors[Math.floor(Math.random() * colors.length)];
}

adviceBtn.addEventListener("click", async () => {
    // Feedback utilizator
    adviceText.textContent = "Se încarcă sfatul... ⏳";
    adviceBadge.textContent = "⏳";
    adviceBadge.style.backgroundColor = "#ccc";

    try {
        const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-cache" });
        if (!response.ok) throw new Error("Eroare la server");

        const data = await response.json();
        const slip = data.slip;

        // Textul sfatului
        adviceText.textContent = `"${slip.advice}"`;

        // Badge vizual
        adviceBadge.textContent = getRandomBadge();
        adviceBadge.style.backgroundColor = getRandomColor();

        // Popularea tabelului cu metadate
        adviceTableBody.innerHTML = `
            <tr>
                <td>${slip.id}</td>
                <td>${slip.advice.length} caractere</td>
                <td>Success ✅</td>
            </tr>
        `;
    } catch (error) {
        console.error(error);
        adviceText.textContent = "Ne pare rău, nu am putut obține un sfat. 😢";
        adviceBadge.textContent = "❌";
        adviceBadge.style.backgroundColor = "#f8a5a5";
        adviceTableBody.innerHTML = `
            <tr>
                <td>-</td>
                <td>-</td>
                <td>Eroare ❌</td>
            </tr>
        `;
    }
});
