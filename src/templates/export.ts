import * as Handlebars from 'handlebars';

export const compile = (template: string, content): HTMLElement => {
    /* TO-DO: Type guard */
    const compiledTemplate = Handlebars.compile(template);
    const filledTemplate = compiledTemplate(content);
    const div = document.createElement('DIV');
    div.innerHTML = filledTemplate;
    return div;
};
