const type = document.querySelector("#type");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const description = document.querySelector("#description");
const save = document.querySelector("#save");
save.addEventListener("click", async function (e) {
    e.preventDefault();
    if (type.value === "") {
        alert("please select transaction type");
    } else if (amount.value.trim() === "") {
        alert("please add amount for your transaction");
    } else if (category.value === "") {
        alert("please select category");
    }
    else if (date.value === "") {
        alert("please select date");
    } else if (description.value.trim() === "") {
        alert("pleas enter description about your transaction");
    } else {
        try {
            const formValues = {
                type: type.value,
                amount: amount.value.trim(),
                category: category.value,
                date: date.value.trim(),
                description: description.value.trim()
            };
            const req = await fetch("http://localhost:1000/transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            });
            const data = await req.json();
            if (req.ok) {
                alert(data.message);
                window.location.href = "./transaction.html"

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }
})
