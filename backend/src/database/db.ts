import {Pool} from "pg"

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_Lqtn8ywmN3Td@ep-young-butterfly-a5vdjjhk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
});

export default pool;