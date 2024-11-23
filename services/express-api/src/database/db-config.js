import { MongoClient } from "mongodb";
import {logger} from "../server/config/logger-config.js";

let db; 

const connectToDB = async () => {
  const connectionString = process.env.ATLAS_URI || "";
  const client = new MongoClient(connectionString);
  let conn;

  try {
    logger.debug("Trying to connect...");
    conn = await client.connect();
    logger.debug("Connection successful.");
    db = conn.db("shoe-shop");
    logger.debug("Pinging Database..."); 
    await db.command({ping: 1});
    logger.debug("Pong.");
  } catch(e) {
    logger.error(e.toString());
  }
}

const getDB = () => {
  return db; 
}

export {connectToDB, getDB}