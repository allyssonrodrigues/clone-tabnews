import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");
  const version = postgresVersion.rows[0].server_version;

  const postgresMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = postgresMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const postgresOpenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const openedConnections = postgresOpenedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
