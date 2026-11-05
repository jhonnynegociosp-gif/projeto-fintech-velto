package br.com.fiap.velto.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "T_VELTO_INVESTIMENTO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_investimento")
    @SequenceGenerator(name = "seq_investimento", sequenceName = "SQ_VELTO_INVESTIMENTO", allocationSize = 1)
    @Column(name = "id_investimento")
    private Long id;

    // --- CORREÇÃO AQUI: Alterado para ds_tipo_investimento ---
    @Column(name = "ds_tipo_investimento", nullable = false, length = 100)
    private String tipo;

    @Column(name = "vl_aplicado", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorAplicado;

    @Column(name = "dt_aplicacao", nullable = false)
    private LocalDate dataAplicacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;
}
