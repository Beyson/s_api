var config = require('../common/dbconfig');
const sql = require('mssql');

async function getRolsByUser(userId){
    try {
        let pool = await sql.connect(config);
        let command = `SELECT DISTINCT
                            ROL.id_rol AS id,
                            ROL.desc_rol AS nombre
                        FROM
                            SIG_T.dbo.t_usuarios_roles AS USU_ROL
                        INNER JOIN
                            SIG_T.dbo.T_Roles AS ROL
                            ON USU_ROL.id_rol = ROL.id_rol
                        WHERE
                            cod_usuario = ${userId};`;
        let login = await pool.request().query(command);

        return login.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRolsByUser: getRolsByUser
}