var elements = document.querySelectorAll(".option-select-menu");
var form = document.getElementById("formulario");
var url = new URL(window.location.href);
var idUrl = url.searchParams.get("id");
console.log(idUrl+" CASASDASDSACXC");

value = form.getAttribute("action");
form.setAttribute("action", value+"?id="+idUrl);
console.log("AAAAAA"+form.getAttribute("action"));

for (var i = 0; i < elements.length; i++) {
    value = elements[i].getAttribute("value");
    elements[i].setAttribute("value", value+"?id="+idUrl);
    console.log(elements[i].getAttribute("value"));
}

console.log("OTROSSSSSSSSSS");
elements = document.querySelectorAll(".option-menu");
for (var i = 0; i < elements.length; i++) {
    value = elements[i].getAttribute("href");
    elements[i].setAttribute("href", value+"?id="+idUrl);
    console.log(elements[i].getAttribute("href"));
}