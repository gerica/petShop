-- Sequence: hibernate_sequence

DROP SEQUENCE hibernate_sequence;

CREATE SEQUENCE hibernate_sequence
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1050
  CACHE 1;
ALTER TABLE hibernate_sequence
  OWNER TO postgres;
