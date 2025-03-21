function parse_main_feed() {
    console.log("parse_main_feed");
    call_navigation_func();
}
var category_list = ["recently_added","time_pass","popular","drama,Romance","popular,Comedy","drama,Suspense,Action"];
function call_navigation_func() {
    manage_spatial_navigation("menu_container");

    manage_spatial_navigation("detail_container");

    manage_spatial_navigation("show_episode_detail_container");

    manage_spatial_navigation("search_container");

    manage_spatial_navigation("result_box");

    manage_spatial_navigation("account_container");

    manage_spatial_navigation("modal_subscription");

}

// function image_error(image) {
//     image.onerror = "";
//     return image.src = "../images/default_thumbnail.jpg";
// }

// function poster_image_error(image) {
//     image.onerror = "";
//     return image.src = "../images/default_poster.jpg";
// }

function selected_menu_data() {
    switch (MENU_INDEX) {
        case 0:
            if (!$(".home_container").hasClass("active")) {
                getHomeData();
            } else SN.focus("home_list_0");
            break;
        case 1:
            if (!$(".search_container").hasClass("active")) {
                $("#searchInputText").val('');
                $("#searchResult").html("");
                change_screens("search_container");
                SN.focus("#searchInputText");
            } else SN.focus("#searchInputText");

            break;
    
        case 2:
            if (!$(".account_container").hasClass("active")) {
                account_details();
            SN.focus("#account_logout");
            }
            break;
        default:
            console.log("default case executed.");
            break;
    }
}


let globalItemCounter = 0;

function setHomePageData(index) {
    let str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';

    const totalItems = APP_DATA_ARRAY['pasalItems'].length;
    console.log(totalItems);

    if (index === 0) $("#homeList").html("");

    str += `<div class="list_row">
                <h2 class="list_heading">${APP_DATA_ARRAY['pasalItems'][index]['name']}</h2>
                <div class="video_listing">
                    <ul class="listing_inner" id="home_list_${index}" data-index="${index}">`;

    for (let i = 0; i < totalItems; i++) {
        const item = APP_DATA_ARRAY['pasalItems'][i];
        console.log(index);
        // Check if the item's category matches the current category
        if (APP_DATA_ARRAY['pasalItems'][i]['category'] && APP_DATA_ARRAY['pasalItems'][i]['category'].includes(category_list[index])){
            const id = `row_${globalItemCounter}`; // Unique and sequential ID

            upFocus = `data-sn-up="null"`;
            downFocus = `data-sn-down="null"`;

            rightFocus = (i === totalItems - 1) ? `data-sn-right="null"` : `data-sn-right="#row_${globalItemCounter + 1}"`;
            leftFocus = (i === 0) ? `data-sn-left="#menu0"` : `data-sn-left="#row_${globalItemCounter - 1}"`;

            str += `<li class="thumbnail_box focusable" tabindex="${NAVIGATION_INDEX}" id="${id}" ${rightFocus} ${leftFocus} ${upFocus} ${downFocus}>
                        <img class="home_thumbnail_image" src="${item['images']["topBanner"]}" alt="">
                    </li>`;
            NAVIGATION_INDEX++;
            globalItemCounter++; // Increment the global counter after adding an item
        }
    }

    str += `        </ul>
                </div>
            </div>`;

    $(".navbar_sidebar, .main_container").show();
    change_screens("home_container");
    $("#loader").hide();
    $("#homeList").append(str);

    set_category_list_focus(0);
    SN.focus("home_list_0");
    set_top_banner();

    index = index + 1;
    if (index < _.size(APP_DATA_ARRAY)) setHomePageData(index);
}




function request_search_results() {
    console.log('search results request...');
    searchText = get_searched_text();
    if (searchText != "") {
        getSearchData();
    } else {
        console.log('input text enter');
        $(".result_not_found").hide();
        $("#searchInputText").attr("placeholder", "Please enter text here.").addClass("empty");
        SN.focus('search_bar');
    }
}

function get_searched_text() {
    return $.trim($('#searchInputText').val());
}

function set_search_result() {
    console.log("set_search_result");
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalItem = _.size(APP_DATA_SEARCH_ARRAY['pasalItems']);


    if (_.size(APP_DATA_SEARCH_ARRAY['pasalItems']) > 0) {
        str += '<h2 class="search_heading search_result">Search Result</h2>';
        str += '<div class="result_box">';
        str += '<ul class="result_box_inner" id="category_result_box_inner">';


        for (var i = 0; i < totalItem; i++) {
           
            id = ' id = "search_' + i + '"';
            if (i < 7) upFocus = 'data-sn-up="#searchInputText"';
            else upFocus = ' data-sn-up="#search_' + (i - 7) + '"';

            if (i == totalItem) downFocus = ' data-sn-down="null"';
            else downFocus = ' data-sn-down="#search_' + (i + 7) + '"';

            if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
            else rightFocus = ' data-sn-right="#search_' + (i + 1) + '" ';

            if (i % 7 == 0) leftFocus = ' data-sn-left="#menu1"';
            else leftFocus = ' data-sn-left="#search_' + (i - 1) + '" ';

            str += '<li class="search_thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
            str += '<img class="search_thumbnail_image" src="' + APP_DATA_SEARCH_ARRAY['pasalItems'][i]['images']["fourthImage"] + '">';
            str += '</li>';

        }
        NAVIGATION_INDEX++;

        str += '</div>';
        str += '</div>';
        str += '</ul>';

        $(".search_container").show();
        $("#msg_box").empty();
        $("#searchResult").show();
        $("#loader").hide();
        $("#searchResult").html(str);
        SN.focus("searchResult");
        set_search_list_focus();
    } else {
        console.log("Result not found");
        $("#loader").hide();
        $("#searchResult").hide();
        $("#msg_box").css("display", "block");
        $("#msg_box").html("<h2 class='no_record_found'>No record found.</h2>");
    }

}



function account_details() {
    console.log("account_details");
    $("#account_name").text(localStorage.getItem('full_name'));
    $("#account_mail").text(localStorage.getItem('email'));
    $("#account_sub").text(localStorage.getItem('plan_name'));
    if (localStorage.getItem("subscription_status") == "ACTIVE" && localStorage.getItem("days_left") != "0") {
        $("#subscription_period").html('<span class="about account_exp" id="account_pre">' + localStorage.getItem('previous_payment') + '</span><span class="account_to">&nbsp;&nbsp;to&nbsp;</span><span class="about account_exp" id="account_exp">' + localStorage.getItem('next_payment') + '</span>');
    } else $("#subscription_period").html('<span class="about account_exp" id="account_pre">NOT SUBSCRIBED</span>');
    if (MENU_INDEX == 2) change_screens("account_container"); SN.focus("#account_logout");
}



function set_top_banner(index) {
    $("#banner_detail").html(""); 
    let str = '';

    const images = [
        SELECTED_ITEM_DATA["images"]["fourthImage"],
        SELECTED_ITEM_DATA["images"]["thirdImage"],
        SELECTED_ITEM_DATA["images"]["tileBanner"],
        SELECTED_ITEM_DATA["images"]["topBanner"],
    ];

    let currentIndex = 0;
    
    function updateSlider() {
        let sliderContainer = document.getElementById("streamPoster");
        
        // Add fade-out effect
        sliderContainer.classList.add("fade-out");

        setTimeout(function () {
            sliderContainer.src = images[currentIndex];
            
            // Add fade-in effect
            sliderContainer.classList.remove("fade-out");
            sliderContainer.classList.add("fade-in");
        }, 500);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    // Auto-slide every 3 seconds
    let autoSlide = setInterval(nextSlide, 3000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3000);
    }

    // Banner HTML structure
    str += `
        <div class="banner_detail_box">
            <ul class="movie_detail_row" id="movie_detail_row">
                <div class="banner_background">
                    <img class="banner_back_img fade-in" id="streamPoster" src="${images}" alt="poster">
                </div>
            </ul>
            <button onclick="prevSlide(); resetAutoSlide();" class="slider-btn">❮</button>
            <button onclick="nextSlide(); resetAutoSlide();" class="slider-btn">❯</button>
        </div>
    `;

    if (MENU_INDEX == 0) {
        $("#banner_detail").html(str);
        updateSlider();
    }
}

function banner_details_page() {
    //console.log("set_top_banner.....");
    var str = '';
    title = SELECTED_ITEM_DATA["name"],
    Description = SELECTED_ITEM_DATA["description"],
    streamPoster = SELECTED_ITEM_DATA["images"]["topBanner"],
    actor = SELECTED_ITEM_DATA["actors"][0],
    producers = SELECTED_ITEM_DATA["producers"][0],
    directors = SELECTED_ITEM_DATA["directors"][0],
    str += '<div class="top_banner_background"><img class="detail_banner_back_color" src="images/detail_background_color.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    str += '<div class="top_detail_box" id="bottom_container">';
    if (typeof title != "undefined") str += '<div class="details_movie_div"><p class="movie_name">' + title + '</p><span class="home_reddot"></span></div>';
    if (typeof Description != "undefined") str += '<div class="details_main_bxx"><div class="details_movie_disc">' + Description + '</div>';
    if (typeof actor != "undefined") str += '<div class="details_main_bxx"><div class="details_span"><span class="actors">Actors: </span>' + actor + '</div> </div>';
    if (typeof producers != "undefined") str += '<div class="details_main_bxx"><div class="details_span"><span class="actors">Producer: </span>' + producers + '</div> </div>';
    if (typeof directors != "undefined") str += '<div class="details_main_bxx"><div class="details_span"><span class="actors">Directors: </span>' + directors + '</div> </div>';
    str +='</div>';
    str +='<div class="bottom-container">';
    str +='<div class="watch-button focusable" tabindex="3" id="watch_movie" data-sn-right="#watch_trailer"data-sn-left="null" data-sn-up="null" data-sn-down="null">Watch Movie</div>';
    str +='<div class="watch-button focusable" tabindex="3" id="watch_trailer" data-sn-right="null"data-sn-left="#watch_movie" data-sn-up="null" data-sn-down="null">Watch trailer</div>';
    str +='</div>';
    $("#detail_container").html("");
    $("#detail_container").html(str);
    manage_spatial_navigation("detail_container");
     SN.focus("#watch_movie");
}

function hide_left_side_bar() {
    // $(".menu_container").removeClass("wide_menu_container");
    // $(".nav_items").removeClass("wide_nav_container");
    // $("#menuLogo").addClass("menu_img_small");
    // $("#menuLogo").attr("src", "");
    // $("#menuLogo").attr("src", "../images/menu_icon.png");
    // $(".selected-menu").removeClass("selected-menu");
    // $("#menu" + MENU_INDEX).addClass("selected-menu");
}

function show_left_side_bar() {
    console.log("show_left_side_bar");
    $("#menuLogo").removeClass("menu_img_small");
    $(".menu_container").addClass("wide_menu_container");
    $(".nav_items").addClass("wide_nav_container");
    $("#menuLogo").attr("src", "");
    $("#menuLogo").attr("src", "../images/logo.png");
    SN.focus("menuList");
}


// function change_button_focus(id) {
//     console.log("change_button_focus");
//     if (id == 'play_btn') $("#" + id).find("img").attr("src", "./images/play_active.png");
//     else $("#play_btn").find("img").attr("src", "images/play_icon.png");

//     if (id == 'play_trailer') $("#" + id).find("img").attr("src", "./images/trailer_active.png");
//     else $("#play_trailer").find("img").attr("src", "images/trailer_icon.png");

//     if (id == 'add_favorites') {
//         if (SELECTED_ITEM_DATA.isFavourite == "1") $("#" + id).find("img").attr("src", "./images/remove_favorite.png");
//         else $("#" + id).find("img").attr("src", "./images/add_to_favorite_active.png");
//     }
//     else {
//         if (SELECTED_ITEM_DATA.isFavourite == "1") $("#add_favorites").find("img").attr("src", "./images/remove_active.png");
//         else $("#add_favorites").find("img").attr("src", "./images/add_to_favorite.png");
//     }

//     if (id == 'rate_now') $("#" + id).find("img").attr("src", "./images/rate_now_active.png");
//     else $("#rate_now").find("img").attr("src", "images/rate_now.png");

//     if (id == 'watchLater') {
//         if (SELECTED_ITEM_DATA.isWatchlater == "1") $("#" + id).find("img").attr("src", "./images/watch_later_minus.png");
//         else $("#" + id).find("img").attr("src", "./images/watch_later_plus.png");
//     }
//     else {
//         if (SELECTED_ITEM_DATA.isWatchlater == "1") $("#watchLater").find("img").attr("src", "./images/watch_later_minus_active.png");
//         else $("#watchLater").find("img").attr("src", "./images/watch_later_plus_active.png");
//     }

// }
