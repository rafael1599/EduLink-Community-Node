import Dexie, { Table } from 'dexie';

export type UserRole = 'admin' | 'student' | 'standard';

export interface User {
    id?: number;
    name: string;
    role: UserRole;
    avatar: string; // Color class or URL
}

export interface FileData {
    id?: number;
    name: string;
    type: string;
    size: number;
    data: Blob;
    category: string;
    uploadedBy: string; // User Name
    uploadedAt: Date;
}

export interface Post {
    id?: number;
    content: string;
    authorId: number;
    authorName: string;
    authorRole: UserRole;
    type: 'notice' | 'trade' | 'alert';
    timestamp: Date;
    likes: number;
}

export interface Message {
    id?: number;
    text: string;
    senderId: number; // ID of the user sending the message
    recipientId: number; // ID of the user receiving the message
    sender: string; // Name for display
    senderRole?: UserRole;
    timestamp: Date;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

export class EduLinkDB extends Dexie {
    users!: Table<User>;
    files!: Table<FileData>;
    posts!: Table<Post>;
    messages!: Table<Message>;

    constructor() {
        super('EduLinkDB');

        // Schema definition
        // ++id means auto-incrementing primary key
        this.version(2).stores({
            users: '++id, name, role',
            files: '++id, name, category, uploadedBy',
            posts: '++id, authorId, type, timestamp',
            messages: '++id, senderId, recipientId, timestamp'
        });
    }

    // Pre-populate with default users if empty
    async populate() {
        // Check and add users if empty
        const userCount = await this.users.count();
        if (userCount === 0) {
            await this.users.bulkAdd([
                { name: 'Sra. María (Líder)', role: 'admin', avatar: 'bg-amber-500' },
                { name: 'Juan (Estudiante)', role: 'student', avatar: 'bg-blue-500' },
                { name: 'Sr. José (Vecino)', role: 'standard', avatar: 'bg-emerald-500' },
                { name: 'Doña Carmen (Maestra)', role: 'admin', avatar: 'bg-purple-500' },
                { name: 'Pedro (Agricultor)', role: 'standard', avatar: 'bg-green-600' },
                { name: 'Ana (Estudiante)', role: 'student', avatar: 'bg-pink-500' },
                { name: 'Sr. Miguel (Comerciante)', role: 'standard', avatar: 'bg-orange-500' }
            ]);
        }

        // Check and add sample posts if empty (independent of users)
        const postCount = await this.posts.count();
        if (postCount === 0) {
            await this.posts.bulkAdd([
                {
                    content: 'Bienvenidos al sistema EduLink. Este es el tablón comunitario donde pueden compartir avisos, ventas y alertas importantes.',
                    authorId: 1,
                    authorName: 'Sra. María (Líder)',
                    authorRole: 'admin',
                    type: 'notice',
                    timestamp: new Date(Date.now() - 86400000), // 1 day ago
                    likes: 5
                },
                {
                    content: 'Vendo 2 sacos de maíz criollo recién cosechado. Precio justo. Interesados contactar por el chat.',
                    authorId: 3,
                    authorName: 'Sr. José (Vecino)',
                    authorRole: 'standard',
                    type: 'trade',
                    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
                    likes: 3
                },
                {
                    content: 'Se solicita ayuda para reparación de la bomba de agua comunitaria. Nos reuniremos mañana a las 8am.',
                    authorId: 3,
                    authorName: 'Sr. José (Vecino)',
                    authorRole: 'standard',
                    type: 'notice',
                    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
                    likes: 7
                },
                {
                    content: 'Recordatorio: Mañana no habrá clases debido a la jornada de limpieza comunitaria. Todos están invitados.',
                    authorId: 1,
                    authorName: 'Sra. María (Líder)',
                    authorRole: 'admin',
                    type: 'notice',
                    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
                    likes: 12
                },
                {
                    content: 'Ofrezco clases de refuerzo escolar para niños de primaria. Horario de lunes a viernes 4-6pm. Sin costo.',
                    authorId: 4,
                    authorName: 'Doña Carmen (Maestra)',
                    authorRole: 'admin',
                    type: 'notice',
                    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
                    likes: 15
                },
                {
                    content: 'Vendo tomates, chiles y cebollas frescos de mi huerta. Precios económicos. Pueden pasar por mi casa.',
                    authorId: 5,
                    authorName: 'Pedro (Agricultor)',
                    authorRole: 'standard',
                    type: 'trade',
                    timestamp: new Date(Date.now() - 18000000), // 5 hours ago
                    likes: 8
                },
                {
                    content: '¿Alguien me puede ayudar con la tarea de matemáticas? No entiendo las fracciones 😅',
                    authorId: 6,
                    authorName: 'Ana (Estudiante)',
                    authorRole: 'student',
                    type: 'notice',
                    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
                    likes: 4
                },
                {
                    content: 'Tengo azúcar, harina, arroz y aceite a buen precio en mi tienda. También recibo pedidos por mensaje.',
                    authorId: 7,
                    authorName: 'Sr. Miguel (Comerciante)',
                    authorRole: 'standard',
                    type: 'trade',
                    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                    likes: 6
                }
            ]);
        }
    }
}

// Initialize DB
// Singleton instance handling SSR
class MockDB extends Dexie {
    constructor() { super('MockDB'); }
}

export const db = typeof window !== "undefined" ? new EduLinkDB() : new MockDB() as any;

// Only open in browser
if (typeof window !== "undefined") {
    db.on('populate', () => {
        db.populate();
    });
    db.open()
        .then(() => {
            // Also try to populate after opening, in case DB exists but is empty
            db.populate();
        })
        .catch((err: unknown) => {
            console.error("DB Open Failed", err);
        });
}
