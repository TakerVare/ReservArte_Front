# ReservArte
Repositorio para la aplicación de reservas de trabajo final de 2º de DAW

## Instalación y ejecución

### Prerrequisitos
- Docker y Docker Compose instalados en tu sistema.

### Ejecutar con Docker (Entorno completo)
1. Clona este repositorio:
   ```
   git clone <url-del-repositorio>
   cd ReservArte_Front
   ```
2. Ejecuta Docker Compose para iniciar todos los servicios (base de datos, API y frontend):
   ```
   docker-compose up --build -d
   ```
   - Esto iniciará SQL Server, la API .NET en `http://localhost:5297`, y el frontend en `http://localhost:8080`.


## Credenciales de usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| **Administrador** | guille@svalero.com | Admin1234! |
| **Empleada** | maria.garcia@reservarte.com | Maria123! |
| **Empleada** | laura.martinez@reservarte.com | Laura123! |
| **Cliente** | ana.lopez@email.com | Cliente123! |
| **Cliente** | carmen.rodriguez@email.com | Cliente123! |
| **Cliente** | isabel.sanchez@email.com | Cliente123! |

## Rutas de la aplicación

### Públicas (sin autenticación)
| URL | Descripción |
|-----|-------------|
| http://localhost:8080/ | Página de inicio |
| http://localhost:8080/contact | Información de contacto y ubicación |
| http://localhost:8080/booking | Reserva de citas |
| http://localhost:8080/user | Perfil de usuario |
| http://localhost:8080/auth/login | Inicio de sesión |

### Administración (requieren autenticación)
| URL | Descripción |
|-----|-------------|
| http://localhost:8080/admin/users | Gestión de usuarios |
| http://localhost:8080/admin/users/new | Crear nuevo usuario |
| http://localhost:8080/admin/customers | Gestión de clientes |
| http://localhost:8080/admin/customers/new | Crear nuevo cliente |
| http://localhost:8080/admin/employees | Gestión de empleados |
| http://localhost:8080/admin/employees/new | Crear nuevo empleado |
| http://localhost:8080/admin/services | Gestión de servicios |
| http://localhost:8080/admin/services/new | Crear nuevo servicio |

### API / Swagger
| URL | Descripción |
|-----|-------------|
| http://localhost:5297/swagger/index.html | Documentación API (Swagger) |


