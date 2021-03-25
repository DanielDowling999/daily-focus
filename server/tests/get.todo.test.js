const request = require("supertest");
const app = require("../app");
const getTodaysDate = require("../utils/date-helper");

let todaysDate = getTodaysDate()

const expectedTodaysTodo = [
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
];

const expectedUpcomingTodo = {
    "2099-03-20": [
        {
            date: "2099-03-20",
            description: "Eat",
            entry_id: 1,
            ticked: false,
            time: "08:00",
            title: "Shopping",
        },
    ],
};

const expectedAllTodo = [
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
        date: "2000-03-20",
        description: "do something desc",
        entry_id: "a6722588-4f1c-4de1-aba0-ed597930871e",
        ticked: false,
        time: "12:00",
        title: "do something",
    },
];

jest.mock("../firebase", () => {
    const mockDatabase = require("../mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});

jest.mock("../utils/auth", () => {
    return jest.fn(() => Promise.resolve("mockValidToken"));
});

describe("/todo endpoint  ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("when a todays todolist items are requested for an authorised user correct data is returned  ", async () => {
        const response = await request(app)
            .get("/todo")
            .set("Accept", "application/json")
            .query({ timeline: "today" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedTodaysTodo);
    });

    it("when all todolist items are requested for an authorised user correct data is returned  ", async () => {
        const response = await request(app).get("/todo").set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedAllTodo);
    });

    it("when all upcoming items are requested for an authorised user correct data is returned  ", async () => {
        const response = await request(app)
            .get("/todo")
            .set("Accept", "application/json")
            .query({ timeline: "upcoming" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedUpcomingTodo);
    });
});
