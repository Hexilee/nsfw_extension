$('.ck-switch .ck-switch-off').unbind('click').bind('click', function () {
    $('.ck-switch .ck-switch-on').addClass('ck-switch-current ck-switch-current-3').html('');
    $('.ck-switch .ck-switch-off').removeClass('ck-switch-current ck-switch-current-40').html('关闭');
    chrome.storage.sync.set({'opened': false}, function () {
        console.log('已关闭');
    });
});


$('.ck-switch .ck-switch-on').unbind('click').bind('click', function () {
    if ($(this).hasClass('ck-switch-on')) {
        $('.ck-switch .ck-switch-on').removeClass('ck-switch-current ck-switch-current-3').html('开启');
        $('.ck-switch .ck-switch-off').addClass('ck-switch-current ck-switch-current-40').html('');
    }
    chrome.storage.sync.set({'opened': true}, function () {
        console.log('已开启');
    });
});
