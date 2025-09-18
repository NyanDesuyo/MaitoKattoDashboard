import { db } from "../utils/db";
import { todoTable } from "../../db/schema";
import { like, eq, and, sql } from "drizzle-orm";

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
      whereClause.push(eq(todoTable.id, idNum));
    }
  }
  if (query.userId) {
    whereClause.push(like(todoTable.userId, `%${query.userId}%`));
  }
  if (query.text) {
    whereClause.push(like(todoTable.text, `%${query.text}%`));
  }

  const findManyOptions: any = {
    where: whereClause.length ? and(...whereClause) : undefined,
  };

  if (!fetchAll) {
    findManyOptions.limit = pageSize;
    findManyOptions.offset = offset;
  }

  const todos = await db.query.todoTable.findMany(findManyOptions);

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(todoTable)
    .where(whereClause.length ? and(...whereClause) : undefined);

  const total = totalResult[0].count;

  return { data: todos, total };
});