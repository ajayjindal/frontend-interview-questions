const input = document.querySelector(".data-bind");
const paragraph = document.querySelector(".my-data");
const binder = twoWay(input);

function twoWay(element) {
    return {
        get value() {
            return element.value;
        },
        set value(data) {
            element.value = data;
        },
    };
}

input.addEventListener("keyup", () => {
    paragraph.innerHTML = binder.value;
});
