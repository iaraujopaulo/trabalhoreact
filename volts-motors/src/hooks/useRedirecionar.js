// Hook que vai para outra rota depois de alguns milissegundos (dá tempo de ler a mensagem de sucesso)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirecionar() {
  const navigate = useNavigate();
  // Para qual rota ir (null = nenhum redirecionamento pedido)
  const [destino, setDestino] = useState(null);

  // Quando um destino é definido, espera 1,5 s e redireciona (replace: o botão voltar não fica preso)
  useEffect(() => {
    if (!destino) return;
    const timer = setTimeout(() => navigate(destino, { replace: true }), 1500);
    // Cancela o timer se a página for fechada antes do redirecionamento
    return () => clearTimeout(timer);
  }, [destino, navigate]);

  // Uso: redirecionar("/login")
  return (rota) => setDestino(rota);
}
