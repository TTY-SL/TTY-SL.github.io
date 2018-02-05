$(document).ready(function() {
  $(".icon-right-button").on("click", function() {
    $(this).toggleClass("bottom-butto__active");
    $(".nav-bar__form").toggleClass("nav-bar__form-active");
  });
  var widthWindow = window.innerHeight,
    widthBody = document.body.clientHeight,
    margitTop = widthWindow - widthBody + 100;

  if (widthWindow > widthBody) {
    $(".page-404__img").css("margin-top", margitTop);
  }
  $(".btn-submit").on("click", function() {
    var name = $(".form-name").val(),
      phone = $(".form-phone").val();
    callMess = { name: name, phone: phone };
    if (name && phone) {
      fetch("https://api.myjson.com/bins", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(callMess)
      })
        .then(function() {
          $(".icon-right-button").toggleClass("bottom-butto__active");
          $(".nav-bar__form").toggleClass("nav-bar__form-active");
          $(".much-thank").addClass("much-thank__active");
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      if (!name) {
        $(".form-name").css("border-color", "red");
      }
      if (!phone) {
        $(".form-phone").css("border-color", "red");
      }
    }
  });
  $(".form-name").on("click", function() {
    $(this).css("border-color", "#e8e8e8");
  });
  $(".form-phone").on("click", function() {
    $(this).css("border-color", "#e8e8e8");
  });
  $(".btn-submit__close").on("click", function() {
    $(".much-thank").removeClass("much-thank__active");
  });

  $("#phone-call").mask("+7(999) 999-9999");
  $(".additional-gifts__continer").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: ".arrow__left",
    nextArrow: ".arrow__right",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });

  $(".gallery-elements").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: ".arrow__gallery-back",
    nextArrow: ".arrow__gallery-next",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });
  $(".additional-gifts__hit").equalHeights();

  $(".class_nav").on("click", function() {
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 500);
    if (id == "#issues-pay__methods") {
      if (!$(".issues-accordion__text").is(":visible")) {
        $("#issues-pay__methods").click();
      }
    }
  });

  $(".hamb").on("click", function() {
    $(this).toggleClass("hamb-close");
    $(".nav-container").toggleClass(
      "nav-container__activ animated-men fadeInLeftBig"
    );
    $(".fixe-container").toggleClass("fixe-container__action");
    $(".left-block").toggleClass("nav-container__activ");
  });
  $(".left-block").on("click", function() {
    $(".hamb").removeClass("hamb-close");
    $(".nav-container").toggleClass(
      "nav-container__activ animated-men fadeInLeftBig"
    );
    $(".fixe-container").toggleClass("fixe-container__action");
    $(".left-block").toggleClass("nav-container__activ");
  });
  $(".issues-accordion__title").on("click", function() {
    $(this).toggleClass("color-text");
    $(this)
      .find(".issues-accordion__pluse")
      .toggleClass("active-arrow");
    var content = $(this).siblings();

    if (content.is(":visible")) {
      content.slideUp();
    } else {
      content.slideDown();
    }
  });
  var anime = $("div").is(".first-anim"),
    action = true;
  if (anime) {
    $(window).scroll(function() {
      var firstAnim = $(".first-anim").offset().top - 200,
        lastAnim = $(".last-anim").offset().top - 200,
        secondAnim = $(".second-anim").offset().top - 200,
        block = $(".delivery-advantage__point--number").offset().top - 400,
        scrollEfect = $(window).scrollTop();
      if (action) {
        if (scrollEfect > block) {
          $(".delivery-advantage__point--number").countTo({ from: 1, to: 347 });
          action = false;
        }
      }
      if (scrollEfect > firstAnim) {
        $(".first-anim")
          .css("visibility", "visible")
          .addClass("animated fadeIn");
      }
      if (scrollEfect > lastAnim) {
        $(".last-anim")
          .css("visibility", "visible")
          .addClass("animated fadeIn");
      }
      if (scrollEfect > secondAnim) {
        $(".second-anim")
          .css("visibility", "visible")
          .addClass("animated fadeIn");
      }
    });
  }
});
