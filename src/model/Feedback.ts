export interface Feedback {
    toResponse: string;
    fromPublic: string;
    fromBusiness: string;
    fromHealthcare: string;
}

export interface CollectionOfFeedback{
    id: string;
    name: string;
    template: HTMLElement;
    hasGraph: Boolean;
    dataForGraph: number[];
    hasAnimation: Boolean;
    dataForAnimation: any;
}