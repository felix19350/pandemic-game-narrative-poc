/*
    Array of triggers in game
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

