import { db } from "../utils/db";

export default defineEventHandler(async (event) => {
  const cashflows = await db.query.cashflowTable.findMany();
  return cashflows;
});
