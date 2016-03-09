package br.com.service.imp;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.sistema.Cliente;
import br.com.repository.ClienteRepository;
import br.com.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {
	private static final Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);

	@Autowired
	private ClienteRepository clienteRepository;

	@Override
	public void incluir(Cliente cliente) {
		logger.info("ClienteServiceImpl.incluir()");
		clienteRepository.save(cliente);
	}

	@Override
	public void alterar(Cliente cliente) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Cliente> findAll() {
		logger.info("ClienteServiceImpl.findAll()");
		return (List<Cliente>) clienteRepository.findAll();

	}

	@Override
	public Cliente findById(Integer id) {
		return null;
	}

	@Override
	public List<Cliente> findByValor(String valor) {
		logger.info("ClienteServiceImpl.findByValor()");
		return clienteRepository.findByDsNomeContainingIgnoreCase(valor);
	}

}
