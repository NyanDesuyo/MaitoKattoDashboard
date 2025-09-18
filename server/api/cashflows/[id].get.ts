import { db } from "../../utils/db";
import { cashflowTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const cashflow = await db.query.cashflowTable.findFirst({
    where: eq(cashflowTable.id, Number(id)),
  });

  return cashflow;
});
