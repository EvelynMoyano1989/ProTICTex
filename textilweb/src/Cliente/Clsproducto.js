import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
let cantExt;
const Clsproducto = () => {


    const [loading, setLoading] = useState(true);
    const [var_nombre, uptadate1] = useState("")
    const [var_precio, uptadate2] = useState("")
    const [var_imagen, uptadate7] = useState("")
    const [var_tipo, uptadate8] = useState("")
    const [var_detalle, uptadate9] = useState("")
    const [var_stock, uptadate10] = useState("")
    const [var_modelo, uptadate11] = useState("")
    const [var_color, uptadate12] = useState("")
    const [var_peso, uptadate13] = useState("")
    const [var_dimension, uptadate14] = useState("")
    const [var_marca, uptadate15] = useState("")
    const [var_garantia, uptadate16] = useState("")
    const [var_capacidad, uptadate17] = useState("")
    const [var_pedEstado, UsuPedEstado] = useState("Inicial")
    const [dato_cantidad, Cantidad] = useState(1)
    let date = new Date().toLocaleDateString()

    const [var_mensaje, Mensaje] = useState("")
    
    let { idpro } = useParams();
    var var_id = idpro
    let { idcliente } = useParams();
    

    function HacePeticion() {
        try {
            const varIdc = var_id;
            const idC = idcliente;
            const cant_existente = fetch("http://localhost:5000/apinuevopedido/" + varIdc + "/" + idC)
                .then(response => response.json())
                .then(data => {
                    cantExt = data; 
                })
                .catch(error => console.error("Error al realizar la consulta:", error));
        } catch (error) {
            alert("ALGO PASO: " + error);
        }
    };

    HacePeticion();

    var sob = var_stock - cantExt;

    if (sob < 1) {
        sob = 0;

    }
    else {
        sob = dato_cantidad;
    }
    const regis = () => {

        fetch("http://localhost:5000/apiunproducto/" + var_id)
            .then((response) => response.json())
            .then((data) => data.filter(varid => varid).map(filname => (
                uptadate1(filname.ProNombre),
                uptadate2(filname.ProPrecio),
                uptadate7(filname.ProImagen),
                uptadate8(filname.ProTipo),
                uptadate9(filname.ProDescripcion),
                uptadate10(filname.ProStockActual),
                uptadate11(filname.ProModelo),
                uptadate12(filname.ProColor),
                uptadate13(filname.ProPeso),
                uptadate14(filname.ProDimension),
                uptadate15(filname.ProMarca),
                uptadate16(filname.ProGarantia),
                uptadate17(filname.ProCapacidad)
            )));
    }

    useEffect(() => {
        setLoading(true);
        regis();
        setLoading(false)
    }, [])

    const pros_pedido = (var_data) => {
        alert(var_data)
        window.location.href = "/Compra"
    }

    const enviardata = async () => {

       
        const a = await axios.post("http://localhost:5000/apinuevopedido/" + var_id, {
            Cli_id: idcliente,
            ProNombre: var_nombre,
            PedFecha: date,
            PedEstado: var_pedEstado,
            ProPrecio: var_precio,
            ProCantidad: dato_cantidad,
            ProImagen: var_imagen,
            ProStock: var_stock
        })

    
        pros_pedido(a.data)

       
    }

    
    return (
        <div>
            <section class="main-content">
                <div class="row max-inner">

                    <div class="columns col-5 product-media ">
                        <img src={'http://localhost:5000/capuchino/' + var_imagen} style={{ width: 500, padding: 100 }} />
                    </div>

                    <div class="columns col-6 product-info float-right">

                        <span class="product-meta">{var_tipo}</span>
                        <h2>{var_nombre}</h2>
                        <span class="product-price" > $ {var_precio}</span>
                        <br />
                        <br />

                        <div class="columns col-5">
                            <b>Detalle: </b>  {var_detalle}
                            <br />

                            <b>Marca:</b> &nbsp;&nbsp;{var_marca}
                            <br />

                            <b>Modelo: </b>&nbsp;&nbsp;{var_modelo}
                            <br />

                            <b>Color: </b>&nbsp;&nbsp;{var_color}
                            <br />

                            <b>Peso:</b> &nbsp;&nbsp;{var_peso} Kg
                            <br />

                            <b>Capacidad:</b> &nbsp;&nbsp;{var_capacidad}
                            <br />

                            <b>Dimensión:</b> &nbsp;&nbsp;{var_dimension}
                            <br />
                            
                            <b>Garantía:</b> &nbsp;&nbsp;{var_garantia}
                            <br /><br />
                            
                            <div class="row product-options">
                                <div class="columns col-6">
                                    <label for="product-quantity" class="product-quantity" />
                                    <span class="label-text">Cantidad:   </span>
                                    <div style={{ display: "flex", "font-size": 30 }}>
                                    <div onClick={() => (dato_cantidad === 1 ? 1 : Cantidad(dato_cantidad - 1))} class="sumas">-</div>
                                        &nbsp; {sob} &nbsp;
                                        <div onClick={() => Cantidad(dato_cantidad >= (var_stock - cantExt) ? dato_cantidad : dato_cantidad + 1)} className="sumas">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <button class="site-btn" id="btn_add_car" onClick={() => enviardata()}>Añadir al carrito</button>
                        {var_mensaje}
                    </div >
                </div>
            </section >
            <br />
            <br />
        </div >

    )
}

export default Clsproducto