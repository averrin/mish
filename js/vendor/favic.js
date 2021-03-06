jQuery.fn.favicons = function (conf) {
    var config = jQuery.extend({
        insert:        'appendTo', 
        defaultIco: '/img/default.png'
    }, conf);

    return this.each(function () {
        jQuery('a[href^="http://"]', this).each(function () {
            var link        = jQuery(this);
            var faviconURL    = link.attr('href').replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
            var faviconIMG    = jQuery('<img class="fi" src="' + config.defaultIco + '" alt="" />')[config.insert](link);
            var extImg        = new Image();

            extImg.src = faviconURL;

            if (extImg.complete) {
                faviconIMG.attr('src', faviconURL);
            }
            else {
                extImg.onload = function () {
                    faviconIMG.attr('src', faviconURL);
                };
            }
        });
    });
};