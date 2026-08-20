const profileImg = document.querySelector("#profile-img");
const profileName = document.querySelector("#profile-name");
const profileEmail = document.querySelector("#profile-email");
const profileRole = document.querySelector("#profile-role");

async function profileDisplay() {
    const req = await fetch("/profile", {
        method: "GET"
    });

    const data = await req.json();
    profileName.textContent = data.name;
    profileEmail.textContent = data.email;
    profileImg.src = `/uploads/${data.img}`;
}

profileDisplay();