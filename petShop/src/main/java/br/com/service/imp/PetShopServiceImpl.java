package br.com.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.RacaCachorro;
import br.com.entidade.RacaGato;
import br.com.repository.RacaCachorroRepository;
import br.com.repository.RacaGatoRepository;
import br.com.service.PetShopService;

@Service
public class PetShopServiceImpl implements PetShopService {
	
	@Autowired
	private RacaCachorroRepository racaCachorroRepository;
	
	@Autowired
	private RacaGatoRepository racaGatoRepository;
	
	@Override
	public List<RacaCachorro> findAllRacasCachorro() {
		return (List<RacaCachorro>) racaCachorroRepository.findAll();
	}

	@Override
	public List<RacaGato> findAllRacasGato() {
		return (List<RacaGato>) racaGatoRepository.findAll();
	}

}
