function getHomeData() {
    $("#loader").show();
    console.log("Fetching home data...");

    $.ajax({
        type: "GET",
        url: APP_DOMAIN + "/getPasalItems",
        async: true,
        dataType: "json",
        headers: {
            "app-version": "3",
            "User-Agent": "okhttp/4.9.2",
            "os": "browser"
        },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            $("#loader").hide(); // Hide loader on success

            console.log("API Response:", data);

            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                setHomePageData(0);
            } else {
                hide_show_modal(true, "RETRY_EXIT", NET_CONNECTION_ERR);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide(); // Ensure loader hides on error
            let msg = navigator.onLine ? SOMETHING_WENT_WRONG : NET_CONNECTION_ERR;
            console.error("API Error:", xhr, error);
            hide_show_modal(true, "RETRY_EXIT", msg);
        }
    });
}



function getSearchData() {
    var searchText = get_searched_text();
    $("#loader").show();

    $.ajax({
        type: "GET",
        url: APP_DOMAIN + "/getPasalItems/search",
        async: true,
        dataType: 'json',
        headers: {
            "User-Agent": "okhttp",
            "app-version": "3",
            "User-Agent": "okhttp/4.9.2",
            "os": "browser"
        },
        data: { "q": searchText },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            console.log("API Response:", data);

            if (_.size(data) > 0) {
                APP_DATA_SEARCH_ARRAY = data || {}; // Ensure APP_DATA_SEARCH_ARRAY is always an object
                set_search_result();
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>No record found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            var msg = navigator.onLine ? SOMETHING_WENT_WRONG : NET_CONNECTION_ERR;
            console.error("AJAX Error:", xhr, error);
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}
