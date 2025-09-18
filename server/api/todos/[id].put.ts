import { db } from "../../utils/db";
import { todoTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  await db.update(todoTable).set(body).where(eq(todoTable.id, Number(id)));

  return { status: 'ok' };
});
