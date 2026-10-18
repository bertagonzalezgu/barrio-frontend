# Sitemap — barrio.

Listado plano de rutas, derivado de los User Flows (`USER-FLOW-JOURNEY.md`). Cada fila es una URL única, tal como exige el enunciado ("Generación d'URL únic per a cada vista/page"). Pensado para React Router — implementación de referencia para `ROADMAP.md`, Semana 1.

## Rutas públicas (sin sesión)

| Ruta | Pantalla | Notas |
|---|---|---|
| `/` | Onboarding | Si ya hay sesión iniciada, redirige a `/home` |
| `/login` | Iniciar sesión | |
| `/registro` | Registro | Al completarse, crea el usuario con 2h de regalo y redirige a `/home` |

## Rutas protegidas (requieren sesión — redirigen a `/login` si no la hay)

| Ruta | Pantalla | Parámetros / query | Notas |
|---|---|---|---|
| `/home` | Inicio (feed) | `?modo=buscar\|ofrecer`, `?vista=tarjetas\|lista`, `?categoria=hogar\|cuidados\|digital\|comunidad` | Estado de swipe (índice de tarjeta actual) puede ir en query o en estado local, no hace falta URL por tarjeta individual del swipe |
| `/mapa` | Mapa | `?categoria=...` | Pines abren `/cards/:id` en un panel/modal, sin cambiar de ruta completa (o sí, a decidir según UX) |
| `/calendario` | Calendario | `?categoria=...`, `?fecha=YYYY-MM-DD` | Seleccionar un día puede reflejarse en el query param `fecha` |
| `/actividad` | Estadísticas / Actividad | | Reutilizable como base del panel admin |
| `/cards/crear` | Crear tarjeta | `?tipo=busco\|ofrezco` | Incluye el paso de "Generar con IA" dentro de la misma pantalla |
| `/cards/:id` | Detalle de tarjeta | | Botón "Proponer intercambio" visible solo si `autorId !== usuarioActual.id` |
| `/cards/:id/editar` | Editar tarjeta | | Solo accesible por el autor; es la ruta que usan las ediciones lanzadas desde Mapa/Calendario |
| `/chats` | Mis conversaciones | | Bandeja con todos mis intercambios: "En curso" arriba y "Cerrados" abajo. Cada fila abre `/chat/:exchangeId` |
| `/chat/:exchangeId` | Chat de un intercambio | | Cada chat. Se llega desde `/chats` o al proponer un intercambio. Incluye el botón "Denunciar" y "Confirmar intercambio" || `/perfil` | Mi perfil | | Wallet, historial de transacciones, editar nombre/avatar |
| `/perfil/editar` | Editar perfil | | |
| `/perfil/:userId` | Perfil público de otra persona | | Visible desde el detalle de una tarjeta o desde el chat |
| `/verificacion` | Verificación de identidad | | Se llega aquí desde el aviso al intentar publicar/aceptar en categoría Cuidados sin verificar |
| `/valorar/:transactionId` | Valorar tras un intercambio | | Se abre tras confirmar el intercambio en `/chat/:conversationId` |
| `/ajustes` | Ajustes | | Tema claro/oscuro, cerrar sesión |

## Rutas del panel de administración

| Ruta | Pantalla | Notas |
|---|---|---|
| `/admin` | Resumen admin | Solo accesible con rol `admin`; reutiliza los componentes de `/actividad` a otra escala |
| `/admin/cards` | Gestión de tarjetas | Tabla con filtros, incluye las denunciadas |
| `/admin/usuarios` | Gestión de usuarios | Ver verificación, suspender cuentas con 3 denuncias verificadas |
| `/admin/denuncias` | Cola de denuncias | Marcar como "verificada" o "no procedente" (ver `denuncia.feature`) |

## Notas de implementación

- Todas las rutas protegidas comparten un mismo `<ProtectedRoute>` wrapper que comprueba el estado de autenticación de Firebase antes de renderizar.
- Las rutas de `/admin/*` necesitan además una comprobación de rol, no solo de autenticación — un segundo wrapper `<AdminRoute>` sobre `<ProtectedRoute>`.
- Los query params (`categoria`, `modo`, `vista`, `fecha`) son opcionales: su ausencia debe equivaler al valor por defecto ("Todas", "Buscar", "Tarjetas", sin fecha), nunca a un estado roto.
