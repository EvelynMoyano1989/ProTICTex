import React, { useEffect, useState } from 'react'


const Clsrecuppass = () => {
    const [loading, setLoading] = useState(true);
    const [var_nombre, uptadate1] = useState("")
    const [var_apellido, uptadate2] = useState("")
    const [var_direccion, uptadate3] = useState("")
    const [var_telf, uptadate4] = useState("")
    const [var_email, uptadate5] = useState("")
    const [var_ced, uptadate8] = useState("")
    const [var_social, uptadate9] = useState("")
    const [var_pass, uptadate6] = useState("")
    


    var item_valueid = sessionStorage.getItem("item_key");


    var pasant = ""
    var pas = ""
    var pas2 = ""


    const [mensaje4, UsuMen4] = useState("")
    const [mensaje6, UsuMen6] = useState("")

    ///VARIABLES PARA VALIDAR CAMPOS VACÍOS
    let formularioValido2 = 0
    let formularioValido4 = 0
    let formularioValido6 = 0


    ///VARIABLES PARA VALIDAR CAMPOS CON ESPACIO
    let formularioValido10 = false
    let formularioValido12 = false
    let formularioValido14 = false
    const sinsig = () => {
        var nose = document.getElementById("user_direccion").value
        var knose = nose.replace(/[}{}/]/, "").replace("[", "").replace("]", "")
        document.getElementById("user_direccion").value = knose

        var nose = document.getElementById("user_correo").value
        var knose = nose.replace(/[}{}/]/, "").replace("[", "").replace("]", "")
        document.getElementById("user_correo").value = knose
    }



    const Update = async () => {
        pasant = document.getElementById("user_pass_ant").value
        pas = document.getElementById("user_pass").value
        pas2 = document.getElementById("user_pass2").value

        ///////////////////CAMPOS CON ESPACIO y VACIOS /////////////////
        if (pas2 === " ") {
            UsuMen4("Por favor, llene el campo para confirmar la contraseña.")
            formularioValido10 = false
        }
        else {
            if (!pas2) {
                UsuMen4("Por favor, llene el campo para confirmar la contraseña.")
                formularioValido4 = false
            }
            else {
                UsuMen4("")
                formularioValido4 = true
                formularioValido10 = true
            }
        }

       
        if (pasant === " ") {
            UsuMen6("Por favor, llene el campo.")
            formularioValido14 = false
        }
        else {
            if (!pas) {
                UsuMen6("Por favor, llene el campo.")
                formularioValido2 = false
            }
            else {
                UsuMen6("")
                formularioValido2 = true
                formularioValido14 = true
            }
        }

        if (pas === " ") {
            UsuMen6("Por favor, llene el campo.")
            formularioValido12 = false
        }
        else {
            if (!pas) {
                UsuMen6("Por favor, llene el campo.")
                formularioValido6 = false
            }
            else {
                UsuMen6("")
                formularioValido6 = true
                formularioValido12 = true
            }
        }

        /////////////////// FIN CAMPOS CON ESPACIO Y VACIO/////////////////

        if (pas === pas2) {
            if (pas != pasant) {
                if (formularioValido2 === true && formularioValido4 === true && formularioValido6 === true && formularioValido10 === true &&
                    formularioValido12 === true && formularioValido14 === true) {
                        const a = await fetch("http://localhost:5000/apiusumicuenta/" + pasant + "/" + var_email)
                        const data_res = await a.json()
                        if (data_res.length > 0) {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    UsuNombre: var_nombre,
                                    UsuApellido: var_apellido,
                                    UsuDireccion: var_direccion,
                                    UsuTelefono: var_telf,
                                    UsuEmail: var_email,
                                    UsuCedula: var_ced,
                                    UsuSocial: var_social,
                                    UsuPassword: document.getElementById("user_pass").value
                                })
                            };
                            fetch("http://localhost:5000/apiusumicuenta/" + item_valueid, requestOptions)
                            .then((response) => response.json())
                            .then(alert("Contraseña actualizada"))
                            .then((data) => redireccion_inicio());
                           
                        } else {
                            alert("La contraseña Antigua no coincide")
                        }
                   
                }
                else {
                    alert("Por favor ingrese los campos requeridos")
                }
            }else{

                alert("La contraseña antigua no puede ser igual a la nueva contraseña.")
    
            }

        }else{

            alert("La contraseña de confirmación no coincide con la nueva contraseña.")

        }

        

    }

    const regis = () => {

        fetch("http://localhost:5000/apiusumicuenta/" + item_valueid)
            .then((response) => response.json())
            .then((data) => data.filter(varid => varid).map(filname => (
                uptadate1(filname.UsuNombre),
                uptadate2(filname.UsuApellido),
                uptadate3(filname.UsuDireccion),
                uptadate4(filname.UsuTelefono),
                uptadate5(filname.UsuEmail),
                uptadate6(filname.UsuPassword),
                uptadate8(filname.UsuCedula),
                uptadate9(filname.UsuSocial)
            )));
    }

  
    const redireccion_inicio =() => {
        window.location.href = "/Cliente"
    }


    useEffect(() => {
        setLoading(true);
        regis();
        setLoading(false)
    }, [])


    return (
        <div>

            <section class="checkout spad">
                <div class="container">
                    <div class="checkout__form">

                        <div class="row">
                            <div class="col-lg-8 col-md-6">
                                <h6 class="checkout__title">Cambiar contraseña</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Correo<span></span></p>
                                            <input type="text" id="user_correo" placeholder="Correo de usuario" disabled= "false" value={var_email} onChange={() => sinsig()} />
                                        </div>
                                        <div class="checkout__input">
                                            <p>Contraseña Anterior<span>   {mensaje6}</span></p>
                                            <input type="password" id="user_pass_ant" placeholder="Ingrese su antigua contraseña" defaultValue={""} onChange={() => sinsig()} />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Nueva Contraseña<span>   {mensaje6}</span></p>
                                            <input type="password" id="user_pass" placeholder="Ingrese la nueva contraseña" defaultValue={""} onChange={() => sinsig()} />
                                        </div>
                                        <div class="checkout__input">
                                            <p>Confirmar Nueva Contraseña<span>   {mensaje4}</span></p>
                                            <input type="password" id="user_pass2" placeholder="Confirme la contraseña" defaultValue={""} onChange={() => sinsig()} />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <button class="site-btn" id="btn_guardar" onClick={() => Update()}>Guardar Cambios</button>
                                    </div>
                                </div>
                                <h6 class="checkout__title"></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clsrecuppass