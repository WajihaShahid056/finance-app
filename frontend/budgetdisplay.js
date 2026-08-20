const container = document.querySelector("#budget-container");
const card = document.querySelector(".budget-card");
async function budgetShow() {
    try {
        const req = await fetch("/budget", {
            method: "GET"
        });
        if (req.status === 401) {
            alert("Your session has expired. Please login again.");
            window.location.href = "./login.html";
            return;
        }
        const data = await req.json();
        if (data.length === 0) {
            card.remove();
            return;
        }
        data.forEach((budget, index) => {
            let currentCard;
            if (index === 0) {
                currentCard = card;
            } else {
                currentCard = card.cloneNode(true);
                container.appendChild(currentCard);
            }

            currentCard.querySelector(".budget").textContent = "Rs" + budget.amount;
            currentCard.querySelector(".month").textContent = budget.month;
            const deleteBtn = currentCard.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", async () => {
                const confirmDelete = confirm(
                    "Are you sure you want to delete this budget?"
                );
                if (!confirmDelete) {
                    return;
                }
                try {
                    const req = await fetch(`/budget/${budget.id}`,
                        {
                            method: "DELETE"
                        }
                    );
                    const result = await req.json();
                    if (req.status === 401) {
                        alert(result.message);
                        window.location.href = "./login.html";
                        return;
                    }
                    if (req.ok) {
                        alert(result.message);
                        currentCard.remove();
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong");
                }
            });
        });
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};
budgetShow();