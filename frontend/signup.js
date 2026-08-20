
let img = document.querySelector("#img");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
submit.addEventListener("click", async function (e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (img.files.length === 0) {
        alert("upload picture please")
    } else if (name.value.trim() === "") {
        alert("please enter your fullname");
    } else if (email.value.trim() === "") {
        alert("please enter email");
    }
    else if (!emailRegex.test(email.value.trim())) {
        alert("please enter valid email address");
    }
    else if (password.value.trim() === "") {
        alert("please enter password");
    } else {
        try {
            const formData = new FormData();
            formData.append("img", img.files[0]);
            formData.append("name", name.value.trim());
            formData.append("email", email.value.trim());
            formData.append("password", password.value.trim());
            const req = await fetch("http://localhost:1000/signup", {
                method: "POST",
                body: formData
            });
            const data = await req.json();
            if (req.ok) {
                alert(data.message);
                document.querySelector("form").reset();
                window.location.href="./login.html"
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            console.log("something went wrong");


        }
    }


})