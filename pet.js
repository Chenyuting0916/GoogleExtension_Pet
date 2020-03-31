chrome.runtime.onMessage.addListener(
    function (request) {
        switch (request.petName) {
            case "Chicken":
                petArray.push(new Pet('1-1', 6, 10));
                break;
            case "Bear":
                petArray.push(new Pet('2-1', 3, 10));
                break;
            case "Cat":
                petArray.push(new Pet('3-1', 3, 10));
                break;
            case "pet4":
                petArray.push(new Pet('4-1', 3, 10));
                break;
            case "pet5":
                petArray.push(new Pet('5-1', 3, 10));
                break;
            case "Capoo":
                petArray.push(new Pet('6-1', 3, 20));
                break;
        }
    });
//create object
var petArray = [];


function Pet(index, picNum, speed) {
    //object properties
    this.picIndex = index;
    this.picSpeed = speed;
    this.hp = 100;
    this.attack = 5;;
    this.friendlinessDegree = 0;
    this.image = document.createElement("img");
    this.image.src = chrome.extension.getURL("pet_image/" + this.picIndex + ".png");
    this.image.id = 'imgNo' + petArray.length;
    this.image.width = "200";
    this.image.style = "position:absolute;left:" + Math.ceil(Math.random() * (window.innerWidth - 200)) + "px; top:" + Math.ceil(Math.random() * (window.innerHeight - 200)) + "px;z-index: 99999;";
    document.getElementsByTagName("body")[0].appendChild(this.image);

    //object methods
    this.drag = function () {
        let dragSouce = document.querySelector('#imgNo' + petArray.length);
        let startX = 0;
        let startY = 0;

        dragSouce.addEventListener('mousedown', dragStart);

        function dragStart(e) {
            e.preventDefault();
            //記錄點擊相對被點擊物件的座標
            startX = e.clientX - dragSouce.offsetLeft;
            startY = e.clientY - dragSouce.offsetTop;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop);
        }
        function move(e) {
            //計算出拖曳物件最左上角座標
            x = e.clientX - startX;
            y = e.clientY - startY;
            dragSouce.style.left = x + 'px';
            dragSouce.style.top = y + 'px';
        }

        function stop() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stop)
        }
    }


    this.flag = 0;
    this.time = 0;
    this.update = function () {
        this.time++;

        if (this.time > this.picSpeed) {
            this.time = 0;
            if (this.flag >= picNum) this.flag = 0;
            this.flag++;
            this.picIndex = this.picIndex.substring(0, this.picIndex.length - 1);
            this.picIndex = this.picIndex + this.flag.toString();
            this.image.src = chrome.extension.getURL("pet_image/" + this.picIndex + ".png");
        }
    }

    //object action
    this.drag();
}

animate = function () {
    requestAnimationFrame(animate);
    for (var i = 0; i < petArray.length; i++) {
        petArray[i].update();
    }
}
animate();