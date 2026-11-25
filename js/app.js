import {
  read,
  save,
  session,
  enter,
  matches,
  verifier,
} from "./armazenamento.js";
import { abrirEditor, mostrarReceita } from "./receitas.js";

const $ = (seletor) => document.querySelector(seletor);
const ir = (caminho) => {
  location.hash = "/" + caminho;
};
const clonar = (id) => $("#" + id).content.firstElementChild.cloneNode(true);
const daLista = (dados, id) => dados.receitas.filter((r) => r.listaId === id);
function obter(itens, id) {
  const item = itens.find((i) => i.id === id);
  if (!item) throw Error("Este item foi excluído. Volte à coleção de listas.");
  return item;
}
function tela(id, titulo) {
  $("#main").replaceChildren($("#" + id).content.cloneNode(true));
  if (titulo) $("main h1").textContent = titulo;
  document.title = $("main h1").textContent + " · SaborWeb";
  $("#main").focus();
}
function erro(e) {
  ($("dialog").open ? $("#detail") : $("#problem")).textContent = e.message;
}
function invalido(campo, mensagem) {
  campo.setCustomValidity(mensagem);
  campo.reportValidity();
}
document.addEventListener("input", (e) => {
  for (const campo of e.target.form?.elements ?? [])
    campo.setCustomValidity?.("");
  $("#problem").textContent = "";
});
// A validação de texto é compartilhada por todos os formulários.
document.addEventListener(
  "submit",
  (e) => {
    for (const campo of e.target.querySelectorAll(
      "input:not([type]), textarea",
    ))
      campo.value = campo.value.trim();
    if (!e.target.reportValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  true,
);

let gravando = false,
  temporizador;
async function gravar(alterar, mensagem, depois = atualizar) {
  if (gravando) return;
  gravando = true;
  try {
    await save(alterar);
    depois();
    $("#notice").textContent = mensagem;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      $("#notice").textContent = "";
    }, 3000);
    return true;
  } catch (e) {
    erro(e);
    return false;
  } finally {
    gravando = false;
  }
}
function cartao(titulo, caminho, icone, acao, clicar) {
  const box = clonar("card");
  const link = box.querySelector("a"),
    botao = box.querySelector("button");
  link.href = "#/" + caminho;
  link.textContent = titulo;
  box.querySelector("img").src = "imagens/" + icone + ".svg";
  botao.setAttribute("aria-label", acao + " " + titulo);
  botao.onclick = clicar;
  $("#cards").append(box);
}
function dialogo(lista, total = 0) {
  const d = $("dialog"),
    f = $("#listForm"),
    nome = f.elements.name;
  f.reset();
  nome.setCustomValidity("");
  nome.disabled = nome.parentElement.hidden = Boolean(lista);
  d.querySelector("h2").textContent = lista
    ? "Excluir lista"
    : "Criar nova lista";
  $("#detail").textContent = lista
    ? "Excluir “" + lista.nome + "” e todas as suas receitas (" + total + ")?"
    : "";
  $("#confirmList").textContent = lista ? "Excluir" : "Criar lista";
  $("#cancel").onclick = () => d.close();
  f.onsubmit = (e) => {
    e.preventDefault();
    gravar(
      (dados) => {
        if (lista) {
          obter(dados.listas, lista.id);
          if (daLista(dados, lista.id).length !== total)
            throw Error("A lista mudou. Cancele e confira o total.");
          dados.listas = dados.listas.filter((l) => l.id !== lista.id);
          dados.receitas = dados.receitas.filter((r) => r.listaId !== lista.id);
        } else {
          if (
            dados.listas.some(
              (l) => l.nome.toLowerCase() === nome.value.toLowerCase(),
            )
          ) {
            invalido(nome, "Já existe uma lista com esse nome.");
            throw Error("Escolha outro nome para a lista.");
          }
          dados.listas.push({ id: crypto.randomUUID(), nome: nome.value });
        }
      },
      lista ? "Lista excluída." : "Lista criada.",
      () => {
        d.close();
        atualizar();
        $("#createList").focus();
      },
    );
  };
  d.showModal();
  (lista ? $("#cancel") : nome).focus();
}
function colecao(dados, lid, rid, acao) {
  if (!lid) {
    tela("listas");
    $("#createList").onclick = () => dialogo();
    for (const l of dados.listas)
      cartao(l.nome, "listas/" + l.id, "apagar", "Excluir lista", () =>
        dialogo(l, daLista(dados, l.id).length),
      );
    return;
  }
  const lista = dados.listas.find((l) => l.id === lid),
    caminho = "listas/" + lid;
  if (!lista) return ir("listas");
  const receitas = daLista(dados, lid);
  if (!rid) {
    tela("lista", lista.nome);
    $("#newRecipe").onclick = () => ir(caminho + "/nova");
    for (const r of receitas)
      cartao(r.titulo, caminho + "/" + r.id, "editar", "Editar", () =>
        ir(caminho + "/" + r.id + "/editar"),
      );
    return;
  }
  const receita = receitas.find((r) => r.id === rid),
    leitura = caminho + "/" + rid;
  if (!receita && rid !== "nova") return ir(caminho);
  if (rid === "nova" || ["editar", "editar-leitura"].includes(acao)) {
    tela("editor", receita ? "Editar receita" : "Cadastrar receita");
    $(".back").href = "#/" + (acao === "editar-leitura" ? leitura : caminho);
    abrirEditor($("#recipeForm"), receita, (campos) => {
      const id = receita?.id ?? crypto.randomUUID();
      gravar(
        (d) => {
          obter(d.listas, lid);
          if (receita) Object.assign(obter(d.receitas, id), campos);
          else d.receitas.push({ id, listaId: lid, ...campos });
        },
        "Receita salva.",
        () => ir(caminho + "/" + id),
      );
    });
    return;
  }
  tela("receita", receita.titulo);
  $(".back").href = "#/" + caminho;
  $(".back").textContent = "← " + lista.nome;
  $("#edit").onclick = () => ir(leitura + "/editar-leitura");
  mostrarReceita(receita);
}
function inicio(dados) {
  if (!dados.lembretes.length)
    $("#notes").textContent = "Nenhum lembrete cadastrado";
  for (const n of dados.lembretes) {
    const row = clonar("note"),
      check = row.querySelector("input");
    row.querySelector("span").textContent = n.texto;
    check.checked = n.concluido;
    check.onchange = async () => {
      const concluido = check.checked;
      const salvo = await gravar((d) => {
        obter(d.lembretes, n.id).concluido = concluido;
      }, "Lembrete atualizado.");
      if (!salvo) check.checked = n.concluido;
    };
    row.querySelector("button").onclick = () =>
      gravar((d) => {
        d.lembretes = d.lembretes.filter((item) => item.id !== n.id);
      }, "Lembrete excluído.");
    $("#notes").append(row);
  }
  $("#reminder").onsubmit = (e) => {
    e.preventDefault();
    const texto = e.target.text.value;
    gravar(
      (d) =>
        d.lembretes.unshift({
          id: crypto.randomUUID(),
          texto,
          criado: new Date().toISOString(),
          concluido: false,
        }),
      "Lembrete adicionado.",
    );
  };
}
function perfil(p) {
  const f = $("#profile"),
    hoje = new Date();
  f.user.value = p.usuario;
  f.birth.max = new Date(hoje - hoje.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  f.birth.value = p.nascimento;
  f.onsubmit = (e) => {
    e.preventDefault();
    const usuario = "@" + f.user.value.replace(/^@+/, "").trim();
    if (usuario === "@") return invalido(f.user, "Informe um nome após o @.");
    if (f.next.value && f.next.value !== f.confirm.value)
      return invalido(f.confirm, "As senhas precisam coincidir.");
    gravar(async (d) => {
      if (f.next.value) {
        if (!(await matches(f.current.value, d.perfil))) {
          invalido(f.current, "Senha atual incorreta.");
          throw Error("Confira a senha atual.");
        }
        d.perfil.senha = await verifier(f.next.value);
      }
      Object.assign(d.perfil, { usuario, nascimento: f.birth.value });
    }, "Perfil salvo.");
  };
}
function login() {
  history.replaceState(null, "", "#/login");
  tela("login");
  $("#access").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    try {
      const p = read().perfil;
      if (f.user.value !== p.usuario || !(await matches(f.password.value, p)))
        return invalido(f.password, "Usuário ou senha incorretos.");
      enter(p.id);
      ir("listas");
    } catch (e) {
      erro(e);
    }
  };
}
function atualizar() {
  try {
    const [pagina, lid, rid, acao] = location.hash.slice(2).split("/");
    if (pagina === "sair") enter(null);
    const d = read(),
      entrou = session() === d.perfil.id;
    $("header").hidden = $("nav").hidden = !entrou;
    if (!entrou) return login();
    if (!pagina || pagina === "login") return ir("listas");
    for (const a of $("nav").children) {
      if (a.hash === "#/" + pagina) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    }
    if (pagina === "listas") return colecao(d, lid, rid, acao);
    tela(
      ["inicio", "perfil", "notificacoes"].includes(pagina) ? pagina : "dev",
    );
    if (pagina === "inicio") inicio(d);
    if (pagina === "perfil") perfil(d.perfil);
  } catch (e) {
    erro(e);
  }
}
window.addEventListener("hashchange", atualizar);
atualizar();

const worker = navigator.serviceWorker;
let cacheStatus = "Preparando acesso offline…";
function conexao() {
  $("#net").textContent =
    (navigator.onLine ? "Online" : "Sem conexão") +
    " · " +
    (worker?.controller ? "Disponível offline" : cacheStatus);
}
function semCache() {
  cacheStatus = "Cache offline indisponível";
  conexao();
}
window.addEventListener("online", conexao);
window.addEventListener("offline", conexao);
if (worker) {
  worker.addEventListener("controllerchange", conexao);
  worker
    .register("./service-worker.js")
    .then((reg) => {
      const instalando = reg.installing;
      instalando?.addEventListener("statechange", () => {
        if (instalando.state === "redundant") semCache();
      });
    })
    .catch(semCache);
} else semCache();
conexao();
