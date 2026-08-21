const month=document.querySelector("#month");
const budget=document.querySelector("#budget");
const save = document.querySelector("#save");
save.addEventListener("click", async function (e) {
    e.preventDefault();
    if (month.value.trim() === "") {
        alert("please select month");
    } else if (budget.value.trim() === "") {
        alert("please add amount for your budget");
    } else {
        try {
            const formValues = {
              month:month.value.trim(),
              budget:budget.value.trim()
            };
            const req = await fetch("/budget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            });
            const data = await req.json();
            console.log("data",data);
            
            if (req.ok) {
                alert(data.message);
                window.location.href = "./budget.html"

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }
})
