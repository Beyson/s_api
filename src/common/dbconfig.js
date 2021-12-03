const config = {
    user: 'SIGBVM',
    password: 'Esc@t01ogic0',
    server: 'localhost',
    database: 'SIG_T',
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        enableArithAbort: true
    }
};

module.exports = config;