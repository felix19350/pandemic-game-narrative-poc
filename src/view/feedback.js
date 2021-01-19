/*
    Write feedback to social feedback space e.g., news clippings and tweets in response to your in game choices

        Arguments
        ---------
        assets = (array) of HTML objects
*/
import * as $ from 'jquery';

export function showFeedback(assets, nextTurn) {
    // Show feedback to player
    function addToFeed() {
        const asset = assets.shift();
        document.getElementById('media-feed').appendChild(asset); // Append asset to feedback media feed
        $(asset).css('opacity', 0).animate({ opacity: 1 }, 500); // Animations
        $('body, html').animate({ scrollTop: $(document).height() }, 500);

        setTimeout(function () {
            if (assets.length > 0) {
                // Add feedback asset to feed
                addToFeed();
            } else {
                // Add button to continue to next month
                const btnEle = document.createElement('BUTTON');
                btnEle.className = `btn btn-lg btn-continue`;
                btnEle.innerHTML = `Continue to next month <i class="fas fa-arrow-right"></i>`;
                btnEle.onclick = function () {
                    nextTurn(); // Next turn
                    $(btnEle).hide(); // Disable btn on click
                };
                document.getElementById('media-feed').appendChild(btnEle);
            }
        }, 700);
    }
    addToFeed();
}
