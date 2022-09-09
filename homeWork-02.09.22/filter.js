filter("all");
function filter(filter_item) {
    let filter_list;

    filter_list = document.getElementsByClassName("filter_list");
    if (filter_item == "all") {
        filter_item = "";
    } 
    for (let i = 0; i < filter_list.length; i++) {
        removeClass(filter_list[i], "show");
        if (filter_list[i].className.indexOf(filter_item) > -1) {
            addClass(filter_list[i], "show");
        } 
    }
}

function addClass(el, name) {
    let class_arr_1 = el.className.split(" "),
    class_arr_2 = name.split(" ");

    for (let i = 0; i < class_arr_2.length; i++) {
        if (class_arr_1.indexOf(class_arr_2[i]) == -1) {
            el.className += " " + class_arr_2[i];
        }
    }
}

function removeClass(el, name) {
    let class_arr_1 = el.className.split(" "),
    class_arr_2 = name.split(" ");

    for (let i = 0; i < class_arr_2.length; i++) {
        while (class_arr_1.indexOf(class_arr_2[i]) > -1) {
            class_arr_1.splice(class_arr_1.indexOf(class_arr_2[i]), 1);
        }
    }
    el.className = class_arr_1.join(" ");
}

let img_filter = document.getElementById("img_filter"),
    btns = img_filter.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        let cur = document.getElementsByClassName("active");

        cur[0].className = cur[0].className.replace(" active", "");
        this.className += " active";
    });
}