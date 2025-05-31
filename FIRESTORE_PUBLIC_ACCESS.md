# Configurar Acceso Público a Firestore

Para hacer que tu base de datos de Firebase (Firestore) sea accesible públicamente, necesitas modificar las reglas de seguridad. Esto permitirá que cualquier persona pueda leer los datos sin necesidad de autenticación.

## Pasos para configurar el acceso público:

1. **Accede a la consola de Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto "directorio-restaurantes-2fad9"

2. **Accede a Firestore Database**:
   - En el menú lateral izquierdo, haz clic en "Firestore Database"

3. **Configura las reglas de seguridad**:
   - Haz clic en la pestaña "Reglas" en la parte superior
   - Reemplaza las reglas existentes con las siguientes:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos (pública)
    match /restaurants/{document=**} {
      allow read: if true;
      // Solo permitir escritura a usuarios autenticados (opcional)
      allow write: if request.auth != null;
      // Si quieres permitir escritura pública también, usa:
      // allow write: if true;
    }
  }
}
```

4. **Haz clic en "Publicar"** para aplicar las nuevas reglas

## Explicación de las reglas:

- `allow read: if true;` - Permite que cualquier persona lea los datos de la colección "restaurants"
- `allow write: if request.auth != null;` - Solo permite escritura a usuarios autenticados

## Para permitir escritura pública también:

Si deseas que cualquier persona pueda también añadir, modificar o eliminar restaurantes (lo cual no es recomendable para un entorno de producción), puedes modificar la regla a:

```
allow write: if true;
```

## Consideraciones de seguridad:

- Hacer tu base de datos completamente pública significa que cualquier persona puede leer tus datos
- Si también permites escritura pública, cualquier persona podrá modificar o eliminar tus datos
- Para un entorno de producción, considera implementar autenticación de usuarios para controlar el acceso

## Modo de prueba vs. Producción:

Recuerda que si configuraste Firestore en "modo de prueba", las reglas de seguridad se restablecerán automáticamente después del período especificado (generalmente 30 días). Para una solución permanente, asegúrate de que estés en modo de producción con las reglas de seguridad correctamente configuradas.
