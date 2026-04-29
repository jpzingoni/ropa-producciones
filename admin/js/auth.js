// ── Auth helpers ───────────────────────────────────────────────────────────
// Se carga despues de config.js y supabase CDN

let _supabase = null;

function getClient() {
  if (!_supabase) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return _supabase;
}

// Verifica session activa. Si no hay, redirige al login.
// Consulta la tabla user_roles para saber si es readonly y aplica restricciones.
async function requireAuth() {
  const client = getClient();
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = "/admin/login.html";
    return null;
  }

  // Consultar rol desde la base de datos
  const { data: roleData } = await client
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();

  const role = roleData?.role || 'readonly';

  if (role === 'readonly') {
    document.body.classList.add('readonly');
    _aplicarModoLectura();
  }

  return session;
}

function _aplicarModoLectura() {
  // Banner informativo
  const banner = document.createElement('div');
  banner.id = 'banner-readonly';
  banner.innerHTML = '👁&nbsp;&nbsp;Estás en <strong>modo solo lectura</strong> — podés explorar el sistema pero no podés guardar cambios';
  // Insertar despues del header
  const header = document.querySelector('.admin-header');
  if (header) header.insertAdjacentElement('afterend', banner);
  else document.body.insertBefore(banner, document.body.firstChild);

  const MSG = 'No tenés permisos para realizar esta acción. Estás en modo solo lectura.';

  // Bloquear envio de formularios (nueva y editar)
  document.addEventListener('submit', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    showAlert(MSG, 'error');
  }, true);

  // Bloquear botones de accion destructiva (eliminar, desactivar)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-danger');
    if (btn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      showAlert(MSG, 'error');
    }
  }, true);

  // Bloquear acciones de escritura marcadas con data-write
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-write]');
    if (btn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      showAlert(MSG, 'error');
    }
  }, true);
}

// Cierra la session y redirige al login
async function logout() {
  const client = getClient();
  await client.auth.signOut();
  window.location.href = "/admin/login.html";
}
