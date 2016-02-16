package br.com.service;

import java.util.List;

import br.com.entidade.Cachorro;

public interface CachorroService {
	
	void incluir(Cachorro cachorro);

	List<Cachorro> findAll();

}
