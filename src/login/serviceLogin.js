var config = require('../common/dbconfig');
const sql = require('mssql');

async function getLogin(id){
    try {
        let pool = await sql.connect(config);
        let commandLogin = `SELECT
                            USU.cod_usuario AS id_usuario,
                            PER.nom1_usr_persona + ' ' + PER.nom2_usr_persona + ' ' + PER.ape1_usr_persona + ' ' + PER.ape2_usr_persona AS nombre,
                            ISNULL(UNI.desc_unidad, 'ND') AS unidad,
                            PER.email_usr_persona AS correo,
                            USU.nom_usuario AS usuario,
                            NULL AS roles,
                            ISNULL(USU.crea_solicitudes, 0) AS crea_solicitud,
                            ISNULL(USU.personal_tecnico, 0) AS personal_tecnico,
                            ISNULL(USU.puede_asignar, 0) AS asigna,
                            1 AS logeo,
                            'Usuario detectado' AS mensaje,
                            'ND' AS error,
                            'ND' AS mensaje_error,
                            NULL AS access_token,
                            'Bearer' AS token_type,
                            NULL AS expires_in
                        FROM
                            SIG_T.dbo.T_usuarios AS USU
                        LEFT OUTER JOIN
                            SIG_T.dbo.T_unidad AS UNI
                            ON USU.id_unidad = UNI.id_unidad
                        INNER JOIN
                            SIG_T.dbo.t_usr_personas AS PER
                            ON USU.cod_usr_persona = PER.cod_usr_persona
                        WHERE
                            USU.cod_usuario = 65`;
        
        let login = await pool.request().query(commandLogin);

        let commandRols = `SELECT DISTINCT
                                ROL.id_rol AS id,
                                ROL.desc_rol AS nombre
                            FROM
                                SIG_T.dbo.t_usuarios_roles AS USU_ROL
                            INNER JOIN
                                SIG_T.dbo.T_Roles AS ROL
                                ON USU_ROL.id_rol = ROL.id_rol
                            WHERE
                                cod_usuario = @idUser;`;

        let rols = await pool.request()
            .input('idUser', sql.Int, 6)
            .query(commandRols);
        login.recordset[0].roles = rols.recordset;

        return login.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getLogin: getLogin
}
