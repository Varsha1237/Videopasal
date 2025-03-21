window.onload = function () {
    console.log("login screen");
    window.SN = SpatialNavigation;
    SN.init();
    register_number_keys();
    manage_spatial_navigation("login_container"); // For login container
    manage_spatial_navigation("signup_container"); // For login container
    manage_spatial_navigation("exitModal"); // For login container
    set_focus('login_container', 'email');
    SN.focus("#email");
    document.getElementById('email').value = "nishchal.pandey000@gmail.com";
    document.getElementById('password').value = "computer123";
  
    // SN.focus("#login_container");
  
    // When something press from remote keys
    $(window).keydown(function (evt) {
      console.log("key event", evt.keyCode);
      switch (evt.keyCode) {
        case 10009: //Back/Return
          if ($("#login_container").hasClass("active")) {
            console.log("exit app");
            hide_show_modal(true, 'EXIT', APP_EXIT_MSG);
            $(".exit_modal").show();
            SN.focus("#noButton");
            //  window.location.href = "login.html";
          }else if ($("#login_container").is(":visible") && $("#noButton").is(":focus") ) {
            console.log("exit app");
            $(".exit_modal").hide();
            $(".login_container").addClass("active");
            manage_spatial_navigation("login_container");
            SN.focus("#email");
            //  window.location.href = "login.html";
          }
          break;
  
        case 37: // LEFT arrow
          console.log("left key");
          if ($('.login_container').hasClass('active') && ($("#email").is(":focus") || $("#password").is(":focus"))) {
            var textEntered = $.trim($(':focus').val());
            if (textEntered) controlLeftArrowKeys();
          }
          break;
  
        case 39: // RIGHT arrow
          console.log("right key");
          if ($('.login_container').hasClass('active') && ($("#email").is(":focus") || $("#password").is(":focus"))) {
            var textEntered = $.trim($(':focus').val());
            var input = document.getElementById($(":focus").attr("id"));
            var currentpos = input.selectionStart;
            if (textEntered && input.value.length > currentpos) controlrightArrowKeys();
          }
          break;
  
        case 65376: // Done from IME keyboard
          console.log("OK from keyboard...");
          if ($(".login_container").hasClass("active")) {
            if ($('#email').is(":focus")) SN.focus('#password');
            else if ($('#password').is(":focus")) SN.focus('#signinButton');
          }
          break;
  
        default:
          console.log("Remote keyCode: ", evt.keyCode);
      }
    });
  }
  function set_focus(containerId, itemId) {
    console.log("set focus");
    var restrictVal = "self-first";
    if (containerId == "EXIT" || containerId == "RETRY_CANCEL")
      restrictVal = "self-only";
  
    SN.remove(containerId);
    SN.add({
      id: containerId,
      selector: "#" + containerId + " .focusable",
      restrict: restrictVal,
      defaultElement: "#" + itemId,
      enterTo: "last-focused",
    });
    SN.makeFocusable();
  }
  
  function manage_spatial_navigation(containerClass, favoriteStatus, vodId) {
    switch (containerClass) {
      case "login_container":
        set_focus("login_container", "email");
  
        $("#signinButton").on("sn:focused", function (e) {
          console.log("set focus !");
        });
        $('#signinButton').on("sn:enter-down", function (e) {
          console.log("loginButton enter");
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email == '') {
            show_hide_login_error("email empty", "Enter Correct Email Id");
          } else if (password == '') {
            show_hide_login_error("Password empty", "Enter Correct Password");
          } else if (email == validRegex) {
            show_hide_login_error("Password empty", "Something went wrong.")
          } else if ((email != "") && (password != "")) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            loginApi(email, password);
  
          }
  
        });

        $('#register_now').on("sn:enter-down", function (e) {
            console.log("loginButton enter");
            $(".signup_container").show();
            $(".login_container").hide();
            $(".login_container").removeClass("active");
            $(".signup_container").addClass("active");
            SN.focus("#registerButton");
          });
        break;


        case "signup_container":
            set_focus("signup_container", "name");
      
            $("#registerButton").on("sn:focused", function (e) {
              console.log("set focus !");
            });
            $('#registerButton').on("sn:enter-down", function (e) {
                console.log("registerButton enter");
            
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                
                var name = document.getElementById('name').value.trim();
                var email = document.getElementById('email_id').value.trim();
                var password = document.getElementById('password_pss').value;
                var confirmPassword = document.getElementById('confirmPassword').value;
            
                console.log({ name, email, password, confirmPassword });
            
                if (name === '') {
                    show_hide_login_error("Name empty", "Please enter the name");
                } else if (email === '') {
                    show_hide_login_error("Email empty", "Please enter the email");
                } else if (!validRegex.test(email)) {
                    show_hide_login_error("Invalid Email", "Please enter a valid email address");
                } else if (password === '') {
                    show_hide_login_error("Password empty", "Please enter the password");
                } else if (confirmPassword === '') {
                    show_hide_login_error("Confirm Password empty", "Please enter the Confirm Password");
                } else if (password !== confirmPassword) {
                    show_hide_login_error("Password Mismatch", "Password and Confirm Password do not match");
                } else {
                    // Store user details in localStorage
                   var name = localStorage.setItem('name', name);
                   var email_id = localStorage.setItem('email_id', email);
                   var password_pss = localStorage.setItem('password_pss', password);
                   var confirmPassword = localStorage.setItem('confirmPassword', confirmPassword);
                    
                    // Call register API
                    registerApi(name,email_id,password_pss,confirmPassword);
                  
                }
            });
            

            $('#back_Button').on("sn:enter-down", function (e) {
                $(".login_container").show();
                $(".signup_container").hide();
                $(".login_container").addClass("active");
                $(".signup_container").removeClass("active");
                SN.focus("#signinButton");
              });
      
    
            break;
      
  
      case "exitModal":
        set_focus("exitModal", "noButton");
  
        $("#noButton").on("sn:focused", function (e) {
          console.log("set focus !");
        });
        $('#noButton').on("sn:enter-down", function (e) {
          console.log("noButton enter");
          $(".exit_modal").hide();
          $(".login_container").addClass("active");
          manage_spatial_navigation("login_container");
          SN.focus("#email");
  
        });
        $('#yesButton').on("sn:enter-down", function (e) {
          console.log("yesButton enter");
          tizen.application.getCurrentApplication().exit();
          localStorage.setItem('email', '');
          localStorage.setItem('password', '');
  
        });
  
        break;
  
    }
  }
  
function loginApi() {
    console.log("loginApi");
    $("#login_loader").show();

    let loginPayload = {
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        deviceDetails: {
            brand: "--",
            carrier: "--",
            deviceId: "E94C7CDF-34C5-4E46-8DBB-9B91CA5BB134",
            deviceName: "iPhone",
            ipAddress: "::2603:8080:1000:3a04:0:0",
            macAddress: "02:00:00:00:00:00",
            manufacturer: "Apple",
            model: "iPhone 13 Pro Max",
            serialNumber: "unknown",
            systemVersion: "16."
        }
    };

    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/login",
        async: true,
        dataType: "json",
        contentType: "application/json", // Important for JSON payload
        data: JSON.stringify(loginPayload), // Convert object to JSON string
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            $("#login_loader").hide();
            console.log(data);

            if (data.success == 1) {
                $.each(data, function (index, value) {
                    localStorage.setItem(index, value);
                });
                window.location.href = "home.html";
            } else {
                console.log("Something went wrong.");
                show_hide_login_error("Password empty", "Something went wrong.");
            }
        },
        error: function (xhr, error) {
            console.log("error", xhr, error);
            show_hide_login_error("Password empty", "Something went wrong.");
        }
    });
}


async function registerApi() {
    console.log("registerApi");
    document.getElementById("login_loader").style.display = "block"; // Show loader

    const loginPayload = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email_id'),
        password: localStorage.getItem('password_pss'),
        confirmPassword: localStorage.getItem('confirmPassword'),
        deviceDetails: {
            brand: "--",
            carrier: "--",
            deviceId: "E94C7CDF-34C5-4E46-8DBB-9B91CA5BB134-test",
            deviceName: "iPhone",
            ipAddress: "::2603:8080:1000:3a04:0:0",
            macAddress: "02:00:00:00:00:00",
            manufacturer: "Apple",
            model: "iPhone 13 Pro Max",
            serialNumber: "unknown",
            systemVersion: "16.6"
        }
    };

    try {
        const response = await fetch(APP_DOMAIN + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginPayload)
        });

        const data = await response.json();
        document.getElementById("login_loader").style.display = "none"; // Hide loader
        console.log(data);

        if (data.success === 1) {
            Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
            show_hide_login_error(data.subscription_status, data.message);
        } else {
            console.error("Registration failed.");
            show_hide_login_error(data.subscription_status, data.message);
        }
    } catch (error) {
        document.getElementById("login_loader").style.display = "none"; // Hide loader
        console.error("Error:", error);
    }
}



  
// function registerApi() {
//     console.log("registerApi");
//     $("#login_loader").show();

//     let loginPayload = {
//         name: localStorage.getItem('name'),
//         email: localStorage.getItem('email'),
//         password: localStorage.getItem('password'),
//         confirmPassword: localStorage.getItem('confirmPassword'),
//         deviceDetails: {
//             brand: "--",
//             carrier: "--",
//             deviceId: "E94C7CDF-34C5-4E46-8DBB-9B91CA5BB134-test",
//             deviceName: "iPhone",
//             ipAddress: "::2603:8080:1000:3a04:0:0",
//             macAddress: "02:00:00:00:00:00",
//             manufacturer: "Apple",
//             model: "iPhone 13 Pro Max",
//             serialNumber: "unknown",
//             systemVersion: "16.6"
//         }
//     };
//     $.ajax({
//         type: "POST",
//         url: APP_DOMAIN + "/register",
//         async: true,
//         dataType: "json",
//         contentType: "application/json", // Important for JSON payload
//         data: JSON.stringify(loginPayload), // Convert object to JSON string
//         cache: false,
//         crossDomain: true,
//         timeout: REQUEST_TIMEOUT * 1000,
//         success: function (data) {
//             $("#login_loader").hide();
//             console.log(data);

//             if (data.success == 1) {
//                 $.each(data, function (index, value) {
//                     localStorage.setItem(index, value);
//                 });
//                 show_hide_login_error(data.subscription_status, data.msg);
//             } else {
//                 console.log("Something went wrong.");
//                 show_hide_login_error(data.subscription_status, data.msg);
//             }
//         },
//         error: function (xhr, error) {
//             console.log("error", xhr, error);
//             ajaxError(xhr);
//         }
//     });
// }


  function show_hide_login_error(reason, msg) {
    console.log("show_hide_login_error");
    $("#login_loader").hide();
    $(".error-box").show();
    $("#error_title").text(reason);
    $("#error_message").text("" + msg);
    $(".error-box").show("slow");
    setTimeout(function () {
      $(".error-box").hide("slow");
    }, 5000);
  }
  // function ajaxError(xhr) {
  //   $("#login_loader").hide();
  //   if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
  //   else msg = NET_CONNECTION_ERR;
  //   show_hide_login_error("Network Connection", NET_CONNECTION_ERR);
  // }