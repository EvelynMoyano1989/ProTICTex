import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';



const Admreporteped = () => {

    let { pedido } = useParams();
    let PedTra;
    const [data4, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dato_id, Ped_id] = useState("")

    const [dato_fecha, Pedfecha] = useState("")
    const [dato_estado, Pedestado] = useState("")
    const [dato_direc, Peddirec] = useState("")
    const [dato_entrega, Pedentrega] = useState("")
    const [dato_subtotal, Pedsubtotal] = useState("")
    const [dato_total, Pedtotal] = useState("")
    
    const [dato_nom, Pednom] = useState("")
    const [dato_ape, Pedape] = useState("")
    const [dato_correo, Pedcorreo] = useState("")
    const [dato_telf, Pedtelf] = useState("")
    const [dato_ced, Pedced] = useState("")
    const [dato_rsocial, Pedrsocial] = useState("")

    

    const changeHandler = (event) => {
        

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let fd = new FormData();
        fd.append('file', event.target.files[0])
        fd.append('name', dato_id)

        axios.post("http://localhost:5000/apifactura", fd, config)
            .then((response) => alert(response.data, List_pedidos())
            );

    };
    
    const List_pedidos = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const resp = await fetch("http://localhost:5000/apiadminproducto/" + pedido, requestOptions);
        const data1 = await resp.json();
        

        Pedfecha(data1[0].PedFecha)
        Pedestado(data1[0].PedEstado)
        Peddirec(data1[0].PedUbicacion)
        Pedentrega(data1[0].PedEntrega)
        Pedsubtotal(data1[0].PedSubTotal)
        Pedtotal(data1[0].PedTotal)
        datop(data1[0].PedTransaccion)
        PedTra = (data1[0].PedTransaccion)
        setData(data1[0].PedLisProductos);
        

        const resp1 = await fetch("http://localhost:5000/apiusumicuenta/" + data1[0].Cli_id);
        const data2 = await resp1.json();

        Pednom(data2[0].UsuNombre)
        Pedape(data2[0].UsuApellido)
        Pedcorreo(data2[0].UsuEmail)
        Pedtelf(data2[0].UsuTelefono)
        Pedced(data2[0].UsuCedula)
        Pedrsocial(data2[0].UsuSocial)
        
   
         
    }
    const [dato_transaccion, datop]  = useState(PedTra)

    const handleEstadoChange = (event) => {
        PedTra = event.target.value;
        datop(event.target.value);
    };

    useEffect(() => {
        setLoading(true);
        List_pedidos();
        setLoading(false)
    }, [])

    const regresar = () => {
        window.location.href = "/Admpedido"
    }

    const deleteFile = async () => {
        const name = pedido;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch("http://localhost:5000/apifactura/" + name, requestOptions);
        const data1 = await response.json();
        alert(data1);
    }

    const Pedido_entregado = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProTransaccion: dato_transaccion,
                
            })
        };
        await fetch("http://localhost:5000/apifactura/" + pedido, requestOptions)
            .then((response) => response.json())
            .then((data) => alert(data), List_pedidos());  

        window.location.href = "/Admpedido"
    }

    return (
        <div>
            <section class="checkout spad">
                <div class="container">
                    <div class="checkout__form">
                        <div class="row">
                            <div class="col-lg-8 col-md-6">


                            <h6 class="checkout__title1" >Datos del pedido</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Fecha: </p>
                                            <span style={{ color: "gray" }}>{dato_fecha}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Estado: </p>
                                            <span style={{ color: "gray" }}>{dato_estado}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Dirección de la entrega: </p>
                                            <span style={{ color: "gray" }}>{dato_direc}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Estado de la entrega: </p>
                                            <span style={{ color: "gray" }}>{dato_entrega}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>

                                    <div class="row">
                                    <table class="table" id="tbl_pedidos1">
                                        <thead >
                                            <tr>
                                                <th scope="col">Nombre del producto</th>
                                                <th scope="col">Cantidad </th>
                                                <th scope="col">Valor Unitario</th>
                                                <th scope="col">Valor Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {data4.filter(varid => varid).map(filname => (
                                                    <tr>
                                                        <td>{filname.ProNombre}</td>
                                                        <td>{filname.ProCantidad}</td>
                                                        <td>${filname.ProPrecio}</td>
                                                        <td>${(filname.ProCantidad * filname.ProPrecio).toFixed(2)}</td>
                                                        
                                                    </tr>
                                                ))}
                                            </>
                                        </tbody>
                                        <br />
                                            <br />
                                            <br />
                                    </table>
                                    

                                </div>



                                    <div class="col-lg-4">
                                        <div class="checkout__input">
                                            <p>Subtotal: </p>
                                            <span style={{ color: "gray" }}>${dato_subtotal}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="checkout__input">
                                            <p>IVA: </p>
                                            <span style={{ color: "gray" }}>${(dato_subtotal*0.12).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="checkout__input">
                                            <p>Total: </p>
                                            <span style={{ color: "gray" }}>${dato_total}</span>
                                        
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />

                                <h6 class="checkout__title1">Datos del cliente</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Nombre: </p>
                                            <span style={{ color: "gray" }}>{dato_nom}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Apellido: </p>
                                            <span style={{ color: "gray" }}>{dato_ape}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>correo: </p>
                                            <span style={{ color: "gray" }}>{dato_correo}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Teléfono: </p>
                                            <span style={{ color: "gray" }}>{dato_telf}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Cédula: </p>
                                            <span style={{ color: "gray" }}>{dato_ced}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Razón Social: </p>
                                            <span style={{ color: "gray" }}>{dato_rsocial}</span>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                
                                

                                <br /><br />
                                            <p>Estado de la Entrega:</p>
                                            <select style={{ paddingRight: 100 }} onChange={handleEstadoChange} >
                                                <option value="Pendiente" selected={dato_transaccion === "Pendiente"}>Pendiente</option>
                                                <option value="Entregado" selected={dato_transaccion === "Entregado"}>Entregado</option>
                                            </select>
                                    <br /><br />
                                    <br />
                                <br />

                                <div class="row">
                                    <div class="col-lg-4">
                                        <button class="site-btn" id="btn_guardar" onClick={() => Pedido_entregado()}>Actualizar</button>
                                    </div>
                                    <div class="col-lg-4">
                                        <label class="custom-file-upload">
                                            <input class="input_factura" type="file" multiple accept=".pdf" name="file" id="pro_urlimg" onChange={changeHandler} onClick={() => Ped_id(pedido)} />
                                            Subir archivo .pdf
                                        </label>
                                        <br /><br />
                                        <button class="site-btn1" onClick={() => deleteFile()}>Descartar archivo</button>
                                    </div>
                                    <div class="col-lg-4">
                                        <button class="site-btn" onClick={() => regresar()}>Regresar</button>
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
export default Admreporteped