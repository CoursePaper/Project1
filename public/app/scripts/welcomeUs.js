// Приветствие пользователя, впервые зашедшего на сайт 

// Тело кукисов
function setCookie(name, value, days) {
 if (days) {
 var date = new Date();
 date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
 var expires = "; expires=" + date.toGMTString();
 }
 else var expires = "";
 document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for (var i = 0; i < ca.length; i++) {
 var c = ca[i];
 while (c.charAt(0) == ' ') c = c.substring(1, c.length);
 if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
 }
 return null;
}
function eraseCookie(name) {
 setCookie(name, "", -1);
};

// Записываем текст приветствия в переменную
var a = '<fieldset><legend><img src="/js/img/us.png" /></legend>Здравствуйте, уважаемый пользователь!<br><br>Возможно, вы впервые на этом сайте и мы очень надеемся, что вам у нас понравится. Администрация сайта сделает всё возможное, чтобы ваше пребывание на сайте было максимально комфортным. Спасибо за внимание!</fieldset> <br><fieldset><legend><img src="/js/img/fr.png"></legend>P.S. Данное окно вас больше не потревожит</fieldset>';

// Тело скрипта
var sname = $('#sname').html();
if(getCookie('newUs')) {} else {
new _uWnd('wind1', ' Добро пожаловать на сайт "'+sname+'"', 500, 200, {waitimages:1, autosize:0, modal:1, fadetype:1, fadeclosetype:1, align:'left', closeonesc:1, icon:'/js/img/wink.gif', oncontent:function() {scook()}}, a);
};
function scook() {
setCookie('newUs', 1, 365);
};
