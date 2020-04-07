//create new pet
chrome.runtime.onMessage.addListener(function (request) {
    chrome.storage.local.get(["Petname"], function (result) {
        let petType = request.petName;
        let nameobj = result.Petname == undefined ? undefined : JSON.parse(result.Petname);
        switch (petType) {
            case "Pisuke":
                var name =
                    nameobj == undefined || nameobj.Pisuke == ""
                        ? "Pisuke"
                        : nameobj.Pisuke;
                petArray.push(new Pet("1-1", 6, 6, 2, 10, name, petType, nameobj));
                break;
            case "Bear":
                var name =
                    nameobj == undefined || nameobj.Bear == "" ? "Bear" : nameobj.Bear;
                petArray.push(new Pet("2-1", 3, 3, 3, 10, name, petType, nameobj));
                break;
            case "Dragon":
                var name =
                    nameobj == undefined || nameobj.Dragon == "" ? "Dragon" : nameobj.Dragon;
                petArray.push(new Pet("3-1", 13, 3, 2, 15, name, petType, nameobj));
                break;
            case "Elizabeth":
                var name =
                    nameobj == undefined || nameobj.Elizabeth == ""
                        ? "Elizabeth"
                        : nameobj.Elizabeth;
                petArray.push(new Pet("4-1", 3, 3, 3, 10, name, petType, nameobj));
                break;
            case "pet5":
                var name =
                    nameobj == undefined || nameobj.pet5 == "" ? "5" : nameobj.pet5;
                petArray.push(new Pet("5-1", 3, 3, 3, 10, name, petType, nameobj));
                break;
            case "PinkBear":
                var name =
                    nameobj == undefined || nameobj.PinkBear == "" ? "PinkBear" : nameobj.PinkBear;
                petArray.push(new Pet("6-1", 3, 3, 3, 20, name, petType, nameobj));
                break;
        }
    });
});

var petArray = [];
function Pet(index, InitPicNum, bathPicNum, walkPicNum, speed, Petname, petType, petNameObj) {
    //object properties
    this.picNum = InitPicNum;
    this.picIndex = index;
    this.picSpeed = speed;
    this.hp = 100;
    this.attack = 5;
    this.friendlinessDegree = 0;
    this.petDiv = document.createElement("div");
    this.petDiv.id = "petNo" + petArray.length;
    //name and edit button
    this.nameDiv = document.createElement("div");
    this.nameDiv.style = "text-align:center;";
    this.nameDiv.id = "nameDiv" + petArray.length;
    this.nameLable = document.createElement("LABLE");
    this.nameLable.id = "petNameLable" + petArray.length;
    this.Content = document.createTextNode(Petname);
    this.editBtn = document.createElement("button");
    this.editBtn.className = "fas fa-pencil-alt";
    this.editBtn.id = "editBtn" + petArray.length;
    this.nameLable.appendChild(this.Content);
    this.nameDiv.appendChild(this.nameLable);
    this.nameDiv.appendChild(this.editBtn);
    //image
    this.imgDiv = document.createElement("div");
    this.imgDiv.style = "text-align:center;";
    this.image = document.createElement("img");
    this.image.src = chrome.extension.getURL(
        "pet_image/" + this.picIndex + ".png"
    );
    this.image.width = "200";
    this.image.className = "row";
    this.image.id = "imgNo" + petArray.length;
    this.imgDiv.appendChild(this.image);
    this.petDiv.appendChild(this.nameDiv);
    this.x = Math.ceil(Math.random() * (window.innerWidth - 200));
    this.y = Math.ceil(Math.random() * (window.innerHeight - 200));
    this.petDiv.style =
        "position:fixed;left:" +
        this.x +
        "px; top:" +
        this.y +
        "px;z-index: 99999;";
    //option
    this.functionDiv = document.createElement("div");
    this.functionDiv.id = "functionDiv" + petArray.length;
    this.openListBtn = document.createElement("button");
    this.openListBtn.className = "fas fa-list-alt";
    this.openListBtn.id = "openList" + petArray.length;
    this.openListBtn.style = "color: #339af0;";
    this.nameDiv.prepend(this.openListBtn);
    this.closeListBtn = document.createElement("button");
    this.closeListBtn.className = "fas fa-minus-circle";
    this.closeListBtn.style = "display:none; color: #339af0;";
    this.closeListBtn.id = 'closeList' + petArray.length;
    this.nameDiv.prepend(this.closeListBtn);
    this.feedingBtn = document.createElement("button");
    this.feedingBtn.className = "fas fa-utensils btn btn-info";
    this.feedingBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
    this.feedingBtn.id = "feeding" + petArray.length;
    this.functionDiv.appendChild(this.feedingBtn);
    this.batheBtn = document.createElement("button");
    this.batheBtn.className = "fas fa-shower btn btn-primary";
    this.batheBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
    this.batheBtn.id = "bathe" + petArray.length;
    this.functionDiv.appendChild(this.batheBtn);
    this.comeBackHomeBtn = document.createElement("button");
    this.comeBackHomeBtn.className = "fas fa-home btn btn-success";
    this.comeBackHomeBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
    this.comeBackHomeBtn.id = "comeBackHome" + petArray.length;
    this.functionDiv.appendChild(this.comeBackHomeBtn);
    this.breedBtn = document.createElement("button");
    this.breedBtn.className = "fas fa-heart btn btn-danger";
    this.breedBtn.style = "display:none; border-radius: 25px;";
    this.breedBtn.id = "breed" + petArray.length;
    this.functionDiv.appendChild(this.breedBtn);
    this.petDiv.appendChild(this.functionDiv);
    this.petDiv.appendChild(this.imgDiv);


    document.getElementsByTagName("body")[0].appendChild(this.petDiv);

    this.gravity = 0.15;
    this.gravitySpeed = 0;

    ifMouseDown = false;
    //object methods
    this.drag = function () {
        let dragSouce = document.querySelector("#petNo" + petArray.length);
        let startX = 0;
        let startY = 0;

        dragSouce.addEventListener("mousedown", dragStart);

        function dragStart(e) {
            e.preventDefault();
            //記錄點擊相對被點擊物件的座標
            startX = e.clientX - dragSouce.offsetLeft;
            startY = e.clientY - dragSouce.offsetTop;
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
            ifMouseDown = true;
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
            ifMouseDown = false;
        }
    };

    this.ChangePic = function () {
        if (this.time > this.picSpeed) {
            this.picSpeed += this.addPicSpeed;
            if (this.flag >= this.picNum) this.flag = 0;
            this.flag++;
            this.picIndex = this.picIndex.split('-', 1);
            this.picIndex = this.picIndex + "-" + this.flag.toString();
            this.image.src = chrome.extension.getURL(
                "pet_image/" + this.picIndex + ".png"
            );
        }
    }

    this.ResetAction = function () {
        if (this.picIndex.indexOf("walkright") !== -1) this.picIndex = this.picIndex.substr(9);
        if (this.picIndex.indexOf("walkleft") !== -1) this.picIndex = this.picIndex.substr(8);
        if (this.picIndex.indexOf("bath") !== -1) this.picIndex = this.picIndex.substr(4);
        if (this.picNum != InitPicNum) this.picNum = InitPicNum;
        this.action = Math.floor(Math.random() * 3); //0~2
        this.time = 0;
        this.picSpeed = this.addPicSpeed;
    }

    this.flag = 0;
    this.time = 0;
    this.action = Math.floor(Math.random() * 3); //0~2
    this.addPicSpeed = this.picSpeed;
    this.update = function () {
        this.time++;
        this.ChangePic();
        switch (this.action) {
            case 0: //Idle state
                break;
            case 1: //move right
                this.x += 2;
                this.petDiv.style.left = this.x + "px";
                if (this.x >= window.innerWidth - 200) this.x = 0;
                if (this.picIndex.indexOf("walkright") == -1) {
                    let newIndex = "walkright" + this.picIndex;
                    this.picIndex = newIndex;
                    this.picNum = walkPicNum;
                }
                break;
            case 2: //move left
                this.x -= 2;
                this.petDiv.style.left = this.x + "px";
                if (this.x <= 0) this.x = window.innerWidth - 200;
                if (this.picIndex.indexOf("walkleft") == -1) {
                    let newIndex = "walkleft" + this.picIndex;
                    this.picIndex = newIndex;
                    this.picNum = walkPicNum;
                }
                break;
            case 3: //bath
                if (this.picIndex.indexOf("bath") == -1) {
                    let newIndex = "bath" + this.picIndex;
                    this.picIndex = newIndex;
                    this.picNum = bathPicNum;
                }
                break;
        }
        //reset action
        if (this.time > 250) this.ResetAction();


        /*//add gravity
        if (this.y < window.innerHeight - 200) {
            this.gravitySpeed += this.gravity;
            this.y += this.gravitySpeed;
            this.petDiv.style.top = this.y + "px";
        }
        else if (this.y > parseInt(this.petDiv.style.top) && !ifMouseDown) {
            this.gravitySpeed = 0;
            this.y = parseInt(this.petDiv.style.top);
        }*/
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
            saveBtn.className = "fas fa-check";
            namediv.appendChild(saveBtn);

            saveBtn.addEventListener("click", displayNameLabel);
            function displayNameLabel(e) {
                var newpetNameObj = null;
                chrome.storage.local.get(["Petname"], function (result) {
                    var newpetNameObj = result.Petname == undefined ? undefined : JSON.parse(result.Petname);
                    saveBtn.style = "display:none;";
                    nameInput.style = "display:none;";
                    btnEdit.style = "display:inline ;";
                    nameLabel.style = "display:inline;";

                    var nameObject = newpetNameObj;
                    if (nameObject == undefined) {
                        nameObject = {
                            Pisuke: "",
                            Bear: "",
                            Dragon: "",
                            Elizabeth: "",
                            pet5: "",
                            PinkBear: ""
                        };
                    }
                    switch (petType) {
                        case "Pisuke":
                            nameObject.Pisuke = nameInput.value;
                            break;
                        case "Bear":
                            nameObject.Bear = nameInput.value;
                            break;
                        case "Dragon":
                            nameObject.Dragon = nameInput.value;
                            break;
                        case "Elizabeth":
                            nameObject.Elizabeth = nameInput.value;
                            break;
                        case "pet5":
                            nameObject.pet5 = nameInput.value;
                            break;
                        case "PinkBear":
                            nameObject.PinkBear = nameInput.value;
                            break;
                    }
                    chrome.storage.local.set(
                        { Petname: JSON.stringify(nameObject) },
                        function () {
                            nameLabel.innerHTML = nameInput.value;
                        }
                    );
                });

            }
        }
    };

    this.displayFunction = function () {
        let openListBtn = document.querySelector("#openList" + petArray.length);
        let closeListBtn = document.querySelector("#closeList" + petArray.length);
        let feedingBtn = document.querySelector("#feeding" + petArray.length);
        let batheBtn = document.querySelector("#bathe" + petArray.length);
        let comeBackHomeBtn = document.querySelector("#comeBackHome" + petArray.length);
        let breedBtn = document.querySelector("#breed" + petArray.length);
        let petFunctionDiv = document.querySelector("#functionDiv" + petArray.length);
        let petDiv = document.querySelector("#petNo" + petArray.length);
        //bathe
        $("#" + batheBtn.id).click(function (e) {
            $('.fa-shower').attr("disabled", true);
            pet = petArray[e.target.id.substr(5)];
            // newIndex = "bath" + pet.picIndex;
            // pet.picIndex = newIndex;
            pet.ResetAction();
            pet.action = 3;
            setTimeout(function () {
                // pet.picIndex = newIndex.substr(4);
                $('.fa-shower').attr("disabled", false);
            }, 4000);
        });
        //open list
        openListBtn.addEventListener("click", OpenFunctionList);
        function OpenFunctionList() {
            openListBtn.style = "display:none;";
            closeListBtn.style = "display:inline; color: #339af0;";
            feedingBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
            batheBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
            comeBackHomeBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
            breedBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
            petFunctionDiv.style = "text-align:center;margin-top: 10px;";
            //feed
            feedingBtn.addEventListener("click", Feeding);
            function Feeding() { };
            //come back home
            comeBackHomeBtn.addEventListener("click", ComeBackHome);
            function ComeBackHome() {
                $("#" + petDiv.id).hide();
            };
            //breed
            breedBtn.addEventListener("click", Breed);
            function Breed() {
            };
            //close list
            closeListBtn.addEventListener("click", CloseFunctionList);
            function CloseFunctionList(e) {
                openListBtn.style = "display:inline; color: #339af0;";
                (e.target).style = "display:none;";
                feedingBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
                batheBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
                comeBackHomeBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
                breedBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
                petFunctionDiv.style = "";
            };
        };
    };

    document.getElementsByTagName("head")[0].insertAdjacentHTML(
        "beforeend",
        "<link type=\"text/css\" rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css\" />");
    /*document.getElementsByTagName("head")[0].insertAdjacentHTML(
        "beforeend",
        "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\"/>");
    document.getElementsByTagName("body")[0].insertAdjacentHTML(
        "beforeend",
        "<script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script>");
    document.getElementsByTagName("body")[0].insertAdjacentHTML(
        "beforeend",
        "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\" integrity=\"sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1\" crossorigin=\"anonymous\"></script>");
    document.getElementsByTagName("body")[0].insertAdjacentHTML(
        "beforeend",
        "<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\" integrity=\"sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM\" crossorigin=\"anonymous\"></script>");
    */
    //object action
    this.drag();
    this.editPetName();
    this.displayFunction();
}

animate = function () {
    requestAnimationFrame(animate);
    petArray.forEach(pet => {
        pet.update();
    });
};
animate();
