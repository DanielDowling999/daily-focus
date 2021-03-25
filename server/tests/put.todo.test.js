const request = require("supertest");
const app = require("../app");
const database = require("../firebase").database;
const getTodaysDate = require("../utils/date-helper");

let todaysDate = getTodaysDate()

const expectedToDoListData = [
    {
        date: "2099-03-20",
        description: "Eat",
        entry_id: 1,
        ticked: false,
        time: "08:00",
        title: "Shopping",
    },
    {
        date: todaysDate,
        description: "sleep",
        entry_id: 1,
        ticked: false,
        time: "10:00",
        title: "Shopping",
    },
    {
        date: todaysDate,
        description: "Go shopping with bob",
        entry_id: 1,
        ticked: false,
        time: "08:00",
        title: "Shopping",
    },
    {
        date: "2030-03-20",
        description: "Changing description",
        entry_id: "a6722588-4f1c-4de1-aba0-ed597930871e",
        ticked: false,
        time: "08:00",
        title: "Shopping",
    },
];

// Jest to test on mockDatabase
jest.mock("../firebase", () => {
    const mockDatabase = require("../mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});

// Jest to mock authroised update.
jest.mock("../utils/auth", () => {
    return jest.fn(() => Promise.resolve("mockValidToken"));
});


describe("PUT todolist endpoint", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("Mock database should successfully update on a PUT request.", async () => {
        const todolistItemInput = {
            date: "2030-03-20",
            description: "Changing description",
            entry_id: "a6722588-4f1c-4de1-aba0-ed597930871e",
            ticked: false,
            time: "08:00",
            title: "Shopping",
        };

        const response = await request(app)
            .put("/todo")
            .set("Accept", "application/json")
            .send(todolistItemInput)

        // Test passes if successful update on mock data.
        expect(response.status).toBe(200); 
        expect(database.ref().child().child("to").set).toHaveBeenCalledWith(expectedToDoListData);
    });
});