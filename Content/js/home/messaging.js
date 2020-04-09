$(document).ready(function () {
    var message = new Messaging();
    message.InitializeEvents();
    sessionStorage.removeItem('roomName');
    $.connection.hub.start();
});

function notificationIsSupported() {
    return typeof window.Notification != "undefined";
};

function Messaging() {
    var msg = this;

    this.InitializeEvents = function () {
        var chat = $.connection.chatHub;
        var ctr = 0;
        var message = $('#txtMessage').val();

        $('.private-messages').hide();
        $('.private-members').hide();

        $('#btnGame').click(function () {
            var x = window.location.replace("AnonChat/Home/Game");
        })

        MaterialConfirm({
            message: 'Would you like to Join a room?'
        }).done(function () {
            $('#mdlRoom').modal('show');
            $('.messages').remove();
            $('.members').remove();
            $('.private-messages').show();
            $('.private-members').show();
        });

        $('.mc-btnno').click(function () {
            MaterialNotify('You will be joining the Public Server Room. Anything you send will be seen by public viewers.', 'info', 2000);
        });

        $('#btnJoin').click(function () {
            var room = $('#txtRoomNumber').val();
            if (!IsEmpty(room)) {
                sessionStorage.setItem('roomName', room);
            } else {
                MaterialNotify('Please enter your room name', 'warning');
            }

            $('.members').html('<span class="badge badge-primary">' + room + '\'s Room Members</span>');
            $('.private-members').html('<span class="badge badge-primary">' + room + '\'s Room Members</span>');
            $('#mdlRoom').modal('hide');
        })

        $('#txtRoomNumber').keyup(function (e) {
            if (e.which == 13) {
                var room = $('#txtRoomNumber').val();
                if (!IsEmpty(room)) {
                    sessionStorage.setItem('roomName', room);
                } else {
                    MaterialNotify('Please enter your room name', 'warning');
                }

                $('#mdlRoom').modal('hide');
                $('.members').html('<span class="badge badge-primary">' + room + '\'s Room Members</span>');
                $('.private-members').html('<span class="badge badge-primary">' + room + '\'s Room Members</span>');
            }
        })

        chat.client.broadcastMessage = function (clientUsername, clientMessage, date) {
            ctr++;

            var flag = true;
            var username = $('#txtUsername').val();
            var htmlString = '<div class="received-messages mb-2" id="' + ctr + '"> ' +
                '<div class="received-from"> ' +
                clientUsername +
                '</div>' +
                '<div class="time-received">' + date + '</div>' +
                '<div class="received-message">' +
                clientMessage +
                '</div>' +
                '</div > ';

            $('.messages').prepend(htmlString);

            displayNotification("ANON CHAT", clientMessage);

            setTimeout(function () {
                if (!$('#' + ctr).hasClass('new')) {
                    $('.received-messages').addClass('new');
                }
            }, 100);

            if (username == clientUsername) {
                $('#' + ctr).css('background-color', '#119e21');
            }

            if (ctr > 0) {
                $('.info').remove();
            }

            $.each($('.members .usernames'), function () {
                var user = $(this).data('usernames');

                if (clientUsername == user) {
                    flag = false;
                }
            });

            if (flag == true) {
                var htmlString = '';
                htmlString = '<div class="usernames" data-usernames="' + clientUsername + '">' + clientUsername + '</div>';

                $('.members').append(htmlString);
            }


            msg.InitializeClickEvents();
        }

        chat.client.populateMessage = function (clientUsername, clientMessage, date, room) {
            ctr++;

            var flag = true;
            var username = $('#txtUsername').val();
            var roomNumber = sessionStorage.getItem('roomName');

            var htmlString = '<div class="received-messages mb-2" id="' + ctr + '"> ' +
                '<div class="received-from"> ' +
                clientUsername +
                '</div>' +
                '<div class="time-received">' + date + '</div>' +
                '<div class="received-message">' +
                clientMessage +
                '</div>' +
                '</div > ';

            if (roomNumber == room) {
                $('.private-messages').prepend(htmlString);
            }

            setTimeout(function () {
                if (!$('#' + ctr).hasClass('new')) {
                    $('.received-messages').addClass('new');
                }
            }, 100);

            if (username == clientUsername) {
                $('#' + ctr).css('background-color', '#119e21');
            }

            if (ctr > 0) {
                $('.info').remove();
            }

            $.each($('.private-members .usernames'), function () {
                var user = $(this).data('usernames');

                if (clientUsername == user) {
                    flag = false;
                }
            });

            if (flag == true) {
                var htmlStr = '';
                htmlStr = '<div class="usernames" data-usernames="' + clientUsername + '">' + clientUsername + '</div>';

                if (roomNumber == room) {
                    $('.private-members').append(htmlStr);
                }
            }

            msg.InitializeClickEvents();
        }

        chat.client.buzzMessage = function (username) {
            MaterialNotify(username + ' wants your attention', 'info', 8000);
        }

        $('#txtMessage').keyup(function (e) {
            if (e.which == 13) {
                var username = $('#txtUsername').val();
                var message = $('#txtMessage').val();
                var room = sessionStorage.getItem('roomName');

                if (username.length < 3) {
                    MaterialNotify('Username must be 3 chacaters and above.', 'warning');
                    $('#txtUsername').focus().select();
                } else if (username.length > 13) {
                    MaterialNotify('Username must be up to 12 characters only.', 'warning');
                    $('#txtUsername').focus().select();
                } else {
                    if (!IsEmpty(username) && !IsEmpty(message)) {
                        message = msg.ReplaceHtmlEntities(message);

                        if (!IsEmpty(room)) {
                            $.connection.hub.start().done(function () {
                                chat.server.privateSend(username, message, room);
                            });
                        } else {
                            $.connection.hub.start().done(function () {
                                chat.server.send(username, message);
                            });
                        }

                        $('#txtMessage').val('');
                    } else {
                        MaterialNotify('Please indicate your message', 'warning');
                    }
                }
            }
        });

        $('#btnSend').click(function () {
            var username = $('#txtUsername').val();
            var message = $('#txtMessage').val();
            var room = sessionStorage.getItem('roomName');

            var message = msg.ReplaceHtmlEntities(message);
            if (username.length < 3) {
                MaterialNotify('Username must be 3 chacaters and above.', 'warning');
                $('#txtUsername').focus().select();
            } else if (username.length > 13) {
                MaterialNotify('Username must be up to 12 characters only.', 'warning');
                $('#txtUsername').focus().select();
            } else {
                if (!IsEmpty(username) && !IsEmpty(message)) {
                    message = msg.ReplaceHtmlEntities(message);

                    if (!IsEmpty(room)) {
                        $.connection.hub.start().done(function () {
                            chat.server.privateSend(username, message, room);
                        });
                    } else {
                        $.connection.hub.start().done(function () {
                            chat.server.send(username, message);
                        });
                    }

                    $('#txtMessage').val('');
                } else {
                    MaterialNotify('Please indicate your message', 'warning');
                }
            }
        });

        $('#btnBuzz').click(function () {
            var username = $('#txtUsername').val();

            if (!IsEmpty(username)) {
                $.connection.hub.start().done(function () {
                    chat.server.buzz(username);
                });

                $(this).prop('disabled', true);

                setTimeout(function () {
                    $('#btnBuzz').prop('disabled', false);
                }, 60000);
            }
        });
    }

    this.ReplaceHtmlEntities = function (message) {
        message = message.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        });

        return message;
    }

    this.InitializeClickEvents = function () {
        $('.received-messages').unbind().click(function () {
            $('.received-messages').removeClass('zoom');

            if (!$(this).hasClass('zoom')) {
                $(this).removeClass('zoom').addClass('zoom');
            } else {
                $(this).removeClass('zoom');
            }
        })
    }
}