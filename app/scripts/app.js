import slick from "slick-carousel";
import $ from 'jquery';

$(() => {
    if (window.matchMedia("(max-width: 800px)").matches) {
    $(".test__img").html(
        `<img src="/images/карточки-мобилка-1.jpg" alt="Small Image" />`
        );
    } else {
    $(".test__img").html(
        `<img src="/images/карточки-десктоп-1.png" alt="Large Image" />`
        );
    }
	const $slider = $('.test__wrap').slick({
        slidesToScroll: 1,
        infinite: false,
        initialSlide: 1,
        arrows: false,
        swipeToSlide: true,
        speed: 300
    });

    // Флаг для отслеживания взаимодействия
    let hasInteracted = false;

    // Обработчик клика на кнопку "Опыт"
    $('.test__wrap__button-next').click(function() {
        if (!hasInteracted) {
            hasInteracted = true; // Устанавливаем флаг на первое взаимодействие
            const thirdSlideIndex = 0; // Индекс 3-го слайда
            $('.test__wrap').slick('slickGoTo', thirdSlideIndex);
            $('.test__cardv.risk.visible').css('display', 'none');
            $('.test__cardv.experience.visible').css('display', 'flex');
            // Отключаем прокрутку слайдера
            $slider.slick('slickSetOption', 'draggable', false, true);
            $slider.slick('slickSetOption', 'swipe', false, true);
            // // Отключаем кнопки "Вперед" и "Назад"
            // $('.test__wrap__button-next, .test__wrap__button-prev').prop('disabled', true);
        }
    });

    // Обработчик клика на кнопку "Риск"
    $('.test__wrap__button-prev').click(function() {
        if (!hasInteracted) {
            hasInteracted = true; // Устанавливаем флаг на первое взаимодействие
            const firstSlideIndex = 2; // Индекс 1-го слайда
            $('.test__wrap').slick('slickGoTo', firstSlideIndex);
            $('.test__cardv.experience.visible').css('display', 'none');
            $('.test__cardv.risk.visible').css('display', 'flex');
            // Отключаем прокрутку слайдера
            $slider.slick('slickSetOption', 'draggable', false, true);
            $slider.slick('slickSetOption', 'swipe', false, true);
            // // Отключаем кнопки "Вперед" и "Назад"
            // $('.test__wrap__button-next, .test__wrap__button-prev').prop('disabled', true);
        }
    });

    $('.test__wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        // Определяем направление свайпа
        if(currentSlide === 1 && nextSlide === 2) {
            // $slider.slick('slickSetOption', 'draggable', false, true);
            $slider.slick('slickSetOption', 'swipe', false, true);
            hasInteracted = true;
            // Свайп вправо с 2 до 3
            setTimeout(function() {
                $('.test__cardv.experience.visible').css('display', 'none');
                $('.test__cardv.risk.visible').css('display', 'flex');
            }, 0);
        } else if(currentSlide === 1 && nextSlide === 0) {
            $slider.slick('slickSetOption', 'swipe', false, true);
            hasInteracted = true;
            // Свайп влево с 2 до 1
            setTimeout(function() {
                $('.test__cardv.risk.visible').css('display', 'none');
                $('.test__cardv.experience.visible').css('display', 'flex');
            }, 0);
        }
      });

    $('.test__card__link').click(function() {
        currentIndex = (currentIndex + 1) % DATA.length;
        hasInteracted = false;
        $slider.slick('slickSetOption', 'draggable', true, true);
        $slider.slick('slickSetOption', 'swipe', true, true);
        if(currentIndex < 7){
            $(".test__counter").css('display', 'block');
            $(".test__wrap").css('display', 'block');
            $(".test__wrap__button").css('display', 'block');
            $(".test__cards").css('display', 'block');
            $(".test__counter-text").html(currentIndex + 1);
            $(".test__text").html(DATA[currentIndex].title);
            $(".test__card__text.risk").html(DATA[currentIndex].risk);
            $(".test__card__text.experience").html(DATA[currentIndex].experience);
            if (window.matchMedia("(max-width: 800px)").matches) {
                $(".test__img").html(
                `<img src="${DATA[currentIndex].smallImage}" alt="Small Image" />`
                );
            } else {
                $(".test__img").html(
                `<img src="${DATA[currentIndex].image}" alt="Large Image" />`
                );
            }
            const secondSlideIndex = 1;
            
            $('.test__wrap').slick('slickGoTo', secondSlideIndex);
            
            $('.test__card').addClass('hidden');

            setTimeout(function() {
                $('.test__card').removeClass('hidden');
            }, 500);
        }else{
            $(".test__counter").css('display', 'none');
            $(".test__wrap").css('display', 'none');
            $(".test__wrap__button").css('display', 'none');
            $(".test__cards").css('display', 'none');
            $(".test__text").css('display', 'none');
            $('.test__cardv.experience.visible').css('display', 'none');
            $('.test__cardv.risk.visible').css('display', 'none');
            $(".test__wrap__next").css('display', 'flex');
            $('.test__next').click(function() {
                currentIndex = 0;
                console.log(currentIndex)
                $(".test__counter").css('display', 'block');
                $(".test__wrap").css('display', 'block');
                $(".test__wrap__button").css('display', 'block');
                $(".test__cards").css('display', 'block');
                $(".test__text").css('display', 'block');
                $('.test__cardv.experience.visible').css('display', 'flex');
                $('.test__cardv.risk.visible').css('display', 'flex');
                $(".test__wrap__next").css('display', 'none');
                $(".test__counter-text").html(currentIndex + 1);
                $(".test__text").html(DATA[currentIndex].title);
                $(".test__card__text.risk").html(DATA[currentIndex].risk);
                $(".test__card__text.experience").html(DATA[currentIndex].experience);
                if (window.matchMedia("(max-width: 800px)").matches) {
                    $(".test__img").html(
                    `<img src="${DATA[currentIndex].smallImage}" alt="Small Image" />`
                    );
                } else {
                    $(".test__img").html(
                    `<img src="${DATA[currentIndex].image}" alt="Large Image" />`
                    );
                }
                const secondSlideIndex = 1;
                $('.test__wrap').slick('slickGoTo', secondSlideIndex);
            })
        }
        
  });

    // let isDragging = false;
    // let startPos = { x: 0, y: 0 };
    // let currentTranslate = 0;

    // $('.test__container').on('mousedown touchstart', function(e) {
    //     isDragging = true;
    //     startPos = {
    //     x: e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
    //     y: e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY
    //     };
    //     $('.test__wrap').css('transition', 'none');
    // });

    // $(document).on('mousemove touchmove', function(e) {
    //     if (!isDragging) return;

    //     let currentPos = {
    //     x: e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
    //     y: e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY
    //     };

    //     let diffX = currentPos.x - startPos.x;
    //     currentTranslate = diffX;
        
    //     $('.test__wrap').css('transform', 'translateX(' + currentTranslate + 'px)');
    // });

    // $(document).on('mouseup touchend', function() {
    //     isDragging = false;
    //     $('.test__wrap').css('transition', 'transform 0.3s ease');
    //     $('.test__wrap').css('transform', 'translateX(0)');
    //     if (Math.abs(currentTranslate) > 50) {
    //     if (currentTranslate > 0) {
    //         $('.test__wrap').slick('slickNext');
            
    //     } else {
    //         $('.test__wrap').slick('slickPrev');
            
    //     }
    //     }
        
    //     currentTranslate = 0;
    // });

    let currentIndex = 0;

    const DATA = [
        {
            title: "Ваш ребенок обожает лазить по деревьям и при первом удобном случае норовит забраться повыше. Это очень опасно? Или же, наоборот, помогает ему развиваться физически и прокачивать свои моторные навыки проверенным тысячелетиями способом?",
            risk: "Вспомните себя в детстве — разбитые коленки и локти были обычным делом. Но может ли это сравниться с радостью от покорения новой вершины? Иногда стоит дать ребенку совершить ошибку, чтобы лучше понять этот мир.",
            experience: "Стоит порадоваться, что ваш ребенок предпочитает активные игры вместо того, чтобы проводить время за компьютером. Это не только полезно для развития молодого организма, но и может сделать его более уравновешенным и спокойным. ",
            image: "/images/карточки-десктоп-1.png",
            smallImage: "/images/карточки-мобилка-1.jpg",
        },
        {
            title: "Подросток отправляется поздно вечером на улицу. Как вы поведете себя? Строго запретите гулять после 22:00 или же спокойно отпустите его?",
            risk:"Случайные знакомые, плохие компании или даже алкоголь — в темное время суток может случиться всякое, поэтому тут лучше перестраховаться и выяснить, куда и с кем именно отправляется гулять ваш ребенок.",
            experience:"Рано или поздно придется смириться с тем, что ваш ребенок уже стал взрослым. Вечеринки и ночные тусовки являются важным этапом взросления личности. А вам как родителю нужно скрепя сердце отпустить ваше чадо и не допекать его гиперконтролем. Но, конечно, при условии того, что телефон всегда будет включен и он будет на связи.",
            image: "/images/карточки-десктоп-2.png",
            smallImage: "/images/карточки-мобилка-2.jpg",
        },
        {
            title: "В компании вашего ребенка новое увлечение — селфи на крышах зданий, мостах и вышках. Чем выше заберешься, тем больше лайков можно получить в социальных сетях. Что вы думаете о таком небезопасном увлечении?",
            risk:"Опасность такого увлечения очевидна — без специального страховочного оборудования такая вылазка может обернуться трагедией. Печальных историй, связанных с погоней за лайками, немало. Поговорите с вашим ребенком о том, что никакой хайп в соцсетях не стоит тяжелых травм или даже риска для жизни.",
            experience:"Если ваш ребенок находится в поисках острых ощущений, вы можете помочь ему получить их безопасно. Отправляйтесь на смотровую площадку на самом высоком здании города, покатайтесь на аттракционе в парке или даже вместе попробуйте банджи-джампинг — прыжки с высоты под присмотром профессионалов.",
            image: "/images/карточки-десктоп-3.png",
            smallImage: "/images/карточки-мобилка-3.jpg",
        },
        {
            title: "Ваш ребенок уже достаточно взрослый для того, чтобы попробовать себя в роли домашнего кулинара. Ему хочется порадовать вас вкусным ужином, и он решает приготовить его самостоятельно.",
            risk:"Большая часть детского травматизма связана именно с бытовыми моментами. Ребенок может получить ожог во время приготовления пищи, порезаться острым ножом или опрокинуть на себя тяжелую кастрюлю.",
            experience:"Попытки пробовать себя в домашних делах — важный этап в развитии детей. Лучшим способом научить ребенка готовить будет совместная деятельность. Понемногу приучайте его к выполнению небольших и неопасных дел под вашим присмотром. Попробуйте вместе замесить тесто, слепить веселые печеньки или красиво сервировать готовую пищу.",
            image: "/images/карточки-десктоп-4.png",
            smallImage: "/images/карточки-мобилка-4.jpg",
        },
        {
            title: "Подросток с компанией хочет отправиться на ближайший водоем — позагорать и искупаться. Как вы поведете себя? Спокойно отпустите или строго запретите ходить туда без присмотра?",
            risk:"В юном возрасте бывает довольно сложно адекватно оценивать риски, ведь для этого банально не хватает жизненного опыта. Тем более, подростки часто пытаются что-то доказать своим сверстникам — заплыть подальше, задержать дыхание и т. д.",
            experience:"Чем старше ребенок, тем сложнее становится его контролировать. Да и вы сами помните беззаботное лето в деревне, когда часами безвылазно сидели в пруду. Попробуйте объяснить ребенку, что нужно быть осторожнее — не плавать в незнакомых водоемах и стараться избегать глубоких мест.",
            image: "/images/карточки-десктоп-5.png",
            smallImage: "/images/карточки-мобилка-5.jpg",
        },
        {
            title: "Электросамокат — не только удобное средство передвижения, но и объект мечтаний почти каждого подростка. А вы бы купили такой самокат своему ребенку?",
            risk:"Учитывая то количество происшествий, которые сейчас случаются с участием самокатов, лучше остановить свой выбор на традиционном велосипеде или обычном самокате.",
            experience:"Ничего страшного в использовании электросамоката нет — при условии того, что ребенок будет тщательно проинструктирован о том, как правильно его использовать: ездить только в шлеме, не превышать скорость и стараться не мешать остальным участникам движения.",
            image: "/images/карточки-десктоп-6.png",
            smallImage: "/images/карточки-мобилка-6.jpg",
        },
        {
            title: "Ваш двенадцатилетний ребенок занимается в спортивной секции и собирается на соревнования в другой город. Отпустите его одного или обязательно отправитесь с ним вместе?",
            risk:"Хоть в группе есть тренер и другие взрослые, ничто не сможет заменить родительского надзора. Тем более, ребенку просто необходима ваша поддержка во время соревнований.",
            experience:"Начиная с 12-14 лет подросток остро нуждается в социализации вне семьи. Выезд на соревнования –  это отличный способ почувствовать себя в новой среде и завести новых друзей.",
            image: "/images/карточки-десктоп-7.png",
            smallImage: "/images/карточки-мобилка-7.jpg",
        },
        {
            title: "Вы прошли тест"
        },
    ];
});
