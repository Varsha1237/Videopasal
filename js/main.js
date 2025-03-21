window.onload = function () {
    window.SN = SpatialNavigation;
    SN.init();
    $("span#modal_container").load("modal.html");
    $(".main_container").show();
    var email = localStorage.getItem("email");
    console.log(email);
        getHomeData();
        $(".main_container").show();
        $(".navbar_sidebar").show();
        //show_left_side_bar();
        parse_main_feed();

};