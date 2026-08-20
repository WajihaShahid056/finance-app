let email = document.querySelector("#email");
const password = document.querySelector("#password");
let submit = document.querySelector("#submit");
submit.addEventListener("click", async function (e) {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        alert("please enter email");
    }
    else if (!emailPattern.test(email.value.trim())) {
        alert("Please enter a valid email address");
    } else if (password.value.trim() === "") {
        alert("pleanse enter password");
    }
    else {
        try {
            const formValues = {
                email: email.value.trim(),
                password: password.value.trim()

            };
            const req = await fetch("http://localhost:1000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            });
            const data = await req.json();
            if (req.ok) {
                alert(data.message);
            document.querySelector("form").reset();
            window.location.href="./home.html"
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong");

        }

    }
}
);


