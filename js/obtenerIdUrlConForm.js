var elementsIdUrl = document.querySelectorAll(".option-select-menu");
var form = document.querySelector("#formulario");
var url = new URL(window.location.href);
var idUrl = url.searchParams.get("id");
console.log(idUrl+" CASASDASDSACXC");

value = form.getAttribute("action");
form.setAttribute("action", value+"?id="+idUrl);
console.log("AAAAAA"+form.getAttribute("action"));

for (var i = 0; i < elementsIdUrl.length; i++) {
    value = elementsIdUrl[i].getAttribute("value");
    elementsIdUrl[i].setAttribute("value", value+"?id="+idUrl);
    console.log(elementsIdUrl[i].getAttribute("value"));
}

console.log("OTROSSSSSSSSSS");
elementsIdUrl = document.querySelectorAll(".option-menu");
for (var i = 0; i < elementsIdUrl.length; i++) {
    value = elementsIdUrl[i].getAttribute("href");
    elementsIdUrl[i].setAttribute("href", value+"?id="+idUrl);
    console.log(elementsIdUrl[i].getAttribute("href"));
}