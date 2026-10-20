import dotenv from "dotenv";

// Loaded first of all (side effect): the modules imported afterwards
// (proxies...) read process.env at import time.
dotenv.config();
