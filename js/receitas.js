// O mesmo formulário atende o cadastro e a edição.
export function abrirEditor(form, receita, salvar) {
  form.elements.title.value = receita?.titulo ?? "";
  form.mise.value = receita?.mise ?? "";
  const ingredientes = form.querySelector("#ingredients");
  const etapas = form.querySelector("#steps");

  function linha(modelo, grupo, botao, dados = {}) {
    const row = document
      .getElementById(modelo)
      .content.firstElementChild.cloneNode(true);
    const primeiro = row.querySelector("input, textarea");
    for (const campo of row.querySelectorAll("[name]")) {
      if (campo.type === "checkbox") campo.checked = dados[campo.name] ?? false;
      else campo.value = dados[campo.name] ?? "";
    }
    const gosto = row.querySelector("[name=aGosto]");
    if (gosto) {
      gosto.onchange = () => {
        for (const nome of ["quantidade", "unidade"])
          row.querySelector("[name=" + nome + "]").disabled = gosto.checked;
      };
      gosto.onchange();
    }
    row.querySelector("button").onclick = () => {
      row.remove();
      if (!grupo.children.length) botao.click();
      else botao.focus();
    };
    grupo.append(row);
    return primeiro;
  }

  function preparar(modelo, grupo, seletor, dados) {
    const botao = form.querySelector(seletor);
    botao.onclick = () => linha(modelo, grupo, botao).focus();
    for (const item of dados) linha(modelo, grupo, botao, item);
  }
  preparar(
    "ingredient",
    ingredientes,
    "#addIng",
    receita?.ingredientes ?? [{}]
  );
  preparar(
    "step",
    etapas,
    "#addStep",
    receita?.etapas.map((etapa) => ({ etapa })) ?? [{}]
  );

  form.onsubmit = (evento) => {
    evento.preventDefault();
    const lerIngrediente = (row) => {
      const [nome, quantidade, unidade, gosto] = row.querySelectorAll("input");
      return {
        nome: nome.value,
        quantidade: gosto.checked ? "" : quantidade.value,
        unidade: gosto.checked ? "" : unidade.value,
        aGosto: gosto.checked,
      };
    };
    salvar({
      titulo: form.elements.title.value,
      mise: form.mise.value.trim(),
      ingredientes: Array.from(ingredientes.children, lerIngrediente),
      etapas: Array.from(
        etapas.querySelectorAll("textarea"),
        (campo) => campo.value
      ),
    });
  };
}

export function mostrarReceita(receita) {
  function preencher(seletor, itens) {
    const lista = document.querySelector(seletor);
    for (const texto of itens) {
      const li = document.createElement("li");
      li.textContent = texto;
      lista.append(li);
    }
  }
  preencher(
    "article ul",
    receita.ingredientes.map(
      (i) =>
        i.nome + " — " + (i.aGosto ? "a gosto" : i.quantidade + " " + i.unidade)
    )
  );
  preencher("article ol", receita.etapas);
  document.querySelector("#mise").hidden = !receita.mise;
  document.querySelector("#mise p").textContent = receita.mise;
}
