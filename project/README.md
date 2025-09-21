# R&N Paradisse Real Estate

Sitio web profesional para R&N Paradisse Real Estate, una empresa inmobiliaria líder en República Dominicana.

## 🚀 Características

- **Diseño Moderno**: Interfaz elegante y responsive con Tailwind CSS
- **Panel de Administración**: Sistema completo con Supabase para gestionar propiedades
- **Autenticación Segura**: Login protegido para administradores
- **Galería de Propiedades**: Sistema completo con filtros y búsqueda
- **Calculadora de Hipoteca**: Herramienta interactiva para cálculos financieros
- **Sistema de Citas**: Modal profesional para agendar consultas
- **Blog Inmobiliario**: Artículos categorizados con sistema de búsqueda
- **Widget de WhatsApp**: Contacto directo flotante
- **SEO Optimizado**: Meta tags completos y structured data

## 🔐 Panel de Administración

### Acceso
- **URL**: `/admin`
- **Autenticación**: Supabase Auth
- **Funcionalidades**:
  - Dashboard con estadísticas
  - CRUD completo de propiedades
  - Gestión de agentes
  - Subida de imágenes
  - Configuración del sistema

### Configuración de Supabase

1. **Crear proyecto en Supabase**:
   - Ve a [supabase.com](https://supabase.com)
   - Crea un nuevo proyecto
   - Anota la URL y las API keys

2. **Configurar variables de entorno**:
   ```bash
   # Crea archivo .env.local
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

3. **Ejecutar migraciones**:
   - Copia el contenido de `supabase/migrations/001_initial_schema.sql`
   - Ejecuta en el SQL Editor de Supabase
   - Esto creará las tablas y políticas de seguridad

4. **Crear usuario administrador**:
   ```sql
   -- En Supabase SQL Editor
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES ('admin@rnparadisse.com', crypt('tu_password', gen_salt('bf')), now());
   ```

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router DOM
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Deployment**: Vercel

## 🗄️ Base de Datos

### Estructura
- **agents**: Información de agentes inmobiliarios
- **properties**: Catálogo de propiedades
- **Row Level Security**: Políticas de seguridad implementadas
- **Triggers**: Actualización automática de timestamps

### Migración de Datos
Las propiedades estáticas se mantienen como fallback. Para migrar a Supabase:

1. Ejecuta las migraciones SQL
2. Las propiedades se cargarán automáticamente desde la base de datos
3. El sistema usa fallback a datos estáticos si Supabase no está disponible

## 📱 Funcionalidades

### Panel de Administración
- Dashboard con métricas en tiempo real
- CRUD completo de propiedades
- Formularios validados
- Subida múltiple de imágenes
- Gestión de características dinámicas
- Asignación de agentes

### Propiedades
- Galería con carrusel de imágenes
- Filtros por tipo (venta/alquiler)
- Búsqueda por texto
- Modal de detalles completo
- Información de agentes

### Servicios
- 10 servicios principales
- Tasación de inmuebles
- Traspaso de títulos
- Proyectos turísticos
- Financiamiento

### Calculadora de Hipoteca
- Sliders interactivos
- Cálculos en tiempo real
- Desglose completo de costos
- Integración con WhatsApp

### Equipo
- 4 miembros del equipo
- Información de contacto
- Experiencia y especialidades
- Valores de la empresa

## 🚀 Deployment en Vercel

### Opción 1: Deploy Automático desde Git

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub/GitLab/Bitbucket

2. **Configuración automática:**
   - Vercel detectará automáticamente que es un proyecto Vite
   - Usará la configuración de `vercel.json`

3. **Deploy:**
   - Haz clic en "Deploy"
   - Tu sitio estará disponible en unos minutos

### Opción 2: Deploy Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login a Vercel
vercel login

# Deploy desde la carpeta del proyecto
vercel

# Para production deploy
vercel --prod
```

### Opción 3: Deploy desde Build Local

```bash
# Construir el proyecto
npm run build

# Deploy la carpeta dist
vercel dist --prod
```

## 🔧 Configuración de Vercel

El proyecto incluye `vercel.json` con:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Rewrites**: SPA routing
- **Headers**: Cache optimization
- **Functions**: Node.js 18.x runtime

## 📞 Información de Contacto

- **Teléfono**: (809) 798-5428
- **WhatsApp**: +1-809-798-5428
- **Email**: info@rnparadisse.com
- **Ubicación**: Santo Domingo Este, República Dominicana

## 🎨 Paleta de Colores

- **Verde Oscuro**: #002430 (Principal)
- **Gradiente Dorado**: yellow-400 a yellow-600
- **Hueso**: #f4f4f2 (Fondo)
- **Blanco**: #ffffff

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg, xl
- **Touch Friendly**: Botones y elementos táctiles optimizados

## 🔍 SEO Features

- Meta tags completos
- Open Graph para redes sociales
- Structured data (JSON-LD)
- Sitemap automático
- Favicon personalizado

## 📄 Páginas Legales

- Política de Privacidad
- Términos y Condiciones
- Política de Cookies
- Cumplimiento normativo

## 🚀 Performance

- **Lazy Loading**: Imágenes y componentes
- **Code Splitting**: Chunks optimizados
- **Caching**: Headers de cache configurados
- **Minification**: CSS y JS minificados
- **Compression**: Gzip automático en Vercel

## 📈 Analytics Ready

El sitio está preparado para integrar:
- Google Analytics
- Facebook Pixel
- Google Tag Manager
- Hotjar/Mixpanel

---

**Desarrollado con ❤️ para R&N Paradisse Real Estate**