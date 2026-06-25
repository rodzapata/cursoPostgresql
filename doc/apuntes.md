# Pasos para creacion de un blog moderno

Usaremos como herramientas Nest JS y MarkDown (.mdx)
la pagina tutorial es 
[la pagina tutorial](https://www.youtube.com/watch?v=g0D6VCh_fvA)

Blog estatico con NextJs y MarkDown [blog por Traversy Media](https://www.youtube.com/watch?v=MrjeefD8sac)

## paso 1 verificamos la version de node

node -v

## paso 2 Creamos nuestro proyecto

npx create-next-app curso-postgres

si no tienes **npx** instalado entonces primero debes instalarlo de la siguiente forma:

```bash
npx create-next-app@latest curso-postgres

```

el proyecto quedaria de la siguiente forma:
npx create-next-app@latest blog-2 --js --eslint --no-tailwind --no-src-dir --app --turbo --no-import-alias


presionamos **ENTER** para escoger la configuracion por defecto.

probamo que nuestra pagina funcione:
```bash
npm run dev
```