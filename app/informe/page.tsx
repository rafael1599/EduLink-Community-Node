"use client"

import { DashboardView } from "@/components/dashboard/dashboard-view"
import { LibraryView } from "@/components/biblioteca/library-view"
import { CommunityView } from "@/components/comunidad/community-view"
import { MessagesView } from "@/components/mensajes/messages-view"
import { StatusView } from "@/components/dashboard/status-view"
import { Separator } from "@/components/ui/separator"
import { Shield, BookOpen, Lock, Globe, Server, Users, MessageSquare, Activity, Zap, Radio, CheckCircle2, Lightbulb, ArrowRight, Battery, Wifi, MessageCircle, Cpu } from "lucide-react"

import { ReportNav } from "@/components/informe/report-nav"
import prototipoImg from "./prototipo.jpg"
import portadaImg from "./portada.png"
import qrImg from "./qr.png"

export default function InformePage() {
    // Mock Users for Demonstration
    const mockStudent = {
        id: 998,
        name: "Juan (Estudiante)",
        role: "student" as const,
        avatar: "bg-blue-500"
    }

    const mockAdmin = {
        id: 999,
        name: "Sra. María (Líder)",
        role: "admin" as const,
        avatar: "bg-amber-500"
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans print:bg-white text-slate-900">
            <ReportNav />

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { 
                        size: landscape; 
                        margin: 0;
                    }
                    body { 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact; 
                        background: white !important; 
                        min-width: 100vw;
                    }
                    header, footer, nav, .print-hide { display: none !important; }
                    main { width: 100% !important; margin: 0 !important; padding: 0 !important; }
                    
                    /* Force each section to be exactly one horizontal page */
                    .print-page { 
                        break-after: page; 
                        page-break-after: always; 
                        height: 100vh !important;
                        width: 100vw !important;
                        overflow: hidden !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: center !important;
                        padding: 0 !important; 
                    }

                    /* Scale down text for print if needed to fit */
                    .text-8xl { font-size: 5rem !important; }
                    .text-[20rem] { font-size: 14rem !important; }
                    .sheet-scale-down { zoom: 0.9; }

                     /* Force background images to print */
                    * { print-color-adjust: exact; }
                    
                    .sheet-container {
                        width: 100%;
                        height: 100%;
                        background: none;
                        padding: 0;
                        display: block;
                    }
                    .sheet {
                        width: 100% !important; /* In print, the page settings control the size */
                        height: 100% !important;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        page-break-inside: avoid;
                    }
                }

                .scamper-table th, .scamper-table td {
                    border: 1px solid #e2e8f0;
                    padding: 1rem;
                    vertical-align: top;
                }
                .scamper-table th {
                    background-color: #f8fafc;
                    font-weight: 600;
                    text-align: left;
                }
                
                /* Calibration Container - A4 Landscape */
                .sheet-container {
                     width: 100vw;
                     min-height: 100vh;
                     background: #525659; /* Gray background to make the sheet pop */
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     padding: 2rem;
                }
                .sheet {
                    width: 297mm;
                    height: 210mm;
                    background: white;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    padding: 0; /* Content padding handled inside */
                }
            `}} />

            {/* SECCION 1: PORTADA */}
            <section className="sheet-container print-page">
                <div className="sheet relative p-0">
                    <div className="absolute inset-0 bg-slate-900">
                        <img
                            src={portadaImg.src}
                            alt="Portada EduLink"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* SECCION 2: ANTES DE SCAMPER */}
            <section className="sheet-container print-page">
                <div className="sheet p-12 md:p-16 flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-center">
                        <div className="border-l-4 border-slate-400 pl-6 mb-8 shrink-0">
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">1. Presentación de la Propuesta Innovadora</h2>
                            <p className="text-xl text-slate-500 font-medium tracking-wide uppercase">Estado Previo (Antes de SCAMPER)</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 text-lg text-slate-700 leading-relaxed items-center grow">
                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                        <Server className="h-6 w-6 text-slate-500" />
                                        Concepto Original: "EduLink Server"
                                    </h3>
                                    <p>
                                        Inicialmente, la propuesta se concebía simplemente como un <strong>servidor de contenidos estáticos</strong> (similar a un repositorio offline o una biblioteca digital básica). Su única función era almacenar archivos PDF y videos educativos.
                                    </p>
                                </div>
                                <p>
                                    El sistema original presentaba limitaciones significativas en cuanto a la interacción social y la utilidad práctica diaria. Se limitaba a ser un "disco duro con antena", útil solo para el consumo pasivo.
                                </p>
                            </div>

                            <div className="bg-slate-100 rounded-2xl p-10 flex flex-col justify-center items-center text-center space-y-8 h-full max-h-[400px]">
                                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                                    <Lock className="w-10 h-10 text-slate-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-700">Limitaciones Detectadas</h4>
                                    <ul className="mt-4 space-y-3 text-left max-w-xs mx-auto text-base">
                                        <li className="flex gap-2"><div className="w-2 h-2 mt-2 rounded-full bg-red-400"></div>Sin comunicación entre usuarios.</li>
                                        <li className="flex gap-2"><div className="w-2 h-2 mt-2 rounded-full bg-red-400"></div>Dependencia de hardware costoso.</li>
                                        <li className="flex gap-2"><div className="w-2 h-2 mt-2 rounded-full bg-red-400"></div>Uso exclusivo académico.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCION 3: INTRO SCAMPER */}
            <section className="sheet-container print-page">
                <div className="sheet p-16 md:p-24 flex flex-col justify-center bg-slate-50">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                            <Lightbulb className="w-16 h-16 text-blue-600" />
                        </div>
                        <h2 className="text-6xl font-black text-slate-900 mb-2">SCAMPER</h2>
                        <div className="w-24 h-2 bg-blue-500 mx-auto rounded-full"></div>
                        <p className="text-3xl text-slate-600 font-light leading-relaxed">
                            Proceso de transformación creativa para evolucionar del <span className="font-semibold text-slate-800">EduLink Offline Hub</span> al <span className="font-bold text-blue-600">EduLink Community Node</span>.
                        </p>
                        <p className="text-xl text-slate-400 uppercase tracking-widest font-medium pt-8">
                            Análisis de Innovación
                        </p>
                    </div>
                </div>
            </section>

            {/* SECCION 3.1 - 3.7: DESGLOSE SCAMPER (Individual Pages) */}

            {/* S - SUSTITUIR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-blue relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-blue-900 leading-none select-none">S</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-blue-600 pl-8">
                            <h2 className="text-8xl font-black text-blue-900 mb-2">Sustituir</h2>
                            <p className="text-3xl text-blue-600 font-medium">Reemplazar elementos para mejorar el valor.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-blue-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Sustituir el "Consumo Pasivo" por una <span className="text-blue-600">Plataforma de Servicios Activos</span>.
                                </h3>
                            </div>
                            <div className="bg-blue-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-blue-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "Los usuarios rurales no usan tecnología por curiosidad, sino por necesidad. Al ofrecer servicios vitales, garantizamos su uso diario."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* C - COMBINAR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-emerald relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-emerald-900 leading-none select-none">C</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-emerald-600 pl-8">
                            <h2 className="text-8xl font-black text-emerald-900 mb-2">Combinar</h2>
                            <p className="text-3xl text-emerald-600 font-medium">Unir conceptos para crear nuevas funciones.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-emerald-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Combinar el servidor con una <span className="text-emerald-600">Estación de Carga USB Pública</span>.
                                </h3>
                            </div>
                            <div className="bg-emerald-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-emerald-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "La falta de electricidad es crítica. Si cargan sus celulares, se mantienen cerca de la señal Wi-Fi educativa."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* A - ADAPTAR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-amber relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-amber-900 leading-none select-none">A</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-amber-600 pl-8">
                            <h2 className="text-8xl font-black text-amber-900 mb-2">Adaptar</h2>
                            <p className="text-3xl text-amber-600 font-medium">Ajustar a diferentes contextos o usuarios.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-amber-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Adaptar la UX incorporando un <span className="text-amber-600">Asistente Contextual</span> por roles.
                                </h3>
                            </div>
                            <div className="bg-amber-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-amber-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "Reduce la curva de aprendizaje. El usuario siente que conversa con el sistema, aumentando la confianza."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* M - MODIFICAR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-purple relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-purple-900 leading-none select-none">M</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-purple-600 pl-8">
                            <h2 className="text-8xl font-black text-purple-900 mb-2">Modificar</h2>
                            <p className="text-3xl text-purple-600 font-medium">Cambiar atributos para magnificar atributos.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-purple-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Añadir <span className="text-purple-600">Transceptores LoRa</span> para comunicación de largo alcance.
                                </h3>
                            </div>
                            <div className="bg-purple-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-purple-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "Crea una red de 'SMS Rural' entre comunidades vecinas sin depender de operadoras ni internet."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* P - PONER EN OTRO USO */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-pink relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-pink-900 leading-none select-none">P</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-pink-600 pl-8">
                            <h2 className="text-8xl font-black text-pink-900 mb-2">Proponer</h2>
                            <p className="text-3xl text-pink-600 font-medium">Poner en otro uso para otros propósitos.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-pink-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Transformar el Home en un <span className="text-pink-600">Tablón de Anuncios Digital</span>.
                                </h3>
                            </div>
                            <div className="bg-pink-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-pink-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "Economía Circular: Permite avisos de venta y servicios, convirtiendo el nodo en un centro económico."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* E - ELIMINAR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-red relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-red-900 leading-none select-none">E</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-red-600 pl-8">
                            <h2 className="text-8xl font-black text-red-900 mb-2">Eliminar</h2>
                            <p className="text-3xl text-red-600 font-medium">Simplificar al máximo.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-red-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Eliminar barreras de autenticación complejas (<span className="text-red-600">Zero-Login</span>).
                                </h3>
                            </div>
                            <div className="bg-red-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-red-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "Fricción Cero: Las contraseñas se olvidan. Usamos MAC Address para guardar el progreso sin frustración."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* R - REORGANIZAR */}
            <section className="sheet-container print-page">
                <div className="sheet flex flex-col justify-center p-12 custom-bg-indigo relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[20rem] text-indigo-900 leading-none select-none">R</div>
                    <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
                        <div className="border-l-8 border-indigo-600 pl-8">
                            <h2 className="text-8xl font-black text-indigo-900 mb-2">Reorganizar</h2>
                            <p className="text-3xl text-indigo-600 font-medium">Invertir procesos o prioridades.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-indigo-100">
                                <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">El Cambio (Aplicación)</div>
                                <h3 className="text-3xl font-bold text-slate-800 leading-tight">
                                    Prioridad absoluta a <span className="text-indigo-600">Mensajería de Emergencia</span> (QoS).
                                </h3>
                            </div>
                            <div className="bg-indigo-600 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                                <div className="uppercase tracking-widest text-sm font-bold text-indigo-200 mb-4">Impacto (Justificación)</div>
                                <p className="text-xl leading-relaxed font-medium">
                                    "En emergencias, la comunicación es vital. El dispositivo se prioriza como herramienta de salvamento."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCION 4: DESPUES DE SCAMPER (PROYECTO FINAL) */}
            <section className="sheet-container print-page">
                <div className="sheet p-12 md:p-16 flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-center">
                        <div className="mb-8 border-l-4 border-green-500 pl-6 shrink-0">
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">3. Presentación de Mejoras (EduLink Community Node)</h2>
                            <p className="text-xl text-green-600 font-medium tracking-wide uppercase">Resultado Post-SCAMPER</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12 h-full grow">
                            <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
                                <p className="text-xl text-slate-700 leading-relaxed">
                                    La versión final, <strong>EduLink Community Node</strong>, no es solo una biblioteca; es una estación de servicio integral para la comunidad. Se han integrado funcionalidades de hardware y software que responden a necesidades vitales de supervivencia y economía local.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md">
                                        <Zap className="h-6 w-6 text-yellow-500 mb-2" />
                                        <h4 className="font-bold text-slate-900 mb-1">Carga Pública USB</h4>
                                        <p className="text-xs text-slate-600">Servicio de energía gratuito para dispositivos móviles, atrayendo tráfico al punto de acceso.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md">
                                        <Radio className="h-6 w-6 text-blue-500 mb-2" />
                                        <h4 className="font-bold text-slate-900 mb-1">Alertas LoRa</h4>
                                        <p className="text-xs text-slate-600">Red de largo alcance para transmitir alertas climáticas y mensajes de emergencia entre nodos.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md">
                                        <MessageCircle className="h-6 w-6 text-green-500 mb-2" />
                                        <h4 className="font-bold text-slate-900 mb-1">Chat Offline</h4>
                                        <p className="text-xs text-slate-600">Comunicación local instantánea sin necesidad de internet global, fomentando la cohesión.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md">
                                        <Lightbulb className="h-6 w-6 text-purple-500 mb-2" />
                                        <h4 className="font-bold text-slate-900 mb-1">Economía Local</h4>
                                        <p className="text-xs text-slate-600">Tablón digital para compra/venta de productos locales y anuncios comunitarios.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl text-white text-center shadow-2xl h-full max-h-[400px] my-auto">
                                <div className="bg-white p-4 rounded-2xl mb-4">
                                    <img src={qrImg.src} alt="QR Code" className="w-40 h-40 object-contain" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">¡Pruébalo Ahora!</h3>
                                <p className="text-slate-300 text-sm mb-4">Escanea para acceder a la aplicación en Vercel</p>
                                <a
                                    href="https://edu-link-community-node.vercel.app/"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2 text-sm"
                                >
                                    Open Web App <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCION 5: PROTOTIPO Y SISTEMA */}
            <section className="sheet-container print-page">
                <div className="sheet p-12 md:p-16 flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-center">
                        <div className="mb-6 border-l-4 border-purple-500 pl-6 shrink-0">
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">4. Presentación del Prototipo Físico</h2>
                            <p className="text-xl text-purple-600 font-medium tracking-wide uppercase">Hardware & Software</p>
                        </div>

                        <div className="grid grid-cols-12 gap-8 h-full grow">
                            {/* Hardware Column */}
                            <div className="col-span-4 flex flex-col justify-center space-y-6">
                                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                                    <img
                                        src={prototipoImg.src}
                                        alt="Prototipo Físico"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 text-white">
                                        <h3 className="text-xl font-bold">Unidad EduLink v2.4</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                                    <div className="bg-white p-3 rounded-lg shadow-sm border"><Cpu className="mx-auto mb-1 text-slate-400 h-5 w-5" /> <span className="font-bold text-slate-700 block">RPi 5</span></div>
                                    <div className="bg-white p-3 rounded-lg shadow-sm border"><Battery className="mx-auto mb-1 text-green-500 h-5 w-5" /> <span className="font-bold text-slate-700 block">72h Auto.</span></div>
                                    <div className="bg-white p-3 rounded-lg shadow-sm border"><Wifi className="mx-auto mb-1 text-blue-500 h-5 w-5" /> <span className="font-bold text-slate-700 block">Wi-Fi 6</span></div>
                                    <div className="bg-white p-3 rounded-lg shadow-sm border"><Server className="mx-auto mb-1 text-purple-500 h-5 w-5" /> <span className="font-bold text-slate-700 block">NVMe 500G</span></div>
                                </div>
                            </div>

                            {/* Software Interactive Column */}
                            <div className="col-span-8 space-y-6 overflow-y-auto pr-2 flex flex-col justify-center">
                                <div className="text-left mb-2">
                                    <h3 className="text-2xl font-bold text-slate-900">Interfaz Adaptativa</h3>
                                    <p className="text-slate-500 text-sm">Vistas separadas para Estudiante vs Admin.</p>
                                </div>

                                {/* 1. Dashboard Split View */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-slate-700 text-sm border-l-4 border-blue-500 pl-2">Vista Estudiante</h4>
                                        <div className="rounded-lg overflow-hidden shadow border border-slate-200 pointer-events-none transform origin-top-left scale-[0.6] h-[220px] w-[166%]">
                                            <DashboardView user={mockStudent as any} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-slate-700 text-sm border-l-4 border-amber-500 pl-2">Vista Líder (Admin)</h4>
                                        <div className="rounded-lg overflow-hidden shadow border border-slate-200 pointer-events-none transform origin-top-left scale-[0.6] h-[220px] w-[166%]">
                                            <DashboardView user={mockAdmin as any} weatherAlert={true} />
                                        </div>
                                    </div>
                                </div>
                                {/* 2. Library & Community */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-slate-700 text-sm border-l-4 border-emerald-500 pl-2">Biblioteca</h4>
                                        <div className="rounded-lg overflow-hidden shadow border border-slate-200 pointer-events-none transform origin-top-left scale-[0.6] h-[220px] w-[166%] bg-white">
                                            {/* Simple placeholder or view */}
                                            <LibraryView user={mockStudent as any} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-slate-700 text-sm border-l-4 border-purple-500 pl-2">Comunidad</h4>
                                        <div className="rounded-lg overflow-hidden shadow border border-slate-200 pointer-events-none transform origin-top-left scale-[0.6] h-[220px] w-[166%] bg-white">
                                            <CommunityView user={mockStudent as any} maxPosts={2} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCION 6 & 7: CONCLUSIONES Y RECOMENDACIONES */}
            <section className="sheet-container print-page">
                <div className="sheet p-16 md:p-24 flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto space-y-16">
                        {/* Conclusiones */}
                        <div className="space-y-8">
                            <div className="border-l-4 border-slate-800 pl-6">
                                <h2 className="text-3xl font-bold text-slate-900">5. Conclusiones</h2>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-2xl text-lg text-slate-700 leading-relaxed text-justify space-y-6">
                                <p>
                                    <strong>Impacto Social Genuino:</strong> La implementación de tecnologías en comunidades aisladas no es neutral. EduLink demuestra que la tecnología debe adaptarse a los flujos sociales existentes, no imponer nuevos. Al integrar servicios de carga y mensajería vital, el nodo se convierte en un activo comunitario protegido por los propios vecinos.
                                </p>
                                <p>
                                    <strong>Inclusión Digital Real:</strong> Evitamos el "solucionismo tecnológico". La interfaz simplificada y el acceso "Zero-Login" eliminan barreras para usuarios con baja alfabetización digital, permitiendo una verdadera apropiación de la herramienta por parte de estudiantes y agricultores por igual.
                                </p>
                            </div>
                        </div>

                        {/* Recomendaciones */}
                        <div className="space-y-8">
                            <div className="border-l-4 border-slate-800 pl-6">
                                <h2 className="text-3xl font-bold text-slate-900">6. Recomendaciones</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Estudio Local Personalizado</h4>
                                    <p className="text-slate-700">Se recomienda realizar un estudio etnográfico en la propia localidad para ajustar los contenidos de la biblioteca y el tablón a las necesidades productivas específicas de la zona (ej. guías de cultivo locales).</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Alianzas Gubernamentales</h4>
                                    <p className="text-slate-700">Para garantizar la sostenibilidad a largo plazo, es crucial establecer convenios con gobiernos locales (municipios) que puedan asumir el mantenimiento físico del hardware (baterías y paneles).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCION 8: BIBLIOGRAFIA */}
            <section className="sheet-container print-page">
                <div className="sheet p-16 md:p-24 flex flex-col justify-center">
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="mb-12 border-l-4 border-slate-400 pl-6">
                            <h2 className="text-3xl font-bold text-slate-900">7. Referencias Bibliográficas</h2>
                        </div>

                        <div className="bg-white p-10 rounded-xl shadow-sm text-slate-600 leading-relaxed space-y-8 font-serif border border-slate-100">
                            <ul className="space-y-6 list-disc pl-5">
                                <li>
                                    <strong>Gurstein, M. (2000).</strong> <em>Community Informatics: Enabling Communities with Information and Communications Technologies.</em> Idea Group Publishing.
                                </li>
                                <li>
                                    <strong>Pentland, A. (2014).</strong> <em>Social Physics: How Good Ideas Spread—The Lessons from a New Science.</em> Penguin Books.
                                </li>
                                <li>
                                    <strong>UN Broadband Commission. (2023).</strong> <em>The State of Broadband 2023: Digital Connectivity for All.</em> International Telecommunication Union (ITU) & UNESCO.
                                </li>
                                <li>
                                    <strong>Hersman, E. (2008).</strong> <em>"The Ushahidi Engine."</em> TED Global.
                                </li>
                                <li>
                                    <strong>Mozilla Foundation. (2024).</strong> <em>"Internet Health Report: Decentralization."</em>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-24 text-center text-slate-400 text-sm">
                            <p>EduLink Community Node</p>
                            <p>Informe Técnico finalizado el 15 de Diciembre de 2024.</p>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}