$(document).ready(function() {

    /**
        This is the big fat js file for our views/index.ejs page
        Here, we create all the:

            - onclick handlers
            - rest calls
                - endpoint: routes/index.js
            - animations + dom element manipulations
    */
    /* on hover tile, change image */
    const retaurantTileIds = [
        "A&W",
        "Cactus Club Cafe",
        "Gong Cha",
        "Marutama",
        "McDonalds",
        "Minami",
        "Rain Or Shine",
        "Starbucks",
        "Tacofino",
        "The Keg",
        "Yaletown Brewery Company",
        "Flying Pig"
    ];

    const restaurantNameToIdMap = {
        "A&W": 1,
        "Cactus Club Cafe": 2,
        "Gong Cha": 3,
        "Marutama": 4,
        "McDonalds": 5,
        "Minami": 6,
        "Rain Or Shine": 7,
        "Starbucks": 8,
        "Tacofino": 9,
        "The Keg": 10,
        "Yaletown Brewery Company": 11,
        "Flying Pig": 12
    };

    const aMockParties = [{
        partyName: "come with use",
        startTime: "11/30/2018 11:18 PM",
        attendees: ['aaa', 'bbb', 'cccc'],
        partySize: '5'
    }, {
        partyName: "come with use",
        startTime: "11/30/2018 11:18 PM",
        attendees: ['aaa', 'bbb', 'cccc'],
        partySize: '5'
    }];

    $('#datetimepicker1').datetimepicker();
    /**
        LOGIN ANIMATIONS
    */

    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });

    let screenWidth = $(window).width();
    let screenHeight = $(window).height();
    let loginAnimation = {
        squareKeyframe0: screenHeight * 0.7,
        squareKeyframe1: screenHeight * 0.42 - 50,
        hovered: false,
        finishedKeyframe: false
    }
    /** --- code for animations --- */
    $("#square").css({
        "opacity": "0.0",
        "margin-top": loginAnimation.squareKeyframe0,
        "width": "90px",
        "height": "90px",
        "transform": "rotate(-50deg)"
    }).delay(500).animate({
        marginTop: loginAnimation.squareKeyframe1,
        opacity: "1.0",
        transform: 'rotate(0deg)'
    }, 750, "swing", function(){
        loginAnimation.finishedKeyframe = true;
    }).hover(function(){
        if(!loginAnimation.hovered && loginAnimation.finishedKeyframe == true){
            loginAnimation.hovered = true;
            $(this).animate({
                width: "400px",
                height: "400px",
                borderTopLeftRadius: 300,
                borderTopRightRadius: 300,
                borderBottomLeftRadius: 300,
                borderBottomRightRadius: 300,
                marginTop: loginAnimation.squareKeyframe1 - 150
            }, 500, "swing");
            $("#nicknameForm").delay(500).css({
                "visibility": "visible",
                "left": "-10px",
                "opacity": "0.0"
            }).animate({
                opacity: "1.0",
                left: "0px"
            }, 500, "swing");
        }
    });

    $("#validate-email").click(function() {
        let nickname = $("#login_wrapper #username").val();
        if (nickname) {
            $.nickname = nickname;
            $("#login_wrapper").animate({
                opacity: 0
            }, 500, function() {
                $(this).css("display", "none");
                $('html, body').css({
                    overflow: 'auto',
                    height: 'auto'
                });
            });
        } else {
            $("#login_wrapper h3").css("text-decoration", "underline");
        }
    });

    $('#datetimepicker1').datetimepicker();

    function getSidebar() {
        return $("#sidebar");
    }

    function isSidebarOpen() {
        return !getSidebar().hasClass('active');
    }

    function closeAllTabs() {
        $(".active").each(function() {
            $(this).removeClass("active");
        });
    }

    $(".wrapper > div").click(function() {
        let previousRestaurant = $.selectedRestaurant;
        $.selectedRestaurant = this.id;

        if (isSidebarOpen() && previousRestaurant !== this.id) {
            // if sidebar is already opened
            // AND clicked on different tile, do not close sidebar
            dimUnselectedTiles();
            closeAllTabs();
        } else {
            toggleSideBar();
        }

        updateSidebarHeader();
        updateSidebarBackgroundColor();
    });

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function updateSidebarBackgroundColor() {
        let backgroundColorArray = ["#b7e2e9", "#efba95", "#dbee8e", "#f0ea9e", "#e3aae2"];
        let sidebar = getSidebar();
        sidebar.css("background-color", backgroundColorArray[getRandomInt(backgroundColorArray.length)]);
    }

    function updateSidebarHeader() {
        $(".sidebar-header").html($.selectedRestaurant);
    }

    function toggleSideBar() {
        if (isSidebarOpen()) {
            undimAllTiles();
        } else {
            dimUnselectedTiles();
        }

        // open or close navbar
        $('#sidebar').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    }

    function dimUnselectedTiles() {
        $(".wrapper > div").each(function() {
            if ($.selectedRestaurant !== this.id) {
                $(this).addClass("grayscale");
            } else {
                $(this).removeClass("grayscale");
            }
        });
    }

    function undimAllTiles() {
        $(".wrapper > div").each(function() {
            $(this).removeClass("grayscale");
        });
    }

    /* animations for join existing group */
    $("#JoinExistingPartyButton").click(function() {
        if ($('#JoinExistingPartySection').hasClass('active')) {
            closeAllTabs();
        } else {
            closeAllTabs();
            $('#JoinExistingPartySection').toggleClass('active');
        }

        let queryString = 'getPartyByRestaurantName?name=' + $.selectedRestaurant.replace("&", "%26").replace(" ", "+");
        $.get(queryString, {}, function(result) {
            $("#JoinExistingPartySection").empty();
            let parties = JSON.parse(result);
            parties.map(party => {
                let nameHTML = "<div class='listPartyName'>" + party.partyName + "</div>";
                let timeHTML = "<div class='listStartTime'>" + party.startTime + "</div>";
                let attendeesHTML = "<div class='listAttendees'>Attendees: " + party.attendees.join(', ') + "</div>";
                let sizeHTML = "<div class='listPartySize'>Group Size: " + party.partySize + "</div>";
                let bIsCurrentUserInList = party.attendees.some(attendee => {
                    return attendee === $.nickname;
                });
                let joinButtonText = bIsCurrentUserInList ? "Remove Reservation" : "Join This Group";
                let joinButton = "<div class=\"joinButton\">" + joinButtonText + "</div>";
                let htmlString = "<div class='listPartySection'>" + nameHTML + sizeHTML + attendeesHTML + timeHTML + joinButton + "</div>";
                let partyDiv = $(htmlString);
                $("#JoinExistingPartySection").append(partyDiv);
            });

            $(".joinButton").click(function() {
                if ($(this).html() === "Join This Group") {
                    // this is the listPartySection
                    let parentDiv = $(this).parent();
                    let attendees = parentDiv.children(".listAttendees");
                    let size = parentDiv.children(".listPartySize");

                    let currentAttendees = attendees.html();
                    let currentSize = size.html();

                    let newAttendees = currentAttendees + ", " + $.nickname;
                    let arraySize = currentSize.split(" ");
                    let actualCurrentSize = parseInt(arraySize[arraySize.length - 1]);
                    let newSize = "Group Size: " + (actualCurrentSize + 1);

                    attendees.html(newAttendees);
                    size.html(newSize);
                    $(this).html("Remove Reservation");
                } else if ($(this).html() === "Remove Reservation"){
                    // this is the listPartySection
                    let parentDiv = $(this).parent();
                    let attendees = parentDiv.children(".listAttendees");
                    let size = parentDiv.children(".listPartySize");

                    let currentAttendees = attendees.html();
                    let currentSize = size.html();

                    let lastWord = currentAttendees.lastIndexOf(", ");
                    let newAttendees = currentAttendees.substring(0, lastWord);

                    let arraySize = currentSize.split(" ");
                    let actualCurrentSize = parseInt(arraySize[arraySize.length - 1]);
                    let newSize = actualCurrentSize - 1;

                    if (newSize === 0) {
                        parentDiv.remove();
                    }

                    let newSizeString = "Group Size: " + (newSize);
                    attendees.html(newAttendees);
                    size.html(newSizeString);
                    $(this).html("Join This Group");
                }
            });
        });
    });

    function showJoinExistingPartySection() {
        if ($('#JoinExistingPartySection').hasClass('active')) {
            closeAllTabs();
        } else {
            closeAllTabs();
            $('#JoinExistingPartySection').toggleClass('active');
        }
        let queryString = 'getPartyByRestaurantName?name=' + $.selectedRestaurant.replace("&", "%26").replace(" ", "+");
        $.get(queryString, {}, function(result) {
            $("#JoinExistingPartySection").empty();
            let parties = JSON.parse(result);
            parties.map(party => {
                let nameHTML = "<div class='listPartyName'>" + party.partyName + "</div>";
                let timeHTML = "<div class='listStartTime'>" + party.startTime + "</div>";
                let attendeesHTML = "<div class='listAttendees'>Attendees: " + party.attendees.join(', ') + "</div>";
                let sizeHTML = "<div class='listPartySize'>Group Size: " + party.partySize + "</div>";
                let bIsCurrentUserInList = party.attendees.some(attendee => {
                    return attendee === $.nickname;
                });
                let joinButtonText = bIsCurrentUserInList ? "Remove Reservation" : "Join This Group";
                let joinButton = "<div class=\"joinButton\">" + joinButtonText + "</div>";
                let htmlString = "<div class='listPartySection'>" + nameHTML + sizeHTML + attendeesHTML + timeHTML + joinButton + "</div>";
                let partyDiv = $(htmlString);
                $("#JoinExistingPartySection").append(partyDiv);
            });

            $(".joinButton").click(function() {
                if ($(this).html() === "Join This Group") {
                    // this is the listPartySection
                    let parentDiv = $(this).parent();
                    let attendees = parentDiv.children(".listAttendees");
                    let size = parentDiv.children(".listPartySize");

                    let currentAttendees = attendees.html();
                    let currentSize = size.html();

                    let newAttendees = currentAttendees + ", " + $.nickname;
                    let arraySize = currentSize.split(" ");
                    let actualCurrentSize = parseInt(arraySize[arraySize.length - 1]);
                    let newSize = "Group Size: " + (actualCurrentSize + 1);

                    attendees.html(newAttendees);
                    size.html(newSize);
                    $(this).html("Remove Reservation");
                } else if ($(this).html() === "Remove Reservation"){
                    // this is the listPartySection
                    let parentDiv = $(this).parent();
                    let attendees = parentDiv.children(".listAttendees");
                    let size = parentDiv.children(".listPartySize");

                    let currentAttendees = attendees.html();
                    let currentSize = size.html();

                    let lastWord = currentAttendees.lastIndexOf(", ");
                    let newAttendees = currentAttendees.substring(0, lastWord);

                    let arraySize = currentSize.split(" ");
                    let actualCurrentSize = parseInt(arraySize[arraySize.length - 1]);
                    let newSize = actualCurrentSize - 1;

                    if (newSize === 0) {
                        parentDiv.remove();
                    }

                    let newSizeString = "Group Size: " + (newSize);
                    attendees.html(newAttendees);
                    size.html(newSizeString);
                    $(this).html("Join This Group");
                }
            });
        });
    }

    /* animations for create new group */
    $("#CreateNewPartyButton").click(function() {
        // $("#CreateNewPartySection")
        //     .css("display", "block")
        //     .animate({
        //         opacity: 1
        //     }, 200);
        if ($('#CreateNewPartySection').hasClass('active')) {
            closeAllTabs();
        } else {
            closeAllTabs();
            $('#CreateNewPartySection').toggleClass('active');
        }

        $('#host').val($.nickname);
        let currentDate = new Date();
        var defaultDateValue = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() + ' 12:00 PM';
        $('#time').val(defaultDateValue);
        $('#partyName').val('Group 1');
        $('#attendees').val($.nickname);
    });

    /* animations for view all comments button */
    $("#ViewAllCommentsButton").click(function() {
        if ($('#ViewAllCommentsSection').hasClass('active')) {
            closeAllTabs();
        } else {
            closeAllTabs();
            $('#ViewAllCommentsSection').toggleClass('active');
        }
        let queryString = 'getCommentByRestaurantName?name=' + $.selectedRestaurant.replace("&", "%26").replace(" ", "+");
        $.get(queryString, {}, function(result) {
            $("#ViewAllCommentsSection").empty();
            let comments = JSON.parse(result);
            comments.map(comment => {
                // let timeFromNow = moment(new Date(JSON.parse(comment.startTime))).fromNow();
                let authorHTML = "<div class='commentAuthor'>" + comment.author + "</div>";
                let contentHTML = "<div class='commentContent'>" + comment.content + "</div>";
                let timeHTML = "<div class='listStartTime'>" + comment.startTime + "</div>";
                // let timeFromNowHTML = "<div class='timeFromNow'>" + timeFromNow + "</div>";
                let htmlString = "<div class='commentSection'>" + authorHTML + contentHTML + timeHTML + "</div>";
                let commentDiv = $(htmlString);
                $('#ViewAllCommentsSection').append(commentDiv);
            });
        });
    });

    $(".wrapper > div").mouseover(function() {
        if ($.hoveredItem !== this.id) {
            $.hoveredItem = this.id;

            let newImageString = getNewImageString(this.id);
            if (newImageString) {
                let htmlString = "<img src=\"/images/" + newImageString + "\">"
                let gridItem = $(".grid-item", this);
                gridItem
                    .animate({
                        opacity: 0.4
                    }, 250, function() {
                        $(this).html(htmlString)
                            .animate({
                                opacity: 1
                            }, 250);
                    });
            }
        }
    }).mouseout(function() {
        let originalImageString = getOriginalImageString(this.id);
        if (originalImageString) {
            let htmlString = "<img src=\"/images/" + originalImageString + "\">"
            let gridItem = $(".grid-item", this);
            gridItem
                .animate({
                    opacity: 0
                }, 500, function() {
                    $(this).html(htmlString)
                        .animate({
                            opacity: 1
                        }, 500);
                });
        }
    });

    function getOriginalImageString(restuarantTileId) {
        let newImageString;
        switch(restuarantTileId) {
            case "A&W":
                newImageString = "A&W.png"
                break;
            case "Cactus Club Cafe":
                newImageString = "cactus.png";
                break;
            case "Gong Cha":
                newImageString = "gongcha.png";
                break;
            case "Marutama":
                newImageString = "marutama.jpg";
                break;
            case "McDonalds":
                newImageString = "mcds.png";
                break;
            case "Minami":
                newImageString = "minami.png";
                break;
            case "Rain Or Shine":
                newImageString = "RainOrShin.jpg";
                break;
            case "Starbucks":
                newImageString = "starbucks.jpg";
                break;
            case "Tacofino":
                newImageString = "tacofino.jpg";
                break;
            case "The Keg":
                newImageString = "thekeg.JPG";
                break;
            case "Yaletown Brewery Company":
                newImageString = "ybc.jpg";
                break;
            case "Flying Pig":
                newImageString = "fly pig.png";
                break;
            default:
                break;
        }
        return newImageString;
    }

    function getNewImageString(restuarantTileId) {
        let newImageString;
        switch(restuarantTileId) {
            case "A&W":
                newImageString = "A&W(1).png"
                break;
            case "Cactus Club Cafe":
                newImageString = "Cactus Club Cafe(1).jpg";
                break;
            case "Gong Cha":
                newImageString = "gongcha(1).png";
                break;
            case "Marutama":
                newImageString = "marutama(1).jpg";
                break;
            case "McDonalds":
                newImageString = "mcds(1).jpg";
                break;
            case "Minami":
                newImageString = "minami(1).jpg";
                break;
            case "Rain Or Shine":
                newImageString = "rainorshine.jpg";
                break;
            case "Starbucks":
                newImageString = "starbucks(1).jpg";
                break;
            case "Tacofino":
                newImageString = "Tacofino(1).jpeg";
                break;
            case "The Keg":
                newImageString = "thekeg(1).jpg";
                break;
            case "Yaletown Brewery Company":
                newImageString = "ybc(1).jpg";
                break;
            case "Flying Pig":
                newImageString = "fly pig(1).jpg";
                break;
            default:
                break;
        }
        return newImageString;
    }

    /* rest calls */
    $(".submitForm").click(function() {
        let options = {
            host: $("#host").val(),
            partyName: $("#partyName").val(),
            startTime: $("#time").val(),
            attendees: $("#attendees").val(),
            restaurantName: $.selectedRestaurant
        };
        sendForm(options);
        clearInputs();

        // navigate user to all exisitng parties
        $('#CreateNewPartySection').toggleClass('active');

        showJoinExistingPartySection();

        //$('#JoinExistingPartySection').toggleClass('active');

        /*let queryString = 'getPartyByRestaurantName?name=' + $.selectedRestaurant.replace("&", "&#38;");
        console.log(queryString);
        $.get(queryString, {}, function(result) {
            $("#JoinExistingPartySection").empty();
            console.log(result);
            let parties = JSON.parse(result);
            parties.map(party => {
                let nameHTML = "<div class='partyName'>" + party.partyName + "</div>";
                let timeHTML = "<div class='startTime'>" + party.startTime + "<div>";
                let attendeesHTML = "<div class='attendees'>" + party.attendees.join(', ') + "</div>";
                let sizeHTML = "<div class='partySize'>" + party.partySize + "</div>";
                let htmlString = "<div class='partySection'>" + nameHTML + sizeHTML + attendeesHTML + timeHTML + "</div>";
                let partyDiv = $(htmlString);
                $("#JoinExistingPartySection").append(partyDiv);
            });
        });*/
    });

    $(".submitComment").click(function() {
        let options = {
            author: $("#author").val(),
            content: $("#commentContent").val(),
            restaurantName: $.selectedRestaurant
        }
        sendComment(options);
        $("#author").val('');
        $('#commentContent').val('');
    });

    $('#CreateNewCommentButton').click(function() {
        if ($('#AddNewCommentSection').hasClass('active')) {
            closeAllTabs();
        } else {
            closeAllTabs();
            $('#AddNewCommentSection').toggleClass('active');
        }
        $('#author').val($.nickname);
    });

    function sendComment(options) {
        $.post("/addComment", options, function(date) {
            console.log(data);
        });
    }

    function sendForm(options) {
        $.post("/submitForm", options, function(data) {
            console.log(data);
        });
    }

    function clearInputs() {
        $("#host").val('');
        $("#partyName").val('');
        $("#time").val('');
        $("#attendees").val('');
    }
});