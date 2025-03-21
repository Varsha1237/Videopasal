function manage_spatial_navigation(containerClass, favoriteStatus, vodId) {
    switch (containerClass) {
        case "menu_container":
            set_focus('menuList', 'menu0');

            // When menu foucs
            $('#menuList').on('sn:focused', function (e) {
                var id = e.target.id;
                $(".selected-menu").removeClass("selected-menu");
                $("#" + id).addClass("selected-menu");
                $(".menu_container").addClass("wide_menu_container");
                $(".nav_items").addClass("wide_nav_container");
                $("#menuLogo").attr("src", "");
                $("#menuLogo").attr("src", "../images/logo.png");
                $("#menuLogo").removeClass("menu_img_small");
            });

            $('#menuList').on('sn:enter-down', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX = $("#" + e.target.id).index();
                $("#searchInputText").removeClass("empty");
                hide_left_side_bar();
                if (localStorage.getItem("days_left") == "0" && MENU_INDEX <= 4) {
                    change_screens("");
                    show_left_side_bar();
                    show_hide_popups(true, APP_MESSAGE[0], "empty_modal");
                } else {
                    show_hide_popups(false, APP_MESSAGE[0], "empty_modal");
                    selected_menu_data();
                }
            });

            $('#menuList').on('sn:unfocused', function (e) {
                $(".menu_container").removeClass("wide_menu_container");
                $(".nav_items").removeClass("wide_nav_container");
                $("#menuLogo").addClass("menu_img_small");
                $("#menuLogo").attr("src", "");
                $("#menuLogo").attr("src", "../images/favicon-3.png");
                $(".selected-menu").removeClass("selected-menu");
                $("#menu" + MENU_INDEX).addClass("selected-menu");
            });

            break;

        case "detail_container":
            set_focus('detail_container', 'bottom_container');

            $('#watch_movie').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = 17;
            });

            $('#watch_movie').on('sn:enter-down', function (e) {
                $(".exit_modal_container").show();
                setTimeout(function() {
                        VOD_URL = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
                        //SELECTED_ITEM_DATA['stream_file'];
                        console.log(VOD_URL);
                        change_screens("video_container");
                        load_video();
                        $(".exit_modal_container").hide();
                }, 8000); 
               
            });

            $('#play_trailer').on('sn:enter-down', function (e) {
                VOD_URL = SELECTED_ITEM_DATA['stream_trailer'];
                SELECTED_ITEM_DATA['stream_trailer'];
                change_screens("video_container");
                load_video();
            });

            break;

        case "search_container":
            set_focus('search_box', 'searchInputText');

            // When menu foucs
            $('#search_box').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                LAST_FOCUSED_ITEM = e.target.id;
            });

            $('#search_box').on('sn:enter-down', function (e) {
                request_search_results();
            });

            break;

        case "modal_subscription":
            set_focus('okModal', 'okButton');

            //When menu foucs
            $('#okModal').on('sn:focused', function (e) {
                console.log(" OK Modal focus...");
            });

            $('#okButton').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                show_hide_popups(false, "", "modal_subscription");
                SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM);
            });

            break;

        case "MSG":
            set_focus('subscription_msg', 'msgButton');
            console.log(" OK subscription_msg...");
            $('#msgButton').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                // $(".subscription_msg").hide();
                // SN.focus("#videoPlayer");
            });

            break;

        case "account_container":
            set_focus('logout_exit_buttons', 'account_logout');

            // When menu foucs
            $('#logout_exit_buttons').on('sn:focused', function (e) {
                console.log("account_logout focus...");
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
            });

            $('#account_logout').on('sn:enter-down', function (e) {
                console.log("account_logout enter...");
                hide_show_modal(true, 'LOGOUT', APP_LOGOUT_MSG);

            });

            $('#account_exit').on('sn:enter-down', function (e) {
                console.log("account_exit enter...");
                hide_show_modal(true, 'EXIT', APP_EXIT_MSG);

            });

            break;

        case "result_box":
            set_focus('searchResult', 'search_0');

            // When menu foucs
            $('#searchResult').on('sn:focused', function (e) {
                console.log("search_0 focus...");
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
            });

            $('#searchResult').on('sn:enter-down', function (e) {
                console.log("search_ enter...");
                var searchInputVal = $("#searchInputText").val();

                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY["search"][i];
                if (APP_DATA_ARRAY["search"][i]["type"] == "M") {
                    console.log("show_detail_page", APP_DATA_ARRAY["search"][i]["type"]);
                    $(".banner_back_color").addClass("banner_back_color_full");
                    $(".banner_back_img").addClass("banner_back_img_full");
                    show_detail_page();
                }
                else if (APP_DATA_ARRAY["search"][i]["type"] == "S") {
                    console.log("episode_screen_page", APP_DATA_ARRAY["search"][i]["type"]);
                    getEpisodeData();
                }
            });

            break;



        case "EXIT":
            set_focus('exitModal', 'noButton');

            $('#exitModal').on('sn:focused', function (e) {
                console.log("exitModal focus");
            });

            $('#noButton').on('sn:enter-down', function (e) {
                var name = $(".modal_container").attr("data-modal-name");
                console.log("no button enter");
                console.log('hide popup');
                if ($(".modal_container").hasClass("active") && MENU_INDEX !== 10 && name == "EXIT") {
                    if (MENU_INDEX == 0) $(".home_container").addClass("active");
                    else if (MENU_INDEX == 1) $(".search_container").addClass("active");
                    else if (MENU_INDEX == 8) $(".about_container").addClass("active");
                    
                    show_left_side_bar();
                    console.log("menuList focus...");
                    SN.focus("menuList");
                    hide_show_modal(false, 'EXIT');
                } else if ($(".modal_container").hasClass("active") && MENU_INDEX == 10 && name == "EXIT") {
                    $(".account_container").addClass("active");
                    console.log("account_exit focus...");
                    hide_show_modal(false, 'EXIT');
                    SN.focus("logout_exit_buttons");
                } else if (MENU_INDEX == 0 && $(".home_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu0");
                } else if (MENU_INDEX == 1 && $(".search_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu1");
                }
               
            });

            $('#yesButton').on('sn:enter-down', function (e) {
                console.log('exit app');
                if ($(".modal_container").attr("data-modal-name") === "EXIT") {
                    tizen.application.getCurrentApplication().exit();
                }
            });
            break;

        case "RETRY_CANCEL": set_focus('retryModal', 'retryButton');
            SN.focus("retryModal");

            $('#retryModal').off('sn:enter-down');
            $('#retryModal').on('sn:enter-down', function (e) {
                console.log("retryModal sn:enter-down");
                var modalName = "RETRY_CANCEL";
                hide_show_modal(false, modalName);
                if ($("#retryButton").is(":focus")) {
                    setTimeout(function () { load_video(); }, 1000);
                } else if ($("#cancelButton").is(":focus")) {
                    hide_show_modal(false, modalName);

                }
            });

            break;

        case "RETRY_EXIT": set_focus('retryModal', 'retryButton');
            SN.focus("retryModal");

            $('#retryModal').off('sn:enter-down');
            $('#retryModal').on('sn:enter-down', function (e) {
                console.log("retryModal sn:enter-down");
                var modalName = "RETRY_CANCEL";
                hide_show_modal(false, modalName);
                if ($("#retryButton").is(":focus")) {
                    console.log('hide popup');
                    hide_show_modal(false, 'EXIT');

                } else if ($("#cancelButton").is(":focus")) {
                    console.log('exit app');
                    closeVideo();
                    tizen.application.getCurrentApplication().exit();
                    // window.close();
                }
            });
            break;
    }
}

function set_focus(containerId, itemId) {
    console.log("set focus");
    var restrictVal = "self-first";
    if (containerId == "EXIT" || containerId == "RETRY_CANCEL") restrictVal = "self-only";

    SN.remove(containerId);
    SN.add({
        id: containerId,
        selector: '#' + containerId + ' .focusable',
        restrict: restrictVal,
        defaultElement: '#' + itemId,
        enterTo: 'last-focused'
    });
    SN.makeFocusable();
}

function set_category_list_focus(row_num) {
    console.log("set homepage list focus");

    if (!APP_DATA_ARRAY || !APP_DATA_ARRAY["pasalItems"]) {
        console.error("APP_DATA_ARRAY['pasalItems'] is undefined or empty.");
        return;
    }

    const restrictVal = "self-first";
    const total = _.size(APP_DATA_ARRAY);

    for (let i = row_num; i < total; i++) {
        let containerId = "home_list_" + i;
        let itemId = "row_" + i;

        console.log(itemId);
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: `#${containerId} .focusable`,
            restrict: restrictVal,
            defaultElement: `#${itemId}`,
            enterTo: "last-focused"
        });
        SN.makeFocusable();
    }

    // Handle menu focus
    $('[id^=row_]').off('sn:focused').on('sn:focused', function (e) {
        console.log("home_list item focus...");
        FIRST_PAGE_FOCUSED_ITEM = e.target.id;
        console.log(FIRST_PAGE_FOCUSED_ITEM);

        let index = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
        console.log(index);

        if (APP_DATA_ARRAY["pasalItems"][index]) {
            SELECTED_ITEM_DATA = APP_DATA_ARRAY["pasalItems"][index];
            set_top_banner(); // Removed `0` as the parameter was unused.
        } else {
            console.warn("Invalid index for pasalItems:", index);
        }
    });

    // Handle enter key
    $('[id^=row_]').off('sn:enter-down').on('sn:enter-down', function (e) {
        let index = $("#" + e.target.id).index();

        if (APP_DATA_ARRAY["pasalItems"][index]) {
            PAGE_INDEX = TAB_INDEX = 0;
            SELECTED_ITEM_DATA = APP_DATA_ARRAY["pasalItems"][index];
            change_screens("detail_container");
            banner_details_page();
        } else {
            console.warn("Invalid index for pasalItems on enter:", index);
        }
    });
}


function set_search_list_focus(row_num) {
    console.log("set_search_list_focus");
    var restrictVal = "self-first";
    var total = _.size(APP_DATA_SEARCH_ARRAY);

    for (let i = row_num; i < total; i++) {
        let containerId = "category_result_box_inner" + i;
        let itemId = "search_" + i + "_0";
        console.log(itemId);

        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
    }

    SN.makeFocusable(); // Ensuring it runs only once per function call.

    // Prevent multiple event bindings
    if (!$(document).data('search_events_bound')) {
        $(document).data('search_events_bound', true);

        // When menu focus
        $(document).on('sn:focused', '[id^=search_]', function (e) {
            console.log("home_list item focus...");
            PAGE_INDEX = TAB_INDEX = 0;
            SEARCH_PAGE_FOCUSED_ITEM = e.target.id;
        });

        // On enter key press
        $(document).on('sn:enter-down', '[id^=search_]', function (e) {
            PAGE_INDEX = TAB_INDEX = 0;
            SELECT_SEARCH_ITEM = '5';
            SEARCH_PAGE_FOCUSED_ITEM = e.target.id;

            let i = $("#" + SEARCH_PAGE_FOCUSED_ITEM).index();
            if (APP_DATA_SEARCH_ARRAY?.pasalItems && APP_DATA_SEARCH_ARRAY.pasalItems[i]) {
                SELECTED_ITEM_DATA = APP_DATA_SEARCH_ARRAY.pasalItems[i];
                change_screens("detail_container");
                banner_details_page();
            } else {
                console.error("Invalid index:", i);
            }
        });
    }
}
