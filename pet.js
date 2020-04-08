// chrome.storage.local.clear();
var petArray = [];
//create old pet
CreateOldPet = function () {
  chrome.storage.local.get(null, function (obj) {
    if (obj.petArray != null) {
      for (var i = 0; i < obj.petArray.length; i++) {
        petArray.push(
          new Pet(
            obj.petArray[i].picIndex,
            obj.petArray[i].picNum,
            obj.petArray[i].bathPicNum,
            obj.petArray[i].walkPicNum,
            obj.petArray[i].eatPicNum,
            obj.petArray[i].picSpeed,
            obj.petArray[i].petName,
            JSON.parse(obj.petLevel)[obj.petArray[i].petType],
            JSON.parse(obj.petExp)[obj.petArray[i].petType],
            obj.petArray[i].petType
          )
        );
      }
    }
  });
};
CreateOldPet();

//create new pet
chrome.runtime.onMessage.addListener(function (request) {
  chrome.storage.local.get(["Petname"], function (result) {
    chrome.storage.local.get(["petLevel"], function (levelresult) {
      chrome.storage.local.get(["petExp"], function (expresult) {
        let petType = request.petName;
        let nameobj =
          result.Petname == undefined ? undefined : JSON.parse(result.Petname);
        let levelObj =
          levelresult.petLevel == undefined
            ? undefined
            : JSON.parse(levelresult.petLevel);
        let expObj =
          expresult.petExp == undefined
            ? undefined
            : JSON.parse(expresult.petExp);
        if (levelObj == undefined) {
          levelObj = {
            Pisuke: 1,
            Bear: 1,
            Dragon: 1,
            Elizabeth: 1,
            pet5: 1,
            PinkBear: 1,
          };
          chrome.storage.local.set(
            { petLevel: JSON.stringify(levelObj) },
            function () { }
          );
        }
        if (expObj == undefined) {
          expObj = {
            Pisuke: 0,
            Bear: 0,
            Dragon: 0,
            Elizabeth: 0,
            pet5: 0,
            PinkBear: 0,
          };
        }
        chrome.storage.local.set(
          { petExp: JSON.stringify(expObj) },
          function () { }
        );
        switch (petType) {
          case "Pisuke":
            var name =
              nameobj == undefined || nameobj.Pisuke == ""
                ? "Pisuke"
                : nameobj.Pisuke;
            var level =
              levelObj == undefined || levelObj.Pisuke == ""
                ? 1
                : levelObj.Pisuke;
            var exp =
              expObj == undefined || expObj.Pisuke == "" ? 0 : expObj.Pisuke;
            petArray.push(
              new Pet("1-1", 6, 6, 2, 6, 10, name, level, exp, petType)
            );
            break;
          case "Bear":
            var name =
              nameobj == undefined || nameobj.Bear == ""
                ? "Bear"
                : nameobj.Bear;
            var level =
              levelObj == undefined || levelObj.Bear == "" ? 1 : levelObj.Bear;
            var exp =
              expObj == undefined || expObj.Bear == "" ? 0 : expObj.Bear;
            petArray.push(
              new Pet("2-1", 3, 3, 3, 3, 10, name, level, exp, petType)
            );
            break;
          case "Dragon":
            var name =
              nameobj == undefined || nameobj.Dragon == ""
                ? "Dragon"
                : nameobj.Dragon;
            var level =
              levelObj == undefined || levelObj.Dragon == ""
                ? 1
                : levelObj.Dragon;
            var exp =
              expObj == undefined || expObj.Dragon == "" ? 0 : expObj.Dragon;
            petArray.push(
              new Pet("3-1", 13, 3, 2, 0, 15, name, level, exp, petType)
            );
            break;
          case "Elizabeth":
            var name =
              nameobj == undefined || nameobj.Elizabeth == ""
                ? "Elizabeth"
                : nameobj.Elizabeth;
            var level =
              levelObj == undefined || levelObj.Elizabeth == ""
                ? 1
                : levelObj.Elizabeth;
            var exp =
              expObj == undefined || expObj.Elizabeth == ""
                ? 0
                : expObj.Elizabeth;
            petArray.push(
              new Pet("4-1", 3, 3, 3, 3, 10, name, level, exp, petType)
            );
            break;
          case "pet5":
            var name =
              nameobj == undefined || nameobj.pet5 == "" ? "5" : nameobj.pet5;
            var level =
              levelObj == undefined || levelObj.pet5 == "" ? 1 : levelObj.pet5;
            var exp =
              expObj == undefined || expObj.pet5 == "" ? 0 : expObj.pet5;
            petArray.push(
              new Pet("5-1", 3, 3, 3, 0, 10, name, level, exp, petType)
            );
            break;
          case "PinkBear":
            var name =
              nameobj == undefined || nameobj.PinkBear == ""
                ? "PinkBear"
                : nameobj.PinkBear;
            var level =
              levelObj == undefined || levelObj.PinkBear == ""
                ? 1
                : levelObj.PinkBear;
            var exp =
              expObj == undefined || expObj.PinkBear == ""
                ? 0
                : expObj.PinkBear;
            petArray.push(
              new Pet("6-1", 3, 3, 3, 4, 20, name, level, exp, petType)
            );
            break;
        }

        chrome.storage.local.set({ petArray }, function () { });
      });
    });
  });
});

var eatFrequency = [];
var isCount = true;
function Pet(
  index,
  InitPicNum,
  bathPicNum,
  walkPicNum,
  eatPicNum,
  speed,
  Petname,
  petLevel,
  petExp,
  petType
) {
  //object properties
  this.flag = 0;
  this.time = 0;
  this.action = Math.floor(Math.random() * 3); //0~2
  this.addPicSpeed = speed;
  this.InitPicNum = InitPicNum;
  this.petType = petType;
  this.petName = Petname;
  this.eatPicNum = eatPicNum;
  this.walkPicNum = walkPicNum;
  this.bathPicNum = bathPicNum;
  this.picNum = InitPicNum;
  this.picIndex = index;
  this.picSpeed = speed;
  this.hp = 100;
  this.level = petLevel;
  this.exp = petExp;
  this.attack = 5;
  this.friendlinessDegree = 0;
  this.petDiv = document.createElement("div");
  this.petDiv.id = "petNo" + petArray.length;
  //Level div
  this.levelDiv = document.createElement("div");
  this.levelDiv.style = "text-align:center;font-size:25px;";
  this.levelDiv.id = "levelDiv" + petArray.length;
  this.levelLable = document.createElement("B");
  this.levelLable.id = "petlevelLable" + petArray.length;
  this.levelContent = document.createTextNode("Lv. " + this.level);
  this.levelLable.appendChild(this.levelContent);
  //Exp div
  this.expDiv = document.createElement("div");
  this.expDiv.style = "text-align:center;font-size:20px;";
  this.expDiv.id = "expDiv" + petArray.length;
  this.expLable = document.createElement("B");
  this.expLable.id = "petexpLable" + petArray.length;
  this.expContent = document.createTextNode("Exp: " + this.exp + "/" + (this.level * 100 + 10));
  this.expLable.appendChild(this.expContent);
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
  this.levelDiv.appendChild(this.levelLable);
  this.expDiv.appendChild(this.expLable);
  this.petDiv.appendChild(this.levelDiv);
  this.petDiv.appendChild(this.expDiv);
  this.petDiv.appendChild(this.nameDiv);
  this.petDiv.appendChild(this.imgDiv);
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
  this.closeListBtn.id = "closeList" + petArray.length;
  this.nameDiv.prepend(this.closeListBtn);
  this.eatBtn = document.createElement("button");
  this.eatBtn.className = "fas fa-utensils btn btn-info";
  this.eatBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
  this.eatBtn.id = "eat" + petArray.length;
  this.functionDiv.appendChild(this.eatBtn);
  this.batheBtn = document.createElement("button");
  this.batheBtn.className = "fas fa-shower btn btn-primary";
  this.batheBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
  this.batheBtn.id = "bathe" + petArray.length;
  this.functionDiv.appendChild(this.batheBtn);
  this.comeBackHomeBtn = document.createElement("button");
  this.comeBackHomeBtn.className = "fas fa-home btn btn-success";
  this.comeBackHomeBtn.style =
    "display:none; margin-right: 5px;border-radius: 25px;";
  this.comeBackHomeBtn.id = "comeBackHome" + petArray.length;
  this.functionDiv.appendChild(this.comeBackHomeBtn);
  this.petDiv.appendChild(this.functionDiv);
  this.petDiv.appendChild(this.imgDiv);

  document.getElementsByTagName("body")[0].appendChild(this.petDiv);

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
      if (petArray[e.target.id.substr(5)] != undefined)
        pp = petArray[e.target.id.substr(5)];
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
      console.log(pp);
      pp.ResetAction();
      pp.action = 0;
      pp.x = x;
      pp.y = y;
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
      this.picIndex = this.picIndex.split("-", 1);
      this.picIndex = this.picIndex + "-" + this.flag.toString();
      this.image.src = chrome.extension.getURL(
        "pet_image/" + this.picIndex + ".png"
      );
    }
  };

  this.ResetAction = function () {
    if (this.picIndex.indexOf("walkright") !== -1)
      this.picIndex = this.picIndex.substr(9);
    if (this.picIndex.indexOf("walkleft") !== -1)
      this.picIndex = this.picIndex.substr(8);
    if (this.picIndex.indexOf("bath") !== -1)
      this.picIndex = this.picIndex.substr(4);
    if (this.picIndex.indexOf("eat") !== -1)
      this.picIndex = this.picIndex.substr(3);
    if (this.picNum != InitPicNum) this.picNum = this.InitPicNum;
    this.action = Math.floor(Math.random() * 3); //0~2
    this.time = 0;
    this.picSpeed = this.addPicSpeed;
  };


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
      case 4: //eat
        if (this.picIndex.indexOf("eat") == -1) {
          let newIndex = "eat" + this.picIndex;
          this.picIndex = newIndex;
          this.picNum = eatPicNum;
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
          var newpetNameObj =
            result.Petname == undefined
              ? undefined
              : JSON.parse(result.Petname);
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
              PinkBear: "",
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
    let eatBtn = document.querySelector("#eat" + petArray.length);
    let batheBtn = document.querySelector("#bathe" + petArray.length);
    let comeBackHomeBtn = document.querySelector(
      "#comeBackHome" + petArray.length
    );
    let petFunctionDiv = document.querySelector(
      "#functionDiv" + petArray.length
    );
    let petDiv = document.querySelector("#petNo" + petArray.length);
    let levelLableDom = document.querySelector(
      "#petlevelLable" + petArray.length
    );
    let expLableDom = document.querySelector("#petexpLable" + petArray.length);
    //eat
    $("#" + eatBtn.id).click(function (e) {
      isCount = true;
      $(".fa-utensils").attr("disabled", true);
      pet = petArray[e.target.id.substr(3)];
      pet.ResetAction();
      pet.action = 4;
      if (eatFrequency.length == 0) {
        var object = { ["petNo" + e.target.id.substr(3).toString()]: 1 };
        eatFrequency.push(object);
      } else {
        for (var i = 0; i < eatFrequency.length; i++) {
          if (
            Object.keys(eatFrequency[i])[0] ==
            "petNo" + e.target.id.substr(3).toString()
          ) {
            var frequency =
              eatFrequency[i]["petNo" + e.target.id.substr(3).toString()];
            eatFrequency[i]["petNo" + e.target.id.substr(3).toString()] =
              frequency + 1;
            if (
              eatFrequency[i]["petNo" + e.target.id.substr(3).toString()] % 3 ==
              0
            ) {
              var imgSrc = chrome.extension.getURL(
                "pet_image/" +
                "shit" +
                pet.picIndex.substring(0, 1).toString() +
                ".png"
              );
              $("#petNo" + e.target.id.substr(3).toString()).append(
                "<input type='image' src="+imgSrc+" style='width:30px' id='shit" + i +"' />"  
              );
              $("#shit"+i).click(function(e){
                $("#"+e.target.id).hide();
                expUp(levelLableDom, expLableDom, petType, 20);
              });
            }
            isCount = false;
            break;
          }
        }
        if (isCount) {
          var object = { ["petNo" + e.target.id.substr(3).toString()]: 1 };
          eatFrequency.push(object);
        }
      }
      setTimeout(function () {
        $(".fa-utensils").attr("disabled", false);
        expUp(levelLableDom, expLableDom, petType, 30);
      }, 4000);
    });
    //bathe
    $("#" + batheBtn.id).click(function (e) {
      $(".fa-shower").attr("disabled", true);
      pet = petArray[e.target.id.substr(5)];
      pet.ResetAction();
      pet.action = 3;
      setTimeout(function () {
        $(".fa-shower").attr("disabled", false);
        expUp(levelLableDom, expLableDom, petType, 30);
      }, 4000);
    });

    //open list
    openListBtn.addEventListener("click", OpenFunctionList);
    function OpenFunctionList() {
      openListBtn.style = "display:none;";
      closeListBtn.style = "display:inline; color: #339af0;";
      eatBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
      batheBtn.style = "display:inline; margin-right: 5px;border-radius: 25px;";
      comeBackHomeBtn.style =
        "display:inline; margin-right: 5px;border-radius: 25px;";
      petFunctionDiv.style = "text-align:center;margin-top: 10px;";

      //come back home
      comeBackHomeBtn.addEventListener("click", ComeBackHome);
      function ComeBackHome() {
        chrome.storage.local.get(null, function (obj) {
          obj.petArray.splice(petDiv.id.substr(5), 1);
        });
        petArray.splice(petDiv.id.substr(5), 1);
        chrome.storage.local.set({ petArray }, function () { });
        $("#" + petDiv.id).remove();
      }
      //close list
      closeListBtn.addEventListener("click", CloseFunctionList);
      function CloseFunctionList(e) {
        openListBtn.style = "display:inline; color: #339af0;";
        e.target.style = "display:none;";
        eatBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
        batheBtn.style = "display:none; margin-right: 5px;border-radius: 25px;";
        comeBackHomeBtn.style =
          "display:none; margin-right: 5px;border-radius: 25px;";
        petFunctionDiv.style = "";
      }
    }
  };
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML(
      "beforeend",
      '<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />'
    );
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
  this.displayFunction(petType);
  //this.ResetAction();
}

getLevel = function (petType) {
  chrome.storage.local.get(["petLevel"], function (result) {
    var allPetLevelObj =
      result.petLevel == undefined || result.petLevel == null
        ? undefined
        : JSON.parse(result.petLevel);
    if (allPetLevelObj == undefined) {
      allPetLevelObj = {
        Pisuke: 1,
        Bear: 1,
        Dragon: 1,
        Elizabeth: 1,
        pet5: 1,
        PinkBear: 1,
      };
    }
    switch (petType) {
      case "Pisuke":
        return allPetLevelObj.Pisuke;
        break;
      case "Bear":
        return allPetLevelObj.Bear;
        break;
      case "Dragon":
        return allPetLevelObj.Dragon;
        break;
      case "Elizabeth":
        return allPetLevelObj.Elizabeth;
        break;
      case "pet5":
        return allPetLevelObj.pet5;
        break;
      case "PinkBear":
        return allPetLevelObj.PinkBear;
        break;
    }
  });
};
levelUp = function (levelDom, expDom, petType, level) {
  chrome.storage.local.get(["petLevel"], function (result) {
    var levelObj =
      result.petLevel == undefined || result.petLevel == null
        ? undefined
        : JSON.parse(result.petLevel);
    if (levelObj == undefined) {
      levelObj = {
        Pisuke: 1,
        Bear: 1,
        Dragon: 1,
        Elizabeth: 1,
        pet5: 1,
        PinkBear: 1,
      };
    }
    switch (petType) {
      case "Pisuke":
        levelObj.Pisuke = level;
        break;
      case "Bear":
        levelObj.Bear = level;
        break;
      case "Dragon":
        levelObj.Dragon = level;
        break;
      case "Elizabeth":
        levelObj.Elizabeth = level;
        break;
      case "pet5":
        levelObj.pet5 = level;
        break;
      case "PinkBear":
        levelObj.PinkBear = level;
        break;
    }
    chrome.storage.local.set(
      { petLevel: JSON.stringify(levelObj) },
      function () {
        //升級顯示
        levelDom.innerHTML = "LV. " + levelObj[petType];
        //經驗歸零 歸零顯示
        chrome.storage.local.get(["petExp"], function (result) {
          var allPetExpObj =
            result.petExp == undefined || result.petExp == null
              ? undefined
              : JSON.parse(result.petExp);
          if (allPetExpObj == undefined) {
            allPetExpObj = {
              Pisuke: 0,
              Bear: 0,
              Dragon: 0,
              Elizabeth: 0,
              pet5: 0,
              PinkBear: 0,
            };
          }
          allPetExpObj[petType] = 0;
          chrome.storage.local.set(
            { petExp: JSON.stringify(allPetExpObj) },
            function () {
              expDom.innerHTML = "Exp: 0/" + (level * 100 + 10);
            }
          );
        });
      }
    );
  });
};
isLevelUp = function (levelDom, expDom, petType) {
  chrome.storage.local.get(["petExp"], function (Expresult) {
    chrome.storage.local.get(["petLevel"], function (Levelresult) {
      var allPetExpObj =
        Expresult.petExp == undefined || Expresult.petExp == null
          ? undefined
          : JSON.parse(Expresult.petExp);
      var allPetLevelObj =
        Levelresult.petLevel == undefined || Levelresult.petLevel == null
          ? undefined
          : JSON.parse(Levelresult.petLevel);
      var thisPetExp = allPetExpObj[petType];
      var thisPetLevel = allPetLevelObj[petType];
      var thisLevelNeedExp = thisPetLevel * 100 + 10;
      if (thisPetExp >= thisLevelNeedExp) {
        thisPetLevel = thisPetLevel + 1;
        levelUp(levelDom, expDom, petType, thisPetLevel);
      } else {
        expDom.innerHTML = "Exp: " + allPetExpObj[petType] + "/" + thisLevelNeedExp;
      }
    });
  });
};
getExp = function (petType) {
  chrome.storage.local.get(["petExp"], function (result) {
    var allPetExpObj =
      result.petExp == undefined || result.petExp == null
        ? undefined
        : JSON.parse(result.petExp);
    if (allPetExpObj == undefined) {
      allPetExpObj = {
        Pisuke: 0,
        Bear: 0,
        Dragon: 0,
        Elizabeth: 0,
        pet5: 0,
        PinkBear: 0,
      };
    }
    switch (petType) {
      case "Pisuke":
        return allPetExpObj.Pisuke;
        break;
      case "Bear":
        return allPetExpObj.Bear;
        break;
      case "Dragon":
        return allPetExpObj.Dragon;
        break;
      case "Elizabeth":
        return allPetExpObj.Elizabeth;
        break;
      case "pet5":
        return allPetExpObj.pet5;
        break;
      case "PinkBear":
        return allPetExpObj.PinkBear;
        break;
    }
  });
};
expUp = function (levelDom, expDom, petType, upExp) {
  chrome.storage.local.get(["petExp"], function (result) {
    var allPetExpObj =
      result.petExp == undefined || result.petExp == null
        ? undefined
        : JSON.parse(result.petExp);
    if (allPetExpObj == undefined) {
      allPetExpObj = {
        Pisuke: 0,
        Bear: 0,
        Dragon: 0,
        Elizabeth: 0,
        pet5: 0,
        PinkBear: 0,
      };
    }
    var thisPetExp = allPetExpObj[petType];
    allPetExpObj[petType] = thisPetExp + upExp;
    chrome.storage.local.set(
      { petExp: JSON.stringify(allPetExpObj) },
      function () {
        //改成經驗值的DOM
        //expDom.innerHTML = "Exp: " + allPetExpObj[petType];
        isLevelUp(levelDom, expDom, petType);
      }
    );
  });
};

animate = function () {
  requestAnimationFrame(animate);
  petArray.forEach((pet) => {
    pet.update();
  });
};
animate();