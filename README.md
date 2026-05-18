# NestJS Design Patterns Lab

Laboratorio de patrones de diseno aplicados a casos reales de backend con NestJS.

El proyecto no intenta mostrar clases aisladas. Cada patron vive en un modulo funcional bajo `src/patterns`, con controller, DTOs, servicios, contratos y una implementacion in-memory para poder probarlo sin base de datos.

## Ejecutar

```bash
npm install
npm run start:dev
```

Base URL:

```txt
http://localhost:3000/api
```

## Patrones

### Repository Pattern

Ruta: `src/patterns/repository-pattern`

Muestra como separar el caso de uso de la persistencia mediante un puerto `ProductRepositoryPort` y una implementacion `InMemoryProductRepository`.

Incluye:

- Token de inyeccion `PRODUCT_REPOSITORY`.
- Entidad `Product` con reglas de dominio.
- Busqueda por texto, categoria, bajo stock e inactivos.
- Cambio de stock sin acoplar el service al almacenamiento.

Endpoints:

```txt
POST   /api/patterns/repository/products
GET    /api/patterns/repository/products?search=mouse&category=hardware&lowStockOnly=true
GET    /api/patterns/repository/products/:id
PATCH  /api/patterns/repository/products/:id/stock
DELETE /api/patterns/repository/products/:id
```

### Service Layer Pattern

Ruta: `src/patterns/service-layer-pattern`

Muestra una capa de aplicacion que orquesta servicios especializados, sin dejar reglas complejas en el controller.

Incluye:

- `OrderService` como orquestador.
- `OrderPricingService` para impuestos, descuentos, envio y cupones.
- `OrderStockService` para reservas y liberacion de stock.
- Ciclo de vida de orden: `created`, `confirmed`, `cancelled`.

Endpoints:

```txt
POST /api/patterns/service-layer/orders
GET  /api/patterns/service-layer/orders
GET  /api/patterns/service-layer/orders/:id
POST /api/patterns/service-layer/orders/:id/confirm
POST /api/patterns/service-layer/orders/:id/cancel
```

### Strategy Pattern

Ruta: `src/patterns/strategy-pattern`

Muestra como intercambiar algoritmos de pago sin cambiar el caso de uso principal.

Incluye:

- Contrato `PaymentStrategy`.
- Estrategias `CashStrategy`, `StripeStrategy`, `MercadoPagoStrategy`.
- Registro de estrategias con token `PAYMENT_STRATEGIES`.
- Reglas por proveedor, fees, cuotas, currency support y metadata.

Endpoints:

```txt
POST /api/patterns/strategy/payments
GET  /api/patterns/strategy/payments
GET  /api/patterns/strategy/payments/providers
```

### Factory Pattern

Ruta: `src/patterns/factory-pattern`

Muestra como crear distintos productos de dominio sin acoplar el servicio a clases concretas.

Incluye:

- `DocumentFactory`.
- Creators registrados con `DOCUMENT_CREATORS`.
- Modelos: invoice, contract, receipt y credit note.
- Validaciones especificas por tipo de documento.

Endpoints:

```txt
POST /api/patterns/factory/documents
GET  /api/patterns/factory/documents
GET  /api/patterns/factory/documents/types
```

### Adapter Pattern

Ruta: `src/patterns/adapter-pattern`

Muestra como normalizar APIs externas con formatos incompatibles detras de una interfaz interna estable.

Incluye:

- Contrato `ExternalCurrencyProviderAdapter`.
- Adapters `DolarApiAdapter` y `StripeCurrencyAdapter`.
- Diferentes formatos externos simulados.
- Validacion de currencies soportadas.
- Comparacion de proveedores disponibles.

Endpoints:

```txt
POST /api/patterns/adapter/currency/convert
POST /api/patterns/adapter/currency/compare
GET  /api/patterns/adapter/currency/providers
```

### Observer Pattern

Ruta: `src/patterns/observer-pattern`

Muestra como publicar un evento de dominio y desacoplar efectos secundarios en listeners independientes.

Incluye:

- Evento `ORDER_CREATED_EVENT`.
- Listeners de email, auditoria y metricas.
- Stores in-memory para consultar efectos producidos por los observers.

Endpoints:

```txt
POST /api/patterns/observer/orders
GET  /api/patterns/observer/orders
GET  /api/patterns/observer/orders/audit
GET  /api/patterns/observer/orders/notifications
GET  /api/patterns/observer/orders/metrics
```

### Builder Pattern

Ruta: `src/patterns/builder-pattern`

Muestra como construir objetos complejos paso a paso y como un Director puede encapsular recetas de construccion.

Incluye:

- `InvoiceBuilder` con fluent API.
- `InvoiceDirector` con perfiles `standard`, `tax_exempt` y `recurring`.
- Calculo de subtotal, descuentos, base imponible, impuestos y total.
- Validacion de invariantes antes de emitir la factura.

Endpoints:

```txt
POST /api/patterns/builder/invoices
GET  /api/patterns/builder/invoices
GET  /api/patterns/builder/invoices/profiles
```

### Prototype Pattern

Ruta: `src/patterns/prototype-pattern`

Muestra como clonar objetos ricos sin reconstruirlos desde cero.

Incluye:

- `CampaignTemplate` con metodo `clone`.
- Deep copy de contenido, schedule, settings y tracking.
- Overrides parciales.
- Distincion entre prototipos y clones operativos.
- Versionado basico de templates.

Endpoints:

```txt
GET  /api/patterns/prototype/campaign-templates
GET  /api/patterns/prototype/campaign-templates/prototypes
GET  /api/patterns/prototype/campaign-templates/:id
POST /api/patterns/prototype/campaign-templates/:id/clone
POST /api/patterns/prototype/campaign-templates/:id/version
```

## Ejemplos de payload

Crear factura con Builder:

```json
{
  "customerName": "Acme SA",
  "customerEmail": "billing@acme.test",
  "customerTaxId": "30-12345678-9",
  "profile": "standard",
  "currency": "ARS",
  "discountPercentage": 5,
  "items": [
    {
      "sku": "CONS-001",
      "description": "Consulting hours",
      "quantity": 10,
      "unitPrice": 15000
    }
  ]
}
```

Clonar template con Prototype:

```json
{
  "name": "Welcome Campaign - Gold Users",
  "audienceSegment": "gold_new_users",
  "content": {
    "subject": "Welcome to Gold",
    "body": "Your Gold benefits are ready."
  },
  "settings": {
    "priority": "high",
    "tracking": {
      "utmCampaign": "welcome_gold"
    }
  }
}
```

Crear pago con Strategy:

```json
{
  "orderId": "order-123",
  "customerId": "user-456",
  "amount": 50000,
  "currency": "ARS",
  "installments": 3,
  "provider": "mercado_pago"
}
```

## Notas

- Todo el estado es in-memory. Reiniciar la app borra productos, ordenes, pagos y documentos creados.
- No se agregaron dependencias externas de validacion para mantener el laboratorio liviano.
- Cada modulo esta pensado para que puedas reemplazar la implementacion in-memory por una base real sin cambiar la API publica del patron.
