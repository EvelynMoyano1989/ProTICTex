import React, { useEffect, useState } from 'react'

const Clspedidos = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todo");
    var item_valueid = sessionStorage.getItem("item_key");


    const regis = async () => {


        const resp = await fetch("http://localhost:5000/apiverpedidos/" + item_valueid + "/" + estadoSeleccionado);
        const data1 = await resp.json();
        setData(data1);

        if (data1.length === 0) {
            alert("No existen pedidos con estado " + estadoSeleccionado)
            window.location.href = "/Pedidos"
        }

    }

    const des_factura = (var_id) => {
        var anchor = document.createElement('a');
        anchor.href = "http://localhost:5000/apifactura/" + var_id;
        anchor.target = "_blank";
        anchor.click();
    }

    const handleEstadoChange = (event) => {
        const nuevoValor = event.target.value;
        setEstadoSeleccionado(nuevoValor);
    };

    useEffect(() => {
        setLoading(true);
       
        const estadoGuardado = "Todo";

    setEstadoSeleccionado(estadoGuardado);
        setLoading(false)
    }, [])
    return (
        <div>
            <section class="checkout spad">
                <div class="container">
                    <div class="checkout__form">

                        <div class="row">
                            <div class="col-lg-12 col-md-8">
                                <h6 class="checkout__title">Mis pedidos</h6>
                                <div class="row">
                                <div className="col-lg-6">
                                        <p>
                                            Estado del pedido{" "}
                                            <span style={{ color: "gray" }}>(filtro por estado que se encuentra el pedido)</span>
                                            <span>*</span>
                                        </p>
                                        <input
                                            type="radio"
                                            id="pagado"
                                            name="tipo"
                                            value="Pagado"
                                            checked={estadoSeleccionado === "Pagado"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="pagado"> Pagado </label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="finalizado"
                                            name="tipo"
                                            value="Finalizado"
                                            checked={estadoSeleccionado === "Finalizado"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="finalizado">Finalizado</label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="todo"
                                            name="tipo"
                                            value="Todo"
                                            checked={estadoSeleccionado === "Todo"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="todo">Todo</label>
                                        <br />
                                    </div>


                                </div>
                                <h6 class="checkout__title"></h6>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <button class="site-btn" id="btn_buscar" onClick={() => regis()}>BUSCAR</button>
                                    </div>
                                </div>
                                <h6 class="checkout__title"></h6>

                                <div class="row">
                                    <table class="table" id="tbl_pedidos">
                                        <thead class="thead-dark">
                                            <tr>

                                                <th scope="col">Fecha</th>                                               
                                                <th scope="col">Estado del pedido</th>
                                                <th scope="col">Tipo Pago</th>
                                                <th scope="col">Token Pago</th>
                                                <th scope="col">Valor Total $</th>
                                                <th scope="col">Estado de la Entrega</th>
                                                <th scope="col">Ubicacion de Entrega</th>
                                                <th scope="col">Estado de la Factura</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {data.filter(varid => varid).map(filname => (
                                                    <tr>

                                                        <th scope="row">{filname.PedFecha}</th>                                                       
                                                        <td>{filname.PedEstado === "Finalizado" ? "Finalizado": "Pagado"}</td>
                                                        <td>{filname.PedTipoPago}</td>                                                        
                                                        <td>{filname.PedToken}</td>
                                                        <td> $ {filname.PedTotal}</td>
                                                        <td>{filname.PedTransaccion}</td>
                                                        <td>{filname.PedEntrega}({filname.PedUbicacion})</td>
                                                        <td>{filname.PedFactura === "Facturado" ? <><a class="cambio_entrega" onClick={() => des_factura(filname._id)}>Descargar</a></> : filname.PedFactura}</td>

                                                    </tr>
                                                ))}
                                            </>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clspedidos