import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { BankEntity } from '../../domain/entities/bank.entity';

function useSqliteViewModel() {
  enablePromise(true);
  const DATABASE_NAME = 'bankDatabase.db';
  const DATABASE_LOCATION = 'default';

  interface insertIntoBankTable {
    db: SQLiteDatabase,
    bankName: string,
    description: string
    age: number
    url: string
  }

  const selectFrom = async (db: SQLiteDatabase) => {
    const banks: Array<BankEntity> = [];
    const selectQuery = 'SELECT * FROM banks';
    const results = await db.executeSql(selectQuery);
    results.forEach(function (result:any) {
      for (let index = 0; index < result.rows.length; index++) {
        banks.push(result.rows.item(index));
      }
    });
    return banks
  }

  const insertInto = async ({ db, bankName, description, age, url }: insertIntoBankTable) => {
    const insertQuery = `INSERT INTO banks(bankName, description, age, url) values('${bankName}', '${description}', '${age}', '${url}')`;
    const result = await db.executeSql(insertQuery);
    return result;
  }

  const createTables = async (db: SQLiteDatabase) => {
    const query = 'CREATE TABLE IF NOT EXISTS banks(id INTEGER PRIMARY KEY AUTOINCREMENT, bankName VARCHAR(255), description VARCHAR(255), age INT(3), url VARCHAR(512))';
    const result = await db.executeSql(query)
    return result;
  }

  const getDBConnection = async () => {
    const db = await openDatabase({ name: DATABASE_NAME, location: DATABASE_LOCATION })
    return db;
  }

  return {
    getDBConnection,
    createTables,
    insertInto,
    selectFrom,
  }
}
export default useSqliteViewModel;