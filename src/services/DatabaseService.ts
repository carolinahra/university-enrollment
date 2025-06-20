import { Connection, createPool, Pool } from 'mysql2';

interface DatabaseConfig {
    host: string;
    user: string;
    database: string;
    password: string;
    port?: number;
}


export class DatabaseService {
    private host: string;
    private user: string;
    private database: string;
    private password: string;
    private port?: number;
    private pool: Pool;


    constructor(config: DatabaseConfig) {
        this.database = config.database;
        this.user = config.user;
        this.password = config.password;
        this.host = config.host;
        this.port = config.port;
    }

    connect() {
        this.pool = createPool({
            host: this.host,
            user: this.user,
            database: this.database,
            port: this.port,
            password: this.password,
        })
    }


    async execute(query: string, values?: Array<string | number>, connection?: Connection) {
        return new Promise((resolve, reject) => {
            (connection || this.pool).execute(query, values, function (error, result, fields) {
                if (error) {
                    return reject(error.message);
                }
                return resolve(result);
            });
        });

    }

    disconnect() {
        this.pool.end();
    }
}