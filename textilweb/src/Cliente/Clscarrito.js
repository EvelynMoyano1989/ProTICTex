import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";


import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51LjnQpCIHv9lbd1ZVIsc9acranRc7TBxin5XwPHTT9KjPpyGhKYQUvu8fOtPOSZ8t6rXxpm76FWQCZQv8TBzgIw400Q4Szf4tR");
const fetch = require('node-fetch');

const Clscarrito = () => {
    var item_valueid = sessionStorage.getItem("item_key");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [Totall, setTotall] = useState([]);
    const [var_SubTotal, setSubTotal] = useState([]);
    const [var_totalpaypal, setTotalpaypal] = useState("");
    const [var_Iva, setIva] = useState([]);
    const [v1, SetDatavar] = useState([]);
    const currency = "USD";
    const style = {"layout":"vertical"};
    var var_ubic = ""
    const [var_confirubi, setConfirmUb] = useState("");
    const [ped_entrega, UsuPedEntrega] = useState("Retiro en sucursales")

    var totalprod = 0
    let totalprod2 = 0
    var totalpay = 0

    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        SetDatavar(var_ubic)
        setIsOpen(true);
        setTotall(totalprod2.toFixed(2))
    }

    function afterOpenModal() {
        
    }

    function closeModal() {
        setIsOpen(false);
        window.location.href = "/Cliente"
    }


    const regis = async () => {

        const resp = await fetch("http://localhost:5000/apiclicarrito/" + item_valueid);
        const data1 = await resp.json();
        setData(data1);


        const resp_usu = await fetch("http://localhost:5000/apiusumicuenta/" + item_valueid);
        const data2 = await resp_usu.json();

        setConfirmUb(data2[0].UsuDireccion)
       

        if (data1.length === 0) {
            alert("No tiene productos en su carrito")
            window.location.href = "/Compra"
        }
    }

    useEffect(() => {
        setLoading(true);

        regis();
        setLoading(false)
    }, [])

    const sumtotal = () => {
        totalprod2 = totalprod2 + totalprod
        let tot = 0
        tot = totalprod2

        
    }

    const Borrar = (producto) => {

        var answer = window.confirm("¿Desea quitar el producto de su carrito?")

        if (answer) {

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch("http://localhost:5000/apiclicarrito/" + item_valueid + "/" + producto, requestOptions)
                .then((response) => response.json())
                .then(() => window.location.href = "/Carrito", regis());
        }
    }

    const pros_pago = () => {
        
    }


    const CheckoutForm = () => {

        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (e) => {
            e.preventDefault();

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })

            if (!error) {
                console.log(paymentMethod)
               
                const id2 = paymentMethod;

                if (ped_entrega === "Retiro en sucursales") {
                    var_ubic = "SECTOR SUR CAUPICHO Av. Leonidas dubles - frente a la iglesia de caupicho / SECTOR NORTE PUSUQUI Av. Manuel Córdova Galarza - pusuqui, las 4 esquinas , Quito, Ecuador"
                }
                if (ped_entrega === "Entrega a domicilio") {
                    var_ubic = String(var_confirubi)
                }

                let answer = window.confirm("¿Desea continuar o finalizar la transacción?")
                if (answer) {

                                        
                    const requestOptions = {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: id2,
                            amount: parseFloat(totalprod) * 100,
                        })
                    };

                    const a = await (fetch("http://localhost:5000/apiclicarrito/", requestOptions))

                    let actualData = await a.json();
                    let Iva = totalprod2 * 0.12
                    let Total = totalprod2 + Iva

                    setSubTotal(Total.toFixed(2))
                    setIva(Iva.toFixed(2))
                    setTotalpaypal(totalprod2 + Iva.toFixed(2))


                    if (actualData === "ok") {

                         //accedemos a los datos de respuesta de tripe
                        const tokenStripe=paymentMethod['id'];
                        console.log(paymentMethod['billing_details']);   
                        const codigoPostal=paymentMethod['billing_details']['address']['postal_code'];
                        console.log(paymentMethod['card']); 
                        const Tarjeta=paymentMethod['card']['last4'];
                        const Pais=paymentMethod['card']['country'];
                        const TipoTarjetaPago=paymentMethod['card']['brand'];				   

                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                PedTotal: Total.toFixed(2),
                                PedIva: Iva.toFixed(2),
                                PedEntrega: ped_entrega,
                                PedUbic: var_ubic,
                                PedSubTotal: totalprod2.toFixed(2),
                                Token:tokenStripe,
                                CodigoPostal:codigoPostal,
                                Tarjeta:Tarjeta,
                                TipoPago:'Stripe',
                                Pais:Pais,
                                TipoTarjeta:TipoTarjetaPago
                            })
                        };
                        fetch("http://localhost:5000/apiclicarrito/" + item_valueid, requestOptions)
                            .then((response) => response.json())
                            .then((data) => alert(data), regis());

                            const requestOptions2 = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    PedTotal: Total.toFixed(2),
                                    PedIva: Iva.toFixed(2),
                                    PedEntrega: ped_entrega,
                                    PedUbic: var_ubic,
                                    PedSubTotal: totalprod2.toFixed(2),
                                    Token:tokenStripe,
                                    CodigoPostal:codigoPostal,
                                    Tarjeta:Tarjeta,
                                    TipoPago:'Stripe',
                                    Pais:Pais,
                                    TipoTarjeta:TipoTarjetaPago
                                })
                            };
                            fetch("http://localhost:5000/apiclicarrito/administrador/" + item_valueid, requestOptions2)
                                .then((response) => response.json())
                                .then((data) => alert(data), regis());

                        openModal()

                    } else{
						let Iva = totalprod2 * 0.12
						let Total = totalprod2 + Iva

						setSubTotal(Total.toFixed(2))
						setIva(Iva.toFixed(2))
						setTotalpaypal(totalprod2 + Iva.toFixed(2))
						const requestOptions2 = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    PedTotal: Total.toFixed(2),
                                    PedIva: Iva.toFixed(2),
                                    PedEntrega: ped_entrega,
                                    PedUbic: var_ubic,
                                    PedSubTotal: totalprod2.toFixed(2),
									MensajeError: 'Error en el proceso de pago'
                                })
                            };
                            fetch("http://localhost:5000/apiclicarrito/administradorError/" + item_valueid, requestOptions2)
                                .then((response) => response.json())
                                .then((data) => alert(data), regis());
                        
						alert("PROBLEMAS EN EL PAGO")
						
					}


                }
            }

        }

        return <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
                <CardElement />
            </div>
            <button class="primary-btn" id="btn_pagar" >PAGAR</button>
            
        </form>
    }



    return (
        <div>



            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ width: 500 }} tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">DANITEX</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Su transacción se ha realizado con éxito. </p>
                                {data.filter(varid => varid).map(filname => (

                                    <>
                                        <th>DETALLE DEL PEDIDO </th><br></br><br></br>
                                        <th>Código: </th> <h6 id="nom_producto">{filname._id}</h6> <br></br>
                                        <th>Tipo de entrega: </th><h5 id="precio_producto">{ped_entrega}</h5> <br></br>
                                        <th>Lugar de Entrega: </th><h5 id="ub_entrega">{v1}</h5> <br></br>

                                        <th>SubTotal: </th><h5 id="total_producto">$ {Totall}</h5>
                                        <th>IVA: </th><h5 id="total_producto">$ {var_Iva}</h5>
                                        <th>Total: </th><h5 id="total_producto">$ {var_SubTotal}</h5>

                                    </>
                                ))}
                            </div>
                            <div class="modal-footer">
                                <th> ¡Gracias por su compra! </th>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <section class="breadcrumb-option">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb__text">
                                <h4>Carrito de compras</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="shopping-cart spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="shopping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {data.filter(varid => varid).map(filname => (
                                            filname.PedLisProductos.map(filname2 => (
                                                <>
                                                    <tr>
                                                        <td class="product__cart__item">
                                                            <div class="product__cart__item__pic">
                                                                <a href={"/CliProducto/" + filname2.Pro_id + "/" + item_valueid}><img src={'http://localhost:5000/capuchino/' + filname2.ProImagen} style={{ width: 100 }} /></a>
                                                            </div>
                                                            <div class="product__cart__item__text">
                                                                <h6 id="nom_producto">{filname2.ProNombre}</h6>
                                                                <h5 id="precio_producto">${filname2.ProPrecio.replace(",", ".")}</h5>


                                                            </div>
                                                        </td>
                                                        <td class="quantity__item">
                                                            <div class="quantity">
                                                                <div class="pro-qty-2">
                                                                    <input id="cantidad_producto" type="text" value={filname2.ProCantidad} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td id="total_producto" class="cart__price">$ {totalprod = Math.round(((filname2.ProCantidad * filname2.ProPrecio.replace("$", "").replace(",", ".")) + Number.EPSILON) * 100) / 100}</td>
                                                        {(sumtotal())}

                                                        <td class="cart__close"><button class="site-btn" onClick={() => Borrar(filname2.Pro_id)}>Quitar</button></td>
                                                      
                                                    </tr>
                                                </>
                                            ))))}


                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="continue__btn">
                                        <Link to={"/Compra"}><td class="cart__close"><button onClick={pros_pago} class="site-btn" id="btn_continuar">Continuar comprando</button></td>
                                           
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="cart__total">
                                <h6>Total Carrito</h6>
                                <ul>
                                    <li>Subtotal <span id="subtotal">$ {totalprod2.toFixed(2)}</span></li>
                                    <li>IVA <span id="total">$ {(totalprod2 * 0.12).toFixed(2)}</span></li>
                                    <li>Total <span id="total">$ {(totalprod2 + totalprod2 * 0.12).toFixed(2)}</span></li>
                                    {totalpay = (totalprod2 + totalprod2 * 0.12).toFixed(2)}
                                    <p>Seleccionar el tipo de compra:<span>*</span></p>
                                    <input type="radio" id="retiro_sucursal" name="tipo" value="sucursal" checked onClick={() => UsuPedEntrega("Retiro en sucursales")} />
                                    <label for="sucursal">Retiro en sucursales</label><br />
                                    <input type="radio" id="entrega_domi" name="tipo" value="domicilio" onClick={() => UsuPedEntrega("Entrega a domicilio")} />
                                    <label for="domicilio">Entrega a domicilio</label><br />



                                </ul>
                                <div>

                                </div>


                                <Elements stripe={stripePromise}>
                                    <h6>PROCEDER A PAGAR:</h6>
                                    <br />
                                    <h6>Escoja su método de pago:</h6>
                                    <br />
                                    <h2 class="metodo_pago">Stripe:</h2>           
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm />
                                    </Elements>
                                </Elements>
                                <br />                
                                <h2 class="metodo_pago">PayPal:</h2>    
                                
                                <div>
                                <input style={{ display: "none" }} type="text" id="pay_pal_val" value={totalpay} /> 
                                    <PayPalScriptProvider deferLoading={false} options={{ "client-id": "test", components: "buttons" }}>
                                        <PayPalButtons 
                                            forceReRender={[currency, style]}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: document.getElementById("pay_pal_val").value
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={( data, actions) => {
                                                return actions.order.capture().then((details) => {

                                                    return actions.order.capture().then(function (detalles) {

                                                        if (detalles['status'] === "COMPLETED") {
                               
                                                            if (ped_entrega === "Retiro en sucursales") {
                                                                var_ubic = "SECTOR SUR CAUPICHO Av. Leonidas dubles - frente a la iglesia de caupicho / SECTOR NORTE PUSUQUI Av. Manuel Córdova Galarza - pusuqui, las 4 esquinas , Quito, Ecuador"
                                                            }
                                                            if (ped_entrega === "Entrega a domicilio") {
                                                                var_ubic = String(var_confirubi)
                                                            }

                                                            let Iva = totalprod2 * 0.12
                                                            let Total = totalprod2 + Iva

                                                            const tokenPaypal = detalles['id'];
                                                            const Pagador = detalles['payer'].name.given_name + ' '+ detalles['payer'].name.surname;
                                                            const Celular = detalles['payer'].phone.phone_number.national_number;
                                                            const EmailP = detalles['payer'].email_address;
                                                            const FechaPago = detalles['create_time'];
                                                            const Direccion1 =  detalles['payer'].address.address_line_1;
                                                            const Direccion2 =  detalles['payer'].address.address_line_2;
                                                            const Pais = detalles['payer'].address.country_code;

                                                            setSubTotal(Total.toFixed(2))
                                                            setIva(Iva.toFixed(2))
                                                            setTotalpaypal(totalprod2 + Iva.toFixed(2))

                                                            const requestOptions = {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    PedTotal: Total.toFixed(2),
                                                                    PedIva: Iva.toFixed(2),
                                                                    PedEntrega: ped_entrega,
                                                                    PedUbic: var_ubic,
                                                                    PedSubTotal: totalprod2.toFixed(2),
                                                                    Token: tokenPaypal,
                                                                    Pagador:Pagador, 
                                                                    Celular:Celular, 
                                                                    EmailP:EmailP, 
                                                                    FechaPago: FechaPago, 
                                                                    Direccion1:Direccion1, 
                                                                    Direccion2:Direccion2, 
                                                                    Pais:Pais,
                                                                    TipoPago:'PayPal'
                                                                })
                                                            };
                                                            fetch("http://localhost:5000/apiclicarrito/" + item_valueid, requestOptions)
                                                                .then((response) => response.json())
                                                                .then((data) => alert(data), regis());
                                                            openModal()

                                                            //proceso de notificacion al administrador
                                                            const requestOptions2 = {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    PedTotal: Total.toFixed(2),
                                                                    PedIva: Iva.toFixed(2),
                                                                    PedEntrega: ped_entrega,
                                                                    PedUbic: var_ubic,
                                                                    PedSubTotal: totalprod2.toFixed(2),                                                                    
                                                                    Token: tokenPaypal,
                                                                    Pagador:Pagador, 
                                                                    Celular:Celular, 
                                                                    EmailP:EmailP, 
                                                                    FechaPago: FechaPago, 
                                                                    Direccion1:Direccion1, 
                                                                    Direccion2:Direccion2, 
                                                                    Pais:Pais,
                                                                    TipoPago:'PayPal'
                                                                })
                                                            };
                                                            fetch("http://localhost:5000/apiclicarrito/administrador/" + item_valueid, requestOptions2)
                                                                .then((response) => response.json())
                                                                .then((data) => alert(data), regis());
                                                            openModal()
                                                        } else{
															let Iva = totalprod2 * 0.12
                                                            let Total = totalprod2 + Iva

                                                            setSubTotal(Total.toFixed(2))
                                                            setIva(Iva.toFixed(2))
                                                            setTotalpaypal(totalprod2 + Iva.toFixed(2))
															
															const requestOptions2 = {
																method: 'POST',
																headers: { 'Content-Type': 'application/json' },
																body: JSON.stringify({
																	PedTotal: Total.toFixed(2),
																	PedIva: Iva.toFixed(2),
																	PedEntrega: ped_entrega,
																	PedUbic: var_ubic,
																	PedSubTotal: totalprod2.toFixed(2),
																	MensajeError: 'Error en el proceso de pago PayPal'
																})
															};
															fetch("http://localhost:5000/apiclicarrito/administradorError/" + item_valueid, requestOptions2)
																.then((response) => response.json())
																.then((data) => alert(data), regis());
                                                            alert("PROBLEMAS EN EL PAGO")
														}

                                                    });
                                                });
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clscarrito