# 🚀 Instrucciones para Publicar en GitHub Pages

## Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en "New repository" (botón verde)
3. Nombra tu repositorio: `belle-epoque-pasteleria` (o el nombre que prefieras)
4. Marca como "Public" para poder usar GitHub Pages gratuito
5. NO inicialices con README (ya tenemos uno)
6. Haz clic en "Create repository"

## Paso 2: Subir el Proyecto

Desde la carpeta del proyecto, ejecuta estos comandos en la terminal:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "✨ Sitio web inicial de Belle Époque - Pastelería Francesa"

# Conectar con tu repositorio de GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/belle-epoque-pasteleria.git

# Subir el código
git push -u origin main
```

## Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (configuración)
3. Scroll hacia abajo hasta encontrar "Pages" en el menú lateral
4. En "Source", selecciona "Deploy from a branch"
5. Selecciona "main" branch y "/ (root)"
6. Haz clic en "Save"

## Paso 4: Acceder al Sitio

GitHub te proporcionará una URL como:
`https://TU-USUARIO.github.io/belle-epoque-pasteleria/`

## 📝 Notas Importantes

- **Tiempo de Procesamiento:** GitHub Pages puede tardar hasta 10 minutos en procesar y publicar tu sitio
- **Dominio Personalizado:** Puedes configurar un dominio propio si lo deseas
- **HTTPS:** GitHub Pages incluye HTTPS automáticamente
- **Actualizaciones:** Cada vez que hagas `git push`, el sitio se actualizará automáticamente

## 🔄 Para Futuras Actualizaciones

```bash
# Agregar cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "📝 Actualizar precios de productos"

# Subir cambios
git push
```

## ✅ Verificación Final

Antes de entregar, verifica que:
- [ ] El sitio carga correctamente en la URL de GitHub Pages
- [ ] La navegación funciona en móvil y desktop
- [ ] Todos los enlaces internos funcionan
- [ ] El diseño se ve correctamente en diferentes dispositivos
- [ ] Los textos son legibles y sin errores ortográficos

## 📧 Datos para Entregar

**URL del Repositorio:** `https://github.com/TU-USUARIO/belle-epoque-pasteleria`
**URL del Sitio Web:** `https://TU-USUARIO.github.io/belle-epoque-pasteleria/`

---
*¡Tu sitio web de Belle Époque estará listo para mostrar al mundo!* 🥐✨