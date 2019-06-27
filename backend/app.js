import oracledb from 'oracledb';

var pass = "";

async function run() {
    let connection;

    try{
        connection = await oracledb.getConnection( {
            user : "",
            password : "",
            connectString : ""
        });
        console.log(connection);
    } catch(err){
        console.error(err);
    } finally {
        if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
        }
    }
}