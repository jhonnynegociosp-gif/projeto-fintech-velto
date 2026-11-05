-- ==========================================
-- SCRIPT DDL - PROJETO VELTO (FIAP)
-- Schema: RM571760
-- ==========================================

-- 1. DROP DE TABELAS E SEQUENCES (Caso precise recriar)
DROP TABLE T_VELTO_INVESTIMENTO CASCADE CONSTRAINTS;
DROP TABLE T_VELTO_DESPESA CASCADE CONSTRAINTS;
DROP TABLE T_VELTO_USUARIO CASCADE CONSTRAINTS;

DROP SEQUENCE SQ_VELTO_USUARIO;
DROP SEQUENCE SQ_VELTO_DESPESA;
DROP SEQUENCE SQ_VELTO_INVESTIMENTO;

-- 2. CRIAÇÃO DE SEQUENCES
CREATE SEQUENCE SQ_VELTO_USUARIO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE SQ_VELTO_DESPESA START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE SQ_VELTO_INVESTIMENTO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- 3. TABELA USUARIO
CREATE TABLE T_VELTO_USUARIO (
                                 id_usuario NUMBER(19) NOT NULL,
                                 nm_usuario VARCHAR2(255) NOT NULL,
                                 ds_email VARCHAR2(255) NOT NULL,
                                 nr_cpf VARCHAR2(14) NOT NULL,
                                 CONSTRAINT PK_VELTO_USUARIO PRIMARY KEY (id_usuario)
);

-- 4. TABELA DESPESA
CREATE TABLE T_VELTO_DESPESA (
                                 id_despesa NUMBER(19) NOT NULL,
                                 ds_despesa VARCHAR2(255) NOT NULL,
                                 vl_despesa NUMBER(10,2) NOT NULL,
                                 dt_despesa DATE NOT NULL,
                                 id_usuario NUMBER(19) NOT NULL,
                                 CONSTRAINT PK_VELTO_DESPESA PRIMARY KEY (id_despesa),
                                 CONSTRAINT FK_VELTO_DESPESA_USUARIO FOREIGN KEY (id_usuario)
                                     REFERENCES T_VELTO_USUARIO (id_usuario)
);

-- 5. TABELA INVESTIMENTO
CREATE TABLE T_VELTO_INVESTIMENTO (
                                      id_investimento NUMBER(19) NOT NULL,
                                      ds_tipo_investimento VARCHAR2(100) NOT NULL,
                                      vl_aplicado NUMBER(10,2) NOT NULL,
                                      dt_aplicacao DATE NOT NULL,
                                      id_usuario NUMBER(19) NOT NULL,
                                      CONSTRAINT PK_VELTO_INVESTIMENTO PRIMARY KEY (id_investimento),
                                      CONSTRAINT FK_VELTO_INVEST_USUARIO FOREIGN KEY (id_usuario)
                                          REFERENCES T_VELTO_USUARIO (id_usuario)
);

COMMIT;
