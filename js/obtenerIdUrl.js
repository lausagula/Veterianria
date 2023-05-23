var elements = document.querySelectorAll(".option-select-menu");
var url = new URL(window.location.href);
var idUrl = url.searchParams.get("id");

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