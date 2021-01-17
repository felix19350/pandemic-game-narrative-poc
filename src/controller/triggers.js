/*
    Array of triggers in game

        could either have: 

        - list of triggers separate from events -

        triggers = [
            {
                id: triggerId,
                condition: (variable==true ? true : false),
                effectOnTrue: function()
            }
        ]
        FOR EACH trigger OF triggers IF condition == true THEN effectOnTrue() 

        - or triggers attached to events -

        events = {
            name: eventName,
            ...
            trigger = condition: (variable==true ? true : false),
        }
        IF event.trigger THEN showEvent()

*/
export const triggers = {
    // Responsive triggers based on player actions

    // Emergent triggers based on worldstate
    publicSupportIsLow: (worldstate) => worldstate.publicSupport < 50,
    businessSupportIsLow: (worldstate) => worldstate.businessSupport < 50,
    healthcareSupportIsLow: (worldstate) => worldstate.healthcareSupport < 50,

    publicSupportIsHigh: (worldstate) => worldstate.publicSupport > 50,
    businessSupportIsHigh: (worldstate) => worldstate.businessSupport > 50,
    healthcareSupportIsHigh: (worldstate) => worldstate.healthcareSupport > 50
};

