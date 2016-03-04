package br.com.service;

import java.util.List;

import br.com.entidade.RacaCachorro;
import br.com.entidade.RacaGato;

public interface PetShopService {
	
	List<RacaCachorro> findAllRacasCachorro();
	
	List<RacaGato> findAllRacasGato();

}
