(function () {
    'use strict';

    function addBasicEventListners() {
        $(document).on("click", ".cancel-match", resetGame)
        .on("click", "#submit-new-player", submitNewPlayer)
        .on("click", ".player1-box, .player2-box", submitMatch)
        .on('closed.fndtn.reveal', '[data-reveal]', function () {
            var modal = $(this);

            $("#add-player-modal input").val("");
            $(".status-message").text("").removeClass("error").removeClass("success");
        });
    }
    function addPlayerEventListners() {
        $(".user-list ul li").on("click", function (e) {
            var $this = $(e.currentTarget);
            var playerName = $this.find(".name").text();
            var player1Field = $(".player1");
            var player2Field = $(".player2");
            if( game.player1 == playerName || game.player2 == playerName) {
                if(game.player1 == playerName) {
                    game.player1 = "";
                    player1Field.text("???");
                } else {
                    game.player2 = "";
                    player2Field.text("???");
                }
            } else if(game.player1 == "" || game.player2 == "") {
                if(game.player1 == "") {
                    game.player1 = playerName;
                    player1Field.text(playerName);
                } else {
                    game.player2 = playerName;
                    player2Field.text(playerName);
                }
            } else {
                resetGame();
                game.player1 = playerName;
                player1Field.text(playerName);
            }
            $this.toggleClass("selected");
        });
    }

    function resetGame() {
        var player1Field = $(".player1");
        var player2Field = $(".player2");
        game = {"player1": "", "player2": ""};
        $(".user-list ul li.selected").removeClass("selected");
        player1Field.text("???");
        player2Field.text("???");
    }

    function renderPlayersToPage(players) {
        var liTemplate = $("<li>");
        var playerList = $(".user-list ul");
        liTemplate.append($("<span>").addClass("name"));
        liTemplate.append($("<span>").addClass("score"));
        
        playerList.empty();
        for(let i = 0; i < players.length; i++) {
            var li = liTemplate.clone();
            var p = players[i];
            li.find(".name").text(p.name);
            li.find(".score").text(p.score);
            playerList.append(li);
        }
        addPlayerEventListners();

    }

    function getAllPlayersAndRenderToPage() {
        $.ajax({
            url: "api/players.py",
            type: "GET",
            //data: values ,
            success: renderPlayersToPage,
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }

    function submitNewPlayer(e) {
        console.log("Submitting player");
        
        var playerName = $("#add-player-modal input").val();
        $.ajax({
            url: "api/players.py",
            type: "POST",
            data: {"name": playerName},
            success: function (data) {
                console.log("Successfully added player? ", data)
                if(data["status"]) {
                    console.log("I was wrong, error ensued");
                } else {
                    console.log("Success was successfull");
                    getAllPlayersAndRenderToPage()
                    $(".status-message").text("Successfully added player: \"" + playerName + "\"").removeClass("error").addClass("success");
                    setTimeout(function () {
                        $('#add-player-modal').foundation('reveal', 'close');
                    }, 1000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add-player-modal input").val("");
                $(".status-message").text("Player name already exists").removeClass("success").addClass("error");
            }
        });
    }

    function submitMatch(e) {
        console.log("Submitting match");
        if(game.player1 !== "" && game.player2 !== "") {
            console.log("Match is setup correctly")
            var clickedBlock = $(e.currentTarget);
            var winnerName = clickedBlock.find("span").text();
            console.log("Winner: ", winnerName);
            $.ajax({
                url: "api/matches.py",
                type: "POST",
                data: {"name": winnerName},
                success: function (data) {
                    console.log("Successfully registered match? ", data)
                    if(data["status"]) {
                        console.log("I was wrong, error ensued");
                    } else {
                        console.log("Success was successfull");
                        getAllPlayersAndRenderToPage()
                        resetGame();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#add-player-modal input").val("");
                    $(".status-message").text("Player name already exists").removeClass("success").addClass("error");
                }
            });
        } else {
            //Trigger error blink on match containers
        }
    }

    $( document ).ready( function () {
        console.log("Ready, getting players!");
        window.game = {"player1": "", "player2": ""};
        getAllPlayersAndRenderToPage();
        addBasicEventListners();
    });
}());