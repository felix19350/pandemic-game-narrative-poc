/*
    Write feedback to social feedback space e.g., news clippings and tweets in response to your in game choices

        Arguments
        ---------
        assets = (array) of HTML objects
*/
import * as $ from 'jquery';

export function showFeedback(assets) {
    assets.forEach(function (asset, i) {
        setTimeout(function () {
            document.getElementById('media-feed').appendChild(asset); // Append asset to feedback media feed

            // Animations
            $(asset).css('opacity', 0).animate({ opacity: 1 }, 500);
            $('body, html').animate({ scrollTop: $(document).height() }, 500); // Scroll down to newest asset
        }, 700 * i);
    });
}
