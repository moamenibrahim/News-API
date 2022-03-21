import connect, { sql } from '@databases/sqlite'

const db = connect();

export async function prepareArticles() {
    await db.query(sql`
      CREATE TABLE article_data (
        id VARCHAR NOT NULL PRIMARY KEY,
        url VARCHAR NOT NULL,
        wordCount INT NOT NULL
      );
    `);
}

export async function listArticles() {
    return await db.query(sql`
        SELECT * FROM article_data;
    `);
}

export async function createOrUpdateArticles(id, url, wordCount) {
    await db.query(sql`
      INSERT INTO article_data (id, url, wordCount)
        VALUES (${id}, ${url}, ${wordCount})
      ON CONFLICT (id) DO UPDATE
        SET wordCount=excluded.wordCount;
    `);
    return await get(id)
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

export async function removeArticle(id) {
    return await db.query(sql`
      DELETE FROM article_data WHERE id=${id};
    `);
}
