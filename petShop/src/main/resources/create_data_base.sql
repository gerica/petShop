CREATE TABLE public.tb_papel (
                id_papel INTEGER NOT NULL,
                ds_papel VARCHAR(255) NOT NULL,
                CONSTRAINT tb_papel_pkey PRIMARY KEY (id_papel)
);
COMMENT ON TABLE public.tb_papel IS 'Tabela responsável pelos papeis.';


CREATE TABLE public.tb_tipo_usuario (
                id_tipo_usuario INTEGER NOT NULL,
                ds_tipo_usuario VARCHAR(255) NOT NULL,
                id_tipo_usuario_pai INTEGER,
                CONSTRAINT tb_tipo_usuario_pkey PRIMARY KEY (id_tipo_usuario)
);
COMMENT ON TABLE public.tb_tipo_usuario IS 'Tabela responsável pelos tipos de usuários. Exemplo, administrador, operador, consultor.';


CREATE TABLE public.tb_tipo_usuario_papel (
                id_tipo_usuario_papel INTEGER NOT NULL,
                id_tipo_usuario INTEGER NOT NULL,
                id_papel INTEGER NOT NULL,
                CONSTRAINT tb_tipo_usuario_papel_pkey PRIMARY KEY (id_tipo_usuario_papel)
);
COMMENT ON TABLE public.tb_tipo_usuario_papel IS 'Tabela de relacionamento entre tb_tipo_usuario e tb_papel';


CREATE TABLE public.tb_usuario (
                id_usuario INTEGER NOT NULL,
                ds_nome VARCHAR(255) NOT NULL,
                ds_login VARCHAR(255) NOT NULL,
                ds_senha VARCHAR(255) NOT NULL,
                ds_email VARCHAR(255) NOT NULL,
                id_tipo_usuario INTEGER NOT NULL,
                CONSTRAINT tb_usuario_pkey PRIMARY KEY (id_usuario)
);
COMMENT ON TABLE public.tb_usuario IS 'Tabela responsável pelos usuários do sistema.';


CREATE TABLE public.tb_tipo_pet (
                id_tipo_pet INTEGER NOT NULL,
                ds_nome VARCHAR(255) NOT NULL,
                CONSTRAINT tb_tipo_pet_pkey PRIMARY KEY (id_tipo_pet)
);
COMMENT ON TABLE public.tb_tipo_pet IS 'tabela responsável por armazenar os tipos de pet.';


CREATE TABLE public.tb_raca (
                id_raca INTEGER NOT NULL,
                id_tipo_pet INTEGER NOT NULL,
                ds_nome VARCHAR(255) NOT NULL,
                CONSTRAINT tb_raca_pkey PRIMARY KEY (id_raca)
);
COMMENT ON TABLE public.tb_raca IS 'Tabela responsável pelas raças.';


CREATE TABLE public.tb_cliente (
                id_cliente INTEGER NOT NULL,
                dt_nacimento TIMESTAMP,
                ds_email VARCHAR(255),
                ds_nome VARCHAR(255),
                ds_sobre_nome VARCHAR(255),
                id_usuario INTEGER NOT NULL,
                CONSTRAINT tb_cliente_pkey PRIMARY KEY (id_cliente)
);


CREATE TABLE public.tb_pet (
                id INTEGER NOT NULL,
                id_tipo_pet INTEGER NOT NULL,
                ds_nome VARCHAR(255) NOT NULL,
                id_cliente INTEGER NOT NULL,
                dt_nacimento DATE NOT NULL,
                id_raca INTEGER NOT NULL,
                id_usuario INTEGER NOT NULL,
                CONSTRAINT tb_pet_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE public.tb_pet IS 'tabela responsável pelos pets. Cachorro, gato, etc.';
COMMENT ON COLUMN public.tb_pet.id_tipo_pet IS 'tipo de pet.';


ALTER TABLE public.tb_tipo_usuario_papel ADD CONSTRAINT tb_papel_tb_tipo_usuario_papel_fk
FOREIGN KEY (id_papel)
REFERENCES public.tb_papel (id_papel)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_tipo_usuario ADD CONSTRAINT tb_tipo_usuario_tb_tipo_usuario_fk
FOREIGN KEY (id_tipo_usuario_pai)
REFERENCES public.tb_tipo_usuario (id_tipo_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_usuario ADD CONSTRAINT tb_tipo_usuario_tb_usuario_fk
FOREIGN KEY (id_tipo_usuario)
REFERENCES public.tb_tipo_usuario (id_tipo_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_tipo_usuario_papel ADD CONSTRAINT tb_tipo_usuario_tb_tipo_usuario_papel_fk
FOREIGN KEY (id_tipo_usuario)
REFERENCES public.tb_tipo_usuario (id_tipo_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_cliente ADD CONSTRAINT tb_usuario_tb_cliente_fk
FOREIGN KEY (id_usuario)
REFERENCES public.tb_usuario (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_pet ADD CONSTRAINT tb_usuario_tb_pet_fk
FOREIGN KEY (id_usuario)
REFERENCES public.tb_usuario (id_usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_pet ADD CONSTRAINT tb_tipo_pet_tb_pet_fk
FOREIGN KEY (id_tipo_pet)
REFERENCES public.tb_tipo_pet (id_tipo_pet)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_raca ADD CONSTRAINT tb_tipo_pet_tb_raca_fk
FOREIGN KEY (id_tipo_pet)
REFERENCES public.tb_tipo_pet (id_tipo_pet)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_pet ADD CONSTRAINT tb_raca_tb_pet_fk
FOREIGN KEY (id_raca)
REFERENCES public.tb_raca (id_raca)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tb_pet ADD CONSTRAINT tb_cliente_tb_pet_fk
FOREIGN KEY (id_cliente)
REFERENCES public.tb_cliente (id_cliente)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

-- Sequence: hibernate_sequence

-- DROP SEQUENCE hibernate_sequence;

CREATE SEQUENCE hibernate_sequence
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1050
  CACHE 1;
ALTER TABLE hibernate_sequence
  OWNER TO postgres;
