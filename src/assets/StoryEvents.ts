import { GameState } from '../model/GameState';
import { Event } from '../model/Events';
import { lockdown, openBusinesses, lockdownWithExceptions } from '../simulator/PlayerActions';

export const StoryEvents: Event[] = [
    {
        id: 'lockdown01vaccine',
        name: 'Vaccine being deployed',
        description: `A vaccination for COVID-19 is starting to be deployed throughout the country.
        The researchers who developed it claim that it has proven effective in making patients immune to COVID-19.`,
        canRun: (gameState: GameState) => {
            return gameState.turnNumber === 1;
        },
        responses: [
            {
                id: 'lockdown01vaccine_lift',
                eventId: 'lockdown01vaccine',
                name: `Great! Let's slowly open back up`,
                label: [
                    `Businesses will re-open`,
                    `Wellbeing will improve`,
                    `COVID-19 cases will rise`
                ],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 26, oppose: 69}
                    },
                    feedback: {
                        toResponse: 'Businesses open again as the vaccine is deployed.',
                        fromPublic: `Finally on the right track <i class='feedback-message-emoji fas fa-subway'></i>`,
                        fromBusiness: `CONFIDENCE IN ACHIEVING A STABLE ECONOMY RISES`,
                        fromHealthcare: `COVID-19 cases rising sharply!`
                    },
                    playerActions: {
                        containmentPolicies: [openBusinesses],
                        capabilityImprovements: []
                    }
                })
            },
            {
                id: 'lockdown01vaccine_continue',
                eventId: 'lockdown01vaccine',
                name: 'Do nothing. The vaccine will take a while to work.',
                label: [`Lockdown continues`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 69, oppose: 26}
                    },
                    feedback: {
                        toResponse: 'Lockdown remains in effect as the vaccine is deployed.',
                        fromPublic: `<i class='feedback-message-emoji fas fa-meh-rolling-eyes'></i> - me this year`,
                        fromBusiness: `CONTINUED COVID-19 MEASURES RISK BIGGEST DEPRESSION YET`,
                        fromHealthcare: `COVID-19 response gives nurses some much needed and rare downtime as cases drop.`
                    },
                    playerActions: {
                        containmentPolicies: [lockdown],
                        capabilityImprovements: []
                    }
                })
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
        canRun: (gameState: GameState) => {
            return (
                gameState.turnNumber === 2 && gameState.indicators.containmentPolicies === [openBusinesses] // when lockdown not active
            );
        },
        responses: [
            {
                id: 'open01business_spin',
                eventId: 'open01business',
                name: 'Announce digital golden age',
                label: [`Businesses will be able to operate`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 50, oppose: 50}
                    },
                    feedback: {
                        toResponse: 'Announced a golden age for digital business.',
                        fromPublic: `<i class='feedback-message-emoji fas fa-grin-squint'></i>`,
                        fromBusiness: `'DIGITAL SERVICES: OUR ECONOMIC SAVIOUR?'`,
                        fromHealthcare: `COVID-19 cases reach all time high!`
                    },
                    playerActions: {
                        containmentPolicies: [openBusinesses],
                        capabilityImprovements: []
                    }
                })
            },
            {
                id: 'open01business_reconsider',
                eventId: 'open01business',
                name: 'Oops... Perhaps we should reconsider lockdown.',
                label: [`Wellbeing will fall`, `Businesses will struggle`, `COVID-19 cases will rise`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 50, oppose: 50}
                    },
                    feedback: {
                        toResponse: 'Reconsidered lockdown',
                        fromPublic: '@Ieader did you just admit your mistake?!',
                        fromBusiness: ' "INDICISIVE LEADER" CREATES ECONOMIC UNCERTAINTY ',
                        fromHealthcare: `'I worked 40 hours yesterday': Healthcare workers stressed by new cases`
                    },
                    playerActions: {
                        containmentPolicies: [openBusinesses],
                        capabilityImprovements: []
                    }
                })
            }
        ]
    },
    {
        id: 'lockdown02fatigue',
        name: 'Lockdown fatigue',
        description: `
            People are getting tired of being in lockdown. Not being able to socialise, work and exercise as normal is starting to take a toll on people's wellbeing.
            There are increasing reports that people are less willing to obey lockdown rules.
        `,
        canRun: (gameState: GameState) => {
            return (
                gameState.turnNumber === 2 && gameState.indicators.containmentPolicies === [lockdown]
            );
        },
        responses: [
            {
                id: 'lockdown02fatigue_lift',
                eventId: 'lockdown02fatigue',
                name: 'Lift lockdown early',
                label: [
                    'Lockdowns removed',
                    'Wellbeing will improve',
                    'Businesses will be able to operate',
                    'COVID-19 cases will rise',
                    'You may gain a reputation'
                ],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 11, oppose: 85},
                        reputation: [
                            {
                                id: 'flipflopper',
                                name: `Flip-flopper`,
                                icon: `<i class='fas fa-socks'></i>`,
                                description: `You have gained a reputation as a flip-flopper because you changed your mind on your lockdown polioc.`
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'Lifted lockdown early',
                        fromPublic: `#people #wellbeing first <i class='feedback-message-emoji fas fa-hand-peace'></i>`,
                        fromBusiness: `LENDERS START TO SEE RETURNS ON PANDEMIC LOANS`,
                        fromHealthcare: `Is wellbeing more important than health? Socialisation increases COVID-19 risk`
                    },
                    playerActions: {
                        containmentPolicies: [openBusinesses],
                        capabilityImprovements: []
                    }
                })
            },
            {
                id: 'lockdown02fatigue_continue',
                eventId: 'lockdown02fatigue',
                name: 'Sympathise but we have to continue lockdown.',
                label: ['Lockdown continues'],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 85, oppose: 11}
                    },
                    feedback: {
                        toResponse: 'Sympathised but continued lockdown.',
                        fromPublic: `<i class='feedback-message-emoji fas fa-hand-middle-finger'></i>.`,
                        fromBusiness: `PANDEMIC TRIGGERS GLOBAL RECESSION`,
                        fromHealthcare: `COV-SARS-19 cases dip to all time low`
                    },
                    playerActions: {
                        containmentPolicies: [lockdown],
                        capabilityImprovements: []
                    }
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
            as ended so cases should reduce. 
            `,
        canRun: (gameState: GameState) => {
            return gameState.turnNumber === 3 && gameState.indicators.containmentPolicies === [openBusinesses]
        },
        responses: [
            {
                id: 'open02casesPeak_continue',
                eventId: 'open02casesPeak',
                name: 'We ended lockdown and we will stick to our decision.',
                label: [`COVID-19 cases will rise`, 'You may gain a reputation'],
                isApplicable: (gameState: GameState) => {
                    return gameState.indicators.reputation.length === 0; // Only available if not flip flopper
                },
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 55, oppose: 45}, // People like decisiveness
                        reputation: [
                            {
                                id: 'stubborn',
                                name: `Stubborn`,
                                icon: `<i class='fas fa-fire'></i>`,
                                description: `You have gained a reputation for making a decision and sticking to it... no matter the cost...`
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'Stuck to the decision to end lockdown.',
                        fromPublic: `We were already giving this virus too much attention anyway`,
                        fromBusiness: `ECONOMY SHOWS SIGNS OF RECOVERY`,
                        fromHealthcare: 'Cases rising: Every day sets a new record high'
                    },
                    playerActions: {
                        containmentPolicies: [openBusinesses],
                        capabilityImprovements: []
                    }
                })
            },
            {
                id: 'open02casesPeak_lift',
                eventId: 'open02casesPeak',
                name: 'Lockdown!',
                label: [
                    `Lockdown enforced`,
                    `Wellbeing will fall`,
                    `Businesses will struggle`,
                    `You may gain a reputation`
                ],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 40, oppose: 60},
                        reputation: [
                            {
                                id: 'flipflopper',
                                name: `Flip-flopper`,
                                icon: `<i class='fas fa-socks'></i>`,
                                description: `You have gained a reputation as a flip-flopper because you changed your mind on your lockdown policy.`
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'Lockdown re-enforced',
                        fromPublic: `So sick of this.`,
                        fromBusiness: '"CONFUSED LOCKDOWN POLICY" MAKES BUSINESS UNPREDICTABLE',
                        fromHealthcare: 'Number of new cases falls for first time in a month'
                    },
                    playerActions: {
                        containmentPolicies: [lockdown],
                        capabilityImprovements: []
                    }
                })
            }
        ]
    },
    {
        id: 'lockdown03wellbeing',
        name: 'Rising reports of poor wellbeing and mental ill health',
        description: `
            There are increasing reports that this extended period of lockdown is having negative consequences on people's wellbeing and mental health.
            Some charities and non-government organisations have started advocating for lockdown restrictions to be relaxed for individuals in crisis.
            as ended so cases should reduce. 
        `,
        canRun: (gameState: GameState) => {
            return gameState.turnNumber === 3 && gameState.indicators.containmentPolicies === [lockdown]
        },
        responses: [
            {
                id: 'lockdown03wellbeing_relax',
                eventId: 'lockdown03wellbeing',
                name: 'Relax lockdown for individuals in crisis',
                label: [`Lockdown becomes less effective`, `Wellbeing will improve`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 84, oppose: 12}
                    },
                    feedback: {
                        toResponse: 'Relaxed lockdown for individuals in crisis',
                        fromPublic: `2020 is <i class='feedback-message-emoji fas fa-tired'></i>`,
                        fromBusiness: `COMPANIES CONTINUE TO REPORT 'UNPROFITABLE CONDITIONS'`,
                        fromHealthcare: `Health minister: COVID-19 remains a threat but is 'under control'`
                    },
                    playerActions: {
                        containmentPolicies: [lockdownWithExceptions],
                        capabilityImprovements: []
                    }
                })
            },
            {
                id: 'lockdown03wellbeing_continue',
                eventId: 'lockdown03wellbeing',
                name: 'No exceptions. People will take advantage...',
                label: [`Lockdown remains in effect`, `Wellbeing will fall`, `COVID-19 cases will fall`],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        poll: {support: 12, oppose: 84},
                        reputation: [
                            {
                                id: 'resolved',
                                name: `Resolved`,
                                icon: `<i class='fas fa-shield-virus'></i>`,
                                description: `You have gained a reputation for being resolved because you refused to compromise on lockdown regardless of the situation.`
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'No exceptions were made for lockdown.',
                        fromPublic: `<i class='feedback-message-emoji fas fa-flushed'></i>`,
                        fromBusiness: `COMPANIES CONTINUE TO REPORT 'UNPROFITABLE CONDITIONS'`,
                        fromHealthcare: `Everyone is 'in crisis' anyway: Cynical response to wellbeing needs may sooner end pandemic`
                    },
                    playerActions: {
                        containmentPolicies: [lockdown],
                        capabilityImprovements: []
                    }
                })
            }
        ]
    }
];
