# Configuración de Firebase completada

¡La configuración de Firebase ha sido completada exitosamente! 

## Resumen de cambios realizados:

1. ✅ Se actualizaron las credenciales de Firebase en `src/firebase/config.js`
2. ✅ El proyecto ya estaba configurado para inicializar automáticamente Firestore con datos de muestra

## Próximos pasos:

1. Ejecuta la aplicación con el comando:
   ```
   npm start
   ```

2. La primera vez que se inicie la aplicación, se cargarán automáticamente los restaurantes de muestra en Firestore.

3. Verifica en la consola de Firebase que la colección "restaurants" se haya creado correctamente con los datos de muestra:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto "directorio-restaurantes-2fad9"
   - Ve a "Firestore Database" en el menú lateral
   - Deberías ver una colección llamada "restaurants" con 4 documentos

## Configuración adicional (opcional):

Si deseas añadir reglas de seguridad a tu base de datos Firestore, puedes hacerlo desde la consola de Firebase:
1. Ve a "Firestore Database" > "Reglas"
2. Configura reglas de acceso apropiadas para tu aplicación

## Notas importantes:

- El modo de prueba de Firestore está configurado para expirar después de 30 días. Si planeas usar la aplicación por más tiempo, considera cambiar a modo de producción y configurar reglas de seguridad adecuadas.
- Mantén tus credenciales de Firebase seguras y no las compartas públicamente.

¡Disfruta de tu aplicación con Firebase como backend!
