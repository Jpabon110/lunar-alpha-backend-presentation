

# Lunar Alpha Backend

Backend para el sistema de gestión de recursos y tareas de la base lunar.

## Requisitos Previos

- Docker
- Docker Compose
- Git

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd lunar-alpha-backend
```

2. Crear archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL="postgresql://postgres:password123@db:5432/lunar_alpha"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

## Ejecución con Docker Compose

1. Construir y levantar los servicios:
```bash
docker-compose up --build -d
```

2. Ejecutar las migraciones de la base de datos:
```bash
docker-compose exec app npx prisma migrate deploy
```

3. Inicializar datos de recursos:
```bash
docker-compose exec app npx prisma db seed
```

Este comando creará los siguientes recursos iniciales:
- Oxygen (nivel: 100%)
- Food (nivel: 100%)
- Energy (nivel: 100%)

4. Verificar los logs de la aplicación:
```bash
docker-compose logs -f app
```

## Endpoints Disponibles

Puedes importar la colección de Postman incluida en el proyecto:
```json
Lunar Alpha.postman_collection.json
```

## Modelos de Datos

Los modelos están definidos en:

```16:33:schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  priority    String
  assignedTo  User?    @relation(fields: [userId], references: [id])
  userId      Int?
  createdAt   DateTime @default(now())
}
```


## Detener la Aplicación

Para detener y eliminar los contenedores:
```bash
docker-compose down
```

Para eliminar también los volúmenes:
```bash
docker-compose down -v
```

## Desarrollo

Para desarrollo local con Docker, los cambios en el código se reflejarán automáticamente gracias al volumen montado y nodemon.

## Notas Adicionales

- La base de datos PostgreSQL persiste en un volumen Docker
- El servidor se ejecuta en modo desarrollo con hot-reload
- Los logs están disponibles a través de Morgan
- CORS está habilitado para desarrollo