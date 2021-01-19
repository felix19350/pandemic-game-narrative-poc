import { GameState } from '../model/GameState';

export const StoryEvents = [
    {
        id: 'lockdown01vaccine',
        name: 'Vaccine being deployed',
        description: `A vaccination for COVID-19 is starting to be deployed throughout the country.
        The researchers who developed it claim that it has proven effective in making patients immune to COVID-19.`,
        canRun: (gameState: GameState) => { return gameState.turnNumber === 1 },
        responses: [
            {
                id: 'lockdown01vaccine.lift',
                eventId: 'lockdown01vaccine',
                name: 'Great! End lockdown',
                label: [`Lockdown removed`, `Gain public support`, `Gain business support`, `Lose healthcare support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        lockdownEffectiveness: 0,
                        publicSupport: 1,
                        businessSupport: 1,
                        HealthcareSupport: -1
                    }, 
                    feedback: 'Lockdown is ended as the vaccine is deployed.' 
                })
            },
            {
                id: 'lockdown01vaccine.continue',
                eventId: 'lockdown01vaccine',
                name: 'Do nothing. The vaccine will take a while to work.',
                label: [`Lockdown continues`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 

                    }, 
                    feedback: 'Lockdown remains in effect as the vaccine is deployed.' })
            }
        ]
    },
    {
        id: 'open01business',
        name: 'COVID-19 makes business difficult',
        description: `
            Businesses are reporting that logistical challenges and the reduction in in-person consumerism has made it difficult to make a profit.
            Some reports suggest that lockdown would have helped end this unprofitable period during the COVID-19 pandemic. 
            However, others focus on the huge growth of digital services, particularly for teleconferencing and remote working software.
        `,
        canRun: (gameState: GameState) => { return (
                gameState.turnNumber === 2 
                &&
                gameState.indicators.lockdownEffectiveness === 0 // when lockdown not active
        )},
        responses: [
            {
                id: 'open01business.spin',
                eventId: 'open01business',
                name: 'Announce digital golden age',
                label: [`Gain business support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        businessSupport: 1
                    }, 
                    feedback: 'Announced a digital golden age'
                })
            },
            {
                id: 'open01business.reconsider',
                eventId: 'open01business',
                name: 'Oops... Perhaps we should reconsider lockdown.',
                label: [`Lose public support`, `Lose business support`, `Lose healthcare support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: {
                        publicSupport: -1,
                        businessSupport: -1,
                        healthcareSupport: -1
                    }, 
                    feedback: 'Reconsidered lockdown'
                })
            },
        ]
    },
    {
        id: 'lockdown02fatigue',
        name: 'Lockdown fatigue',
        description: `
            People are getting tired of being in lockdown. Not being able to socialise, work and exercise as normal is starting to take a toll on people's wellbeing.
            There are increasing reports that people are less willing to obey lockdown rules.
        `,
        canRun: (gameState: GameState) => { return (
                gameState.turnNumber === 2 
                &&
                gameState.indicators.lockdownEffectiveness > 0
        )},
        responses: [
            {
                id: 'lockdown02fatigue.lift',
                eventId: 'lockdown02fatigue',
                name: 'Lift lockdown early',
                label: [
                    'Lockdowns removed',
                    'Gain public support',
                    'Gain business support',
                    'Lose healthcare support'
                ],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        lockdownEffectiveness: 0,
                        publicSupport: 1,
                        businessSupport: 1,
                        healthcareSupport: -1
                    }, 
                    feedback: 'Lifted lockdown early'
                })
            },
            {
                id: 'lockdown02fatigue.continue',
                eventId: 'lockdown02fatigue',
                name: 'Sympathise but we have to continue lockdown.',
                label: [
                    'Lockdown continues'
                ],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 

                    }, 
                    feedback: 'Sympathised but continued lockdown.'
                })
            }
        ]
    },
    {
        id: 'open02casesPeak',
        name: 'Cases reach all new peaks',
        description: `
            The number of COVID-19 cases has reached an all time high.
            Some news reports claim that this was because the lockdown was lifted, others blame lockdown fatigue- or that the vaccination has made people less worried about socialising.
        `,
        canRun: (gameState: GameState) => { return (
                gameState.turnNumber === 3 
                &&
                gameState.indicators.lockdownEffectiveness === 0 
        )},
        responses: [
            {
                id: 'open02casesPeak.continue',
                eventId: 'open02casesPeak',
                name: 'We ended lockdown and we will stick to our decision.',
                label: [`Lose healthcare support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        healthcareSupport: 0
                    }, 
                    feedback: 'Stuck to the decision to end lockdown.'
                })
            },
            {
                id: 'open02casesPeak.lift',
                eventId: 'open02casesPeak',
                name: 'Lockdown!',
                label: [`Lockdown enforced`, `Lose public support`, `Lose business support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        lockdownEffectiveness: 1,
                        publicSupport: -1,
                        businessSupport: -1,
                        healthcareSupport: -1
                    }, 
                    feedback: 'Lockdown re-enforced'
                })
            },
        ]
    },
    {
        id: 'lockdown03wellbeing',
        name: 'Rising reports of poor wellbeing and mental ill health',
        description: `
            There are increasing reports that this extended period of lockdown is having negative consequences on people's wellbeing and mental health.
            Some charities and non-government organisations have started advocating for lockdown restrictions to be relaxed for individuals in crisis.
        `,
        canRun: (gameState: GameState) => { return (
                gameState.turnNumber === 3 
                &&
                gameState.indicators.lockdownEffectiveness > 0
        )},
        responses: [
            {
                id: 'lockdown03wellbeing.relax',
                eventId: 'lockdown03wellbeing',
                name: 'Relax lockdown for individuals in crisis',
                label: [`Lockdown becomes less effective`, `Gain public support`, `Gain healthcare support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        lockdownEffectiveness: 0.8,
                        publicSupport: 1,
                        healthcareSupport: 1
                    }, 
                    feedback: 'Relaxed lockdown for individuals in crisis'
                })
            },
            {
                id: 'lockdown03wellbeing.continue',
                eventId: 'lockdown03wellbeing',
                name: 'No exceptions. People will take advantage...',
                label: [`Lose public support`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { 
                        publicSupport: -1
                    }, 
                    feedback: 'No exceptions were made for lockdown.'
                })
            },
        ]
    }
]
