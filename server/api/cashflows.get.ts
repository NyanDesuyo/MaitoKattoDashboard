import { db } from "../utils/db";
import { cashflowTable } from "../../db/schema";
import { like, eq, and, sql, desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const fetchAll = query.all === 'true';

  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  const whereClause = [];

  if (query.id) {
    const idNum = Number(query.id);
    if (!isNaN(idNum)) {
      whereClause.push(eq(cashflowTable.id, idNum));
    }
  }
  if (query.userId) {
    whereClause.push(like(cashflowTable.userId, `%${query.userId}%`));
  }
  if (query.name) {
    whereClause.push(like(cashflowTable.name, `%${query.name}%`));
  }
  if (query.amount) {
    const amountNum = Number(query.amount);
    if (!isNaN(amountNum)) {
      whereClause.push(eq(cashflowTable.amount, amountNum));
    }
  }
  if (query.account) {
    whereClause.push(like(cashflowTable.account, `%${query.account}%`));
  }
  if (query.type) {
    const typeNum = Number(query.type);
    if (!isNaN(typeNum)) {
      whereClause.push(eq(cashflowTable.type, typeNum));
    }
  }

  const findManyOptions: any = {
    where: whereClause.length ? and(...whereClause) : undefined,
    orderBy: [desc(cashflowTable.createdAt)],
  };

  if (!fetchAll) {
    findManyOptions.limit = pageSize;
    findManyOptions.offset = offset;
  }

  const cashflows = await db.query.cashflowTable.findMany(findManyOptions);

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(cashflowTable)
    .where(whereClause.length ? and(...whereClause) : undefined);

  const total = totalResult[0].count;

  return { data: cashflows, total };
});
