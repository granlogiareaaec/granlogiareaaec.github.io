/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */


/*
    ====================================================
    EMAILJS
    ====================================================

    Estos tres valores debes reemplazarlos cuando
    configuremos EmailJS.

    PUBLIC KEY:
    La encuentras en EmailJS > Account > General.

    SERVICE ID:
    El identificador del servicio de correo.

    TEMPLATE ID:
    El identificador de la plantilla del alumno.
*/


const EMAILJS_PUBLIC_KEY = "0YmeJoAXCrKoInods";
const EMAILJS_SERVICE_ID = "service_47eegba";
const EMAILJS_TEMPLATE_ALUMNO = "template_c62fc9s";


/*
    ====================================================
    GOOGLE APPS SCRIPT
    ====================================================

    URL de la aplicación web que guarda las
    inscripciones en Google Sheets.
*/


const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyoz47Su1ADZDeUOChqm8lgOnd9dDqeb8HC-b-DIsTHTwi2rGBMtTf1E9eNB6PH-yqr/exec";


/*
    ====================================================
    WHATSAPP
    ====================================================

    Formato Ecuador:

    5939XXXXXXXX

    SIN +
    SIN espacios
    SIN guiones
*/


const WHATSAPP_NUMERO =
    "5939XXXXXXXX";


/* =====================================================
   DATOS DE PAGO
===================================================== */


/*
    Los mismos precios aplican para los tres cursos.
*/


const VALORES_INSCRIPCION = {

    hermanosGL:
        "$30,00",

    otrosOrientes:
        "$50,00"

};


/*
    Datos para transferencia bancaria.
*/


const DATOS_PAGO = {

    banco:
        "Banco del Pacífico",

    titular:
        "Gran Logia del Rito Escocés Antiguo",

    ruc:
        "1792728053001",

    cuenta:
        "8496684",

    tipoCuenta:
        "Cuenta Corriente",

    correoConfirmacion:
        "josesalvador1@outlook.com",

    paypal:
        "Si no puede realizar una transferencia bancaria, responda a este correo escribiendo la palabra “PayPal”. Nuestro equipo le enviará un código QR para completar el pago.",

    notaPaypal:
        "PayPal aplica comisiones que no corren por cuenta de la G:.L:.R:.E:.A:.A:.E:."

};


/* =====================================================
   PROGRAMAS INFORMATIVOS
===================================================== */


/*
    Aprendices:
*/


const PROGRAMA_APRENDICES =
    "https://gamma.app/docs/Curso-Basico-para-Aprendices-Masones-eyd4ogcd20w7obx?mode=doc";


/*
    Compañeros:
*/


const PROGRAMA_COMPANEROS =
    "https://gamma.app/docs/Programa-de-Formacion-para-Companeros-Francmasones-obie15b6w3t5p44?mode=doc";


/*
    Maestros:

    No existe actualmente un programa informativo,
    por lo tanto se deja vacío y no se mostrará
    esa sección en el correo.
*/


const PROGRAMA_MAESTROS =
    "";


/* =====================================================
   INFORMACIÓN DE LOS CURSOS
===================================================== */


/*
    IMPORTANTE:

    Los valores de inscripción se mantienen separados
    de la información académica porque existen dos
    tarifas:

    - $30,00 para HH. de la G:.L:.R:.E:.A:.A:.E.
    - $50,00 para HH. de otros Orientes y otros países.

    El correo mostrará ambas tarifas.
*/


const CURSOS = {

    curso1: {

        nombre:
            "Curso Básico para Aprendices Masones",

        nivel:
            "Aprendices",

        inicio:
            "15 de octubre de 2026",

        modalidad:
            "Aula Virtual + Zoom",

        duracion:
            "Por confirmar",

        horas:
            "Por confirmar",

        valor:
            "$30,00 / $50,00",

        programa:
            PROGRAMA_APRENDICES

    },


    curso2: {

        nombre:
            "Curso Básico para Compañeros Francmasones",

        nivel:
            "Compañeros",

        inicio:
            "15 de octubre de 2026",

        modalidad:
            "Aula Virtual + Zoom",

        duracion:
            "Por confirmar",

        horas:
            "Por confirmar",

        valor:
            "$30,00 / $50,00",

        programa:
            PROGRAMA_COMPANEROS

    },


    curso3: {

        nombre:
            "El magisterio del Maestro Masón",

        nivel:
            "Maestros",

        inicio:
            "15 de octubre de 2026",

        modalidad:
            "Aula Virtual + Zoom",

        duracion:
            "1 mes",

        horas:
            "48 horas académicas",

        valor:
            "$30,00 / $50,00",

        programa:
            PROGRAMA_MAESTROS

    }

};


/* =====================================================
   ELEMENTOS DEL DOM
===================================================== */


const formulario =
    document.getElementById(
        "formularioInscripcion"
    );


const selectorCurso =
    document.getElementById(
        "curso"
    );


const informacionCurso =
    document.getElementById(
        "informacionCurso"
    );


const infoNombreCurso =
    document.getElementById(
        "infoNombreCurso"
    );


const infoInicio =
    document.getElementById(
        "infoInicio"
    );


const infoModalidad =
    document.getElementById(
        "infoModalidad"
    );


const infoDuracion =
    document.getElementById(
        "infoDuracion"
    );


const infoHoras =
    document.getElementById(
        "infoHoras"
    );


const infoValor =
    document.getElementById(
        "infoValor"
    );


const btnEnviar =
    document.getElementById(
        "btnEnviar"
    );


const textoBoton =
    document.getElementById(
        "textoBoton"
    );


const mensajeExito =
    document.getElementById(
        "mensajeExito"
    );


const mensajeError =
    document.getElementById(
        "mensajeError"
    );


const numeroRegistroMostrado =
    document.getElementById(
        "numeroRegistroMostrado"
    );


const botonWhatsapp =
    document.getElementById(
        "botonWhatsapp"
    );


/* =====================================================
   INICIALIZAR EMAILJS
===================================================== */


if (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !==
        "REEMPLAZAR_PUBLIC_KEY"
) {

    emailjs.init({

        publicKey:
            EMAILJS_PUBLIC_KEY

    });

}


/* =====================================================
   MOSTRAR INFORMACIÓN DEL CURSO
===================================================== */


function mostrarCurso(idCurso) {

    const curso =
        CURSOS[idCurso];


    if (!curso) {

        if (informacionCurso) {

            informacionCurso.style.display =
                "block";

        }


        if (infoNombreCurso) {

            infoNombreCurso.textContent =
                "Seleccione un curso";

        }


        if (infoInicio) {

            infoInicio.textContent =
                "—";

        }


        if (infoModalidad) {

            infoModalidad.textContent =
                "—";

        }


        if (infoDuracion) {

            infoDuracion.textContent =
                "—";

        }


        if (infoHoras) {

            infoHoras.textContent =
                "—";

        }


        if (infoValor) {

            infoValor.textContent =
                "—";

        }


        actualizarWhatsApp(null);

        return;

    }


    if (informacionCurso) {

        informacionCurso.style.display =
            "block";

    }


    if (infoNombreCurso) {

        infoNombreCurso.textContent =
            curso.nombre;

    }


    if (infoInicio) {

        infoInicio.textContent =
            curso.inicio;

    }


    if (infoModalidad) {

        infoModalidad.textContent =
            curso.modalidad;

    }


    if (infoDuracion) {

        infoDuracion.textContent =
            curso.duracion;

    }


    if (infoHoras) {

        infoHoras.textContent =
            curso.horas;

    }


    if (infoValor) {

        infoValor.textContent =
            curso.valor;

    }


    actualizarWhatsApp(curso);

}


/* =====================================================
   CAMBIO DE CURSO
===================================================== */


if (selectorCurso) {

    selectorCurso.addEventListener(
        "change",
        function () {

            mostrarCurso(
                this.value
            );

        }
    );

}


/* =====================================================
   BOTONES "INSCRIBIRME"
===================================================== */


const botonesCurso =
    document.querySelectorAll(
        ".btn-curso"
    );


botonesCurso.forEach(
    function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const curso =
                    this.dataset.curso;


                if (selectorCurso) {

                    selectorCurso.value =
                        curso;

                }


                mostrarCurso(
                    curso
                );


                /*
                    Si existe una sección de inscripción,
                    hacemos scroll hasta ella.
                */


                const seccionFormulario =
                    document.getElementById(
                        "inscripcion"
                    );


                if (seccionFormulario) {

                    seccionFormulario.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =====================================================
   GENERAR NÚMERO DE REGISTRO
===================================================== */


function generarNumeroRegistro() {

    const año =
        new Date().getFullYear();


    const numero =
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    return `GL-${año}-${numero}`;

}


/* =====================================================
   FECHA DE REGISTRO
===================================================== */


function obtenerFechaRegistro() {

    const ahora =
        new Date();


    return ahora.toLocaleString(
        "es-EC",
        {

            dateStyle:
                "full",

            timeStyle:
                "short"

        }
    );

}


/* =====================================================
   ACTUALIZAR CAMPO OCULTO
===================================================== */


function establecerCampo(
    id,
    valor
) {

    const campo =
        document.getElementById(
            id
        );


    if (campo) {

        campo.value =
            valor ?? "";

    }

}


/* =====================================================
   ACTUALIZAR DATOS DEL CURSO
===================================================== */


function guardarDatosCurso() {

    const idCurso =
        selectorCurso.value;


    const curso =
        CURSOS[idCurso];


    if (!curso) {

        return false;

    }


    establecerCampo(
        "inicio_curso",
        curso.inicio
    );


    establecerCampo(
        "modalidad_curso",
        curso.modalidad
    );


    establecerCampo(
        "duracion_curso",
        curso.duracion
    );


    establecerCampo(
        "horas_curso",
        curso.horas
    );


    establecerCampo(
        "valor_curso",
        curso.valor
    );


    return true;

}


/* =====================================================
   WHATSAPP
===================================================== */


function actualizarWhatsApp(curso) {

    if (
        !botonWhatsapp
    ) {

        return;

    }


    if (
        !WHATSAPP_NUMERO ||
        WHATSAPP_NUMERO ===
            "5939XXXXXXXX"
    ) {

        botonWhatsapp.href =
            "#";

        return;

    }


    let mensaje =
        "Hola, deseo recibir información sobre los Programas de Formación Masónica 2026.";


    if (curso) {

        mensaje =
            `Hola, deseo recibir información sobre el curso "${curso.nombre}".`;

    }


    botonWhatsapp.href =
        `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

}


/* =====================================================
   MOSTRAR / OCULTAR MENSAJES
===================================================== */


function ocultarMensajes() {

    if (mensajeExito) {

        mensajeExito.style.display =
            "none";

    }


    if (mensajeError) {

        mensajeError.style.display =
            "none";

    }

}


/* =====================================================
   MOSTRAR ÉXITO
===================================================== */


function mostrarExito(numero) {

    if (numeroRegistroMostrado) {

        numeroRegistroMostrado.textContent =
            numero;

    }


    if (mensajeExito) {

        mensajeExito.style.display =
            "block";

    }


    if (mensajeError) {

        mensajeError.style.display =
            "none";

    }

}


/* =====================================================
   MOSTRAR ERROR
===================================================== */


function mostrarError() {

    if (mensajeError) {

        mensajeError.style.display =
            "block";

    }


    if (mensajeExito) {

        mensajeExito.style.display =
            "none";

    }

}


/* =====================================================
   ENVIAR A GOOGLE APPS SCRIPT
===================================================== */


async function enviarGoogleSheets(
    formulario
) {

    if (
        !GOOGLE_SCRIPT_URL ||
        GOOGLE_SCRIPT_URL ===
            "REEMPLAZAR_URL_APPS_SCRIPT"
    ) {

        return true;

    }


    const datos =
        new FormData(
            formulario
        );


    const respuesta =
        await fetch(
            GOOGLE_SCRIPT_URL,
            {

                method:
                    "POST",

                body:
                    new URLSearchParams(
                        datos
                    ),

                mode:
                    "no-cors"

            }
        );


    return respuesta;

}


/* =====================================================
   CONSTRUIR DATOS DEL PROGRAMA INFORMATIVO
===================================================== */


/*
    Esta función genera el texto que llegará a EmailJS.

    Aprendices:
    incluye su enlace.

    Compañeros:
    incluye su enlace.

    Maestros:
    no incluye ninguna sección de programa.
*/


function obtenerTextoPrograma(
    curso
) {

    if (
        !curso ||
        !curso.programa
    ) {

        return "";

    }


    return (
        "📜 PROGRAMA INFORMATIVO\n\n" +

        "Consulta el contenido completo y " +
        "los módulos de tu formación ingresando " +
        "al siguiente enlace:\n\n" +

        curso.programa
    );

}


/* =====================================================
   CONSTRUIR DATOS DE PAGO
===================================================== */


/*
    Este texto será enviado como una variable a EmailJS.

    De esta forma no necesitamos colocar los datos
    bancarios dentro del HTML del formulario.
*/


function obtenerTextoPago() {

    return (
        "💳 PAGO MEDIANTE TRANSFERENCIA BANCARIA\n\n" +

        "Para HH.·. que viven en Ecuador\n\n" +

        "Banco: " +
        DATOS_PAGO.banco +
        "\n" +

        "Titular: " +
        DATOS_PAGO.titular +
        "\n" +

        "RUC: " +
        DATOS_PAGO.ruc +
        "\n" +

        DATOS_PAGO.tipoCuenta +
        ": " +
        DATOS_PAGO.cuenta +
        "\n" +

        "Email de confirmación: " +
        DATOS_PAGO.correoConfirmacion +
        "\n\n" +

        "Una vez realizada la transferencia, " +
        "responde a este correo adjuntando " +
        "tu comprobante de pago.\n\n\n" +

        "🌎 PAGO MEDIANTE PAYPAL\n\n" +

        "Solo para HH.·. que no viven en Ecuador.\n\n" +

        DATOS_PAGO.paypal +
        "\n\n" +

        "Nota: " +
        DATOS_PAGO.notaPaypal
    );

}


/* =====================================================
   CONSTRUIR DATOS DE VALOR
===================================================== */


function obtenerTextoValores() {

    return (
        "HH.·. de la G.·.L.·.R.·.E.·.A.·.A.·.E.·. – " +
        VALORES_INSCRIPCION.hermanosGL +

        "\n\n" +

        "HH.·. de otros Orientes y de otros países – " +
        VALORES_INSCRIPCION.otrosOrientes
    );

}


/* =====================================================
   ENVIAR EMAILJS
===================================================== */


/*
    IMPORTANTE:

    Aquí utilizamos emailjs.send() en lugar de
    emailjs.sendForm().

    Esto permite enviar al template información
    adicional que no existe como campo visible
    dentro del formulario:

    - datos de pago
    - programa informativo
    - tarifas
    - nombre del banco
    - cuenta
    - etc.
*/


async function enviarEmailJS(
    formulario,
    curso,
    numeroRegistro,
    fechaRegistro
) {

    if (
        typeof emailjs ===
        "undefined"
    ) {

        throw new Error(
            "La biblioteca de EmailJS no está disponible."
        );

    }


    if (
        !EMAILJS_PUBLIC_KEY ||
        EMAILJS_PUBLIC_KEY ===
            "REEMPLAZAR_PUBLIC_KEY"
    ) {

        throw new Error(
            "EmailJS todavía no está configurado."
        );

    }


    if (
        !EMAILJS_SERVICE_ID ||
        EMAILJS_SERVICE_ID ===
            "REEMPLAZAR_SERVICE_ID"
    ) {

        throw new Error(
            "Falta configurar el Service ID de EmailJS."
        );

    }


    if (
        !EMAILJS_TEMPLATE_ALUMNO ||
        EMAILJS_TEMPLATE_ALUMNO ===
            "REEMPLAZAR_TEMPLATE_ALUMNO"
    ) {

        throw new Error(
            "Falta configurar el Template ID de EmailJS."
        );

    }


    /*
        Datos visibles del formulario.
    */


    const nombre =
        document.getElementById(
            "nombre"
        )?.value.trim() || "";


    const apellido =
        document.getElementById(
            "apellido"
        )?.value.trim() || "";


    const email =
        document.getElementById(
            "email"
        )?.value.trim() || "";


    const telefono =
        document.getElementById(
            "telefono"
        )?.value.trim() || "";


    const participante =
        document.getElementById(
            "participante"
        )?.value.trim() || "";


    const ciudad =
        document.getElementById(
            "ciudad"
        )?.value.trim() || "";


    const logia =
        document.getElementById(
            "logia"
        )?.value.trim() || "";


    const mensaje =
        document.getElementById(
            "mensaje"
        )?.value.trim() || "";


    /*
        Construimos todos los parámetros
        que utilizará la plantilla de EmailJS.
    */


    const parametros = {

        /*
            Destinatario
        */

        to_email:
            email,

        email:
            email,

        reply_to:
            email,


        /*
            Participante
        */

        nombre:
            nombre,

        apellido:
            apellido,

        telefono:
            telefono,

        participante:
            participante,

        ciudad:
            ciudad,

        logia:
            logia,

        mensaje:
            mensaje,


        /*
            Curso
        */

        curso:
            curso.nombre,

        nivel:
            curso.nivel,

        inicio_curso:
            curso.inicio,

        modalidad_curso:
            curso.modalidad,

        duracion_curso:
            curso.duracion,

        horas_curso:
            curso.horas,

        valor_curso:
            curso.valor,


        /*
            Registro
        */

        numero_registro:
            numeroRegistro,

        fecha_registro:
            fechaRegistro,


        /*
            Valores
        */

        valor_hermanos_gl:
            VALORES_INSCRIPCION.hermanosGL,

        valor_otros_orientes:
            VALORES_INSCRIPCION.otrosOrientes,

        valores_inscripcion:
            obtenerTextoValores(),


        /*
            Datos de pago
        */

        banco:
            DATOS_PAGO.banco,

        titular:
            DATOS_PAGO.titular,

        ruc:
            DATOS_PAGO.ruc,

        tipo_cuenta:
            DATOS_PAGO.tipoCuenta,

        numero_cuenta:
            DATOS_PAGO.cuenta,

        correo_confirmacion_pago:
            DATOS_PAGO.correoConfirmacion,

        instrucciones_pago:
            obtenerTextoPago(),


        /*
            PayPal
        */

        instrucciones_paypal:
            DATOS_PAGO.paypal,

        nota_paypal:
            DATOS_PAGO.notaPaypal,


        /*
            Programa informativo
        */

        programa_informativo:
            obtenerTextoPrograma(curso),

        enlace_programa:
            curso.programa || "",


        /*
            Información institucional
        */

        institucion:
            "Gran Logia del Rito Escocés Antiguo y Aceptado del Ecuador",

        año:
            "2026"

    };


    /*
        Enviamos el correo.
    */


    return await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ALUMNO,
        parametros
    );

}


/* =====================================================
   ENVÍO DEL FORMULARIO
===================================================== */


if (formulario) {

    formulario.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            ocultarMensajes();


            /* -----------------------------------------
               ANTISPAM
            ----------------------------------------- */


            const honeypot =
                document.getElementById(
                    "website"
                );


            if (
                honeypot &&
                honeypot.value.trim() !== ""
            ) {

                return;

            }


            /* -----------------------------------------
               VALIDAR CURSO
            ----------------------------------------- */


            const curso =
                CURSOS[
                    selectorCurso.value
                ];


            if (!curso) {

                alert(
                    "Seleccione un curso antes de continuar."
                );


                if (selectorCurso) {

                    selectorCurso.focus();

                }


                return;

            }


            /* -----------------------------------------
               DATOS INTERNOS
            ----------------------------------------- */


            const numeroRegistro =
                generarNumeroRegistro();


            const fechaRegistro =
                obtenerFechaRegistro();


            establecerCampo(
                "numero_registro",
                numeroRegistro
            );


            establecerCampo(
                "fecha_registro",
                fechaRegistro
            );


            establecerCampo(
                "estado",
                "Registrado"
            );


            guardarDatosCurso();


            /* -----------------------------------------
               BLOQUEAR BOTÓN
            ----------------------------------------- */


            if (btnEnviar) {

                btnEnviar.disabled =
                    true;

            }


            if (textoBoton) {

                textoBoton.textContent =
                    "Procesando inscripción...";

            }


            try {

                /* -------------------------------------
                   GOOGLE SHEETS
                ------------------------------------- */


                await enviarGoogleSheets(
                    formulario
                );


                /*
                    IMPORTANTE:

                    Google Sheets es el registro principal.

                    EmailJS se intenta enviar después,
                    pero un fallo de EmailJS NO hará que
                    la inscripción sea considerada fallida.
                */


                /* -------------------------------------
                   EMAILJS
                ------------------------------------- */


                try {

                    await enviarEmailJS(
                        formulario,
                        curso,
                        numeroRegistro,
                        fechaRegistro
                    );


                    console.log(
                        "Confirmación enviada correctamente por EmailJS."
                    );

                } catch (
                    errorEmailJS
                ) {

                    /*
                        La inscripción ya fue enviada
                        a Google Sheets.

                        Por eso no mostramos error
                        general al participante.
                    */


                    console.warn(
                        "La inscripción fue registrada, pero EmailJS no pudo enviar la confirmación:",
                        errorEmailJS
                    );

                }


                /* -------------------------------------
                   ÉXITO
                ------------------------------------- */


                mostrarExito(
                    numeroRegistro
                );


                /*
                    Actualizamos WhatsApp con
                    el curso seleccionado.
                */


                actualizarWhatsApp(
                    curso
                );


                /* -------------------------------------
                   GUARDAR CURSO SELECCIONADO
                ------------------------------------- */


                const cursoSeleccionado =
                    selectorCurso.value;


                /*
                    Limpiamos el formulario.
                */


                formulario.reset();


                /*
                    Restauramos el curso.
                */


                selectorCurso.value =
                    cursoSeleccionado;


                /*
                    Limpiamos campos internos.
                */


                establecerCampo(
                    "numero_registro",
                    ""
                );


                establecerCampo(
                    "fecha_registro",
                    ""
                );


                establecerCampo(
                    "inicio_curso",
                    ""
                );


                establecerCampo(
                    "modalidad_curso",
                    ""
                );


                establecerCampo(
                    "duracion_curso",
                    ""
                );


                establecerCampo(
                    "horas_curso",
                    ""
                );


                establecerCampo(
                    "valor_curso",
                    ""
                );


                establecerCampo(
                    "estado",
                    "Registrado"
                );


                /*
                    Volvemos a mostrar la información
                    del curso.
                */


                mostrarCurso(
                    cursoSeleccionado
                );


                /*
                    Llevar al usuario al
                    mensaje de éxito.
                */


                if (mensajeExito) {

                    mensajeExito.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

                }


            } catch (
                error
            ) {

                console.error(
                    "Error en la inscripción:",
                    error
                );


                mostrarError();


                if (mensajeError) {

                    mensajeError.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

                }


            } finally {

                /*
                    Liberamos el botón.
                */


                if (btnEnviar) {

                    btnEnviar.disabled =
                        false;

                }


                if (textoBoton) {

                    textoBoton.textContent =
                        "Enviar inscripción";

                }

            }

        }
    );

}


/* =====================================================
   ESTADO INICIAL
===================================================== */


mostrarCurso("");


actualizarWhatsApp(null);