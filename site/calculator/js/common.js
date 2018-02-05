$(document).ready(function() {
    function lineReset (first, second, date ) {
        $(first).addClass('active-btn').siblings().removeClass('active-btn');
        var spaceR = $(first).data(date);
        $(second).text(spaceR).parent().css('display','table-cell');
        $(second).parent().data(second, spaceR);
    }
        function changeBar(first, second) {
        var val = $(first).val();
        $(second).text(val).parent().parent().css('display','table-cell');
        $(second).parent().parent().data(second, val);
    }
    function flipPage (first, second) {
        $(first).addClass('vis');
        $(second).removeClass('vis');
    }
    function infoMessage(elem, search, info) {
        var messagClick = $('.message-clik');
        if(!($(elem).hasClass(search))){
            messagClick.show();
            messagClick.append(info);
        }
    }
    function valControl(val, info) {
        var messagClick = $('.message-clik');
        if(val === null || val === ""){
            messagClick.show();
            messagClick.append(info);
        }
    }

    $('.camp-space').on('click',function() {
        lineReset(this, '.val-servis', 'space');
    });
    $('.camp-type-cleaning').on('click',function () {
        lineReset(this, '.val-type-cleaning', 'type-cleaning');

    });
    $('.count-room').on('click',function () {
        lineReset(this ,'.val-count-room', 'count-room');
    });
    $('.bath-room').on('click', function () {
        lineReset(this , '.val-bath-room', 'bath-room');
    });
    $('.enter-object').on('click', function () {
        $(this).addClass('active-btn').siblings().removeClass('active-btn');
    });
    $('.animale-room').on('click', function () {
        $(this).addClass('active-btn').siblings().removeClass('active-btn');
    });
    $('.select-ore').on('click', function () {
        $(this).addClass('ore-active').siblings().removeClass('ore-active');
        var selectOre = $(this).data('select-ore'),
            valSelect = $('.val-select-ore');
        valSelect.text(selectOre);
        valSelect.parent().data('.val-select-ore', selectOre);
    });
    $('.address-val').on('change', function () {
        changeBar(this, '.val-address-work');
    });
    $('.number-val').on('change', function () {
        changeBar(this, '.val-number-apartments');
    });
    $('.container-servis').on('click',function () {
        $(this).toggleClass('active-btn');
    });


    // check request fill commercial cleaning
    $('.commercial-first-step').on('click',function () {
        var btCamp = $('.btn-camp'),
            messClik = $('.message-clik');
        if(btCamp.hasClass('btn-camp camp-space active-btn') &&
            btCamp.hasClass('btn-camp camp-type-cleaning active-btn')
        ){
            flipPage('.first-stage', '.date-for-order');
            messClik.empty();
        } else {
            messClik.empty();
            messClik.text('Укажите: ');
            infoMessage('.btn-camp', 'btn-camp camp-space active-btn', 'Тип помещения. ');
            infoMessage('.btn-camp', 'btn-camp camp-type-cleaning active-btn', 'Тип уборки. ');
        }
    });
    $('.commercial-third-step').on('click',function () {
        var valFIO    = $('.fio-val').val(),
            valTeleph = $('.telephone-val').val(),
            valAddres = $('.address-val').val(),
            valNumber = $('.number-val').val(),
            messagClick = $('.message-clik');
        messagClick.empty();
        messagClick.text('Укажите: ');
        if (!(valFIO === null || valFIO === "") && !(valTeleph === null || valTeleph === "")
            && !(valAddres === null || valAddres === "") && !(valNumber === null || valNumber === "")
        ){
            flipPage('.address-client', '.final-order');
            messagClick.empty();
        } else {
            valControl(valFIO, ' Ваше имя.');
            valControl(valTeleph, ' Номер телефона. ');
            valControl(valAddres, ' Адрес. ');
            valControl(valNumber, ' Номер квартиры. ');
        }
        $('.sum-cost').parent().css('display','table-cell');
        var orderServis = ($('.val-servis').parent().data('.val-servis'));
        var orederTypeCleaning = ( $('.val-type-cleaning').parent().data('.val-type-cleaning') );
        var orderclinRom =($('.val-count-room').parent().data('.val-count-room')
            + '-комнатная, '
            + $('.val-bath-room').parent().data('.val-bath-room')+' санузел');
        var orderDayClinig =($('.val-date-cleaning').parent().data('.val-date-cleaning')
            + ', ' + $('.val-select-ore').parent().data('.val-select-ore'));
        var orderAddress = (
            ($('.val-address-work').parent().parent().data('.val-address-work')) + ', ' +
            ($('.val-number-apartments').parent().parent().data('.val-number-apartments'))
        );
        $('.order-space').val(orderServis);
        $('.order-type-cleaning').val(orederTypeCleaning);
        $('.order-room').val(orderclinRom);
        $('.order-day-ore').val(orderDayClinig);
        $('.order-address').val(orderAddress);
    });

    // check request fill house cleaning
    $('.first-step').on('click',function () {
        var btnCamp = $('.btn-camp'),
            roomBtn = $('.room-btn'),
            messageClick = $('.message-clik');
        if( btnCamp.hasClass('btn-camp camp-space active-btn') &&
            btnCamp.hasClass('btn-camp camp-type-cleaning active-btn') &&
            roomBtn.hasClass('room-btn count-room active-btn') &&
            roomBtn.hasClass('room-btn bath-room active-btn')
        ){
            flipPage('.first-stage', '.date-for-order');
            messageClick.empty();
        } else {
            messageClick.empty();
            messageClick.text('Укажите: ');
            infoMessage('.btn-camp', 'btn-camp camp-space active-btn', 'Тип помещения. ');
            infoMessage('.btn-camp', 'btn-camp camp-type-cleaning active-btn', 'Тип уборки. ');
            infoMessage('.room-btn', 'room-btn count-room active-btn', 'Количество комнат. ');
            infoMessage('.room-btn', 'room-btn bath-room active-btn', 'Количество ванных комнат. ');
        }

    });
    $('.second-step').on('click',function () {
        var dataRequest = $('.val-date-cleaning').parent().data('.val-date-cleaning'),
            oreRequest = $('.val-select-ore').parent().data('.val-select-ore'),
            messageClick = $('.message-clik');
        if(!(typeof dataRequest === 'undefined') && !(typeof oreRequest === 'undefined') ){
            flipPage('.date-for-order', '.address-client');
            messageClick.empty();
        }else {
            messageClick.empty();
            messageClick.text('Выберите: ');
            if((typeof dataRequest === 'undefined') && (typeof oreRequest === 'undefined') ){
                messageClick.show();
                messageClick.append('дату и время');
            } else {
                if (typeof dataRequest === 'undefined') {
                    messageClick.show();
                    messageClick.append('дату.');
                }
                if (typeof oreRequest === 'undefined') {
                    messageClick.show();
                    messageClick.append('время.');
                }
            }
        }

    });
    $('.third-step').on('click',function () {
        var valFIO    = $('.fio-val').val(),
            valTeleph = $('.telephone-val').val(),
            valAddres = $('.address-val').val(),
            valNumber = $('.number-val').val(),
            messageClick = $('.message-clik');
        messageClick.empty();
        messageClick.text('Укажите: ');
        if (!(valFIO === null || valFIO === "") && !(valTeleph === null || valTeleph === "")
            && !(valAddres === null || valAddres === "") && !(valNumber === null || valNumber === "") &&
            $('.btn-camp').hasClass('btn-camp enter-object active-btn')
        ){
            flipPage('.address-client', '.final-order');
            messageClick.empty();
        } else {
            valControl(valFIO, 'Ваше имя. ');
            valControl(valTeleph, 'Номер телефона. ');
            valControl(valAddres, 'Адрес. ');
            valControl(valNumber, 'Номер квартиры. ');
            infoMessage('.btn-camp', 'btn-camp enter-object active-btn', 'Как мы попадем к Вам домой? ');
        }
        $('.sum-cost').parent().css('display','table-cell');
        var orderServis = ($('.val-servis').parent().data('.val-servis')),
         orederTypeCleaning = ( $('.val-type-cleaning').parent().data('.val-type-cleaning') ),
         orderclinRom =($('.val-count-room').parent().data('.val-count-room')
            + '-комнатная, '
            + $('.val-bath-room').parent().data('.val-bath-room')+' санузел'),
         orderDayClinig =($('.val-date-cleaning').parent().data('.val-date-cleaning')
            + ', ' + $('.val-select-ore').parent().data('.val-select-ore')),
         orderAddress = (
            ($('.val-address-work').parent().parent().data('.val-address-work')) + ', ' +
            ($('.val-number-apartments').parent().parent().data('.val-number-apartments'))
        );
        $('.order-space').val(orderServis);
        $('.order-type-cleaning').val(orederTypeCleaning);
        $('.order-room').val(orderclinRom);
        $('.order-day-ore').val(orderDayClinig);
        $('.order-address').val(orderAddress);
    });



    // Mask phone
    $("#phone-number").mask("(999) 999-99-99");
    $("#phone-form").mask("+7 (999) 999-99-99");

    // Accordion menu
	$('.accordion-item').on('click',function(){
		var tabName = $(this).attr('show-tab'),
            acord= $('.accordion');
		$(this).addClass('active').siblings().removeClass('active');
		$('.accordion-items.' + tabName).addClass('enabled').siblings().removeClass('enabled');
		switch(tabName){
			case 'offis':
        acord.addClass('offis').removeClass('room plant facade');
			break;
			case 'room':
        acord.addClass('room').removeClass('offis plant facade');
			break;
			case 'plant':
        acord.addClass('plant').removeClass('room offis facade');
			break;
			case 'facade':
        acord.addClass('facade').removeClass('room plant offis');
			break;
		}
	});
//Custom select align text center
    function getTextWidth(txt) {
        var $elm = $('<span class="tempforSize">'+txt+'</span>').prependTo("body");
        var elmWidth = $elm.width();
        $elm.remove();
        return elmWidth;
	}
    function browsDetec(){
        var user = navigator.userAgent;
        if (user.search(/Chrome/) > 0) return 'Chrome';
        if (user.search(/YaBrowser/) > 0) return 'YaBrowser';
        if (user.search(/Opera/) > 0) return 'Opera';
        if (user.search(/Firefox/) > 0) return 'Firefox';
        if (user.search(/Safari/) > 0) return 'Safari';
	}
    function centerSelect($elm) {
        var optionWidth = getTextWidth($elm.children(":selected").html());
        var emptySpace =   $elm.width()- optionWidth;
        if(browsDetec() == "Chrome"){
            $elm.css("text-align-last", 'center');
        }else if (browsDetec() == "Firefox") {
            $elm.css("text-align-last", 'center');
        } else {
            $elm.css("text-indent", (emptySpace/2));
		}
    }
    $('.centerSelect').each( function(){
        centerSelect($(this));
	});
    $('.centerSelect').on('change', function(){
	    centerSelect($(this));
	});
//slider skick
	$('.slider').slick({
		prevArrow:'<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style=""><img src="./img/svg/back.svg" ></button>',
		nextArrow:'<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Previous" role="button" style=""><img src="./img/svg/next.svg" ></button>'
	});
    $(document).on('click', '.accord-title', function(){
		$(this).find('.accord-arrow').toggleClass('active-arrow');
		var content = $(this).siblings();

		if(content.is(':visible')){
			content.slideUp();
		} else {
			content.slideDown();
		}
	});
    function min (minVal) {
        if (Number($(minVal).val()) > 0 ){
            var res = Number($(minVal).val()) - 1 ;
            $(minVal).val(res);
        }
    }
    function plus (plusVal) {
        var ser = Number($(plusVal).val()) + 1 ;
        $(plusVal).val(ser);
    }
    $(document).on('click', '.plus',function () {
		plus('.input-room')
	});
    $(document).on('click', '.min',function () {
		min('.input-room');
	});
    $(document).on('click', '.plus-after',function () {
		plus('.input-bathroom')
	});
    $(document).on('click', '.min-after',function () {
		min('.input-bathroom');
	});
    $(document).on('click', '.first-sum__plus',function () {
        plus('.input-window')
    });
    $(document).on('click', '.first-sum__min',function () {
        min('.input-window');
    });
    $(document).on('click', '.first-sum__plus-after',function () {
        plus('.input-balkony')
    });
    $(document).on('click', '.first-sum__min-after',function () {
        min('.input-balkony');
    });
    $(document).ready(function() {
        var my_calendar = $("#dncalendar-container").dnCalendar({

            monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
            monthNamesShort: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
            dayNames: [ 'Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dataTitles: { defaultDate: 'default', today : '' },
            notes: [

            ],
            showNotes: true,
            startWeek: 'monday',
            dayClick: function(date) {
                var ser = date.getDate(),
                    mon =(date.getMonth() + 1),
                    dataCleaning = $('.val-date-cleaning');
                if(date.getDate() < 10){
                     ser = '0' + date.getDate();
                }
                if((date.getMonth() + 1) < 10){
                    mon = '0' + (date.getMonth() + 1);
                }
                var dateCleaning = (ser + ":" + mon + ":" + date.getFullYear());

                dataCleaning.text(dateCleaning).parent().css('display','table-cell');
                dataCleaning.parent().data('.val-date-cleaning', dateCleaning);
            }
        });
        my_calendar.build();
    });
});
