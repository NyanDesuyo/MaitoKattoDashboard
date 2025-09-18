import { db } from "../utils/db";

export default defineEventHandler(async (event) => {
  const todos = await db.query.todoTable.findMany();
  return todos;
});
