// ── Navegacion compartida ──────────────────────────────────────────────────
// Inyecta el header y sidebar en todas las paginas del admin

function renderNav(activeLink) {
  const links = [
    { href: "/admin/index.html",             icon: "📊", label: "Dashboard",    group: "Principal" },
    { href: "/admin/articulos/index.html",    icon: "🏷", label: "Artículos",    group: "Catálogo" },
    { href: "/admin/ventas/nueva.html",       icon: "➕", label: "Nueva venta",  group: "Ventas" },
    { href: "/admin/ventas/index.html",      icon: "🛍", label: "Ver todas",    group: "Ventas" },
    { href: "/admin/compras/nueva.html",     icon: "➕", label: "Nueva compra", group: "Compras" },
    { href: "/admin/compras/index.html",     icon: "📋", label: "Ver todas",    group: "Compras" },
    { href: "/admin/proveedores/index.html",   icon: "🏭", label: "Proveedores",        group: "Datos" },
    { href: "/admin/resumen.html",             icon: "📈", label: "Resumen",            group: "Datos" },
    { href: "/admin/estado-resultados.html",   icon: "📑", label: "Estado de Resultados", group: "Datos" },
  ];

  // Agrupar
  const groups = {};
  links.forEach(l => {
    if (!groups[l.group]) groups[l.group] = [];
    groups[l.group].push(l);
  });

  const sidebarHTML = Object.entries(groups).map(([group, items]) => `
    <div class="sidebar-section">
      <span class="sidebar-label">${group}</span>
      ${items.map(l => `
        <a class="sidebar-link ${l.href === activeLink ? 'active' : ''}" href="${l.href}">
          <span class="icon">${l.icon}</span> ${l.label}
        </a>
      `).join('')}
    </div>
  `).join('');

  document.getElementById('sidebar').innerHTML = sidebarHTML;

  // Boton menu mobile
  const btnMenu = document.getElementById('btn-menu');
  const sidebar  = document.getElementById('sidebar');
  if (window.innerWidth <= 768) {
    btnMenu.style.display = 'block';
    btnMenu.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

function pesos(n) {
  if (n == null || n === '') return '—';
  return '$' + Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fechaCorta(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('T')[0].split('-');
  return `${d}/${m}/${y}`;
}

function badgeEstado(estado) {
  const map = {
    'Pagado':       'badge-green',
    'Pendiente':    'badge-red',
    'Pago parcial': 'badge-orange',
  };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado || '—'}</span>`;
}

function showAlert(msg, type = 'error') {
  let el = document.getElementById('alert-box');
  if (!el) {
    el = document.createElement('div');
    el.id = 'alert-box';
    document.querySelector('.admin-main').prepend(el);
  }
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  if (type === 'success') setTimeout(() => el.style.display = 'none', 3500);
}
