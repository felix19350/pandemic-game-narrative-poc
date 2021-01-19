import GameController, { isGameState } from "@src/controller/GameController";
import { GameState } from "@src/model/GameState";
import { Event } from "@src/model/Events";

const simpleBinaryChoiceNarrative: Event[] = [
    {
        id: "start",
        name: "Start of narrative",
        description: "A fancy text",
        canRun: (gameState: GameState) => { return gameState.turnNumber === 1 },
        responses: [
            {
                id: "start.goLeft",
                eventId: "start",
                name: "Go left",
                label: ["Go left"],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { ...gameState.indicators, reputation: ["Left"] }, feedback: "Went left" })
            },
            {
                id: "start.goRight",
                eventId: "start",
                name: "Go right",
                label: ["Go right"],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: { ...gameState.indicators, reputation: ["Right"] }, feedback: "Went right" })
            }
        ]
    },
    {
        id: "left",
        name: "Left branch",
        description: "A fancy text",
        canRun: (gameState: GameState) => {
            if (gameState.responseHistory.length < 1) {
                return false
            } else {
                const wentLeft = gameState.responseHistory[gameState.responseHistory.length - 1].responses.find(resp => resp.response.id === "start.goLeft");
                return gameState.turnNumber === 2 && wentLeft !== undefined
            }

        },
        responses: [
            {
                id: "left.end",
                eventId: "left",
                name: "Finish",
                label: ["Narrative ended on the left branch"],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: gameState.indicators, feedback: "Done left" })
            }
        ]
    },
    {
        id: "right",
        name: "Right branch",
        description: "A fancy text",
        canRun: (gameState: GameState) => {
            if (gameState.responseHistory.length < 1) {
                return false
            } else {
                const wentRight = gameState.responseHistory[gameState.responseHistory.length - 1].responses.find(resp => resp.response.id === "start.goRight");
                return gameState.turnNumber === 2 && wentRight !== undefined
            }
        },
        responses: [
            {
                id: "right.end",
                eventId: "right",
                name: "Finish",
                label: ["Narrative ended on the right branch"],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({ updatedIndicators: gameState.indicators, feedback: "Done right" })
            }
        ]
    }
]

describe("The operation of the game controller", () => {

    const narrative = simpleBinaryChoiceNarrative;
    const gameController = new GameController(narrative);

    it("Is able to start", () => {
        expect(gameController.canProceedToNextTurn()).toBe(true);
    });

    it("Returns the event for the first turn", () => {
        const nextTurn = gameController.nextTurn();

        // Expect the event to match the first item on the narrative
        if (isGameState(nextTurn)) {
            fail("Should have returned an event.")
        } else {
            expect(gameController.canProceedToNextTurn()).toBe(false)
            expect(nextTurn.length).toBe(1);
            expect(nextTurn[0].id).toEqual("start");
            expect(nextTurn[0].name).toEqual("Start of narrative");
        }
    })

    it("Stores the player's choices for each event", () => {
        const feedback = gameController.respondToEvent("start.goLeft");
        expect(feedback).toEqual("Went left")
        expect(gameController.canProceedToNextTurn()).toBe(true)
    });

    it("Presents the next event", () => {
        const nextTurn = gameController.nextTurn();
        // Expect the event to match the first item on the narrative
        if (isGameState(nextTurn)) {
            fail("Should have returned an event.")
        } else {
            expect(gameController.canProceedToNextTurn()).toBe(false)
            expect(nextTurn.length).toBe(1);
            expect(nextTurn[0].id).toEqual("left");
            expect(nextTurn[0].name).toEqual("Left branch");
        }
    });

    it("Returns the game state once there are no more events to return", () => {
        const feedback = gameController.respondToEvent("left.end");
        expect(feedback).toEqual("Done left")
        expect(gameController.canProceedToNextTurn()).toBe(true)

        const nextTurn = gameController.nextTurn();
        if (isGameState(nextTurn)) {
            expect(nextTurn.indicators.reputation).toEqual(["Left"]) // Reputation is consistent with the narrative
            expect(nextTurn.turnNumber).toBe(3)
            expect(nextTurn.responseHistory.length).toBe(2)
            expect(nextTurn.responseHistory[0].responses[0].response.id).toEqual("start.goLeft")
            expect(nextTurn.responseHistory[1].responses[0].response.id).toEqual("left.end")
        } else {
            fail("Should have returned the game state signaling the end of the game.")
        }
    });
});
