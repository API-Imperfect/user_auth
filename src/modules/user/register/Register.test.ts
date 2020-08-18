import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm/index";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
    register(data: $data)
    {
    id
    firstName
    lastName
    email
    name
    }
}

`;

describe("Register", () => {
    it("create user", async () => {
        console.log(
            await gCall({
                source: registerMutation,
                variableValues: {
                    data: {
                        firstName: "Claude",
                        lastName: "Ogilo",
                        email: "bob@gmail.com",
                        password: "1234567",
                    },
                },
            })
        );
    });
});