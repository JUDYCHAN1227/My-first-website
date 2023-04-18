// Dynamically set the width of the carousel image display area and the position of the button area
window.onload = function () {
    // get ul list
    var imglist = document.getElementById('imglist');
    // get img
    var img = document.getElementsByTagName('img');
    // Dynamically set the width of ul to adapt to the dynamic increase and decrease of pictures
    imglist.style.width = img.length * 900 + "px";

    // set nav button in center
    var handler = document.getElementById("handler");

    //get the div in carousel
    var carousel = document.getElementById("carousel");

    // set the handler's left, to make sure a is in the center
    handler.style.left = (carousel.offsetWidth - handler.offsetWidth) / 2 + "px";


}

//set the index of picture
var index = 0;

// get a
var a = document.getElementsByTagName("a");

//default style
a[index].style.backgroundColor = "aquamarine";

//Bind click response functions for all hyperlinks
for (var i = 0; i < a.length; i++) {

    //add num attribute to hyerlinks
    为每一个超链接都添加一个num属性
    a[i].num = i;

    a[i].onclick = function () {

        //Turn off the timer for automatic switching
        clearInterval(timer);
        //Get the index of the clicked hyperlink and set it as index
        index = this.num;

        active();

        //use move function to switch picture
        move(imgList, "left", -900 * index, 45, function () {
            //设置自动切换
            autoChange();
        });
    };

}
function active() {
    //judge the current index is last picture or not 
    if (index >= img.length - 1) {
        // set index = 0
        index = 0;
        //switch last picture to the first one 通过CSS将最后一张切换成第一张
        imgList.style.left = 0;
    }
    // set the backgroundcolor of a 
    for (var i = 0; i < a.length; i++) {
        a[i].style.backgroundColor = "";
    }
    a[index].style.backgroundColor = "aquamarine";
};
function move(obj, direction, target, speed, callback) {
    //close the timer
    clearInterval(obj.timer);

    //get the position of current element
    var current = parseInt(getComputedStyle(obj, null)[direction]);

    //judge the speed is positive or negative
    if (current > target) {
        speed = -speed;
    }
    // start a timer
    obj.timer = setInterval(function () {

        //get the original left value of box1
        var oldValue = parseInt(getComputedStyle(obj, null)[direction]);
        var newValue = oldValue + speed;

        // move left-->newValue < target
        // move right--> newValue > target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        //set new value to box1 
        obj.style[direction] = newValue + "px";

        //
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
};
var timer;

function autoChange() {
    timer = setInterval(function () {
        index++;
        index %= img.length;
        move(imgList, "left", -900 * index, 45, function () {

            active();
        });
    }, 3000);
};
