
//create object
var petArray = [];
petArray.push(new Pet('2-1', 1));
petArray.push(new Pet('5-1', 3));
petArray.push(new Pet('4-1', 3));
petArray.push(new Pet('3-1', 3));

function Pet(index, picNum) {
    //object properties
    this.picIndex = index;
    this.hp = 100;
    this.attack = 5;;
    this.friendlinessDegree = 0;
    this.image = document.createElement("img");
    this.image.src = chrome.extension.getURL("pet_image/" + this.picIndex + ".png");
    this.image.id = 'imgNo' + index;
    this.image.width = "200";
    this.image.style = "position:absolute;left:" + Math.ceil(Math.random() * (window.innerWidth - 200)) + "px; top:" + Math.ceil(Math.random() * (window.innerHeight - 200)) + "px;";
    document.getElementsByTagName("body")[0].appendChild(this.image);

    //object methods
    this.drag = function () {
        let dragSouce = document.querySelector('#imgNo' + index);
        let startX = 0;
        let startY = 0;

        dragSouce.addEventListener('mousedown', dragStart);
        console.log(dragSouce);

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

        if (this.time > 20) {
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