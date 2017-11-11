
const { promisify } = require('util');
const fs = require('fs');
const mysql = require('mysql');

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

function getAllNodes(connection) {

  return new Promise((resolve, reject) => {

    const articles = new Map();

    connection.query('SELECT * FROM `node` WHERE `status` = 1', (error, results) => {
      if (error) {
        return reject(error);
      }

      results.forEach((result) => {
        articles.set(result.vid, Object.assign({}, result));
      });

      return resolve(articles);
    });
  });
}

function getAllContent(connection, articles) {

  const promises = [];

  articles.forEach((article, vid) => {

    promises.push(new Promise((resolve, reject) => {

      connection.query('SELECT `entity_id`, `body_value` FROM `field_revision_body` WHERE `revision_id`= ?', [vid], (error, results) => {
        if (error) {
          return reject(error);
        }

        const node = results[0];

        return resolve(Object.assign(article, node));
      });

    }));
  });

  return Promise.all(promises);
}

function getUrlAlias(connection, articles) {
  const promises = [];

  articles.forEach((article) => {

    promises.push(new Promise((resolve, reject) => {

      connection.query('SELECT `source`, `alias` FROM `url_alias` WHERE `source`= ?', [`node/${article.nid}`], (error, results) => {
        if (error) {
          return reject(error);
        }

        const node = results[0];

        return resolve(Object.assign(article, node));
      });

    }));
  });

  return Promise.all(promises);
}

function getTags(connection, articles) {
  const promises = [];

  articles.forEach((article) => {

    promises.push(new Promise((resolve, reject) => {

      connection.query(`SELECT t.\`name\`, i.\`nid\`
FROM \`taxonomy_term_data\` t
JOIN \`taxonomy_index\` i ON (i.\`tid\` = t.\`tid\`)
WHERE i.\`nid\` = ?`, [article.nid], (error, results) => {
          if (error) {
            return reject(error);
          }

          const tags = results.map(r => r.name) || [];

          return resolve(Object.assign(article, { tags }));
        });
    }));
  });

  return Promise.all(promises);
}

function saveAllContent(articles) {

  return new Promise((resolve) => {

    articles.forEach(async (article) => {

      const createdDate = new Date(article.created * 1e3).toISOString().substr(0, 10);
      const header = `---
title: "${article.title}"
date: "${createdDate}"
tags: [${article.tags.join(', ')}]
published: true
---

`;
      const body = header + article.body_value.replace(/~~~/g, '```');

      try {
        await mkdirAsync(`./content/test/${createdDate}-${article.alias}`, { mode: 755 });
      } catch (error) {
        if (error.code !== 'EEXIST') { // if already exists it is ok...
          throw error;
        }
      }

      await writeFileAsync(`./content/test/${createdDate}-${article.alias}/index.md`, body, {
        mode: 0o766,
      });
    });

    return resolve();
  });
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

getAllNodes(connection)
  .then((articles) => {
    return Promise.all([
      getAllContent(connection, articles),
      getUrlAlias(connection, articles),
      getTags(connection, articles),
    ]).then(() => articles); // both functions mutate the articles
  })
  .then((articles) => {
    connection.end();

    return articles;
  })
  .then((articles) => {
    saveAllContent(articles);
  })
  .catch((error) => {
    throw error;
  });
