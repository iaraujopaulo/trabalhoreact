// Formata o telefone enquanto digita: (DD) 99999-9999 
export const mascaraTelefone = (valor) => {
  // Mantém só os números e limita a 11 dígitos (DDD + 9 dígitos)
  const d = valor.replace(/\D/g, "").slice(0, 11);
  // Posição do hífen: depois do 7º dígito se tiver 11 números (celular), senão depois do 6º
  const corte = d.length > 10 ? 7 : 6;
  if (d.length > corte) return `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return d;
};
