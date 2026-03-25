export function setupDropdownMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("dropdown-menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}