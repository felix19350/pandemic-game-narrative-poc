/*
    In-game events:
        - what information to show to players
        - what choices to give players to response

        Stucture:
        {
            name,
            description,
            responses: [
                {
                    name,
                    effects: [descriptions of each effect (array of strings)]
                },
            ]
        }
*/

/* eslint-disable */
export const storyEvents = {
    evtVaccineDeployed: {
        name: `Vaccine being deployed`,
        description: `
            A vaccination for COVID-19 is starting to be deployed throughout the country.
            The researchers who developed it claim that it has proven effective in making patients immune to COVID-19.
        `,
        responses: [
            {
                name: `Great! End lockdown`,
                effects: [`Lockdown removed`, `Gain public support`, `Gain business support`, `Lose healthcare support`]
            },
            {
                name: `Do nothing. The vaccine will take a while to work.`,
                effects: [`Lockdown continues`]
            }
        ]
    }
};
