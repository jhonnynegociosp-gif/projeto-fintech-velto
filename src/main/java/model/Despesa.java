package br.com.fiap.velto.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "T_VELTO_DESPESA")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_despesa")
    @SequenceGenerator(name = "seq_despesa", sequenceName = "SQ_VELTO_DESPESA", allocationSize = 1)
    @Column(name = "id_despesa")
    private Long id;

    @Column(name = "ds_despesa", nullable = false, length = 150)
    private String descricao;

    @Column(name = "vl_despesa", nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "dt_despesa", nullable = false)
    private LocalDate data;

    // --- ADICIONAR ESTE TRECHO ---
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;
}