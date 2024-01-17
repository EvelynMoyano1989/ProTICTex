import React, { useEffect, useState } from 'react'
const fetch = require('node-fetch');


const Admlistapro = () => {
    const [data, setData] = useState([]);
    const [dato_nombre, Pro_nombre] = useState("_ERROR_");
    const [dato_color, Pro_color] = useState("_ERROR_");
    const [dato_modelo, Pro_modelo] = useState("_ERROR_");
    const [dato_tipo, Pro_tipo] = useState("Todo");
    const [loading, setLoading] = useState(true);

    const FetchData = async () => {


        if (dato_nombre.length === 0)
            Pro_nombre("_ERROR_")
        if (dato_color.length === 0)
            Pro_color("_ERROR_")
        if (dato_modelo.length === 0)
            Pro_modelo("_ERROR_")
      
        const resp = await fetch("http://localhost:5000/apilistadminproductos/" + dato_nombre + "/" + dato_tipo + "/" + dato_color + "/" + dato_modelo);
        const data1 = await resp.json();
        setData(data1);


        if (data1.length === 0) {
            alert("No se han registrado productos")
        }
    };

    const handleEstadoChange = (event) => {
        const nuevoValor1 = event.target.value;
        Pro_tipo(nuevoValor1);
       
    };
    useEffect(() => {
        setLoading(true);
       
        const estadoGuardado1 = "Maquinaria";

    Pro_tipo(estadoGuardado1);
        setLoading(false)
    }, [])
    

    return (
        <div>
            <section class="checkout spad">
                <div class="container">
                    <div class="checkout__form">
                        <div class="row">
                            <div class="col-lg-8 col-md-6">
                                <h6 class="checkout__title">Reporte de Productos</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Nombre del producto:</p>
                                            <input id="producto" type="text" placeholder="Descripción/Nombre" onChange={e => Pro_nombre(e.target.value)} />
                                            <p>Color:</p>
                                            <input id="pro_color" type="text" placeholder="Color del producto" onChange={e => Pro_color(e.target.value)} />
                                            <p>Modelo:</p>
                                            <input id="pro_modelo" type="text" placeholder="Modelo del producto" onChange={e => Pro_modelo(e.target.value)} />
                                            
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-6">
                                        <p>Tipo de producto<span>*</span></p>
                                        <input
                                            type="radio"
                                            id="maquinaria"
                                            name="tipo"
                                            value="Maquinaria"
                                            checked={dato_tipo === "Maquinaria"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="maquinaria">Maquinaria</label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="repuesto"
                                            name="tipo"
                                            value="Repuesto"
                                            checked={dato_tipo === "Repuesto"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="repuesto">Repuesto</label>
                                        <br />
                                        <input
                                            type="radio"
                                            id="todo"
                                            name="tipo"
                                            value="Todo"
                                            checked={dato_tipo === "Todo"}
                                            onChange={handleEstadoChange}
                                        />
                                        <label htmlFor="todo">Todo</label>
                                        <br />
                                    </div>


                                </div>
                              

                                <div class="row">
                                    <div class="col-lg-6">
                                        <button class="site-btn" id="btn_buscar" onClick={() => FetchData()}>BUSCAR</button>
                                    </div>
                                </div>
                                <h6 class="checkout__title"></h6>

                                <div class="row">
                                    <table id="tbl_productos" class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Productos</th>
                                                <th scope="col">Categoría</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Stock Inicial</th>
                                                <th scope="col">Stock Actual</th>
                                                <th scope="col">Stock Minimo</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.filter(varid => varid).map(filname => (
                                                <tr bgcolor={filname.ProEstado === "Adquirir" ? "#feffb8" : filname.ProEstado === "No Disponible" ? "#ffcdcd" : "#e1ffdf"}>
                                                    <th scope="row">{filname.ProNombre}</th>
                                                    <td>{filname.ProTipo}</td>
                                                    <td>{filname.ProFechaInicial}</td>
                                                    <td>{filname.ProStockInicial}</td>
                                                    <td>{filname.ProStockActual}</td>
                                                    <td>{filname.ProMinimo}</td>
                                                    <td> ${filname.ProPrecio}</td>
                                                    <td><a href={"/Admeditarpro/" + filname._id}  >Editar</a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1 align-self-center">
                            </div>
                            <div class="col-lg-3 col-md-5 align-self-center">

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Admlistapro