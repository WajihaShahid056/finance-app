const container = document.querySelector("#transaction-container");
const card = document.querySelector(".transaction-card");
async function transactionShow() {
    const req = await fetch("/transaction", {
        method: "GET",

    });
    if (req.status === 401) {
        alert("Your session has expired. Please login again.");
        window.location.href = "/login.html";
        return;
    }
    const data = await req.json();
    console.log("data", data);

    data.forEach((transaction, index) => {
        let currentCard;
        if (index === 0) {
            currentCard = card;
        } else {
            currentCard = card.cloneNode(true);
            container.appendChild(currentCard)
        };
        currentCard.querySelector(".category").textContent = transaction.category;
        currentCard.querySelector(".description").textContent = transaction.description;
        currentCard.querySelector(".date").textContent = transaction.date;
        currentCard.querySelector(".type").textContent = transaction.type;
        currentCard.querySelector(".amount").textContent = "Rs. " + transaction.amount;
        currentCard.querySelector(".edit-btn").onclick = function () {
            window.location.href = `./edittransaction.html?id=${transaction.id}`;
        };
        
        currentCard.querySelector(".delete-btn").onclick = async function () {
            const confirmDelete = confirm("are you sure you want to delete this transaction?");
            if (!confirmDelete) {
                return;
            }
            try {
                const req = await fetch(`/transaction/${transaction.id}`,
                    {
                        method: "DELETE"
                    }
                );
                if (req.status === 401) {
                    alert("Your session has expired. Please login again.");
                    window.location.href = "/login.html";
                    return;
                }
                const data = await req.json();
                console.log(data);
                
                if (req.ok) {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.log(error);
                alert("something went wrong");
             }
        };
    });
};



transactionShow();
