# 🚀 Guía de Despliegue - Portfolio Cardan

## 🎯 Opciones de Despliegue

### 1. Netlify (Recomendado)

#### Deploy Automático desde Git
1. **Crear cuenta en Netlify**: [netlify.com](https://netlify.com)
2. **Conectar repositorio**:
   - Click en "New site from Git"
   - Conecta tu cuenta de GitHub/GitLab
   - Selecciona tu repositorio

3. **Configuración de Build**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Ya está configurado en `netlify.toml`)

4. **Deploy**: Netlify automáticamente construirá y desplegará tu sitio

#### Deploy Manual
```bash
# Construir el proyecto
npm run build

# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 2. Vercel

#### Deploy desde Git
1. **Crear cuenta en Vercel**: [vercel.com](https://vercel.com)
2. **Importar proyecto**:
   - Click en "New Project"
   - Importa desde GitHub
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Deploy con Vercel CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. GitHub Pages

1. **Configurar GitHub Actions**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Configurar vite.config.js**:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nombre-repositorio/' // Solo para GitHub Pages
})
```

### 4. Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar proyecto
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes

# Deploy
firebase deploy
```

## 📁 Estructura después del Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── vite.svg
```

## 🔧 Configuraciones Adicionales

### Variables de Entorno
Crear `.env` para configuraciones específicas:
```bash
VITE_API_URL=https://api.tudominio.com
VITE_CONTACT_EMAIL=tu@email.com
```

### SEO y Meta Tags
Actualizar `index.html`:
```html
<meta name="description" content="Portfolio de Cardan - Desarrollador Full Stack">
<meta property="og:title" content="Portfolio - Cardan">
<meta property="og:description" content="Desarrollador Full Stack especializado en React y Node.js">
<meta property="og:image" content="/preview.jpg">
```

### Dominio Personalizado

#### Netlify
1. En el dashboard de Netlify: Site settings > Domain management
2. Add custom domain
3. Configurar DNS en tu proveedor

#### Vercel
1. En el dashboard de Vercel: Settings > Domains
2. Add domain
3. Configurar DNS records

## 📊 Optimizaciones

### Performance
- ✅ Code splitting automático con Vite
- ✅ CSS minificado
- ✅ Assets optimizados
- ✅ Tree shaking

### Bundle Size
```bash
# Analizar bundle
npm run build -- --analyze
```

## 🔐 HTTPS
Todos los servicios mencionados incluyen HTTPS automático con certificados SSL gratuitos.

## 📈 Analytics (Opcional)

### Google Analytics
```html
<!-- En index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚨 Solución de Problemas

### Error: "Cannot resolve module"
```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
```

### Build falla
```bash
# Verificar versión de Node
node --version # Debe ser >= 16

# Verificar dependencias
npm audit
```

### Animaciones no funcionan en producción
Verificar que Framer Motion esté en `dependencies`, no en `devDependencies`.

## 🔄 Updates Automáticos

Configura webhooks para deploys automáticos:
- **Netlify**: Auto-deploy en push a main
- **Vercel**: Auto-deploy en push a main
- **GitHub Pages**: Con GitHub Actions

---

¡Tu portfolio está listo para el mundo! 🌟