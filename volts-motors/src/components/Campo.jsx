// Campo: campo de formulário com rótulo flutuante do Bootstrap (form-floating).
// "id" liga o rótulo ao campo, "rotulo" é o texto que flutua; o restante (type, value, onChange, required...)
// é repassado direto ao <input> pelo "...resto".
export default function Campo({ id, rotulo, ...resto }) {
  return (
    <div className="form-floating mb-3">
      {/* O placeholder precisa existir para o rótulo flutuante funcionar */}
      <input id={id} className="form-control bg-transparent text-white" placeholder={rotulo} {...resto} />
      <label htmlFor={id} className="text-white-50">{rotulo}</label>
    </div>
  );
}
