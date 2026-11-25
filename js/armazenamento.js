const KEY = "saborweb:dados:v1",
  SESSION = "saborweb:sessao:v1";
const initial = {
  versao: 1,
  perfil: {
    id: "cozinheiro",
    usuario: "@MestrecucaA",
    nascimento: "",
    senha: null,
  },
  listas: [],
  receitas: [],
  lembretes: [],
};
const text = (v) => typeof v === "string";
const rows = (a) =>
  Array.isArray(a) &&
  a.every((r) => r && text(r.id)) &&
  new Set(a.map((r) => r.id)).size === a.length;
function valid(d) {
  const p = d?.perfil;
  return (
    d?.versao === 1 &&
    p &&
    text(p.id) &&
    text(p.usuario) &&
    text(p.nascimento) &&
    (p.senha === null ||
      (p.senha &&
        /^[a-f0-9]{32}$/.test(p.senha.salt) &&
        /^[a-f0-9]{64}$/.test(p.senha.hash))) &&
    rows(d.listas) &&
    d.listas.every((l) => text(l.nome)) &&
    rows(d.receitas) &&
    d.receitas.every(
      (r) =>
        d.listas.some((l) => l.id === r.listaId) &&
        text(r.titulo) &&
        text(r.mise) &&
        Array.isArray(r.ingredientes) &&
        r.ingredientes.length &&
        r.ingredientes.every(
          (i) =>
            i &&
            text(i.nome) &&
            text(i.quantidade) &&
            text(i.unidade) &&
            typeof i.aGosto === "boolean"
        ) &&
        Array.isArray(r.etapas) &&
        r.etapas.length &&
        r.etapas.every(text)
    ) &&
    rows(d.lembretes) &&
    d.lembretes.every(
      (n) => text(n.texto) && text(n.criado) && typeof n.concluido === "boolean"
    )
  );
}
function write(d) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    throw Error(
      "Não foi possível gravar. Confira o espaço livre e as permissões do navegador."
    );
  }
}
export function read() {
  let raw;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    throw Error("O navegador bloqueou o armazenamento local.");
  }
  if (raw === null) {
    const data = structuredClone(initial);
    write(data);
    return data;
  }
  try {
    const data = JSON.parse(raw);
    if (valid(data)) return data;
  } catch {}
  throw Error(
    "Os dados locais estão ilegíveis. O conteúdo original foi preservado."
  );
}
export function session() {
  return sessionStorage.getItem(SESSION);
}
export function enter(id) {
  if (id) sessionStorage.setItem(SESSION, id);
  else sessionStorage.removeItem(SESSION);
}
export async function save(change) {
  async function commit() {
    const d = read();
    if (session() !== d.perfil.id) throw Error("Entre novamente para salvar.");
    const before = JSON.stringify(d);
    await change(d);
    if (!valid(d)) throw Error("Confira os dados antes de salvar.");
    if (JSON.stringify(read()) !== before)
      throw Error("Os dados mudaram em outra aba. Confira e tente novamente.");
    write(d);
  }
  if (navigator.locks) await navigator.locks.request(KEY, commit);
  else await commit();
}
const hex = (bytes) =>
  Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
async function derive(password, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  return hex(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: 210000,
        salt: Uint8Array.from(salt.match(/../g), (s) => parseInt(s, 16)),
      },
      material,
      256
    )
  );
}
export async function verifier(password) {
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  return { salt, hash: await derive(password, salt) };
}
export async function matches(password, profile) {
  return profile.senha === null
    ? password === "Bomdeprato01"
    : (await derive(password, profile.senha.salt)) === profile.senha.hash;
}
