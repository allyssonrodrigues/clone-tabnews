test("GET to /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.9");
  expect(responseBody.dependencies.database.max_connections).toEqual(901);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

/*test("test SQL INJECTION", async () => {
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4);--",
  );
});*/
