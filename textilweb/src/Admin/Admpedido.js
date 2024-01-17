import React, { useEffect, useState } from 'react'
const fetch = require('node-fetch');

const Admpedido = () => {
    
    const [dato_tipo, Pro_tipo] = useState("Todo");
    const [dato_entrega, Pro_entrega] = useState("Todo");
    const [dato_tipoentrega, Pro_tipoentrega] = useState("Todo");
    
    const handledato_tipo = (event) => {
        Pro_tipo(event.target.value);
    };
    const handledato_entrega = (event) => {
        Pro_entrega(event.target.value);
    };
    const handledato_tipoentrega = (event) => {
        Pro_tipoentrega(event.target.value);
    };
    const [dato_codpedido, Cod_pedido] = useState("_ERROR_")
    
    const [data, setData] = useState([]);
   

   
    const List_pedidos = async () => {

     
        const resp = await fetch("http://localhost:5000/apiadminproducto/" + dato_codpedido + "/" + dato_tipo + "/" + dato_entrega + "/" + dato_tipoentrega);
        const data1 = await resp.json();
        setData(data1);

        if (data1.length === 0) {
            alert("No se han encontrado pedidos.")
        }
    }

   
    const refress = () => {
        window.location.href = "/Admpedido"
    }

    const gestionar_Pedido = async (pedido_id) => {
        window.location.href = "/Reporteped/" + pedido_id
    }

  

    return (
        <div>
            <section class="checkout spad">
                <div class="container">
                    <div class="checkout__form">
                        <div class="row">
                            <div class="col-lg-12 col-md-8">
                                <h6 class="checkout__title">Reporte Pedidos</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="shop__product__option__right">
                                            <p>Filtro por estado Factura:</p> <p></p>
                                            <select style={{ paddingRight: 100 }} onChange={handledato_tipo}>
                                                <option value="Todo">Todo</option>
                                                <option value="No Facturado">No Facturado</option>
                                                <option value="Facturado">Facturado</option>
                                            </select>
                                            <br /><br />
                                            <p>Filtro por estado de la entrega:</p> <p></p>
                                            <select style={{ paddingRight: 100 }} onChange={handledato_entrega}>
                                                <option value="Todo">Todo</option>
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="Entregado">Entregado</option>
                                            </select>
                                            <br /><br />
                                            <p>Filtro por tipo de entrega:</p> <p></p>
                                            <select style={{ paddingRight: 100 }} onChange={handledato_tipoentrega}>
                                                <option value="Todo">Todo</option>
                                                <option value="Retiro en sucursales">Retiro en sucursales</option>
                                                <option value="Entrega a domicilio">Entrega a domicilio</option>
                                            </select>
                                            <br /><br />
                                        </div>
                                    </div>
                                </div>
                                <h6 class="checkout__title"></h6>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <button type="submit" class="site-btn" id="btn_buscar" onClick={() => List_pedidos()}>BUSCAR</button>
                                    </div>
                                    <div class="col-lg-6">
                                        <button class="site-btn" onClick={() => refress()}>REFRESCAR</button>
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
                                                <th scope="col">Tipo de Entrega</th>
                                                <th scope="col">Estado de la entrega</th>
                                                <th scope="col">C.I. Cliente</th>
                                                <th scope="col">Nombre Cliente</th>
                                                <th scope="col">Estado de Factura</th>
                                                <th scope="col">Acciones</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                            
                                                {data
  .filter(varid => varid)
  .sort((a, b) => new Date(b.PedFecha) - new Date(a.PedFecha)) 
  .map(filname => (
                                                    <tr>
                                                        <td>{filname.PedFecha}</td>
                                                        <td>{filname.PedEstado === "Finalizado" ? "Finalizado": "Pagado"}</td> 
                                                        <td>{filname.PedTipoPago}</td>                                                        
                                                        <td>{filname.PedToken}</td>
                                                        <td>${filname.PedTotal}</td>
                                                        <td>{filname.PedEntrega}</td>
                                                        <td>{filname.PedTransaccion}</td>
                                                        <td>{filname.UsuCedula}</td>
                                                        <td>{filname.UsuNombre}</td>
                                                        <td>{filname.PedFactura}</td>
                                                        <td><a class="cambio_entrega" onClick={() => gestionar_Pedido(filname._id)}>Gestionar</a></td>
                                                      
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

export default Admpedido;