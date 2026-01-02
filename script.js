const adviceText = document.getElementById("advice-text");
const adviceBtn = document.getElementById("get-advice-btn");

adviceBtn.addEventListener("click", async () => {
    // Feedback pentru utilizator
    adviceText.textContent = "Se încarcă sfatul... ⏳";

    try {
        const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("Eroare la server");
        }

        const data = await response.json();
        adviceText.textContent = `"${data.slip.advice}"`; // afișează advice-ul

    } catch (error) {
        console.error(error);
        adviceText.textContent = "Ne pare rău, nu am putut obține un sfat. 😢";
    }
});
