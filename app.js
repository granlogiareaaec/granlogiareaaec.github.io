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
