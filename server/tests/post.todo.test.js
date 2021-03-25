const request = require("supertest");
const app = require("../app");
const database = require("../firebase").database;

const expectedToDoListData = 
            {
                date: "2077-06-20",
                description: "Add to todolist",
                entry_id: "1234",
                ticked: false,
                time: "09:00",
                title: "Update agenda",
            };


jest.mock("../firebase", () => {
    const mockDatabase = require("../mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});


jest.mock("../utils/auth", () => {
    return jest.fn(() => Promise.resolve("mockValidToken"));
});

jest.mock("uuid", () => ({
    v4: jest.fn(() => "1234")
}));

describe("POST todolist endpoint", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    it("todolist item added with uuid generated and :ticked set to false", async () => {
        const todolistItemInput = {
            date: "2077-06-20",
            description: "Add to todolist",
            time: "09:00",
            title: "Update agenda",
        };

        var mockDatabaseData = database.ref().getMockData().val();

        mockDatabaseData.pop(expectedToDoListData);

        const response = await request(app)
            .post("/todo")
            .set("Accept", "application/json")
            .send(todolistItemInput)

        expect(response.status).toBe(200);
        expect(database.ref().child().child("to").set).toHaveBeenCalledWith(mockDatabaseData);
    });
});