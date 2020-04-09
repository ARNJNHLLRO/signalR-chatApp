$(document).ready(function () {
    var game = new Game();
    game.InitializeEvent();
});

function Game() {
    var gm = this;

    this.InitializeEvent = function () {
        $.connection.hub.start();
        var game = $.connection.chatHub;
        var ctr = 0;

        $('.one').val(1);
        $('.two').val(1);
        $('.operator-type').val('ADDITION');

        var username = prompt("Enter your name");
        if (username != null) {
            sessionStorage.setItem('username', username);
        }
       

        $('#txtAnswer').keyup(function (e) {
            if (e.which == 13) {
                var numberOne = $('.one').val();
                var numberTwo = $('.two').val();
                var username = sessionStorage.getItem('username');
                var operatorType = $('.operator-type').val();

                if (operatorType == 'ADDITION') {
                    operatorType = 1;
                } else {
                    operatorType = 2;
                }

                $.connection.hub.start().done(function () {
                    game.server.submitAnswer(numberOne.toString(), numberTwo.toString(), operatorType.toString(), username);
                });
            }
        });

        game.client.buzzMessage = function (name) {
            MaterialNotify(name + ' has got the answer', 'info');
        }

        game.client.checkAnswer = function (sum, name) {
            var answer = $('#txtAnswer').val();
            ctr++;

            if (sum == answer) {

                $.connection.hub.start().done(function () {
                    game.server.buzz(name);
                });

                var one = Math.random();
                var two = Math.random();
                var operatorType = "";

                one = one * 1000;
                two = two * 1000;

                one = Math.floor(one);
                two = Math.floor(two);

                if ((ctr % 2) == 0) {
                    operatorType = "ADDITION";
                } else {
                    operatorType = "SUBTRACTION";
                }

                $.connection.hub.start().done(function () {
                    game.server.reset(one, two, operatorType);
                });

                $('#txtAnswer').val('');
            }
        }

        game.client.setNewValues = function (numberOne, numberTwo, operatorType) {
            console.log(numberOne)
            if (operatorType == 1) {
                $('.operator-type').val('ADDITION');
                $('.operator-type').html('ADDITION');
            } else {
                $('.operator-type').val('SUBTRACTION');
                $('.operator-type').html('SUBTRACTION');
            }
            $('.one').val(numberOne);
            $('.two').val(numberTwo);

            $('.one').html(numberOne);
            $('.two').html(numberTwo);
        }
    }
}