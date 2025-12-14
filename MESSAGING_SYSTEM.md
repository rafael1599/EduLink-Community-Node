# 📱 Sistema de Mensajería Directa - EduLink

## 🎯 Cambios Implementados

Se ha transformado el sistema de mensajería de **canales públicos** a **mensajes directos** entre usuarios.

### ✨ Nuevas Funcionalidades

1. **Lista de Contactos**
   - Vista de todos los usuarios de la comunidad
   - Muestra el último mensaje intercambiado con cada contacto
   - Avatar de color para cada usuario
   - Información del rol (Admin, Estudiante, Vecino)

2. **Chat Directo 1-a-1**
   - Conversaciones privadas entre dos usuarios
   - El historial de mensajes se guarda por conversación
   - Estados de mensaje: enviando → enviado → entregado
   - Scroll automático a nuevos mensajes

3. **Interfaz Mejorada**
   - Diseño moderno con gradientes azules
   - Navegación intuitiva (lista de contactos ↔ chat individual)
   - Indicadores visuales de estado de conexión
   - Burbujas de chat diferenciadas por rol

### 🔧 Cambios Técnicos

#### Base de Datos (db.ts)
- **Nueva estructura de mensajes**:
  ```typescript
  interface Message {
    id?: number;
    text: string;
    senderId: number;        // ✨ NUEVO: ID del emisor
    recipientId: number;     // ✨ NUEVO: ID del receptor
    sender: string;
    senderRole?: UserRole;
    timestamp: Date;
    status: 'sending' | 'sent' | 'delivered' | 'read';
  }
  ```

- **Esquema actualizado a versión 2**:
  - Índices agregados: `senderId`, `recipientId`
  - Permite consultas eficientes de mensajes entre usuarios

#### Página de Mensajes (app/mensajes/page.tsx)
- Completamente reescrita
- Dos vistas: Lista de contactos y Chat individual
- Queries optimizadas con Dexie para filtrar mensajes por conversación
- Auto-respuestas simuladas basadas en el rol del contacto

## 🚀 Cómo Usar

### Para Usuarios

1. **Acceder a Mensajes**
   - Click en la sección "Mensajes" del menú principal

2. **Iniciar una Conversación**
   - Selecciona un contacto de la lista
   - Escribe tu mensaje
   - Presiona Enter o click en el botón de enviar

3. **Volver a la Lista**
   - Click en el botón de flecha (←) en la parte superior

### Para Desarrolladores

#### Migración de Datos
Si tienes mensajes antiguos del sistema de canales, necesitas resetearlos:

**Opción 1: Solo borrar mensajes**
```bash
# Abre en el navegador:
file:///C:/Users/rafis/Documents/Antigravity/eduLink-community-node/EduLink-Community-Node/reset-messages.html
# Click en "Borrar Mensajes Antiguos"
```

**Opción 2: Reset completo**
```javascript
// En la consola del navegador (DevTools):
indexedDB.deleteDatabase('EduLinkDB').onsuccess = () => location.reload()
```

#### Consultar Mensajes Programáticamente
```typescript
// Obtener todos los mensajes entre dos usuarios
const messages = await db.messages
  .where('senderId').equals(userId1)
  .or('recipientId').equals(userId1)
  .filter(m => 
    (m.senderId === userId1 && m.recipientId === userId2) ||
    (m.senderId === userId2 && m.recipientId === userId1)
  )
  .sortBy('timestamp')
```

## 🎨 Características de Diseño

- **Gradientes modernos**: Header con degradado azul
- **Avatares circulares**: Cada usuario tiene un color único
- **Estados visuales**: Indicador de conexión animado
- **Tipografía clara**: Nombres en negrita, roles en minúsculas
- **Responsive**: Funciona en todas las pantallas

## 🐛 Solución de Problemas

### No veo mis contactos
- Asegúrate de tener otros usuarios en la base de datos
- Verifica que estés autenticado (logueado)

### Los mensajes no se envían
- Revisa la consola del navegador (F12)
- Verifica que el usuario receptor exista
- Asegúrate de que ambos usuarios tengan un `id` válido

### Error de esquema de base de datos
- La base de datos antigua no es compatible
- Usa `reset-messages.html` para limpiar los datos

## 📝 Notas de Versión

**Versión 2.0**
- ✅ Mensajería directa entre usuarios
- ✅ Lista de contactos interactiva
- ✅ Último mensaje por contacto
- ✅ Estados de mensaje mejorados
- ✅ Esquema de DB actualizado a v2
- ✅ TypeScript completamente tipado

**Versión 1.0** (anterior)
- Canal general público
- Todos los mensajes visibles para todos
- Sin conversaciones privadas

---

**Desarrollado para EduLink Community Node** 🌐
Sistema de comunicación para comunidades rurales vía LoRa
