'use strict';
// const serviceBindings = require('kube-service-bindings');
const { Pool } = require('pg');

let connectionOptions;
try {
  // connectionOptions = serviceBindings.getBinding('POSTGRESQL', 'pg');
  console.log("service binding operator is a feature of OpenShift to override env vars");
} catch (err) {
  const serviceHost = process.env.MY_DATABASE_SERVICE_HOST || process.env.POSTGRESQL_SERVICE_HOST || 'localhost';
  const user = process.env.DB_USERNAME || process.env.POSTGRESQL_USER || 'todo';
  const password = process.env.DB_PASSWORD || process.env.POSTGRESQL_PASSWORD || 'todo';
  const databaseName = process.env.POSTGRESQL_DATABASE || 'todo';
  const connectionString = `postgresql://${user}:${password}@${serviceHost}:5432/${databaseName}`;
  connectionOptions = { connectionString };
}

const pool = new Pool(connectionOptions);

async function didInitHappen () {
    const query = 'select * from todo';
  
    try {
      await pool.query(query);
      console.log('Database Already Created');
      return true;
    } catch (err) {
      return false;
    }
  }
  
  // -- Create the todo table if not present
  const initScript = `CREATE TABLE IF NOT EXISTS todo (
    id        SERIAL PRIMARY KEY,
    title     VARCHAR(255),
    completed boolean,
    ordering  integer,
    url       VARCHAR(255)
  );
  
  DELETE FROM todo;
  
  INSERT INTO todo (title, completed) values ('Love JavaScript', false);
  INSERT INTO todo (title, completed) values ('Love ExpressJS', false);
  INSERT INTO todo (title, completed) values ('Be Awesome', false);`;
  
  async function query (text, parameters) {
    // Check that we have initialized the DB on each Query request
    const initHappened = await didInitHappen();
    if (!initHappened) {
      await init();
    }
  
    return pool.query(text, parameters);
  }
  
  async function init () {
    const initHappened = await didInitHappen();
    if (!initHappened) {
      return pool.query(initScript);
    }
  }
  
  module.exports = {
    query,
    init
  };
  