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
    evt01: {
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
    },
    evt02A: {
        name: `COVID-19 makes business difficult`,
        description: `
            Businesses are reporting that logistical challenges and the reduction in in-person consumerism has made it difficult to make a profit.
            Some reports suggest that lockdown would have helped end this unprofitable period during the COVID-19 pandemic. 
            However, others focus on the huge growth of digital services, particularly for teleconferencing and remote working software.
        `,
        responses: [
            {
                name: `Announce digital golden age`,
                effects: [`Gain business support`]
            },
            {
                name: `Oops...`,
                effects: [`Lose public support`, `Lose business support`, `Lose healthcare support`]
            }
        ]
    },
    evt02B: {
        name: `Lockdown fatigue`,
        description: `
            People are getting tired of being in lockdown. Not being able to socialise, work and exercise as normal is starting to take a toll on people's wellbeing.
            There are increasing reports that people are less willing to obey lockdown rules.
        `,
        responses: [
            {
                name: `Lift lockdown early`,
                effects: [
                    'Lockdowns removed',
                    'Gain public support',
                    'Gain business support',
                    'Lose healthcare support'
                ]
            },
            {
                name: `Sympathise but we have to continue lockdown.`,
                effects: []
            }
        ]
    },
    evt03A: {
        name: `Cases reach all new peaks`,
        description: `
            The number of COVID-19 cases has reached an all time high.
            Some news reports claim that this was because the lockdown was lifted, others blame lockdown fatigue- or that the vaccination has made people less worried about socialising.
        `,
        responses: [
            {
                name: `We ended lockdown and we will stick to our decision.`,
                effects: [`Lose healthcare support`]
            },
            {
                name: `Lockdown!`,
                effects: [`Lockdown enforced`, `Lose public support`, `Lose business support`]
            }
        ]
    },
    evt03B: {
        name: `Rising reports of poor wellbeing and mental ill health`,
        description: `
            There are increasing reports that this extended period of lockdown is having negative consequences on people's wellbeing and mental health.
            Some charities and non-government organisations have started advocating for lockdown restrictions to be relaxed for individuals in crisis.
        `,
        responses: [
            {
                name: `Relax lockdown for individuals in crisis`,
                effects: [`Lockdown becomes less effective`, `Gain public support`, `Gain healthcare support`]
            },
            {
                name: `No exceptions. People will take advantage...`,
                effects: [`Lose public support`]
            }
        ]
    }
};
