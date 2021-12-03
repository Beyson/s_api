const express = require('express');
const app = express();
const cors = require('cors')
const port = 4203;
const urlMain = "/api/v1/";
const sql = require("mssql");


const config =  {
                    user: 'SIGBVM',
                    password: 'Esc@t01ogic0',
                    server: 'localhost',
                    database: 'SIG_T'
                };

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.post(urlMain + 'login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
      //  var username = req.param("username");
        const request = new sql.Request();
      //  console.log(req.body.username);
        console.log(encrypt("123","123"));
        const query = `SELECT
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
                            USU.nom_usuario LIKE '${username}'`;


        request.query(query, (err, result) => {
            if (err) res.status(500).send({statusCode: 500, data:[]});
            res.json({statusCode: 200, data: result.recordset});
        });

});

app.get(urlMain + 'users/access/:user', (req, res) => {
    // let user = req.params.user;
    // let request = new sql.Request();
    // var modulos = null;
    // var opciones = null;
    // var actividades = null;

    // let query = `SELECT
    //             MODU.id_modulos AS id,
    //             MODU.nom_modulo AS modulo,
    //             MODU.url,
    //             NULL AS opciones
    //         FROM
    //             SIG_T.dbo.t_usuarios_roles AS USU_ROL
    //         INNER JOIN
    //             SIG_T.dbo.T_Roles AS ROL
    //             ON USU_ROL.id_rol = ROL.id_rol
    //         INNER JOIN
    //             SIG_T.dbo.T_Modulos AS MODU
    //             ON ROL.id_modulo = MODU.id_modulos
    //         WHERE
    //             USU_ROL.cod_usuario = ${user}
    //             AND MODU.estado_modulo = 1;`;

    // request.query(query, (err, result) => {
    //     modulos = result.recordsets;

    //     modulos.forEach(element => {
    //         let request2 = new sql.Request();
    //         let id_modulo = element.id_modulos;

    //         let query2 = `SELECT
    //                     OPC.id_opcion AS id,
    //                     OPC.desc_opcion AS opcion,
    //                     NULL AS actividades
    //                 FROM
    //                     SIG_T.dbo.t_usuarios_roles AS USU_ROL
    //                 INNER JOIN
    //                     SIG_T.dbo.T_Roles AS ROL
    //                     ON USU_ROL.id_rol = ROL.id_rol
    //                 INNER JOIN
    //                     SIG_T.dbo.T_Modulos AS MODU
    //                     ON ROL.id_modulo = MODU.id_modulos
    //                 INNER JOIN
    //                     SIG_T.dbo.T_opciones AS OPC
    //                     ON MODU.id_modulos = OPC.id_modulo
    //                 WHERE
    //                     USU_ROL.cod_usuario = ${user}
    //                     AND MODU.id_modulos = ${id_modulo}
    //                     AND OPC.estado_opcion = 1;`;

    //         request2.query(query2, (err2, result2) => {
    //             modulos.opciones = result.recordsets;
    //         });
    //     });

        

        

    //     if (err) res.status(500).send({statusCode: 500, data:[]});
    //     res.json({statusCode: 200, data: result.recordset});
    // });

    //res.send(modulos);


    

    // request.query(query, (err, result) => {
    //     if (err) res.status(500).send({statusCode: 500, data:[]});
    //     res.json({statusCode: 200, data: result.recordset});
    // });
});

app.get(urlMain + 'users', (req, res) => {
    const request = new sql.Request();
    const query = `SELECT
                    PER.nom1_usr_persona + ' ' + PER.nom2_usr_persona + ' ' + PER.ape1_usr_persona + ' ' + PER.ape2_usr_persona AS nombre,
                    CASE WHEN PER.email_usr_persona IS NULL OR PER.email_usr_persona = '' THEN 'ND' ELSE PER.email_usr_persona END AS correo,
                    0 AS error,
                    'ND' AS mensaje_error
                FROM
                    SIG_T.dbo.T_usuarios AS USU
                INNER JOIN
                    SIG_T.dbo.t_usr_personas AS PER
                    ON USU.cod_usr_persona = PER.cod_usr_persona
                WHERE
                    USU.Estado = 1;`;

    request.query(query, (err, result) => {
        if (err) res.status(500).send({statusCode: 500, data:[]});
        res.json({statusCode: 200, data: result.recordset});
    });
  });

app.get(urlMain + 'users/technical', (req, res) => {
    const request = new sql.Request();
    const query = `SELECT
                        PER.nom1_usr_persona + ' ' + PER.nom2_usr_persona + ' ' + PER.ape1_usr_persona + ' ' + PER.ape2_usr_persona AS nombre,
                        CASE WHEN PER.email_usr_persona IS NULL OR PER.email_usr_persona = '' THEN 'ND' ELSE PER.email_usr_persona END AS correo,
                        0 AS error,
                        'ND' AS mensaje_error
                    FROM
                        SIG_T.dbo.T_usuarios AS USU
                    INNER JOIN
                        SIG_T.dbo.t_usr_personas AS PER
                        ON USU.cod_usr_persona = PER.cod_usr_persona
                    WHERE
                        USU.Estado = 1
                        AND USU.personal_tecnico = 1;`;

    request.query(query, (err, result) => {
        if (err) res.status(500).send({statusCode: 500, data:[]});
        res.json({statusCode: 200, data: result.recordset});
    });
});

sql.connect(config, err => {
    if (err) {
       console.log('Failed to open a SQL Database connection.', err.stack);
       process.exit(1);
    }
    app.listen(port, () => {
       console.log(`App is listening at http://localhost:${port}`);
    });
 });

 const crypto = require('crypto');

const iv = '87654321';
const key = '123456789101112131415161718192021222324'.padEnd(24,'0');
const ivHex = Buffer.from(iv, 'utf8');
const keyHex = Buffer.from(key, 'utf8');


const decrypt = (text)=>{
    const cipher = crypto.createDecipheriv('DES-EDE3-CBC', keyHex,ivHex);
    let c = cipher.update(text, 'base64','utf8')
    c += cipher.final('utf8');
    return c;
}

const encrypt = (text)=>{
    const cipher = crypto.createCipheriv('DES-EDE3-CBC', keyHex,ivHex);
    let c = cipher.update(text, 'utf8' ,'base64');
    c+=cipher.final('base64');
    return c;
}