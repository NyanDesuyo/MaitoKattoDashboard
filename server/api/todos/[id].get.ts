import { db } from "../../utils/db";
import { todoTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const todo = await db.query.todoTable.findFirst({
    where: eq(todoTable.id, Number(id)),
  });

  return todo;
});
