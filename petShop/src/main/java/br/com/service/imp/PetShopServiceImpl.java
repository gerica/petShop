package br.com.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.Raca;
import br.com.repository.RacaRepository;
import br.com.service.PetShopService;

@Service
public class PetShopServiceImpl implements PetShopService {
	
	@Autowired
	private RacaRepository racaRepository;
	
	@Override
	public List<Raca> findAllRacas() {
		return (List<Raca>) racaRepository.findAll();
	}

}
