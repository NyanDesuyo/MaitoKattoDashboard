import { db } from "../../utils/db";
import { cashflowTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  await db.delete(cashflowTable).where(eq(cashflowTable.id, Number(id)));

  return { status: 'ok' };
});
