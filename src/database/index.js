import connect, { sql } from '@databases/sqlite'

const db = connect();

export async function prepare() {
    await db.query(sql`
      CREATE TABLE article_data (
        id VARCHAR NOT NULL PRIMARY KEY,
        url VARCHAR NOT NULL,
        wordCount INT NOT NULL
      );
    `);
}

export async function list() {
    return await db.query(sql`
        SELECT * FROM article_data;
    `);
}

export async function createOrUpdate(id, url, wordCount) {
    await db.query(sql`
      INSERT INTO article_data (id, url, wordCount)
        VALUES (${id}, ${url}, ${wordCount})
      ON CONFLICT (id) DO UPDATE
        SET wordCount=excluded.wordCount;
    `);
    return await get(id)
}

export async function get(id) {
    const results = await db.query(sql`
      SELECT value FROM article_data WHERE id=${id};
    `);
    if (results.length) {
        return results[0].value;
    } else {
        return undefined;
    }
}

export async function remove(id) {
    return await db.query(sql`
      DELETE FROM article_data WHERE id=${id};
    `);
}
