// ── Configuracion de Supabase ──────────────────────────────────────────────
// COMPLETAR con los valores de Project Settings → API en supabase.com
// NO subir este archivo a GitHub si contiene credenciales reales
// (ya esta en .gitignore)

const SUPABASE_URL  = "https://aptjkxllaxlwsvqsrcjx.supabase.co";
const SUPABASE_KEY  = "sb_publishable_Q31qSgDwTc9hOx5-978QYA_u4RHUp3N";

// ── Mapeo Categoria P&L → Codigo P&L ──────────────────────────────────────
const CATEGORIA_A_CODIGO = {
  "Materiales":             "PL-02",
  "Estampado e impresion":  "PL-03",
  "Confeccion":             "PL-04",
  "Packaging":              "PL-05",
  "Marketing y contenido":  "PL-06",
  "Logistica y envios":     "PL-07",
  "Digital":                "PL-08",
  "Gastos varios":          "PL-09",
};

const CATEGORIAS_PL = Object.keys(CATEGORIA_A_CODIGO);

const TIPOS_PRENDA = [
  "Remera", "Top", "Buzo", "Pantalon",
  "Packaging", "Insumo", "Servicio", "Otro"
];

const ESTADOS_PAGO = ["Pagado", "Pendiente", "Pago parcial"];

// ── Ventas ─────────────────────────────────────────────────────────────────
const CANALES_VENTA  = ["Instagram", "WhatsApp", "Presencial", "Otro"];
const TALLES         = ["XS", "S", "M", "L", "XL", "Unico"];
const ESTADOS_COBRO  = ["Cobrado", "Pendiente", "Cobro parcial"];
const MEDIOS_PAGO    = ["Transferencia", "Efectivo", "Mercado Pago", "Otro"];
const ESTADOS_ENVIO  = ["Sin envio", "Pendiente envio", "En camino", "Entregado"];
