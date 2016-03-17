package br.com.service.imp;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.auxiliar.Raca;
import br.com.entidade.auxiliar.TipoPet;
import br.com.entidade.permissao.TipoUsuario;
import br.com.repository.RacaRepository;
import br.com.repository.TipoPetRepository;
import br.com.repository.TipoUsuarioRepository;
import br.com.service.UtilService;

@Service
public class UtilServiceImpl implements UtilService {

	private static final Logger logger = LoggerFactory.getLogger(UtilServiceImpl.class);

	@Autowired
	private RacaRepository racaRepository;

	@Autowired
	private TipoPetRepository tipoPetRepository;
	
	@Autowired
	private TipoUsuarioRepository tipoUsuarioRepository;

	@Override
	public List<TipoPet> findAllTipoPet() {
		logger.info("UtilServiceImpl.findAllTipoPet()");
		return (List<TipoPet>) tipoPetRepository.findAll();
	}

	@Override
	public List<Raca> findAllRaca() {
		return (List<Raca>) racaRepository.findAll();
	}

	@Override
	public List<Raca> findRacaByTipo(Integer idTipoPet) {
		return racaRepository.findAllByTipoPet(idTipoPet);
	}

	@Override
	public List<TipoUsuario> findAllTipoUsuario() {
		return (List<TipoUsuario>) tipoUsuarioRepository.findAll();
	}

}
