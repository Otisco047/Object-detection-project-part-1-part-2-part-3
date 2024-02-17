status = "";
img = "";
obj = [];
my_pic = "";
pic_status = false;

function preload() {
    if (pic_status == true) {
        img = loadImage(my_pic);
    }
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    o_d = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    if (pic_status == true) {
        image(img, 0, 0, 380, 380);
    }
    if (status != "") {
        for (i = 0; i < obj.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("n_o_b").innerHTML = "Number:of objects detected" + obj.length;
            r = random(255);
            g = random(255);
            b = random(255);
            obj_name = obj[i].label;
            obj_con = floor(obj[i].confidence * 100);
            obj_x = obj[i].x;
            obj_y = obj[i].y;
            obj_width = obj[i].width;
            obj_height = obj[i].height;
            fill(r, g, b);
            textSize(25);
            text(obj_name + " " + obj_con + "%", obj_x + 20, obj_y + 20)
            noFill();
            stroke(r, g, b);
            rect(obj_x, obj_y, obj_width, obj_height);
        }
    }
}

function modelLoaded() {
    status = true;
    document.getElementById("status").innerHTML = "Status : object detection started";
    o_d.detect(img, getResults);
}

function getResults(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        obj = r;
    }
}

function loadPic(pic) {
    my_pic = pic;
    pic_status = true;
}