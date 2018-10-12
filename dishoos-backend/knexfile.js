module.exports = {
  prod: {
    client: 'postgresql',
    connection: {
      host: 'db.doc.ic.ac.uk',
      port: 5432,
      database: 'g1727133_u',
      user: 'g1727133_u',
      password: 'iADzF7acki',
    },
  },
  dev: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'dishoos_dev',
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'dishoos_test',
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
    },
  },
};
