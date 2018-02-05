$(document).ready(function() {
  $(".delivery-content").on("click", function() {
    $(".delivery-block__container").css("display", "none");
    $(this)
      .parent()
      .siblings()
      .fadeIn();
    Summ();
  });
  $(".val__input").on("click", function() {
    Summ()
  });
  function Summ() {
    var arrDeliv = $(".delivery-content"),
      arryVals = $(".val__input"),
      count = 0;
    arrDeliv.map(function(index, element) {
      if ($(element).data("val")) {
        if ($(element).prop("checked")) {
          var val = Number($(element).data("val"));
          count += val;
        }
      }
    });
    arryVals.map(function(index, element) {
      if ($(element).prop("checked")) {
        var val = Number($(element).data("val"));
        count += val;
      }
    });
    $(".order-summ__element-count")
      .empty()
      .append(count);
  }
  var val = true;
  if (val) {
    if ($(".delivery-content").prop("checked")) {
      $(".delivery-block__container-action").fadeIn();
      val = false;
    }
  }
  $(".tabs-list li").click(function() {
    var tabName = $(this).attr("show-tab");
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".tabs-content." + tabName)
      .addClass("active-container")
      .siblings()
      .removeClass("active-container");
    switch (tabName) {
      case "first":
        $(".load-stripe__loding").animate({ width: "11%" }, 500);
        $(".load-stripe__snowflake").animate({ left: "11%" }, 500);
        break;
      case "second":
        $(".load-stripe__loding").animate({ width: "37%" }, 500);
        $(".load-stripe__snowflake").animate({ left: "37%" }, 500);
        break;
      case "three":
        $(".load-stripe__loding").animate({ width: "65%" }, 500);
        $(".load-stripe__snowflake").animate({ left: "65%" }, 500);
        break;
      case "fourth":
        $(".load-stripe__loding").animate({ width: "88%" }, 500);
        $(".load-stripe__snowflake").animate({ left: "88%" }, 500);
        break;
    }
  });

  var popupFunct = function(text, bol) {
    if (bol) {
      $("body").on("click", text, function() {
        $(".location-popup").addClass("location-popup-active");
      });
    } else {
      $("body").on("click", text, function() {
        $(".location-popup").removeClass("location-popup-active");
      });
    }
  };
  popupFunct(".link-location", true);
  popupFunct(".link-new__region", true);
  popupFunct(".close-btn", false);
  popupFunct(".location-delivery-content", false);

  var direction = function(elem, data) {
    $(elem).on("click", function() {
      var next = $(this).data(data);
      switch (next) {
        case "first__element":
          $("." + next).click();
          break;
        case "second__element":
          $("." + next).click();
          break;
        case "three__element":
          $("." + next).click();
          break;
        case "fourth__element":
          $("." + next).click();
          break;
      }
    });
  };
  direction(".btn-summ__back", "back");
  direction(".btn-summ__next", "next");

  $(".check-letter").on("click", function() {
    var arrayGift = $(".check-letter");
    $(this)
      .parent()
      .css("opacity", "1");
    arrayGift.map(function(index, element) {
      if (!$(element).prop("checked")) {
        $(element)
          .parent()
          .css("opacity", ".4");
      }
    });
  });
  var cities = [],
    address = [],
    primFetch = true;
  if (window.location.pathname == "/order.html") {
    fetch("http://f121.ru/api/cities/")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        cities = data;
        addCities();
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }
  if (window.location.pathname == "/order.html") {
    if (primFetch) {
      fetchAddress(2);
      primFetch = false;
    }
  }
  function fetchAddress(id) {
    fetch("http://f121.ru/api/cities/" + id + "/delivery_addresses")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        address = data;
        addAddress();
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }

  function addAddress() {
    $("#addres-pickup").empty();
    address.map(function(el) {
      $("#addres-pickup").append("<option>" + el.address + "</option>");
    });
  }
  $("body").on("click", ".location-delivery-content", function() {
    $(".link-location")
      .empty()
      .append($(this).val());
    $(".delivery_price")
      .empty()
      .append($(this).data("price"));
    $(".delivery-content__value").val($(this).data("price"));
    $(".km_pricen")
      .empty()
      .append($(this).data("km"));
    fetchAddress($(this).data("id"));
  });
  function addCities() {
    cities.map(function(elem) {
      if (elem.title == "Санкт-Петербург") {
        $(".location-container__cities").append(
          '<div class="location-container__block"><label class="location-delivery-radio">' +
            elem.title +
            '<input class="location-delivery-content" type="radio" data-price="' +
            elem.delivery_price +
            '" data-km="' +
            elem.km_price +
            '" data-id="' +
            elem.id +
            '" value=" ' +
            elem.title +
            '" name="location-delivery" checked><span class="location-delivery-custom"></span> </label></div>'
        );
      } else {
        $(".location-container__cities").append(
          '<div class="location-container__block"><label class="location-delivery-radio">' +
            elem.title +
            '<input class="location-delivery-content" type="radio" data-price="' +
            elem.delivery_price +
            '" data-km="' +
            elem.km_price +
            '" data-id="' +
            elem.id +
            '" value=" ' +
            elem.title +
            '" name="location-delivery"><span class="location-delivery-custom"></span> </label></div>'
        );
      }
    });
  }
  // query require
  $("body").on("click", ".btn-delivery__last", function() {
    var fioForLetter = $(".order-list__name").val(),
      fioForOrder = $(".order-list__fio").val(),
      phoneOrder = $(".order-list__phone").val(),
      emailOrder = $(".order-list__location").val(),
      noteLetter = $(".note-letter").val(),
      addressEnvelope = $(".address-envelope").val(),
      summ = Summ(),
      whoseLetter = "",
      giftName = "",
      deliveryAddress = "",
      executedOrder = {};

    $(".val__input").map(function(index, elem) {
      if ($(elem).prop("checked")) {
        giftName += $(elem).data("name") + ";" + " ";
      }
    });
    $(".check-letter").map(function(index, elem) {
      if ($(elem).prop("checked")) {
        whoseLetter = $(elem).val();
      }
    });
    $(".delivery-content").map(function(index, elem) {
      if ($(elem).prop("checked")) {
        switch ($(elem).data("delivery")) {
          case "Самовывоз":
            deliveryAddress =
              "Самовывоз" +
              " " +
              $(".link-location").text() +
              " " +
              $("#addres-pickup :selected").val();
            break;
          case "Доставка по городу":
            deliveryAddress =
              "Доставка по городу" +
              " " +
              $(".link-location").text() +
              " " +
              $(".city-deliv").val();
            break;
          case "Доставка за город":
            deliveryAddress =
              "Доставка за город" +
              " " +
              $(".link-location").text() +
              " " +
              $(".out-city").val();
            break;
        }
      }
    });
    executedOrder = {
      recipient: fioForLetter,
      customer: fioForOrder,
      customerPhone: phoneOrder,
      customerEmail: emailOrder,
      noteLetter: noteLetter,
      addressEnvelope: addressEnvelope,
      count: summ,
      recipientLetter: whoseLetter,
      gift: giftName,
      deliveryAddress: deliveryAddress
    };
  });

  // mask phone
  $("#phone-order").mask("+7(999) 999-9999");
});
