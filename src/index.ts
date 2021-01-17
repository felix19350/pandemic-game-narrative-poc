import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import {showFeedback} from './view/feedback';
import {showEvent} from './view/event';
import {compileAssets} from './assets/feedback';

$(window).on('load', () => {     

    // TESTS
    // Event screen
    /*
    showEvent({
        name: 'test event',
        description: 'testing whether this longer description is displayed correctly. This would be a longer piece of text spanning multiple lines, ideally a small paragraph. It should be both interesting and descriptive enough to tell players what to expect with each of the option; and to give context.<br><br>It can have multiple paragraphs seperated by a new line as shown here.',
        responses: [
            {
                name: 'Response option 1',
                description: ['does only one thing']
            },
            {
                name: 'Response option 2 with longer name',
                description: ['this one does multiple things', 'here is the second', 'and the third!']
            },
        ]
    })*/

    // Feedback screen
    const feedbackAssets = compileAssets();
    console.log(feedbackAssets)
    showFeedback(feedbackAssets.businessSupport.low)
    showFeedback(feedbackAssets.healthcareSupport.low)
    showFeedback(feedbackAssets.publicSupport.low)

    // Splash screen (hidden for testing)
    $('#splash').hide()
    // $('#dismiss-splash').click(function(){ $('#splash').hide() });
    
});
