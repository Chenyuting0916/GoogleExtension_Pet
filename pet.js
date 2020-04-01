chrome.runtime.onMessage.addListener(function (request) {
    chrome.storage.local.get(['Petname'], function (result) {
        let petName = request.petName;
        let Name;
        if(result.Petname != null){
            Name = result.Petname;
        }else{
            Name = petName;
        }
        switch (petName) {
            case "Pisuke":
                petArray.push(new Pet("1-1", 6, 10, Name));
                break;
            case "Bear":
                petArray.push(new Pet("2-1", 3, 10, Name));
                break;
            case "Cat":
                petArray.push(new Pet("3-1", 3, 10, Name));
                break;
            case "Elizabeth":
                petArray.push(new Pet("4-1", 3, 10, Name));
                break;
            case "pet5":
                petArray.push(new Pet("5-1", 3, 10, Name));
                break;
            case "Capoo":
                petArray.push(new Pet("6-1", 3, 20, Name));
                break;
        }
    });
});
//create object
var petArray = [];

function Pet(index, picNum, speed, Petname) {
    //object properties
    this.picIndex = index;
    this.picSpeed = speed;
    this.hp = 100;
    this.attack = 5;
    this.friendlinessDegree = 0;
    this.petDiv = document.createElement("div");
    this.petDiv.id = "imgNo" + petArray.length;
    this.nameDiv = document.createElement("div");
    this.nameDiv.style = "text-align:center;";
    this.nameDiv.id = "nameDiv" + petArray.length;
    this.nameLable = document.createElement("LABLE");
    this.nameLable.id = "petNameLable" + petArray.length;
    this.Content = document.createTextNode(Petname);
    this.editBtn = document.createElement("BUTTON");
    this.editBtn.className = "btn btn-info";
    this.editBtn.id = "editBtn" + petArray.length;
    this.btnContent = document.createTextNode("Edit");
    this.editBtn.appendChild(this.btnContent);
    this.nameLable.appendChild(this.Content);
    this.nameDiv.appendChild(this.nameLable);
    this.nameDiv.appendChild(this.editBtn);
    this.image = document.createElement("img");
    this.image.src = chrome.extension.getURL(
        "pet_image/" + this.picIndex + ".png"
    );
    this.image.width = "200";
    this.image.className = "row";
    this.petDiv.appendChild(this.nameDiv);
    this.petDiv.appendChild(this.image);
    this.petDiv.style =
        "position:fixed;left:" +
        Math.ceil(Math.random() * (window.innerWidth - 200)) +
        "px; top:" +
        Math.ceil(Math.random() * (window.innerHeight - 200)) +
        "px;z-index: 99999;";
    document.getElementsByTagName("body")[0].appendChild(this.petDiv);

    //object methods
    this.drag = function () {
        let dragSouce = document.querySelector("#imgNo" + petArray.length);
        let startX = 0;
        let startY = 0;

        dragSouce.addEventListener('mousedown', dragStart);

        function dragStart(e) {
            e.preventDefault();
            //記錄點擊相對被點擊物件的座標
            startX = e.clientX - dragSouce.offsetLeft;
            startY = e.clientY - dragSouce.offsetTop;
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
        }
        function move(e) {
            //計算出拖曳物件最左上角座標
            x = e.clientX - startX;
            y = e.clientY - startY;
            dragSouce.style.left = x + "px";
            dragSouce.style.top = y + "px";
        }

        function stop() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
        }
    };

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
            this.image.src = chrome.extension.getURL(
                "pet_image/" + this.picIndex + ".png"
            );
        }
    };
    this.editPetName = function () {
        let btnEdit = document.querySelector("#editBtn" + petArray.length);
        let nameLabel = document.querySelector("#petNameLable" + petArray.length);
        let namediv = document.querySelector("#nameDiv" + petArray.length);
        btnEdit.addEventListener("click", editNameLabel);
        function editNameLabel() {
            btnEdit.style = "display:none;";
            nameLabel.style = "display:none;";
            nameInput = document.createElement("input");
            nameInput.setAttribute("type", "text");
            nameInput.setAttribute("value", Petname);
            namediv.appendChild(nameInput);
            nameInput.focus();
            saveBtn = document.createElement("button");
            saveBtn.className = "btn btn-info";
            saveContent = document.createTextNode("Save");
            saveBtn.appendChild(saveContent);
            namediv.appendChild(saveBtn);

            saveBtn.addEventListener("click", displayNameLabel);
            function displayNameLabel() {
                saveBtn.style = "display:none;";
                nameInput.style = "display:none;";
                btnEdit.style = "display:inline ;";
                nameLabel.style = "display:inline;";
                //nameLabel.innerHTML = nameInput.value;
                //Petname = nameInput.value;
                chrome.storage.local.set({ 'Petname': nameInput.value }, function () {
                    nameLabel.innerHTML = nameInput.value;
                });
            }
        }
    };

    //object action
    this.drag();
    this.editPetName();
}

animate = function () {
    requestAnimationFrame(animate);
    for (var i = 0; i < petArray.length; i++) {
        petArray[i].update();
    }
};
animate();
