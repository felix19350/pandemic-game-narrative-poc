export const responseButton = `
    <div>
        <button class='btn btn-response' 
            {{#if enabled}} id='{{r.id}}' {{else}} disabled {{/if}}>
            {{r.name}} 
        </button>
        <ul class='effect-list'>
            {{#if enabled}} {{#each r.label}} <li> {{this}} </li> {{/each}}
            {{else}} You cannot select this option because of your reputation as a Flip-Flopper <i class="fas fa-socks"></i> {{/if}}
        </ul>
    </div>
`;
