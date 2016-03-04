package br.com.service;

import java.util.List;

import br.com.entidade.Gato;

public interface GatoService {
	
	void incluir(Gato gato);

	List<Gato> findAll();

}
