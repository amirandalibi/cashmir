'use strict';

const { Pool } = require('pg');
const { dbConnectionString: connectionString } = require('../config');
const pool = new Pool({connectionString});

module.exports = pool;
