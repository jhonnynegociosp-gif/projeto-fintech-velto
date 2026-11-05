package br.com.fiap.velto.service;

import br.com.fiap.velto.model.Investimento;
import br.com.fiap.velto.repository.InvestimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository repository;

    public List<Investimento> listarTodos() {
        return repository.findAll();
    }

    public Optional<Investimento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Investimento salvar(Investimento investimento) {
        return repository.save(investimento);
    }

    public Investimento atualizar(Long id, Investimento investimentoAtualizado) {
        return repository.findById(id).map(investimento -> {
            investimento.setTipo(investimentoAtualizado.getTipo());
            investimento.setValorAplicado(investimentoAtualizado.getValorAplicado());
            investimento.setDataAplicacao(investimentoAtualizado.getDataAplicacao());
            return repository.save(investimento);
        }).orElseThrow(() -> new RuntimeException("Investimento não encontrado com o ID: " + id));
    }

    public void deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Investimento não encontrado para exclusão.");
        }
    }
}