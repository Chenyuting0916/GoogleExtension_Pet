debugger;

var pet;
var petName;
//Images
var petLeft; //per pet
var petLeftZ; //per pet
var petRight; //per pet
var petRightZ; //per pet

//GLOBAL VARIABLES
var freeView = true; //per pet
var lookRight = false; //per pet
var lookLeft = false; //per pet
var laserEnabled = false; //per pet
var followOptions; //per pet

//Speed Variables
var clickSpeed = 2000;  //per pet
var followSpeed = 2000; //per pet
var laserSpeed = 1000; //per pet
var petDelay = 1000; //per pet

initializeImg = true;

Start();

function Start() {

    //ASK FOR CHECKBOX VALUE ---ONE TIME WHEN INITIALIZED ONLY- BACKGROUND.JS
    chrome.extension.sendMessage({ directive: "get-state" }, function (response) {
        followOptions = response.followOptions;
    });

    chrome.extension.sendMessage({ directive: "getPet" }, function (response) {

        //if pet exists delete
        if ($("#" + response.currentPet).length) {
            $("#" + response.currentPet).remove();
        }
        else {

            if (response.currentPet != "HIDEPET") {
                petName = response.currentPet;
                SetupPet();
            }
            else {
                petName = "HIDEPET";
            }
        }
    });
}

//----Setup Pet----
function SetupPet() {
    switch (petName) {
        case "pusheen":
            {
                petLeft = chrome.extension.getURL("img/1.png");
                petLeftZ = chrome.extension.getURL("img/2.png");
                petRight = chrome.extension.getURL("img/1r.png");
                petRightZ = chrome.extension.getURL("img/2r.png");

                clickSpeed = 2000;
                followSpeed = 1500;
                laserSpeed = 1000;
                petDelay = 1000; //reaccion time

                createPet(petName); //Create if pet does not exist

            }
            break;
        case "turtle":
            {
                petLeft = chrome.extension.getURL("img/tortugarl1.png");
                petLeftZ = chrome.extension.getURL("img/tortugarl2.png");
                petRight = chrome.extension.getURL("img/tortugar1.png");
                petRightZ = chrome.extension.getURL("img/tortugar2.png");

                clickSpeed = 4000;
                followSpeed = 3000;
                laserSpeed = 5000;
                petDelay = 2000;

                createPet(petName); //Create if pet does not exist
            }
            break;
        case "doge":
            {
                petLeft = chrome.extension.getURL("img/doge-leftz.png");
                petLeftZ = chrome.extension.getURL("img/doge-left.png");
                petRight = chrome.extension.getURL("img/dogez.png");
                petRightZ = chrome.extension.getURL("img/doge.png");

                clickSpeed = 3000;
                followSpeed = 800;
                laserSpeed = 500;
                petDelay = 0;

                createPet(petName); //Create if pet does not exist

            }
            break;
        case "nyan":
            {
                petLeft = chrome.extension.getURL("img/nyan-left.png");
                petLeftZ = chrome.extension.getURL("img/nyanz-left.png");
                petRight = chrome.extension.getURL("img/nyan-right.png");
                petRightZ = chrome.extension.getURL("img/nyanz-right.png");

                clickSpeed = 2000;
                followSpeed = 2000;
                laserSpeed = 2000;
                petDelay = 500;

                createPet(petName); //Create if pet does not exist
            }
            break;

        case "trump":
            {
                petLeft = chrome.extension.getURL("img/trumpLeft.png");
                petLeftZ = chrome.extension.getURL("img/trumpLeftZ.png");
                petRight = chrome.extension.getURL("img/trumpRight.png");
                petRightZ = chrome.extension.getURL("img/trumpRightZ.png");

                clickSpeed = 2000;
                followSpeed = 1500;
                laserSpeed = 1000;
                petDelay = 100;

                createPet(petName); //Create if pet does not exist
            }
            break;

        case "gabe":
            {
                petLeft = chrome.extension.getURL("img/gabeLeft.png");
                petLeftZ = chrome.extension.getURL("img/gabeLeftZ.png");
                petRight = chrome.extension.getURL("img/gabeRight.png");
                petRightZ = chrome.extension.getURL("img/gabeRightZ.png");

                clickSpeed = 1500;
                followSpeed = 1000;
                laserSpeed = 1000;
                petDelay = 200;

                createPet(petName); //Create if pet does not exist
            }
            break;

        case "pezweon":
            {
                petLeft = chrome.extension.getURL("img/pezLeft.png");
                petLeftZ = chrome.extension.getURL("img/pezLeft.png");
                petRight = chrome.extension.getURL("img/pezRight.png");
                petRightZ = chrome.extension.getURL("img/pezRight.png");

                clickSpeed = 2000;
                followSpeed = 2000;
                laserSpeed = 1000;
                petDelay = 1000;

                createPet(petName); //Create if pet does not exist
            }
            break;

        case "piggy":
            {
                petLeft = chrome.extension.getURL("img/piggyL.png");
                petLeftZ = chrome.extension.getURL("img/piggyZZ.png");
                petRight = chrome.extension.getURL("img/piggyR.png");
                petRightZ = chrome.extension.getURL("img/piggyZZr.png");

                clickSpeed = 2500;
                followSpeed = 2000;
                laserSpeed = 1200;
                petDelay = 1000;

                createPet(petName); //Create if pet does not exist
            }
            break;
        case "fox":
            {
                petLeft = chrome.extension.getURL("img/foxLL.png");
                petLeftZ = chrome.extension.getURL("img/foxZL.png");
                petRight = chrome.extension.getURL("img/foxRR.png");
                petRightZ = chrome.extension.getURL("img/foxZR.png");

                clickSpeed = 1400;
                followSpeed = 1800;
                laserSpeed = 1000;
                petDelay = 1000;

                createPet(petName); //Create if pet does not exist
            }
            break;
    }
}


//----Create Pet----
function createPet(id) {

    $('<style> .nyanFix { max-height: 90px; width: auto !important; } .draggable {  max-width: 276px; width: 10%; }</style>').appendTo('body');
    //width: inherit !important;
    var img = document.createElement("img")

    img.setAttribute('src', petRightZ);
    img.setAttribute('id', id);
    img.setAttribute('class', 'draggable');

    //Appending to DOM 
    document.body.appendChild(img);

    //CSS
    img.style.position = 'absolute';
    //img.style.width = 'inherit !important';
    img.style.zIndex = 1000;
    img.style.display = 'none';

    //set pet
    var newPet = document.getElementById(id);

    //Set pet speed attributes
    $(newPet).attr("petLeft", petLeft);
    $(newPet).attr("petLeftZ", petLeftZ);
    $(newPet).attr("petRight", petRight);
    $(newPet).attr("petRightZ", petRightZ);
    $(newPet).attr("data-freeView", freeView);
    $(newPet).attr("lookRight", lookRight);
    $(newPet).attr("lookLeft", lookLeft);
    $(newPet).attr("laserEnabled", laserEnabled);
    $(newPet).attr("followOptions", followOptions);
    $(newPet).attr("data-clickSpeed", clickSpeed);
    $(newPet).attr("data-followSpeed", followSpeed);
    $(newPet).attr("data-laserSpeed", laserSpeed);
    $(newPet).attr("data-petDelay", petDelay);


    //Disable element menu
    $(newPet).bind("contextmenu", function (e) {
        return false;
    });

    if (followOptions == "gravity")
    {
        $(newPet).removeClass("draggable");
        $(newPet).css("width","10%");
    }

    //   beejdnd.init(); //Enable Drag and Drop

    $(".draggable").draggable({
        revert: false,
        cursor: "pointer",
        start: function () {
            if ($(this).attr('lookRight') == "true") {
                //  console.log('looking right' + $(this).attr('lookRight'));
                $(this).attr('src', $(this).attr('petRight'));
            }
            else {
                // console.log('looking left' + $(this).attr('lookRight'));
                $(this).attr('src', $(this).attr('petLeft'));
            }

            //  console.log($(this) + "start drag");
            $(this).stop();
            $(this).data("freeview", true);
        },
        drag: function () {

        },
        stop: function () {
            //  console.log($(this) + "end drag");
        }
    });

    BringPetIntoScreen(newPet);
}


function BringPetIntoScreen(newPet) {
    //Width Fixes
    $(newPet).removeClass("nyanFix");

    //PET COMES IN FIRST TIME--
    $(newPet).css("display", "block");


                        //Add nyan fix if nyancat
                        if ($(newPet).attr('id') == "nyan") {
                            if (!$(newPet).hasClass("nyanFix"))
                                $(newPet).addClass("nyanFix");
                        }


    $(newPet).stop().animate({
        left: $(pet).parent().width() / 2 - $(pet).width() / 2,
        top: $(document).scrollTop() + $(window).height() / 2 - $(pet).height() / 2,
    },
        {
            duration: laserSpeed,
            start: function () {
                $(newPet).data("freeview", false);
                $(newPet).attr('src', petRightZ);
            },
            complete: function () {
                $(newPet).data("freeview", true);
                if (followOptions == "gravity") {



                    //Activate Anti-gravity
                    $(newPet).throwable({
                        drag: true,
                        gravity: { x: -0.05, y: -0.05 },
                        impulse: {
                            f: 52,
                            p: { x: 1, y: 1 }
                        },
                        shape: "circle",
                        autostart: false,
                        bounce: 0.5,
                        damping: 100,
                        areaDetection: [[0, 0, 300, 300]],
                        collisionDetection: true
                    });
                }
            }
        });

    initializeImg = false;

}



$(function () {

    //LISTENER from popup.js
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            switch (request.directive) {
                case "start":
                    {
                        Start();
                    }
                    break;

                case "ask"://Show last pet used
                    if (document.getElementById(petName)) {
                        var followOption = $("#" + petName).attr("followOptions");
                        followOptions = followOption;
                        sendResponse({ petExists: "true", currentPet: petName, followOption: followOption });
                    }
                    else {
                        sendResponse({ petExists: "false", currentPet: petName });
                    }
                    break;

                case "options": //Dropdown pet change
                    var selectedPet = "#" + request.selectedPet;
                    var followOption = $(selectedPet).attr("followOptions");
                    followOptions = followOption;
                    var petExists = $(selectedPet).length > 0;
                    sendResponse({ followOptions: followOption, petExists: petExists });
                    break;

                case "save":
                    laserEnabled = false;
                    $("body").css('cursor', 'default');
                    $("html").css('cursor', 'default');
                    var selectedPet = "#" + request.selectedPet;
                    //     alert($(selectedPet).attr("followOptions") + " - " + request.selectedPet + " - New value: "+ request.followOptions);

                    followOptions = request.followOptions;

                    //If we are removing gravity mode
                    if (($(selectedPet).attr("followOptions") == "gravity") && (request.followOptions != "gravity")) {

                        $(selectedPet).remove();

                        if (petName != "HIDEPET") {
                            petName = request.selectedPet;
                            SetupPet();
                        }


                    }
                    else if (($(selectedPet).attr("followOptions") != "gravity") && (request.followOptions == "gravity")) {
                        $(selectedPet).removeClass("draggable");
                        $(selectedPet).draggable('destroy');

                        //Add nyan fix if nyancat
                        if ($(selectedPet).attr('id') == "nyan") {
                            if (!$(selectedPet).hasClass("nyanFix"))
                                $(selectedPet).addClass("nyanFix");
                        }

                        $(selectedPet).throwable({
                            drag: true,
                            gravity: { x: -0.05, y: -0.05 },
                            impulse: {
                                f: 52,
                                p: { x: 1, y: 1 }
                            },
                            shape: "circle",
                            autostart: false,
                            bounce: 0.5,
                            damping: 100,
                            areaDetection: [[0, 0, 300, 300]],
                            collisionDetection: true
                        });

                    }

                    $(selectedPet).attr("followOptions", request.followOptions); //set new follow option for selected pet
                    break;
            }
        });


    //-------------CLICK ON PET---------------
    var secretPet = 0;
    $(document).on('click', '.draggable', function (e) {

        $(document).mousedown(function (response) {
            var pet = "#" + response.target.id;
            //   $(pet).data("freeview", true);
            switch (response.button) {
                case 0: //leftclick
                    //    $(pet).stop();
                    break;
                case 1: //middle
                    break;
                case 2: //rightclick
                    if (pet == "#trump") {
                        secretPet++;
                        if (secretPet == 3) {
                            $(pet).attr("petLeft", chrome.extension.getURL("img/putinLZ2.png"));
                            $(pet).attr("petLeftZ", chrome.extension.getURL("img/putin2L.png"));
                            $(pet).attr("petRight", chrome.extension.getURL("img/putinRZ2.png"));
                            $(pet).attr("petRightZ", chrome.extension.getURL("img/putin2R.png"));
                            $(pet).css("height", "187px");
                            $(pet).css("width", "150px");

                            $(pet).attr("data-clickSpeed", 2250);
                            $(pet).attr("data-followSpeed", 2700);
                            $(pet).attr("data-laserSpeed", 3050);
                            secretPet = 0;
                        }
                    }
                    break;
            }
        });
    });

    //-----------------------LASER MODE-------------------------------

    $(document).mousedown(function (e) {
        if (followOptions == "Laser") {
            var laser = chrome.extension.getURL("img/laser3.png");
            laserEnabled = true;
            e.preventDefault(); //prevent text selection???
            $("html").css('cursor', "url(" + laser + "), auto");
            $("body").css('cursor', "url(" + laser + "), auto");

        }
    });

    $(document).mouseup(function (e) {
        if (followOptions == "Laser") {
            laserEnabled = false;
            $("body").css('cursor', 'default');
            $("html").css('cursor', 'default');
        }

    });


    var pets = ["#pusheen", "#turtle", "#doge", "#nyan", "#trump", "#gabe", "#pezweon", "#piggy", "#fox"];

    //----------------------ON MOUSE MOVE---------------------
    $(document).mousemove(function (e) {

        for (var p in pets) {
            pet = pets[p];

            //if pet exists
            if ($(pet).length) {

                //set image margin
                imageLeft = $(pet).offset().left;
                imageRight = imageLeft + $(pet).width();
                imageTop = $(pet).offset().top;
                imageBottom = imageTop + $(pet).height();


                ///DETERMINE WHERE PET WILL LOOK LEFT OR RIGHT
                if ($(pet).data("freeview")) {

                    if (e.pageX > imageRight) {
                        if (!$(pet).data('lookRight')) {
                            $(pet).attr('src', $(pet).attr('petRight'));
                            // FixWidth();
                        }
                        $(pet).attr('lookRight', true)
                        $(pet).attr('lookLeft', false)
                    }
                    else {
                        if (e.pageX < imageLeft) {
                            if (!$(pet).data('lookLeft')) {
                                $(pet).attr('src', $(pet).attr('petLeft'));
                                //  FixWidth();
                            }
                            $(pet).attr('lookRight', false)
                            $(pet).attr('lookLeft', true)
                        }
                    }
                }

                var difH = Number(e.pageX) - Number(imageLeft);
                var difV = Number(e.pageY) - Number(imageBottom);

                //  console.log('Delta: ' + difV);

                //START PET ENTER SCREEN
                if (!initializeImg) {

                    if (($(pet).attr('followOptions') == "Cursor" || laserEnabled == true) && ($(pet).attr('followOptions') != "gravity")) {
                        if ((difH > 400) || (difH < -200) || (difV > 200) || (difV < -440)) {


                            if (laserEnabled) {
                                speed = $(pet).data('laserspeed');
                                delay = 0;
                            }
                            else {
                                speed = $(pet).data('followspeed');
                                delay = $(pet).data('petdelay');
                            }

                            //   setTimeout(function () {

                            $(pet).stop().animate({
                                left: e.pageX,
                                top: e.pageY
                            },
                                {
                                    queue: false,
                                    duration: speed,
                                    easing: "swing",
                                    start: function () {
                                        $(pet).data("freeview", false);
                                        if (e.pageX > imageLeft) {
                                            if ($(pet).prop("src") != $(pet).attr('petRightZ')) {
                                                $(pet).attr("src", $(pet).attr('petRightZ'));
                                                $(pet).attr('lookRight', true);
                                                $(pet).attr('lookLeft', false);
                                            }
                                        }
                                        else {
                                            if (e.pageX < imageLeft) {
                                                if ($(pet).prop("src") != $(pet).attr('petLeftZ')) {
                                                    $(pet).attr("src", $(pet).attr('petLeftZ'));
                                                    $(pet).attr('lookRight', false);
                                                    $(pet).attr('lookLeft', true);
                                                }
                                            }
                                        }
                                    },
                                    complete: function () {
                                        $(this).attr('src', $(this).attr('petLeft'));
                                        $(this).data("freeview", true);
                                        $(this).attr('lookLeft', true);
                                    }
                                });
                            //   }, delay);
                        }
                    }
                }
                //end animacion
            }
        }
    });


    //*************************************************************
    //*************************************************************
    //*****************ON CLICK FOLLOW*****************************
    $(document).mousedown(function (e) {


        var elementClass = (e.target || e.srcElement).className;
        //console.log('mouse down' + elementClass);

        if (elementClass.indexOf("draggable") == -1) {

            for (var p in pets) {
                pet = pets[p];

                if ($(pet).length) {
                    if ((($(pet).attr('followOptions') == 'Click') || ($(pet).attr('followOptions') == "Laser"))) {
                        //set image margin
                        imageLeft = $(pet).offset().left;
                        imageBottom = imageTop + $(pet).height();

                        var difH = Number(e.pageX) - Number(imageLeft);
                        var difV = Number(e.pageY) - Number(imageBottom);

                        if ((difH > 200) || (difH < 0) || (difV > 0) || (difV < -200)) {

                            $(pet).stop().animate({
                                left: e.pageX,
                                top: e.pageY
                            },
                                {
                                    queue: false,
                                    duration: $(pet).data('clickspeed'),
                                    easing: "swing",
                                    start: function () {
                                        $(pet).data("freeview", false);
                                        if (e.pageX > imageLeft) {
                                            if ($(pet).prop("src") != $(pet).attr('petRightZ')) {
                                                $(pet).attr("src", $(pet).attr('petRightZ'));
                                                $(pet).attr('lookRight', true);
                                                $(pet).attr('lookLeft', false);
                                            }
                                        }
                                        else {
                                            if ($(pet).prop("src") != $(pet).attr('petLeftZ')) {
                                                $(pet).attr("src", $(pet).attr('petLeftZ'));
                                                $(pet).attr('lookRight', false);
                                                $(pet).attr('lookLeft', true);
                                            }
                                        }
                                    },
                                    complete: function () {
                                        $(this).attr('src', $(this).attr('petLeft'));
                                        $(this).data("freeview", true);
                                        $(this).attr('lookLeft', true);
                                    }
                                });
                        }
                    }
                }
            }

        }
    });
    //end click follow
});
