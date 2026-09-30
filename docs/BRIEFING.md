# Briefing del proyecto — barrio.

**IT Academy Barcelona Activa · Bootcamp Frontend**
Este briefing es el resultado de **unificar dos enunciados oficiales** — el Proyecto 4 (INPROCODE: Dashboards y Data Visualization) y el Proyecto Final — en un solo proyecto, siguiendo la indicación de la mentora de plantearlo así desde el principio en vez de hacerlos por separado y fusionarlos después.

Plazo: ~1 mes. Equipo: 1 persona. Punto de partida: conocimientos sólidos de React/TS del bootcamp.

---

## 1. Qué es barrio.

Un banco de tiempo de barrio: la gente intercambia ayuda (clases, reparaciones, mudanzas, cuidado de mascotas y plantas) pagando en **horas**, no en dinero. Cada persona puede **buscar** ayuda o **ofrecerla**, dentro de las mismas categorías: Hogar, Cuidados, Digital, Comunidad.

Esta idea es el "dominio" sobre el que se implementan los dos enunciados a la vez: las tarjetas de busco/ofrezco son el dato que el Proyecto 4 pide visualizar en mapa, calendario y panel de estadísticas, y también son las "features de negocio" que pide el Proyecto Final.

---

## 2. De dónde sale cada requisito (para que quede trazable)

| Viene de | Requisito |
|---|---|
| Proyecto 4 | Mapa interactivo, calendario, panel de estadísticas, todo sincronizado desde el mismo panel gestor de datos |
| Proyecto 4 | CRUD de datos directamente desde el mapa y el calendario, no solo desde un panel central |
| Proyecto 4 | Filtrado y segmentación por categoría/fecha en mapa, calendario y gráficas |
| Proyecto 4 | URL única por cada vista/página, estructura semántica y accesible |
| Proyecto Final | Mínimo 4 features de negocio con valor real, más login/registro y perfil |
| Proyecto Final | Integración de IA que aporte valor real (no decorativa) |
| Proyecto Final | Experiencia inmersiva: animaciones, microinteracciones, modo oscuro |
| Proyecto Final | Panel de administración estilo Inprocode (opcional, "para ir más allá") |
| Ambos | SPA en React, mobile-first, Firebase Auth, rutas protegidas, backend con API propia, clean code (YAGNI/KISS/SOLID/DRY), testing con Gherkin, Git Flow, despliegue público |

---

## 3. Niveles unificados

Los dos enunciados ya vienen organizados por niveles de valor progresivo. En vez de mantenerlos como dos listas paralelas, se fusionan en una sola escalera: cada nivel incluye lo que pedían **ambos** enunciados para ese grado de madurez del proyecto.

### Nivel 1 — Base funcional y de datos
**Negocio (Proyecto Final):**
- Publicar tarjeta (busco/ofrezco), con categoría, horas y descripción
- Descubrir tarjetas (feed), match y coordinación básica (proponer intercambio, chat)
- Sistema de créditos (wallet): saldo, historial, horas de regalo al registrarse
- Login/registro (Firebase) y gestión de perfil

**Datos y visualización (Proyecto 4 — Épicas 1-4 + Épica 5):**
- El mismo dato de tarjeta se visualiza de forma sincronizada en tres vistas: **mapa** (Leaflet), **calendario** (fechas de disponibilidad/necesidad) y **panel de estadísticas** (horas compartidas, actividad)
- Autenticación y seguridad: acceso restringido, rutas protegidas

**Técnico (ambos):** SPA React + TS, mobile-first 2 breakpoints, URL única por vista, estructura semántica/accesible, componentización reutilizable, clean code, testing con Gherkin, Git Flow, despliegue público.

> Un proyecto que solo cumpliera este nivel ya sería "presentable": login, publicar y ver tarjetas, y verlas reflejadas correctamente en mapa/calendario/estadísticas.

### Nivel 2 — Gestión desde las vistas + Inteligencia Artificial
**Datos (Proyecto 4 — Épicas 2 y 3):**
- Crear, modificar y eliminar tarjetas **directamente desde el mapa y desde el calendario** (no solo desde el feed) — el cambio se persiste y se refleja también en el panel gestor

**IA (Proyecto Final — Nivel 2):**
- Generación de tarjetas con IA: el usuario escribe en bruto lo que necesita/ofrece, la API de Claude devuelve título, descripción e icono
- Moderación de contenido antes de publicar (clasificación de seguridad vía la propia API de Claude)

### Nivel 3 — Filtrado avanzado + experiencia inmersiva
**Datos (Proyecto 4 — Épicas 2, 3 y 4):**
- Filtrado y segmentación por categoría, fecha u otros parámetros, aplicado a la vez en mapa, calendario y gráficas de estadísticas

**Experiencia (Proyecto Final — Nivel 3):**
- Animaciones y microinteracciones (Framer Motion), transiciones fluidas, modo oscuro con paleta invertida
- El gesto de swipe en la vista Buscar es una de estas microinteracciones, no solo un botón

### Panel de administración (ajuste tras feedback de la mentora: ya no es opcional)
Ambos enunciados apuntan a lo mismo aquí: adaptar el panel de estadísticas para que sirva también de **panel de administración** (roles admin/usuaria, gestión de tarjetas denunciadas, tablas con filtros). La mentora señaló que, dado que el proyecto ya implementa denuncias, doble moderación y suspensión de cuentas, esas herramientas necesitan una interfaz real desde la que actuar — si no, la moderación "existe" en la base de datos pero nadie puede operarla. Pasa de ser un extra de la semana 4 a formar parte del Nivel 1-2: vista de tickets denunciados con acción de revisar/suspender, y vista de usuarios con su estado de verificación.

---

## 4. Requisitos técnicos completos (unión literal de ambos enunciados)

- SPA en **React + TypeScript + Vite**, con **Tailwind**
- Mobile-first con **2 breakpoints**
- **Backend con API propia** (no basta con Firebase como única persistencia)
- **Autenticación con Firebase**, rutas protegidas y estados de autenticación
- **Gestión de rutas estructurada y dinámica**, con **URL única por cada vista/página**
- Librerías de visualización: **Leaflet** (mapa), **react-big-calendar** o **FullCalendar** (calendario), **Recharts** (estadísticas)
- **Estructura semántica y accesible** (HTML semántico, atributos ARIA donde corresponda, contraste y navegación por teclado cuidados)
- Componentización clara y reutilizable
- Clean code: **YAGNI, KISS, SOLID, DRY**
- **Testing unitario obligatorio, con escenarios en Gherkin**
- Buen uso de Git y GitHub (**Git Flow**)
- Documentación clara (README)
- Despliegue público (Netlify, Vercel o GitHub Pages para el frontend)

---

## 5. Stack recomendado y por qué

| Pieza | Elección | Por qué |
|---|---|---|
| Frontend | React + TypeScript + Vite + Tailwind | Pedido explícitamente por ambos enunciados |
| Backend | Node.js + Express + **PostgreSQL (Neon, capa gratis) vía Prisma** | Los dos enunciados piden "API pròpia" de verdad. Cambio tras feedback de la mentora (ajuste posterior a la decisión inicial de Mongo): el dominio real tiene relaciones y una máquina de estados (`Exchange`) con integridad referencial y transacciones multi-tabla (mover horas de "reservado" a "transferido" sin dejar datos inconsistentes) — es justo el caso donde una base relacional con transacciones ACID nativas encaja mejor que un modelo de documentos. Prisma da migraciones versionadas y tipado TypeScript generado automáticamente a partir del esquema |
| Auth | Firebase Authentication (solo Auth) | Cumple el requisito literal sin forzar Firestore a hacer de base de datos principal |
| Mapa | Leaflet + OpenStreetMap | Gratis, sin clave de facturación, suficiente para el alcance |
| Calendario | react-big-calendar | Más simple de personalizar con Tailwind que FullCalendar |
| Gráficos | Recharts | Se integra de forma nativa con componentes React |
| IA | API de Anthropic (Claude) | Ya tienes cuenta — pero la suscripción Pro/Max de claude.ai es distinta de la API de desarrollador (console.anthropic.com); hace falta una API key de esa consola aparte |
| Verificación de identidad | Stripe Identity (modo test) | Proveedor real sin coste en modo test |
| Animaciones | Framer Motion | Estándar en React para el Nivel 3 |
| Testing | Vitest + Testing Library + Gherkin (jest-cucumber o similar) | Vitest es nativo de Vite |
| Despliegue | Netlify/Vercel (frontend) + Render (backend) | Gratis, despliegue automático desde GitHub |

---

## 6. Privacidad y seguridad (se implementa dentro del Nivel 1-2, no es un "extra")

- **Doble punto de moderación** (ajuste tras feedback de la mentora): (1) al generar la tarjeta con IA, la propia respuesta de Claude ya viene clasificada; (2) **justo antes de guardar/publicar**, un segundo paso de moderación revisa el texto final — porque la usuaria puede editar lo que la IA generó, y ese texto editado nunca ha pasado por el filtro. Sin este segundo paso, alguien podría generar una tarjeta limpia y luego editarla para meter contenido no permitido.
- Verificación de identidad real (Stripe Identity, modo test) obligatoria para tickets de categoría Cuidados
- Encuentro presencial sugerido en zona pública la primera vez
- Registro solo para mayores de edad
- Valoraciones obligatorias tras cada intercambio, denuncia siempre visible, 3 denuncias verificadas suspenden la cuenta
- Chat interno, nunca se comparte el teléfono por defecto

---

## 7. Modelo de datos (actualizado tras feedback de la mentora — ahora relacional, PostgreSQL vía Prisma)

> La mentora señaló que "aceptar un intercambio" y "transferir horas" no pueden ser el mismo paso: hace falta una entidad propia para la propuesta de intercambio, con su ciclo de estados, y las horas deben **reservarse** al aceptar y **transferirse de verdad** solo cuando ambas partes confirman que el servicio se realizó. El saldo de créditos ya no es un campo que se suma/resta directamente: se calcula a partir de un historial de movimientos. Precisamente por esto —relaciones claras entre tablas y una transacción que debe tocar varias filas a la vez sin dejar datos a medias— se decidió pasar de MongoDB a **PostgreSQL**, con integridad referencial (claves foráneas) resuelta por la propia base de datos en vez de a mano en el código.

Tablas (con sus relaciones — así se traducen directamente a `schema.prisma`):

- **User**: id, nombre, email, avatar, verificado (bool), rating, fecha de registro. *(Sin campo de créditos: el saldo es una consulta agregada sobre `TimeTransaction`, no una columna.)*
- **Ticket**: id, autorId → `User.id`, tipo (busco/ofrezco), título, descripción, categoría, horas, icono, lat, lng, fecha, estado (activo/completado/denunciado)
- **Exchange** *(nueva)*: id, ticketId → `Ticket.id`, proponenteId → `User.id`, receptorId → `User.id`, horas, estado (enum), fechas de cada cambio de estado. Ciclo de estados:
  1. `propuesta` — el proponente pide el intercambio sobre un ticket
  2. `pendiente` — esperando respuesta del receptor
  3. `aceptada` — el receptor acepta → **se reservan/bloquean las horas** del proponente (no se transfieren)
  4. `realizada` — alguna de las partes marca que el servicio ya se hizo
  5. `confirmada` — **ambas partes** confirman → aquí se dispara la transferencia real de horas (se crea el `TimeTransaction`) y el ticket pasa a completado
  6. `valorada` — tras la valoración obligatoria, se cierra el ciclo
  - Estado alternativo `cancelada` / `rechazada` en cualquier punto antes de `confirmada` → libera las horas reservadas sin transferir nada
- **TimeTransaction** *(sustituye a `Transaction`, ahora es el historial del que se deriva el saldo, no una columna que se modifica directamente)*: id, exchangeId → `Exchange.id` (nullable, el regalo de bienvenida no viene de un exchange), deUserId → `User.id` (nullable), aUserId → `User.id`, horas, tipo (enum: `reserva` / `transferencia` / `liberación`), fecha
- **Report**: id, ticketId → `Ticket.id` (nullable) o userId denunciado → `User.id` (nullable, uno de los dos), motivo, estado (pendiente/revisado)
- **Message**: id, conversationId (o exchangeId → `Exchange.id`, ya que cada intercambio tiene su propio chat), deUserId → `User.id`, texto, fecha

**Regla de negocio clave (backend):** el saldo de horas de un usuario = `SUM(horas)` de sus `TimeTransaction` de tipo `transferencia` (entradas menos salidas). Las horas "reservadas" se calculan aparte (suma de `Exchange` en estado `aceptada`/`realizada`) y se muestran en el wallet como "disponible" vs "comprometido", para que la usuaria nunca vea un saldo que no puede gastar porque ya está comprometido en un intercambio en curso. Esta operación (mover de reserva a transferencia real) debe hacerse dentro de una **transacción de Postgres** (`prisma.$transaction([...])`) porque toca dos filas (`Exchange` + nueva fila en `TimeTransaction`) a la vez y no puede quedar a medias.

---

## 8. Etapas del proyecto (tal como las define el enunciado del Proyecto Final)

1. **Definición**: idea planteada y validada con mentora — ya hecho, es este documento.
2. **Documentación previa**: este briefing, sitemap/userflows, wireframes (ya existen en Figma), historias de usuario con criterios de aceptación en Gherkin.
3. **Desarrollo del MVP**: sprints cortos, testeo continuo, buenas prácticas de código — ver `ROADMAP.md`.
4. **Iteración y refinamiento**: validar con testers si es posible, mejorar diseño/usabilidad, añadir extras (panel admin) si sobra margen.
5. **Cierre**: demo pública desplegada, README completo, presentación final preparada.

---

## 9. Fuera de alcance (a propósito)

- Pagos reales o pasarela de dinero (el sistema es de horas, no de dinero)
- Notificaciones push nativas
- Apps móviles nativas (solo web responsive)
- Internacionalización multi-idioma (se menciona en el README como posible extensión futura)

---

## 10. Criterio de éxito

El proyecto cumple ambos enunciados a la vez cuando: las 4+ features de negocio funcionan de extremo a extremo contra el backend real, mapa/calendario/estadísticas están sincronizados desde el mismo dato y permiten CRUD y filtrado desde las propias vistas, la generación de tarjetas con IA funciona con la API real, hay tests unitarios pasando para los criterios de aceptación en Gherkin de cada historia de usuario, y todo está desplegado públicamente con un README que explica cómo levantarlo en local.