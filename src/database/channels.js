import connect, { sql } from '@databases/sqlite'

const db = connect();

export async function prepareChannels() {
    await db.query(sql`
      CREATE TABLE channel_data (
        channelId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        description INT NOT NULL
      );
    `);
}

export async function listChannels() {
    return await db.query(sql`
        SELECT * FROM channel_data;
    `);
}

export async function createOrUpdateChannels(name, description) {
    await db.query(sql`
      INSERT INTO channel_data (name, description) VALUES (${name}, ${description});
    `);
    const id = await db.query(sql`
      SELECT last_insert_rowid();
    `);
    console.log(id[0]['last_insert_rowid()'])
    return getChannel(id[0]['last_insert_rowid()'])
}

export async function getChannel(id) {
    const results = await db.query(sql`
      SELECT * FROM channel_data WHERE channelId=${id};
    `);
    if (results.length) {
        return results[0];
    } else {
        return undefined;
    }
}

export async function removeChannels(id) {
    return await db.query(sql`
      DELETE FROM channel_data WHERE channelId=${id};
    `);
}
