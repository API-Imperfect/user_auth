import {createConnection} from "typeorm/index";

export const testConn = (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "alpha",
        database: "user_auth_test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/*.*"],
    });
};