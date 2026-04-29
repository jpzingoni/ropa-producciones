// ── Auth helpers ───────────────────────────────────────────────────────────
// Se carga despues de config.js y supabase CDN

let _supabase = null;

function getClient() {
  if (!_supabase) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return _supabase;
}

// Devuelve true si el usuario es solo lectura
function esReadOnly(session) {
  return session?.user?.app_metadata?.role === 'readonly';
}

// Verifica session. Si no hay, redirige al login.
// Si es readonly y está en una pagina de escritura, redirige al index de esa seccion.
// Aplica clase CSS 'readonly' al body para ocultar elementos de accion.
async function requireAuth() {
  const client = getClient();
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = "/admin/login.html";
    return null;
  }

  if (esReadOnly(session)) {
    document.body.classList.add('readonly');

    // Redirigir fuera de paginas de escritura
    const path = window.location.pathname;
    const esEscritura = path.includes('/nueva.html') || path.includes('/editar.html');
    if (esEscritura) {
      // Determinar a donde redirigir (seccion/index.html)
      const destino = path.replace(/\/(nueva|editar)\.html.*$/, '/index.html');
      window.location.href = destino;
      return null;
    }
  }

  return session;
}

// Cierra la session y redirige al login
async function logout() {
  const client = getClient();
  await client.auth.signOut();
  window.location.href = "/admin/login.html";
}
