$(document).ready(function() {
    $('.commercial-fourth-step').on('click', function () {
      var orderSpace = $('.order-space').val(),
          areaRoomVal = $('.area-room-val').val(),
          orderTypeCleaning = $('.order-type-cleaning').val(),
          sumWindow = $('.input-window').val(),
          sumBalkony = $('.input-balkony').val(),
          check2 = $('#check2').prop('checked')  ? 'Да' : 'Нет',
          check1 = $('#check1').prop('checked')  ? 'Да' : 'Нет',
          MessageClient = $('.message-client').val(),
          orderDayOre = $('.order-day-ore').val(),
          fioVal = $('.fio-val').val(),
          telephoneVal = $('.telephone-val').val(),
          orderAddress = $('.order-address').val();
      $.ajax({
        type: "POST",
        url: "commercialMail.php",
        data: { 'Тип_клиента': 'Коммерческий',
                'Имя_клиента': fioVal,
                'Телефон': telephoneVal,
                'Площадь помещения': areaRoomVal,
                'Тип помещения': orderSpace,
                'Тип уборки': orderTypeCleaning,
                'Количество окон': sumWindow,
                'Количество балконов': sumBalkony,
                'Помыть окна внутри и снаружи': check1,
                'Помыть балкон внутри и снаружи': check2,
                'Описание объекта': MessageClient,
                'Дата и время': orderDayOre,
                'Адрес': orderAddress
        }
      }).done(function() {
          $('.pop-up__message').css('display', 'flex');
      });
      return false;
    });

    $('.fourth-step').on('click', function () {
        var orderSpace = $('.order-space').val(),
            orderTypeCleaning = $('.order-type-cleaning').val(),
            orderRoom = $('.order-room').val(),
            sumWindow = $('.input-window').val(),
            sumBalkony = $('.input-balkony').val(),
            check2 = $('#check2').prop("checked") ? 'Да' : 'Нет',
            check1 = $('#check1').prop("checked") ? 'Да' : 'Нет',
            orderDayOre = $('.order-day-ore').val(),
            fioVal = $('.fio-val').val(),
            enterObject = $('.enter-object.active-btn').data('enter-object'),
            animalRoom = $('.btn-camp.animale-room.active-btn').data('animale-room'),
            telephoneVal = $('.telephone-val').val(),
            orderAddress = $('.order-address').val(),
            numberServis = '',
            elem = $('.container-servis.active-btn'),
            servisArr = elem.map(function () {
                return $(this).data('servis-title')
            }),
            lengt = servisArr.length;
        for(var i = 0; i < lengt; i++ ){
            numberServis  += servisArr[i] + '; ';
        }
        $.ajax({
          type: "POST",
          url: "personalMail.php",
          data: { 'Тип_клиента': 'Физическое лицо',
                  'Имя_клиента': fioVal,
                  'Телефон': telephoneVal,
                  'Тип помещения': orderSpace,
                  'Как мы попадем к Вам домой': enterObject,
                  'Тип уборки': orderTypeCleaning,
                  'Количество комнат и ванн': orderRoom,
                  'Количество окон': sumWindow,
                  'Количество балконов': sumBalkony,
                  'Помыть окна внутри и снаружи': check1,
                  'Помыть балкон внутри и снаружи': check2,
                  'Адрес': orderAddress,
                  'Дополнительные услуги': numberServis,
                  'У вас есть животные': animalRoom,
                  'Дата и время': orderDayOre
          }
        }).done(function() {
            $('.pop-up__message').css('display', 'flex');
        });
        return false;
    });

    $("#form-commercial").submit(function(e) {

        var phone = $('.phone-com').val(),
            area = $('.area-room').val(),
            mess = $('.message-form');
        mess.empty();
        if(phone === null || phone === ''|| area === null || area === ''){
            mess.empty();
            mess.text('Укажите: ');
            if( area === null || area === ''){
                mess.append('Площадь. ');
            }
            if( phone === null || phone === ''){
                mess.append('Телефон. ');
            }

        } else {
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "commMail.php",
                data: th.serialize()
            }).done(function() {
                alert("Ваша заявка успешно отправлена! Мы свяжемся с Вами в ближайшее время.");
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                }, 500);
            });
        }
        return false;
    });
    $("#form-cliner").submit(function(e) {

        var phone = $('.phone-clin').val(),
            fio = $('.fio').val(),
            mess = $('.message-form');
        mess.empty();
        if(phone === null || phone === ''|| fio === null || fio === ''){
            mess.empty();
            mess.text('Укажите: ');
            if( fio === null || fio === ''){
                mess.append('Ф.И.О. ');
            }
            if( phone === null || phone === ''){
                mess.append('Телефон. ');
            }

        } else {
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "clinMAil.php",
                data: th.serialize()
            }).done(function() {
                alert("Ваша заявка успешно отправлена! Мы свяжемся с Вами в ближайшее время.");
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                }, 500);
            });
        }
        return false;
    });
});