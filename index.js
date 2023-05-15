const express = require('express');
const { json } = require('express');
const { knex } = require('./config/database');
const personRouter = require('./app/routes/route');

const app = express();

app.use(json());

app.use('/person', personRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

knex.migrate.latest().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
