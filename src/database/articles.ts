import connect, { sql } from '@databases/sqlite'

const db = connect();

export async function prepareArticles() {
  await db.query(sql`
      CREATE TABLE article_data (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        url VARCHAR NOT NULL,
        wordCount INT NOT NULL,
        channel VARCHAR,
        FOREIGN KEY(channel) REFERENCES channel_data(name)
      );
    `);
}

export async function listArticles() {
  return await db.query(sql`
        SELECT * FROM article_data;
    `);
}

export async function createOrUpdateArticles(url, wordCount, channel) {
  await db.query(sql`
      INSERT INTO article_data (url, wordCount, channel)
        VALUES (${url}, ${wordCount}, ${channel})
      ON CONFLICT (id) DO UPDATE
        SET wordCount=excluded.wordCount;
    `);
  const id = await db.query(sql`
      SELECT last_insert_rowid();
    `);
  return await getArticle(id[0]['last_insert_rowid()'])
}

export async function getArticle(id) {
  const results = await db.query(sql`
      SELECT * FROM article_data WHERE id=${id};
    `);
  if (results.length) {
    return results[0];
  } else {
    return undefined;
  }
}

export async function searchArticle(min, max) {
  const results = await db.query(sql`
    SELECT * FROM article_data
    WHERE wordCount <= ${max} AND wordCount >= ${min};
  `);
  if (results.length) {
    return results[0];
  } else {
    return undefined;
  }
}

export async function removeArticle(id) {
  return await db.query(sql`
      DELETE FROM article_data WHERE id=${id};
    `);
}
