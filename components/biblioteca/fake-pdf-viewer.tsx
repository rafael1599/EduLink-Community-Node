"use client"

import { X, ChevronLeft, ChevronRight, FileText, Download } from "lucide-react"

interface FakePdfViewerProps {
    isOpen: boolean
    onClose: () => void
    fileName: string
    content?: string // Contenido opcional, si no, se muestra Lorem Ipsum
}

export function FakePdfViewer({ isOpen, onClose, fileName, content }: FakePdfViewerProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl h-[85vh] bg-slate-100 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* PDF Header Toolbar */}
                <div className="bg-slate-800 text-white p-3 flex items-center justify-between shadow-md shrink-0">
                    <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-slate-300" />
                        <span className="font-medium text-sm md:text-base truncate max-w-[200px] md:max-w-md">
                            {fileName}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:flex items-center bg-slate-700 rounded px-2 py-1 gap-2 text-xs text-slate-300">
                            <button className="hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
                            <span>1 / 4</span>
                            <button className="hover:text-white"><ChevronRight className="h-4 w-4" /></button>
                        </div>
                        <div className="h-6 w-px bg-slate-600 hidden md:block" />
                        <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Descargar">
                            <Download className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1.5 hover:bg-red-500/20 hover:text-red-200 rounded text-slate-300 transition-colors"
                            onClick={onClose}
                            title="Cerrar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* PDF Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-500/10 flex justify-center">
                    <div className="bg-white shadow-lg w-full max-w-[210mm] min-h-[297mm] p-8 md:p-12 text-slate-800 selection:bg-blue-100">
                        {/* Fake Document Layout */}
                        <div className="mb-12 border-b border-slate-200 pb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{fileName.replace('.pdf', '')}</h1>
                            <p className="text-slate-500 text-sm">Documento Digital • EduLink Community Node</p>
                        </div>

                        <div className="prose prose-slate max-w-none text-justify space-y-6">
                            {content ? (
                                // Si pasamos contenido enriquecido (HTML/JSX)
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            ) : (
                                // Lorem Ipsum por defecto estilo "Documento Académico"
                                <>
                                    <p>
                                        <strong>Resumen Ejecutivo.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                    <h3 className="text-xl font-bold mt-8 mb-4">1. Introducción</h3>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    </p>
                                    <p>
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                                    </p>
                                    <h3 className="text-xl font-bold mt-8 mb-4">2. Desarrollo</h3>
                                    <p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                    </p>
                                    <div className="my-8 p-4 bg-slate-50 border-l-4 border-blue-500 italic text-slate-600">
                                        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus."
                                    </div>
                                    <p>
                                        Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Page Footer */}
                        <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                            <span>EduLink OS v2.1</span>
                            <span>Página 1 de 4</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
