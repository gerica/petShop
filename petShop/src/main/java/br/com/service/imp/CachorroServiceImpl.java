package br.com.service.imp;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.Cachorro;
import br.com.repository.CachorroRepository;
import br.com.service.CachorroService;

@Service
public class CachorroServiceImpl implements CachorroService {

	private static final Logger logger = LoggerFactory.getLogger(CachorroServiceImpl.class);

	@Autowired
	private CachorroRepository cachorroRepository;

	@Override
	public void incluir(Cachorro cachorro) {
		logger.info("CachorroServiceImpl.incluir()");
		cachorroRepository.save(cachorro);
	}

	@Override
	public List<Cachorro> findAll() {
		logger.info("CachorroServiceImpl.findAll()");
		return (List<Cachorro>) cachorroRepository.findAll();
	}

}
