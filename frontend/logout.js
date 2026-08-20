const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", async () => {
    console.log("clicked");
    const confirmLogout = confirm("are you sure you want to logout?");
    if (!confirmLogout) {
        return;
    }
    const response = await fetch("/logout", {
        method: "POST"
    });
    const data = await response.json();
    if (response.ok) {
        window.location.href = "/intro.html";
    } else {
        alert(data.message);
    }
});