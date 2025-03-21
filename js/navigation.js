window.addEventListener('load', function () {
    set_focus('videoPlayer', 'video_container');
    $('#videoPlayer').on('sn:focused', function (e) {
    });

    set_focus('videoNextPrevious', 'playPauseVideo');

    $('#videoNextPrevious').on('sn:focused', function (e) {
        $("#playPreviousVideo").find("img").attr("src", "images/previous_video.png");
        $("#playPauseVideo").find("img").attr("src", "images/pause.png");
        $("#playNextVideo").find("img").attr("src", "images/next_video.png");

        if (e.target.id == "playPreviousVideo") $("#playPreviousVideo").find("img").attr("src", "images/previous_video_focus.png");
        if (e.target.id == "playNextVideo") $("#playNextVideo").find("img").attr("src", "images/next_video_focus.png");

    });

    // Next/Previous Video
    $('#videoNextPrevious').on('sn:enter-down', function (e) {
        if ($("#playPreviousVideo").is(":focus")) {
            previous_next_video(type = "previous");

        } else if ($("#playPauseVideo").is(":focus")) {
            if ($("#av-player").css('display') == 'block') {
                if (webapis.avplay.getState() == "PAUSED") {
                    $(".pause-icon").hide();
                    $("#videoNextPreviousPlayPauseIcon").attr('src', 'images/pause.png');
                    $(".video-title").text('');
                    if (webapis.avplay.getState() == "PAUSED") {
                        var currentTime = webapis.avplay.getCurrentTime();
                        var forwardTime = sessionStorage.video_forward_time;
                        var resultant = parseInt(forwardTime) - parseInt(currentTime);
                        var resultantTime = Math.abs(resultant);

                        if (sessionStorage.FWD_RWD_key_press == 1) {
                            $(".video-inner").show();
                            $(".circle_loader").addClass('circle-loader-middle');

                            if (resultant > 0) {
                                resultantTime = parseInt(resultantTime - 5000);
                                jumpForwardVideo(resultantTime);
                            } else {
                                resultantTime = parseInt(resultantTime + 5000);
                                if (currentTime - resultantTime < 0) resultantTime = currentTime;
                                jumpBackwardVideo(resultantTime);
                            }
                            sessionStorage.FWD_RWD_key_press = 0;
                        } else {
                            if (webapis.avplay.getState() == "PAUSED") {
                                try {
                                    playVideo();
                                } catch (e) {
                                    playVideo();
                                    console.log("error in play video: " + e);
                                }
                            } else if (webapis.avplay.getState() == "PLAYING") {
                                $(".pause-icon").show();
                                pauseVideo();
                                webapis.avplay.pause();
                            }
                        }
                    }

                } else if (webapis.avplay.getState() == "PLAYING") {
                    $(".pause-icon").show();
                    pauseVideo();
                    webapis.avplay.pause();
                }
            }

        } else if ($("#playNextVideo").is(":focus")) {
            previous_next_video(type = "next");
        }
    });

    // When something press from remote keys
    $(window).keydown(function (evt) {
        console.log("key event", evt.keyCode);
        var elementId = evt.target.id;

        switch (evt.keyCode) {
            case 13: // Ok
                console.log("Ok key");
                if ($(".video_container").hasClass("active")) {
                    if ($("#msgButton").is(":focus")) {
                        $(".subscription_msg").hide();
                        SN.focus("#videoPlayer");
                    }
                    else if ($("#av-player").css('display') == 'block' && (TAB_INDEX == 14) && $("#video_container").is(":focus")) {
                        if (webapis.avplay.getState() == "PAUSED") {
                            $(".pause-icon").hide();
                            $("#videoNextPreviousPlayPauseIcon").attr('src', 'images/pause.png');
                            $(".video-title").text('');
                            if (webapis.avplay.getState() == "PAUSED") {
                                var currentTime = webapis.avplay.getCurrentTime();
                                var forwardTime = sessionStorage.video_forward_time;
                                var resultant = parseInt(forwardTime) - parseInt(currentTime);
                                var resultantTime = Math.abs(resultant);

                                if (sessionStorage.FWD_RWD_key_press == 1) {
                                    $(".video-inner").show();
                                    $(".circle_loader").addClass('circle-loader-middle');

                                    if (resultant > 0) {
                                        resultantTime = parseInt(resultantTime - 5000);
                                        jumpForwardVideo(resultantTime);
                                    } else {
                                        resultantTime = parseInt(resultantTime + 5000);
                                        if (currentTime - resultantTime < 0) resultantTime = currentTime;
                                        jumpBackwardVideo(resultantTime);
                                    }
                                    sessionStorage.FWD_RWD_key_press = 0;
                                } else {
                                    if (webapis.avplay.getState() == "PAUSED") {
                                        try {
                                            playVideo();
                                        } catch (e) {
                                            playVideo();
                                        }
                                    } else if (webapis.avplay.getState() == "PLAYING") {
                                        $(".pause-icon").show();
                                        pauseVideo();
                                        webapis.avplay.pause();
                                    }
                                }
                            }

                        } else if (webapis.avplay.getState() == "PLAYING") {
                            $(".pause-icon").show();
                            pauseVideo();
                            webapis.avplay.pause();
                        }
                    }
                }
                break;

            case 415: // Play
                console.log("play key");
                if ($(".video_container").hasClass("active")) {
                    $("#videoNextPreviousPlayPauseIcon").attr('src', 'images/pause.png');
                    $(".pause-icon").hide();
                    $(".video-title").text('');

                    if (webapis.avplay.getState() == "PAUSED") {
                        var currentTime = webapis.avplay.getCurrentTime();
                        var forwardTime = sessionStorage.video_forward_time;
                        var resultant = parseInt(forwardTime) - parseInt(currentTime);
                        var resultantTime = Math.abs(resultant);

                        if (sessionStorage.FWD_RWD_key_press == 1) {
                            sessionStorage.FWD_RWD_key_press = 0;
                            $(".video-inner").show();
                            $(".circle_loader").addClass('circle-loader-middle');

                            if (resultant > 0) {
                                resultantTime = parseInt(resultantTime); //parseInt(resultantTime - 5000);
                                jumpForwardVideo(resultantTime);
                            } else {
                                resultantTime = parseInt(resultantTime); //parseInt(resultantTime + 5000);
                                if (currentTime - resultantTime < 0) resultantTime = currentTime;
                                jumpBackwardVideo(resultantTime);
                            }

                        } else {
                            if (webapis.avplay.getState() == "PAUSED") {
                                try {
                                    playVideo();

                                } catch (e) {
                                    playVideo();
                                }
                            } else if (webapis.avplay.getState() == "PLAYING") {
                                try {
                                    pauseVideo();

                                } catch (e) {
                                    pauseVideo();
                                }
                            }
                        }
                    }
                }
                break;

            case 19: // Pause 102
                console.log("pause key");
                if ($(".video_container").hasClass("active")) {
                    if (webapis.avplay.getState() == "PLAYING" && $('#av-player').is(':visible')) {
                        pauseVideo();
                    }
                }
                break;

            case 412: // Rewind 82
                console.log("rewind key");
                rewind_video();
                break;

            case 417: // FastForward
                console.log("fastForward key");
                forward_video();
                break;


            case 10009: // Return key
                console.log("return key");
                if ($('.modal_container').hasClass('active')) {
                    var name = $(".modal_container").attr("data-modal-name");
                    hide_show_modal(false, name);
                } else if ($(".video_container").hasClass("active")) {
                    $(".main_container").show();
                    closeVideo();
                }
                else if ($(".menu_container").hasClass("wide_menu_container") && ($(":focus").parent().attr("id") == 'menuList')) {
                    hide_left_side_bar();
                    hide_show_modal(true, 'EXIT', APP_EXIT_MSG);
                } else if ($(".detail_container").css("display") == "block" && $(".detail_container").hasClass("active")) {
                    var className = "";
                    if (SELECTED_ITEM_DATA["season_code_RK"] !== undefined) {
                        className = "show_container";
                    } else {
                        if (MENU_INDEX == 0) className = "home_container";
                        else if (MENU_INDEX == 1) className = "search_container";
                        else if (MENU_INDEX == 2) className = "most_watched_container";
                        else if (MENU_INDEX == 3) className = "favorite_container";
                        else if (MENU_INDEX == 4) className = "watch_later_container";
                        $(".navbar_sidebar").show();
                    }

                    change_screens(className);
                    $(".banner_back_color").removeClass("banner_back_color_full");
                    $(".banner_back_img").removeClass("banner_back_img_full");
                    if (SELECTED_ITEM_DATA["season_code_RK"] !== undefined) SN.focus("#" + SECOND_PAGE_FOCUSED_ITEM);
                    else SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM);

                } 

                break;

            case 37: // LEFT arrow
                console.log("left key");
                // if ($('.search_container').hasClass('active') && ($("#searchInputText").is(":focus"))) {
                //     var textEntered = $.trim($(':focus').val());
                //     if (textEntered) controlLeftArrowKeys();
                // } 
                break;

            case 39: // RIGHT arrow
                console.log("right key");
                // if ($('.search_container').hasClass('active') && ($("#searchInputText").is(":focus"))) {
                //     var textEntered = $.trim($(':focus').val());
                //     if (textEntered) controlrightArrowKeys();
                // }
                    if ($("#modal_msg_container").hasClass("active")) {
                        if ($(".modal_subscription").css("display") == "block") {
                            hide_left_side_bar();
                            SN.focus("modal_subscription");
                        } else show_left_side_bar();
                    } else if ($('.about_container').hasClass('active') && MENU_INDEX == 8  && PAGE_INDEX == 8 && $(":focus").parent().attr("id") == "menuList") {
                        manage_spatial_navigation("about_container");
                        SN.focus("about_inner");
                    }
                    else if ($('.search_container').hasClass('active') && $(":focus").parent().attr("id") == "menuList") {
                        hide_left_side_bar();
                        if (_.size(APP_DATA_ARRAY['search']) > 0) SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM);
                        else SN.focus("search_box");
                    }else if ($('.account_container').hasClass('active') && MENU_INDEX == 2) {
                        SN.focus("logout_exit_buttons");
                    }

               
                break;

            case 413: // Stop button
                console.log("stop key");
                if ($('#video_container').is(':visible') && $('#video_container').hasClass('active')) {
                    closeVideo();
                }
                break;

            case 40: //Down key
                console.log("down key");
                if ($('.home_container').is(':visible') && $('.home_container').hasClass('active') && $('[id^=row_]').is(":focus")) {
                    var i = Number($("#" + FIRST_PAGE_FOCUSED_ITEM).parent().attr("data-index"));
                    SN.focus("home_list_" + (Number(i) + 1));
                }
               
                break;

            case 38: //Up key
                console.log("up key");
                if ($('.home_container').is(':visible') && $('.home_container').hasClass('active') && $('[id^=row_]').is(":focus")) {
                    var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).parent().attr("data-index");
                    if (i > 0) SN.focus("home_list_" + (Number(i) - 1));
                }
                break;

            case 427:    //ChannelUp key
                console.log("channelUp");
                break;

            case 428:    //ChannelDown key
                console.log("channelDown");
                break;


            case 65376: // Done from IME keyboard
                console.log("OK from keyboard...");
                if ($(".search_container").hasClass("active")) {
                    if (!$('#searchInputText').is(":focus")) $('#searchInputText').focus();
                    else request_search_results();
                }
                break;

            case 65385: // Cancel from IME keyboard
                console.log("Cancel from keyboard...");
                // set search text in hidden div
                // document.getElementById('searchInputText').blur();
                break;

            default:
                console.log("Key code : " + evt.keyCode);
                break;
        }
    });
});