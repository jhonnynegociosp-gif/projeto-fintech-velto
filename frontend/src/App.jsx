import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('usuarios');
  const [mensagem, setMensagem] = useState('');

  // Estados dos Dados
  const [usuarios, setUsuarios] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);

  // Form Usuários
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [cpfUsuario, setCpfUsuario] = useState('');

  // Form Despesas
  const [descricaoDespesa, setDescricaoDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [usuarioIdDespesa, setUsuarioIdDespesa] = useState('');

  // Form Investimentos
  const [tipoInvestimento, setTipoInvestimento] = useState('');
  const [valorInvestimento, setValorInvestimento] = useState('');
  const [usuarioIdInvestimento, setUsuarioIdInvestimento] = useState('');

  useEffect(() => {
    carregarUsuarios();
    carregarDespesas();
    carregarInvestimentos();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/usuarios`);
      setUsuarios(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  };

  const carregarDespesas = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/despesas`);
      setDespesas(res.data);
    } catch (err) {
      console.error("Erro ao carregar despesas:", err);
    }
  };

  const carregarInvestimentos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/investimentos`);
      setInvestimentos(res.data);
    } catch (err) {
      console.error("Erro ao carregar investimentos:", err);
    }
  };

  // --- HANDLERS: USUÁRIOS ---
  const handleCadastrarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/usuarios`, {
        nome: nomeUsuario,
        email: emailUsuario,
        cpf: cpfUsuario
      });
      setMensagem('Usuário cadastrado com sucesso!');
      setNomeUsuario(''); setEmailUsuario(''); setCpfUsuario('');
      carregarUsuarios();
    } catch (err) {
      setMensagem('Erro ao cadastrar usuário.');
    }
  };

  const handleDeletarUsuario = async (id) => {
    if (!window.confirm(`Deseja realmente excluir o usuário ID ${id}?`)) return;
    try {
      await axios.delete(`${BASE_URL}/usuarios/${id}`);
      setMensagem('Usuário removido!');
      carregarUsuarios();
    } catch (err) {
      setMensagem('Erro ao deletar usuário.');
    }
  };

  // --- HANDLERS: DESPESAS ---
  const handleCadastrarDespesa = async (e) => {
    e.preventDefault();
    try {
      const valorLimpo = valorDespesa.toString().trim().replace(/\./g, '').replace(',', '.');
      const valorTratado = Number(valorLimpo);

      if (isNaN(valorTratado)) {
        setMensagem('Erro: Digite um valor numérico válido.');
        return;
      }

      await axios.post(`${BASE_URL}/despesas`, {
        descricao: descricaoDespesa,
        valor: valorTratado,
        data: new Date().toISOString().split('T')[0],
        usuario: { id: parseInt(usuarioIdDespesa) }
      });

      setMensagem('Despesa cadastrada com sucesso!');
      setDescricaoDespesa(''); setValorDespesa(''); setUsuarioIdDespesa('');
      carregarDespesas();
    } catch (err) {
      setMensagem('Erro ao cadastrar despesa.');
    }
  };

  const handleDeletarDespesa = async (id) => {
    if (!window.confirm(`Deseja realmente excluir a despesa ID ${id}?`)) return;
    try {
      await axios.delete(`${BASE_URL}/despesas/${id}`);
      setMensagem('Despesa removida!');
      carregarDespesas();
    } catch (err) {
      setMensagem('Erro ao deletar despesa.');
    }
  };

  // --- HANDLERS: INVESTIMENTOS ---
  const handleCadastrarInvestimento = async (e) => {
    e.preventDefault();
    try {
      const valorLimpo = valorInvestimento.toString().trim().replace(/\./g, '').replace(',', '.');
      const valorTratado = Number(valorLimpo);

      if (isNaN(valorTratado)) {
        setMensagem('Erro: Digite um valor numérico válido.');
        return;
      }

      await axios.post(`${BASE_URL}/investimentos`, {
        tipo: tipoInvestimento,
        valorAplicado: valorTratado,
        dataAplicacao: new Date().toISOString().split('T')[0],
        usuario: { id: parseInt(usuarioIdInvestimento) }
      });

      setMensagem('Investimento cadastrado com sucesso!');
      setTipoInvestimento(''); setValorInvestimento(''); setUsuarioIdInvestimento('');
      carregarInvestimentos();
    } catch (err) {
      setMensagem('Erro ao cadastrar investimento.');
    }
  };

  const handleDeletarInvestimento = async (id) => {
    if (!window.confirm(`Deseja realmente excluir o investimento ID ${id}?`)) return;
    try {
      await axios.delete(`${BASE_URL}/investimentos/${id}`);
      setMensagem('Investimento removido!');
      carregarInvestimentos();
    } catch (err) {
      setMensagem('Erro ao deletar investimento.');
    }
  };

  // Cálculos do Dashboard
  const totalDespesas = despesas.reduce((acc, item) => acc + (item.valor || 0), 0);
  const totalInvestimentos = investimentos.reduce((acc, item) => acc + (item.valorAplicado || item.valor || 0), 0);

  // Formatação BRL (R$)
  const formatarMoeda = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Estilos inline
  const btnAbaStyle = (aba) => ({
    padding: '10px 20px',
    marginRight: '5px',
    backgroundColor: abaAtiva === aba ? '#007bff' : '#e0e0e0',
    color: abaAtiva === aba ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto 20px auto', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' };
  const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
  const cardStyle = { padding: '12px', border: '1px solid #eee', borderRadius: '6px', marginBottom: '8px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
  const btnExcluirStyle = { padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  return (
      <div style={{ maxWidth: '700px', margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center' }}>Projeto Velto - FIAP</h2>

        {/* DASHBOARD DE RESUMO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '6px', textAlign: 'center' }}>
            <small>Total em Despesas</small>
            <h3 style={{ margin: '5px 0 0 0' }}>{formatarMoeda(totalDespesas)}</h3>
          </div>
          <div style={{ flex: 1, padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', textAlign: 'center' }}>
            <small>Total em Investimentos</small>
            <h3 style={{ margin: '5px 0 0 0' }}>{formatarMoeda(totalInvestimentos)}</h3>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ABAS */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button style={btnAbaStyle('usuarios')} onClick={() => setAbaAtiva('usuarios')}>Usuários</button>
          <button style={btnAbaStyle('despesas')} onClick={() => setAbaAtiva('despesas')}>Despesas</button>
          <button style={btnAbaStyle('investimentos')} onClick={() => setAbaAtiva('investimentos')}>Investimentos</button>
        </div>

        {mensagem && (
            <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: '#e2e3e5', color: '#383d41', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
              {mensagem}
            </div>
        )}

        {/* ABA: USUÁRIOS */}
        {abaAtiva === 'usuarios' && (
            <div>
              <form onSubmit={handleCadastrarUsuario} style={formStyle}>
                <h3>Cadastrar Usuário</h3>
                <input type="text" placeholder="Nome Completo" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} required style={inputStyle} />
                <input type="email" placeholder="E-mail" value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="CPF" value={cpfUsuario} onChange={(e) => setCpfUsuario(e.target.value)} required style={inputStyle} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Usuário</button>
              </form>

              <h3>Usuários Cadastrados</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {usuarios.map((u) => (
                    <li key={u.id} style={cardStyle}>
                      <div>
                        <strong>ID {u.id}:</strong> {u.nome} <br />
                        <small style={{ color: '#555' }}>Email: {u.email} | CPF: {u.cpf}</small>
                      </div>
                      <button onClick={() => handleDeletarUsuario(u.id)} style={btnExcluirStyle}>Excluir</button>
                    </li>
                ))}
              </ul>
            </div>
        )}

        {/* ABA: DESPESAS */}
        {abaAtiva === 'despesas' && (
            <div>
              <form onSubmit={handleCadastrarDespesa} style={formStyle}>
                <h3>Cadastrar Despesa</h3>
                <input type="text" placeholder="Descrição (ex: Assinatura Netflix, Mercado)" value={descricaoDespesa} onChange={(e) => setDescricaoDespesa(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Valor (ex: 100,00 ou 1.000,00)" value={valorDespesa} onChange={(e) => setValorDespesa(e.target.value)} required style={inputStyle} />
                <select value={usuarioIdDespesa} onChange={(e) => setUsuarioIdDespesa(e.target.value)} required style={inputStyle}>
                  <option value="">Selecione o Usuário Responsável</option>
                  {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>ID {u.id} - {u.nome}</option>
                  ))}
                </select>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Despesa</button>
              </form>

              <h3>Despesas Cadastradas</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {despesas.map((d) => (
                    <li key={d.id} style={cardStyle}>
                      <div>
                        <strong>ID {d.id}:</strong> {d.descricao} - <span style={{ color: '#dc3545', fontWeight: 'bold' }}>{formatarMoeda(d.valor)}</span> <br />
                        <small style={{ color: '#555' }}>
                          Usuário: {d.usuario?.nome || 'Não informado'} | Data: {d.data}
                        </small>
                      </div>
                      <button onClick={() => handleDeletarDespesa(d.id)} style={btnExcluirStyle}>Excluir</button>
                    </li>
                ))}
              </ul>
            </div>
        )}

        {/* ABA: INVESTIMENTOS */}
        {abaAtiva === 'investimentos' && (
            <div>
              <form onSubmit={handleCadastrarInvestimento} style={formStyle}>
                <h3>Cadastrar Investimento</h3>
                <input type="text" placeholder="Tipo (ex: Tesouro Direto, CDB)" value={tipoInvestimento} onChange={(e) => setTipoInvestimento(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Valor (ex: 1500,00 ou 1.000.000,00)" value={valorInvestimento} onChange={(e) => setValorInvestimento(e.target.value)} required style={inputStyle} />
                <select value={usuarioIdInvestimento} onChange={(e) => setUsuarioIdInvestimento(e.target.value)} required style={inputStyle}>
                  <option value="">Selecione o Usuário Investidor</option>
                  {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>ID {u.id} - {u.nome}</option>
                  ))}
                </select>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Investimento</button>
              </form>

              <h3>Investimentos Cadastrados</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {investimentos.map((inv) => (
                    <li key={inv.id} style={cardStyle}>
                      <div>
                        <strong>ID {inv.id}:</strong> {inv.tipo} - <span style={{ color: '#28a745', fontWeight: 'bold' }}>{formatarMoeda(inv.valorAplicado || inv.valor)}</span> <br />
                        <small style={{ color: '#555' }}>
                          Investidor: {inv.usuario?.nome || 'Não informado'}
                        </small>
                      </div>
                      <button onClick={() => handleDeletarInvestimento(inv.id)} style={btnExcluirStyle}>Excluir</button>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
}

export default App;