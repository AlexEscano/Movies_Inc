# Movies Inc

Aplicacion movil multiplataforma (Expo + React Native) que consume la API publica de **[The Movie Database (TMDb)](https://developers.themoviedb.org/3)** para mostrar peliculas populares, mejor valoradas, proximos estrenos y su detalle completo. El proyecto esta construido sobre **TypeScript** y sigue una **Clean Architecture** con separacion estricta de capas.

> Estilo visual inspirado en Netflix: fondo oscuro `#0D0D0D`, acento `#E50914` y tipografia Poppins.

---

## Stack principal

- [Expo](https://expo.dev) (React Native 0.81)
- TypeScript + ESLint strict
- React Navigation (`@react-navigation/native` + `@react-navigation/native-stack`)
- Axios para consumo de la API TMDb
- Gestion de entorno con `react-native-dotenv`
- Carga de fuentes con `@expo-google-fonts/poppins`

---

## Arquitectura Clean

```
src/
+-- app.tsx                # Punto de entrada (UI + providers)
+-- core/                  # Infraestructura transversal (env, axios, DI, errores)
+-- data/                  # Implementaciones concretas (datasource remoto, repositorios)
+-- domain/                # Entidades y casos de uso
+-- presentation/          # UI (navegacion, screens, componentes, hooks)
+-- types/                 # Tipos globales (env)
```

- **core/**: Configuracion de entorno, cliente Axios, mapeo de errores y registro de dependencias.
- **data/**: `MovieApiDataSource` toca la API y `MovieRepositoryImpl` traduce respuestas a entidades de dominio.
- **domain/**: Interfaces puras (`Movie`, `MovieDetail`, `MovieRepository`) y casos de uso orquestando logica (`GetPopularMovies`, etc.).
- **presentation/**: Pantallas (`HomeScreen`, `DetailScreen`), navegacion (`AppNavigator`), componentes visuales y hooks (view models) que consumen los casos de uso.

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

## Configuracion del entorno

1. Crea un archivo `.env` (el repo ya incluye un ejemplo) con tu API key de TMDb:

   ```bash
   TMDB_API_KEY=tu_api_key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Inicia la app:

   ```bash
   npx expo start
   ```

4. Escanea el QR con Expo Go, o presiona `a` / `i` para abrir en emulador Android / iOS respectivamente.

---

## Pruebas

Jest + React Native Testing Library se pueden anadir como mejora. El proyecto esta preparado para pruebas unitarias en los casos de uso (`src/domain/usecases`) y pruebas de integracion en componentes clave.

---

## Posibles mejoras

1. **Busqueda**: Caso de uso `SearchMovies` consumiendo `/search/movie` con debounce en la UI.
2. **Favoritos offline**: Persistencia con `AsyncStorage`, repositorio local conforme al dominio y secciones dedicadas.
3. **Internacionalizacion**: Integrar `react-intl` o `i18next` para soportar multiples idiomas.
4. **Skeletons y shimmer**: Mejor feedback visual durante el loading.
5. **Testing**: Agregar suite Jest + RNTL con mocks de Axios y snapshots de pantallas.

---

## Notas tecnicas

- El tema oscuro esta centralizado en `src/presentation/theme`.
- Fuentes Poppins se cargan en `src/app.tsx` antes de hidratar la navegacion.
- Los hooks `useHomeViewModel` y `useMovieDetailViewModel` encapsulan la logica de orquestacion respetando Clean Architecture.
- Para cambiar la region/idioma de TMDb basta con editar el parametro `language` en `src/core/network/apiClient.ts`.

---

Listo. La base del proyecto esta estructurada para iterar rapido agregando mas funcionalidades sin romper la separacion de capas.
