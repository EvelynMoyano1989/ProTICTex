const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const Stripe = require("stripe");
var nodemailer = require('nodemailer');
const stripe = new Stripe("sk_test_51LjnQpCIHv9lbd1Z6XPNS1GVDCqzXaZxJGgWYQHFvc4xHXrp4HdNjliTmfRqL7YZ5QxqrCvq8iQv01N2oehbPcse0052gvFFL7");
const fetch = require('node-fetch')

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColPedidos")
            .find({ PedEstado: "Inicial", Cli_id: id })
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:cliente', async (req, res) => {

    try {
        const { cliente } = req.params;
        var correo_descritado;
        const { PedTotal, PedEntrega, PedUbic, PedSubTotal, PedIva, TipoPago, Token, Pagador, Celular, EmailP, FechaPago, Direccion1, Direccion2, Pais, Tarjeta, TipoTarjeta, CodigoPostal} = req.body;

        var myquery = { PedEstado: "Inicial", Cli_id: cliente };

        const x = await db
            .collection("ColUsuarios")
            .find({ _id: new ObjectId(cliente) })
            .toArray();
        
        const Email = x[0]['UsuEmail']
        
        const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
        .then(response => response.json())
        .then(data => correo_descritado = data)
        .catch(error => console.error(error));

        var texto_men = "";
        if(TipoPago=='PayPal'){
            texto_men = `<h2>Confirmación de Pago Exitoso en Danitex</h2>
                <p>Estimado/a <b>${x[0]['UsuNombre']} ${x[0]['UsuApellido']}</b>,</p>
                <p>Es un placer para nosotros informarte que tu pago a través de ${TipoPago} ha sido procesado con éxito en nuestra tienda en línea Danitex, su token de pago ${TipoPago} es <b>${Token}</b>. Agradecemos sinceramente tu compra y confianza en nuestros productos.</p>
                <p>A continuación, te proporcionamos un resumen detallado de tu pedido:</p>
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo de entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedEntrega}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Lugar de Entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedUbic}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>SubTotal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedSubTotal}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>IVA:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedIva}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedTotal}</td>
                    </tr>
                </table>
                <p><strong>Datos del Comprador:</strong></p>            
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Nombre:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pagador}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Teléfono:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Celular}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Correo Electrónico:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${EmailP}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Fecha de Pago:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${FechaPago}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Dirección de Envío:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Direccion1} - ${Direccion2}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>País:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pais}</td>
                    </tr>
                </table>
                <p>Te recordamos que puedes acceder a más detalles sobre tu compra y seguir el estado de tu pedido iniciando sesión en nuestra plataforma.</p>
                <p>Queremos expresar nuestro agradecimiento por elegir Danitex. Nos esforzamos continuamente para ofrecer productos de alta calidad y un servicio excepcional a nuestros clientes.</p>
                <p>Gracias nuevamente por tu compra. ¡Esperamos que disfrutes de tus productos!</p>
                <p>Atentamente,</p>
                <p>El Equipo de Danitex</p>
            `;

        }else{
            texto_men = `<h2>Confirmación de Pago Exitoso en Danitex</h2>
                <p>Estimado/a <b>${x[0]['UsuNombre']} ${x[0]['UsuApellido']}</b>,</p>
                <p>Es un placer para nosotros informarte que tu pago a través de ${TipoPago} ha sido procesado con éxito en nuestra tienda en línea Danitex, su token de pago ${TipoPago} es <b>${Token}</b>. Agradecemos sinceramente tu compra y confianza en nuestros productos.</p>
                <p>A continuación, te proporcionamos un resumen detallado de tu pedido:</p>
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo de entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedEntrega}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Lugar de Entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedUbic}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>SubTotal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedSubTotal}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>IVA:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedIva}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedTotal}</td>
                    </tr>
                </table>
                <p><strong>Datos del Comprador:</strong></p>            
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo Tarjeta:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${TipoTarjeta}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tarjeta:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Tarjeta}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Código Postal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${CodigoPostal}</td>
                    </tr>                   
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>País:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pais}</td>
                    </tr>
                </table>
                <p>Te recordamos que puedes acceder a más detalles sobre tu compra y seguir el estado de tu pedido iniciando sesión en nuestra plataforma.</p>
                <p>Queremos expresar nuestro agradecimiento por elegir Danitex. Nos esforzamos continuamente para ofrecer productos de alta calidad y un servicio excepcional a nuestros clientes.</p>
                <p>Gracias nuevamente por tu compra. ¡Esperamos que disfrutes de tus productos!</p>
                <p>Atentamente,</p>
                <p>El Equipo de Danitex</p>
            `;
        }
        
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'danitex_2008@hotmail.com',
                pass: 'danitex2008'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'danitex_2008@hotmail.com',
            to: correo_descritado,
            subject: 'Detalle de compra DANITEX',
            html: texto_men
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json();
            }
        });

        

        const y = await db
            .collection("ColPedidos")
            .find(myquery)
            .toArray();

        var registros = y[0].PedLisProductos.length

        for (var i = 0; i < registros; i++) {
            const z = await db.collection("ColProductos").find({ _id: new ObjectId(y[0].PedLisProductos[i].Pro_id) }).toArray();
            var min = z[0].ProMinimo;
            
            var resta = parseFloat(z[0].ProStockActual) - parseFloat(y[0].PedLisProductos[i].ProCantidad)
            var estado = "Disponible"
            //var min = 1;
            if (resta <= min)
                estado = "Adquirir"

            if (resta <= 0)
                estado = "No Disponible"

            var newvalues2 = { $set: { ProStockActual: resta, ProEstado: estado,PedEstado: "Pagado",Token: Token, TipoPago:TipoPago} };

            db.collection("ColProductos").updateOne({ _id: new ObjectId(y[0].PedLisProductos[i].Pro_id) }, newvalues2)
        }

        var newvalues = {
            $set: {
                PedDescuento: "0",
                PedTotal: PedTotal,
                PedTransaccion: "Pendiente",
                PedEntrega: PedEntrega,
                PedUbicacion: PedUbic,
                PedFactura: "No Facturado",
                PedEstado: "Pagado",
                PedSubTotal: PedSubTotal, 
                PedIva: PedIva,
                PedToken: Token, 
                PedTipoPago:TipoPago
            }
        };

        db.collection("ColPedidos").updateOne(myquery, newvalues)

        
        res.json();
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:administrador/:cliente', async (req, res) => {

    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(20000); 
    try {
        const { cliente } = req.params;
        
        const { PedTotal, PedEntrega, PedUbic, PedSubTotal, PedIva, TipoPago, Token, Pagador, Celular, EmailP, FechaPago, Direccion1, Direccion2, Pais, Tarjeta, TipoTarjeta, CodigoPostal} = req.body;


        var correo_descritado;
        const x = await db
            .collection("ColUsuarios")
            .find({ UsuRol: "Administrador" })
            .toArray();

            const Email = x[0]['Admincorreo'] 
        
            const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
            .then(response => response.json())
            .then(data => correo_descritado = data)
            .catch(error => console.error("errobdsencriptado"+error));

      
        //texto del correo
        var texto_men = "";
        if(TipoPago=='PayPal'){
            texto_men = `<h2>Notificación de Pago Exitoso de pedido en Danitex</h2>
                <p>Estimado/a <b>${x[0]['UsuNombre']} ${x[0]['UsuApellido']}</b>,</p>
                <p>Le notificamos que el pago por medio de ${TipoPago} de un pedido se a realizado con éxito en nuestra tienda en línea Danitex, el token de pago ${TipoPago} es <b>${Token}</b> para ver el detalle del mismo ingrese a la plataforma sessión pedidos.</p>
                <p>A continuación, te proporcionamos un resumen detallado del pedido:</p>
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo de entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedEntrega}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Lugar de Entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedUbic}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>SubTotal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedSubTotal}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>IVA:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedIva}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedTotal}</td>
                    </tr>
                </table>
                <p><strong>Datos del Comprador:</strong></p>            
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Nombre:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pagador}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Teléfono:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Celular}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Correo Electrónico:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${EmailP}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Fecha de Pago:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${FechaPago}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Dirección de Envío:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Direccion1} - ${Direccion2}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>País:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pais}</td>
                    </tr>
                </table>
                <p>Te recordamos que puedes acceder a más detalles sobre la compra y seguir el estado del pedido iniciando sesión en nuestra plataforma como adminstrador.</p>
            `;

        }else{
            texto_men = `<h2>Notificación de Pago Exitoso de pedido en Danitex</h2>
                    <p>Estimado/a <b>${x[0]['UsuNombre']} ${x[0]['UsuApellido']}</b>,</p>
                    <p>Le notificamos que el pago por medio de ${TipoPago} de un pedido se a realizado con éxito en nuestra tienda en línea Danitex, el token de pago ${TipoPago} es <b>${Token}</b> para ver el detalle del mismo ingrese a la plataforma sessión pedidos.</p>
                    <p>A continuación, te proporcionamos un resumen detallado del pedido:</p>
                    <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo de entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedEntrega}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Lugar de Entrega:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedUbic}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>SubTotal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedSubTotal}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>IVA:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedIva}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${PedTotal}</td>
                    </tr>
                </table>
                <p><strong>Datos del Comprador:</strong></p>            
                <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tipo Tarjeta:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${TipoTarjeta}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Tarjeta:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Tarjeta}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>Código Postal:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${CodigoPostal}</td>
                    </tr>                   
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;"><strong>País:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px; width: 100px;">${Pais}</td>
                    </tr>
                </table>
                <p>Te recordamos que puedes acceder a más detalles sobre la compra y seguir el estado del pedido iniciando sesión en nuestra plataforma como adminstrador.</p>
                `;
        }

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'danitex_2008@hotmail.com',
                pass: 'danitex2008'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'danitex_2008@hotmail.com',
            to: correo_descritado,
            subject: 'Notificacion al administrador',
            html: texto_men
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
				console.log('Email sent: ' +correo_descritado +error);
                res.json("Error en la API: /pedidos "+ error);
            } else {
                console.log('Email sent: ' + info);
                res.json();
            }
        });
        res.json();
    } catch (error) {
        res.json("Error en la API: /pedidos "+ error);
    }
});

router.post('/:administradorError/:cliente', async (req, res) => {

    try {
        const { cliente } = req.params;
        var correo_descritado;
        const { PedTotal, PedEntrega, PedUbic, PedSubTotal, PedIva , MensajeError} = req.body;

        var myquery = { PedEstado: "Inicial", Cli_id: cliente };

        const x = await db
            .collection("ColUsuarios")
            .find({ _id: new ObjectId(cliente) })
            .toArray();
        
        const Email = x[0]['UsuEmail']
        
        const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
        .then(response => response.json())
        .then(data => correo_descritado = data)
        .catch(error => console.error(error));

        
        var texto_men = "<h2> ERROR AL REALIZAR EL PAGO DE PEDIDO </h2> <br /> <br />" 
        texto_men += " <h2> Se presento un error el momento de realizar un pago del pedido, detalle:</h2> <br /> <br /> " + MensajeError
		texto_men += "Tipo de entrega: " +  PedEntrega + "<br /><br />"
        texto_men += "Lugar de Entrega: " + PedUbic + "<br /><br />"
        texto_men += "SubTotal: " + "$" + PedSubTotal + "<br />"
        texto_men += "IVA:  " + "$" + PedIva + "<br />"
        texto_men += "Total:  " + "$" + PedTotal + "<br /><br />"
        

        
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'danitex_2008@hotmail.com',
                pass: 'danitex2008'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'danitex_2008@hotmail.com',
            to: correo_descritado,
            subject: 'Error en pago de pedido',
            html: texto_men
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json();
            }
        });

        

        const y = await db
            .collection("ColPedidos")
            .find(myquery)
            .toArray();

        var registros = y[0].PedLisProductos.length

        for (var i = 0; i < registros; i++) {
            
            var newvalues2 = { $set: { PedEstado: " Error en proceso de pago"} };

            db.collection("ColProductos").updateOne({ _id: new ObjectId(y[0].PedLisProductos[i].Pro_id) }, newvalues2)
        }

        var newvalues = {
            $set: {
                PedDescuento: "0",
                PedTotal: PedTotal,
                PedTransaccion: "Pendiente",
                PedEntrega: PedEntrega,
                PedUbicacion: PedUbic,
                PedFactura: "No Facturado",
                PedEstado: "Error en proceso de pago",
                PedSubTotal: PedSubTotal, 
                PedIva: PedIva
            }
        };

        db.collection("ColPedidos").updateOne(myquery, newvalues)

        
        res.json();
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});



router.put('/:cliente/:producto', async (req, res) => {
    try {
        const { producto } = req.params;
        const { cliente } = req.params;

        var myquery = { PedEstado: "Inicial", Cli_id: cliente };
        var newvalues = { $pull: { "PedLisProductos": { "Pro_id": producto } } };

        const x = await db
            .collection("ColPedidos")
            .find(myquery)
            .toArray();

        var num_productos = ""
        x.map((a, b) => (
            num_productos = a.PedLisProductos.length
        )
        )

        console.log(num_productos)

        if (num_productos === 1) {
            db.collection("ColPedidos").deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                res.json("")
            });
        }
        else {

            db.collection("ColPedidos").update(myquery, newvalues, function (err, res) {
                if (err) throw err;
            });
            res.json("")
        }
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});


router.delete('/', async (req, res) => {
    const { id, amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "DANiTEX importadora",
            payment_method: id.id,
            confirm: true, 
        });

        res.json("ok");
    } catch (error) {
        res.json({ message: error.raw.message });
    }

});

module.exports = router;