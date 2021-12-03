class Login {
    constructor(id_usuario, nombre, unidad, correo, usuario, roles, crea_solicitud, personal_tecnico, asigna, mensaje, error, mensaje_error, access_token, token_type, expires_in){
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.unidad = unidad;
        this.correo = correo;
        this.usuario = usuario;
        this.roles = roles;
        this.crea_solicitud = crea_solicitud;
        this.personal_tecnico = personal_tecnico;
        this.asigna = asigna;
        this.mensaje = mensaje;
        this.error = error;
        this.mensaje_error = mensaje_error;
        this.access_token = access_token;
        this.token_type = token_type;
        this.expires_in = expires_in;
    }
}
module.exports = Login;