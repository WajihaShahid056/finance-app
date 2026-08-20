let img = document.querySelector("#img");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
submit.addEventListener("click", async function (e) {
    e.preventDefault();
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (img.files.length === 0) {
        alert("upload new picture please")
    } else if (name.value.trim() === "") {
        alert("please enter your new fullname");
    } else if (email.value.trim() === "") {
        alert("please enter new email");
    }
    else if (!emailRegex.test(email.value.trim())) {
        alert("please enter new valid email address");
    }
    else if (password.value.trim() === "") {
        alert("please enter new password");
    } else{
        try {
            const formData = new FormData();
            formData.append("img", img.files[0]);
            formData.append("name", name.value.trim());
            formData.append("email", email.value.trim());
            formData.append("password", password.value.trim());
            const req = await fetch("http://localhost:1000/profile", {
                method: "PUT",
                body: formData
            });
            const data = await req.json();
            if (req.ok) {
                alert(data.message);
                document.querySelector("form").reset();
            window.location.href="./home.html"
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            console.log("something went wrong");


        }
    }
});