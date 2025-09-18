import { db } from "../../utils/db";
import { cashflowTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  await db.update(cashflowTable).set(body).where(eq(cashflowTable.id, Number(id)));

  return { status: 'ok' };
});
