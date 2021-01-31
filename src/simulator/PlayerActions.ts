import {ContainmentPolicy, WorldState, SimulatorMetrics, PlayerActions} from '../Simulator/SimulatorModel'

/* 
    Model lockdowns (source for effects of policies on R -- http://epidemicforecasting.org/containment-calculator)
    - adjusted for lower real-world effectiveness (86% --> 70%)
    - perhaps because people are taking this lockdown less seriously (74% of people believe this to be true) source: YouGov 

    Base 'lockdown' models a full lockdown with medium compliance which reduces effectiveness: 
        
        Paramaters
        ----------
        - Non-essential businesses closed
        - mask wearing enforced
        - symptomatic testing enforced
        - limited gatherings to <10
        - schools / unis closed
    
*/

export const lockdown: ContainmentPolicy = {
    id: 'lockdown',
    icon: '',
    requirements: [],
    name: 'Lockdown',
    activeLabel: 're-enforced',
    inactiveLabel: 'lifted',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.70 ),  
    })
}
export const openBusinesses: ContainmentPolicy = {
    id: 'openBusinesses',
    icon: '',
    requirements: [],
    name: 'Businesses',
    activeLabel: 're-opened',
    inactiveLabel: 'remain closed',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.673 ), // -67.3% -- New normal = some businesses open (-4% to lockdown effectiveness)
    })
}
export const lockdownWithExceptions: ContainmentPolicy = {
    id: 'lockdownWithExceptions',
    icon: '',
    requirements: [],
    name: 'Lockdown exceptions',
    activeLabel: 'allowed',
    inactiveLabel: 'not allowed',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.69 ), // Assume relaxed laws increase r by 1%
    })
}

/* Unused */
export const schoolsReopen: ContainmentPolicy = {
    id: 'schoolsReopen',
    icon: '',
    requirements: [],
    name: 'Schools',
    activeLabel: 're-opened',
    inactiveLabel: 'closed',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.676 ), // --67.6 -- Everything closed but schools open (-61.0% if used at the same time as new normal)
    })
}

/* OLD CONTAINMENT POLICIES

export const compromisedLockdown: ContainmentPolicy = {
    id: 'compromisedLockdown',
    icon: '',
    requirements: [],
    name: 'Lockdown with compromises',
    activeLabel: 'enforced',
    inactiveLabel: 'lifted',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.695 ), // -69% -- Lockdown as above but with 1% lower compliance 
    })
}
export const newNormal: ContainmentPolicy = {
    id: 'newNormal',
    icon: '',
    requirements: [],
    name: 'The new normal (no lockdown)',
    activeLabel: 'enforced',
    inactiveLabel: 'lifted',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r - ( context.metrics.r * 0.69 ), 
    })
}

// Model environmental conditions as policies for simplicity
export const winter: ContainmentPolicy = {
    id: 'currentLockdown',
    icon: '',
    requirements: [],
    name: 'Total lockdown',
    activeLabel: 'enforced',
    inactiveLabel: 'lifted',
    immediateEffect: (context: WorldState) => ({...context.metrics}),
    recurringEffect: (context: WorldState) => ({
        ...context.metrics,
        r: context.metrics.r + 0.4 // Seasonal increase in R
    })
}
 */