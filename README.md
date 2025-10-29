# Movies Inc

Aplicacion movil y web construida con **Expo + React Native** que consume la API publica de **[The Movie Database (TMDb)](https://developers.themoviedb.org/3)** para descubrir peliculas populares, mejor valoradas y proximos estrenos, mostrando su detalle completo. Todo el flujo esta desarrollado en **TypeScript** siguiendo principios de **Clean Architecture**.

> Look and feel tipo Netflix: fondo oscuro `#0D0D0D`, acento `#E50914` y tipografia Poppins.

---

## Requisitos previos

- Node.js 18+ y npm (o yarn/pnpm si prefieres).
- Cuenta gratuita en TMDb para generar la API key.
- Expo Go instalado en tu dispositivo movil para pruebas rapidas.
- (Opcional) Xcode + iOS Simulator en macOS para correr iOS localmente.
- (Opcional) Android Studio + Android Emulator para correr Android localmente.

---

## Configuracion rapida

1. Duplica el archivo `.env.example` como `.env` y coloca tus credenciales de TMDb:

   ```bash
   TMDB_API_KEY=api_key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo de Expo:

   ```bash
   npx expo start
   ```

Expo abrira la Metro bundler UI en tu navegador. Desde ahi puedes lanzar la app en cada plataforma.

---

## Ejecutar la app por plataforma

### iOS (Simulator o dispositivo fisico)

1. Requiere macOS con Xcode instalado.
2. En la Metro bundler UI, presiona el boton **Run on iOS simulator** (o en la terminal, presiona la tecla `i`).
3. Para un iPhone fisico, abre Expo Go, escanea el QR y espera la compilacion. Asegurate de que la maquina y el dispositivo esten en la misma red Wi-Fi.

### Android (Emulador o dispositivo fisico)

1. Instala Android Studio y crea un emulador con Android 13+ (x86_64 recomendado).
2. Desde la Metro bundler UI, usa **Run on Android device/emulator** (o en la terminal, presiona la tecla `a`).
3. Para un dispositivo fisico, activa la depuracion USB o utiliza Expo Go escaneando el QR.

### Web (Expo for Web)

1. Con el servidor de Expo corriendo, presiona `w` en la terminal o selecciona **Run in web browser** en la Metro bundler UI.
2. Se abrira una pestaña en tu navegador con la version web (React DOM). Hot reload esta disponible por defecto.

---

## Stack principal

- [Expo](https://expo.dev) (React Native 0.81)
- TypeScript + ESLint strict
- React Navigation (`@react-navigation/native` + `@react-navigation/native-stack`)
- Axios para consumir TMDb
- Gestion de entorno con `react-native-dotenv`
- Fuentes `@expo-google-fonts/poppins`

---

## Usando Arquitectura Clean

```
src/
+-- app.tsx                # Entrada de la app (UI + providers)
+-- core/                  # Infraestructura (env, axios, DI, errores)
+-- data/                  # Datasources concretos y repositorios
+-- domain/                # Entidades y casos de uso
+-- presentation/          # Navegacion, screens, componentes, hooks
+-- types/                 # Tipos globales (env)
```

- **core/**: Configuracion de entorno, cliente Axios, mapeo de errores y registro de dependencias.
- **data/**: `MovieApiDataSource` toca la API y `MovieRepositoryImpl` traduce respuestas a entidades de dominio.
- **domain/**: Interfaces puras (`Movie`, `MovieDetail`, `MovieRepository`) y casos de uso (`GetPopularMovies`, etc.).
- **presentation/**: Pantallas (`HomeScreen`, `DetailScreen`), navegacion (`AppNavigator`), componentes visuales y hooks que consumen los casos de uso.

---

## Estructura relevante

- `src/core/config/env.ts`: Valida variables `.env` y las expone tipadas.
- `src/core/network/apiClient.ts`: Instancia Axios con API Key y lenguaje por defecto.
- `src/data/datasources/MovieApiDataSource.ts`: Mapea respuestas de TMDb a entidades del dominio.
- `src/data/repositories/MovieRepositoryImpl.ts`: Manejo de errores y adaptacion a la interfaz del dominio.
- `src/domain/entities/*.ts`: Tipado fuerte de peliculas y detalle.
- `src/domain/usecases/*.ts`: Casos de uso por endpoint.
- `src/presentation/navigation/AppNavigator.tsx`: Stack con Home + Detail.
- `src/presentation/screens/HomeScreen.tsx`: Carruseles horizontales para populares, mejor valoradas y proximos estrenos.
- `src/presentation/screens/DetailScreen.tsx`: Sinopsis, metadata y generos.

---

## Notas tecnicas

- El tema oscuro esta centralizado en `src/presentation/theme`.
- Fuentes Poppins se cargan en `src/app.tsx` antes de hidratar la navegacion.
- Los hooks `useHomeViewModel` y `useMovieDetailViewModel` encapsulan la logica de orquestacion respetando Clean Architecture.
- Para cambiar la region/idioma de TMDb, ajusta el parametro `language` en `src/core/network/apiClient.ts`.

---

Genesis Alexander Escano Matos
