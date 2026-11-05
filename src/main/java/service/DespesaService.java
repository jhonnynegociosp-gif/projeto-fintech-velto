package br.com.fiap.velto.service;

import br.com.fiap.velto.model.Despesa;
import br.com.fiap.velto.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository repository;

    public List<Despesa> listarTodas() {
        return repository.findAll();
    }

    public Optional<Despesa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Despesa salvar(Despesa despesa) {
        return repository.save(despesa);
    }

    public Despesa atualizar(Long id, Despesa despesaAtualizada) {
        return repository.findById(id).map(despesa -> {
            despesa.setDescricao(despesaAtualizada.getDescricao());
            despesa.setValor(despesaAtualizada.getValor());
            despesa.setData(despesaAtualizada.getData());
            return repository.save(despesa);
        }).orElseThrow(() -> new RuntimeException("Despesa não encontrada com o ID: " + id));
    }

    public void deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Despesa não encontrada para exclusão.");
        }
    }
}