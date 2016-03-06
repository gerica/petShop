package br.com.service;

import java.util.List;

import br.com.entidade.sistema.Cliente;

public interface ClienteService {

	void incluir(Cliente cliente);

	void alterar(Cliente cliente);

	Cliente findById(Integer id);

	List<Cliente> findAll();
	
	List<Cliente> findByValor(String valor);

}
