package br.com.service.imp;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.Cliente;
import br.com.repository.ClienteRepository;
import br.com.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	@Override
	public void incluir(Cliente cliente) {
		clienteRepository.save(cliente);
	}

	@Override
	public void alterar(Cliente cliente) {
		// TODO Auto-generated method stub

	}

	@Override
	public Cliente buscarPorId(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Collection<Cliente> buscarTodos() {
		// TODO Auto-generated method stub
		return null;
	}

}
