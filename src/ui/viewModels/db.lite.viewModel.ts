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
    results.forEach(function (result) {
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

  const initDataBase = async () => {
    const db = await getDBConnection()
    await createTables(db)
    db.close();
  }



  //   // const updateTask = (id: number, name: string, completed: boolean) => {
  //   //   console.log("here 4")
  //   //   db.transaction((tx) => {
  //   //     tx.executeSql(
  //   //       'UPDATE tasks SET name=?, completed=? WHERE id=?;',
  //   //       [name, completed ? 1 : 0, id],
  //   //       (tx, result) => {
  //   //         console.log('Registro actualizado exitosamente');
  //   //       },
  //   //       (tx, error) => {
  //   //         console.log('Error al actualizar registro:', error);
  //   //       },
  //   //     );
  //   //   });
  //   // };



  //   // // Eliminar registro
  //   // const deleteTask = (id: number) => {
  //   //   console.log("here 5")
  //   //   db.transaction((tx) => {
  //   //     tx.executeSql(
  //   //       'DELETE FROM tasks WHERE id=?;',
  //   //       [id],
  //   //       (tx, result) => {
  //   //         console.log('Registro eliminado exitosamente');
  //   //       },
  //   //       (tx, error) => {
  //   //         console.log('Error al eliminar registro:', error);
  //   //       },
  //   //     );
  //   //   });
  //   // };



  return {
    getDBConnection,
    createTables,
    initDataBase,
    insertInto,
    selectFrom,
  }
}
export default useSqliteViewModel;