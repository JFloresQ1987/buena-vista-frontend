export class Recibo {

    imprimirRecibo(data: any) {

        try {
            const iframe: any = document.getElementById('ifrmPrint');
            let doc = (iframe.contentWindow || iframe.contentDocument);

            if (doc.document) doc = doc.document;

            doc.write('<head><title></title>');
            doc.write('<link href="../../../../../assets/css/recibo.css" rel="stylesheet" type="text/css"/>');
            doc.write('</head><body onload="this.focus(); this.print();">');

            doc.write('<div class="ticket">');
            doc.write('<p class="centrado">' + data.institucion.denominacion);
            doc.write('<br>' + data.institucion.agencia);
            doc.write('<br>----------------------------------------------</p>');
            doc.write('<table>');
            doc.write('<tbody>');
            doc.write('<tr>');
            doc.write('<td class="ruc">RUC: ' + data.institucion.ruc + '</td><td class="recibo derecha">' + data.recibo.numero + '</td>');
            doc.write('</tr>');
            doc.write('</tbody>');
            doc.write('</table>');

            if (data.persona) {

                doc.write('<p>DNI: ' + data.persona.documento_identidad);
                doc.write('<br>Socio: ' + data.persona.nombre_completo);
            }

            // if (data.responsable)
            //     doc.write('<br>Analista: ' + data.responsable);
            // else
            //     doc.write('<br>Responsable: ' + data.analista);

            if (data.analista)
                doc.write('<br>Analista: ' + data.analista);

            if (data.responsable)
                doc.write('<br>Responsable: ' + data.responsable.nombre_completo);

            if (data.bancomunal)
                doc.write('<br>Bancomunal: ' + data.bancomunal.grupo);

            if (data.producto)
                doc.write('<br>Producto: ' + data.producto.descripcion);

            doc.write('</p>');
            doc.write('<p>');
            doc.write('Operaciones en Soles');
            doc.write('</p>');
            doc.write('<table>');
            doc.write('<tbody>');
            doc.write('<tr class="border-bottom">');
            doc.write('<td class="detalle centrado">Detalle Operación</td>');
            doc.write('<td class="monto derecha">Monto</td>');
            doc.write('</tr>');

            if (data.producto) {

                if (Number(data.producto.monto_gasto) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Gasto Administrativo</td><td class="monto derecha">' + data.producto.monto_gasto + '</td>');
                    doc.write('</tr>');
                }

                if (Number(data.producto.monto_ahorro_inicial) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Aporte Inicial</td><td class="monto derecha">' + data.producto.monto_ahorro_inicial + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_ahorro_voluntario) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Ahorro Voluntario</td><td class="monto derecha">' + data.producto.monto_ahorro_voluntario + '</td>');
                    doc.write('</tr>');
                }

                var monto_cuota = 0;

                if (Number(data.producto.monto_ahorro_programado) > 0) {
                    monto_cuota += Number(data.producto.monto_ahorro_programado);
                }
                if (Number(data.producto.monto_amortizacion_capital) > 0) {
                    monto_cuota += Number(data.producto.monto_amortizacion_capital);
                }
                if (Number(data.producto.monto_interes) > 0) {
                    monto_cuota += Number(data.producto.monto_interes);
                }
                if (monto_cuota > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Cuota: ' + data.producto.cuota + '</td><td class="monto derecha">' + monto_cuota.toFixed(2) + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_mora) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Mora</td><td class="monto derecha">' + data.producto.monto_mora + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_interes_ganado) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Interés ganado</td><td class="monto derecha">' + data.producto.monto_interes_ganado + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_retiro_interes_ganado) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Retiro Aporte I.</td><td class="monto derecha">' + data.producto.monto_retiro_interes_ganado + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_retiro_ahorro_voluntario) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Retiro Ahorro V.</td><td class="monto derecha">' + data.producto.monto_retiro_ahorro_voluntario + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_retiro_ahorro_programado) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Retiro Ahorro P.</td><td class="monto derecha">' + data.producto.monto_retiro_ahorro_programado + '</td>');
                    doc.write('</tr>');
                }
                if (Number(data.producto.monto_retiro_interes_ganado) > 0) {
                    doc.write('<tr>');
                    doc.write('<td class="detalle">Retiro Interés G.</td><td class="monto derecha">' + data.producto.monto_retiro_interes_ganado + '</td>');
                    doc.write('</tr>');
                }
            }

            if (data.concepto) {
                doc.write('<tr>');
                doc.write('<td class="detalle">' + data.concepto.descripcion + '</td><td class="monto derecha">' + data.recibo.monto_total + '</td>');
                doc.write('</tr>');
            }

            // if (i.ConceptoOperacionFinanciera != null && i.ConceptoOperacionFinanciera != '') {
            //   var monto = (i.MontoRetiroAhorroVoluntario != '0.00' && i.MontoRetiroAhorroVoluntario != '0') ? i.MontoRetiroAhorroVoluntario : i.MontoAhorroVoluntario;
            //   content.append('<div class="row-form-24"><div class="span4">' + i.ConceptoOperacionFinanciera + '</div><div class="span1 right">' + monto + '</div></div>');
            // }

            // if (i.ConceptoDetalle != null && i.ConceptoDetalle != '')
            //   content.append('<div class="row-form-24"><div class="span5">Det.: ' + i.ConceptoDetalle + '</div></div>');

            //if (i.MontoAhorroVoluntario != '0.00' && i.MontoAhorroVoluntario != '0')
            //    content.append('<div class="row-form-24"><div class="span4">Ahorro Voluntario</div><div class="span1 right">' + i.MontoAhorroVoluntario + '</div></div>');

            // doc.write('<div class="row-form-24"><div class="linea"></div></div>');
            doc.write('<tr class="border-top">');
            doc.write('<td class="detalle centrado negrita">Total: S/. </td><td class="monto derecha negrita">' + data.recibo.monto_total + '</td>')
            doc.write('</tr>');
            doc.write('</tbody>');
            doc.write('</table>');
            doc.write('<p>Usuario: ' + data.recibo.usuario);
            doc.write('<br>Fecha: ' + data.recibo.fecha);
            doc.write('<br>Recibo: ' + data.recibo.tipo_impresion + '</p>');
            doc.write('<p class="centrado">** ' + data.institucion.frase + ' **</p>');
            doc.write('</div>');

            doc.write('</body>');

            doc.close();

        } catch (e) {

            self.print();
        }
    }
}