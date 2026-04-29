// ── Auth helpers ───────────────────────────────────────────────────────────
// Se carga despues de config.js y supabase CDN

let _supabase = null;

function getClient() {
  if (!_supabase) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return _supabase;
}

// Verifica si hay session activa. Si no, redirige al login.
async function requireAuth() {
  const client = getClient();
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = "/admin/login.html";
    return null;
  }
  return session;
}

// Cierra la session y redirige al login
async function logout() {
  const client = getClient();
  await client.auth.signOut();
  window.location.href = "/admin/login.html";
}
