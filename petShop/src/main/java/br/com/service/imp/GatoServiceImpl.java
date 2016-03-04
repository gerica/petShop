package br.com.service.imp;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.Gato;
import br.com.repository.GatoRepository;
import br.com.service.GatoService;

@Service
public class GatoServiceImpl implements GatoService {

	private static final Logger logger = LoggerFactory.getLogger(GatoServiceImpl.class);

	@Autowired
	private GatoRepository gatoRepository;

	@Override
	public void incluir(Gato gato) {
		logger.info("CachorroServiceImpl.incluir()");
		gatoRepository.save(gato);
	}

	@Override
	public List<Gato> findAll() {
		logger.info("CachorroServiceImpl.findAll()");
		return (List<Gato>) gatoRepository.findAll();
	}

}
