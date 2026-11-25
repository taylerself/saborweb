const prefixo = 'saborweb:' + new URL(self.registration.scope).pathname + ':';
const versao = prefixo + 'v2';
const icones = ['fundo', 'marca', 'avatar', 'busca', 'notificacoes', 'sair', 'inicio',
  'listas', 'publicar', 'comunidade', 'perfil', 'apagar', 'editar'];
const arquivos = ['index.html', 'css/style.css', 'fontes/dm-sans.woff2', 'fontes/playfair-display.woff2',
  'js/app.js', 'js/armazenamento.js', 'js/receitas.js', ...icones.map(i => 'imagens/' + i + '.svg')];

async function instalar() {
  const cache = await caches.open(versao);
  await cache.addAll(arquivos.map(url => new Request(url, { cache: 'reload' })));
  await self.skipWaiting();
}
async function ativar() {
  for (const chave of await caches.keys()) {
    if (chave.startsWith(prefixo) && chave !== versao) await caches.delete(chave);
  }
  await self.clients.claim();
}
async function responder(pedido) {
  const cache = await caches.open(versao);
  if (pedido.mode === 'navigate') {
    try { return await fetch(pedido); }
    catch { return cache.match('index.html'); }
  }
  return await cache.match(pedido) || fetch(pedido);
}
self.addEventListener('install', e => e.waitUntil(instalar()));
self.addEventListener('activate', e => e.waitUntil(ativar()));
self.addEventListener('fetch', e => {
  if (e.request.method === 'GET' && e.request.url.startsWith(self.registration.scope))
    e.respondWith(responder(e.request));
});
