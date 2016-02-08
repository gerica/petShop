package br.com.service;

import java.util.Collection;

import br.com.entidade.Cliente;

public interface ClienteService {

	void incluir(Cliente cliente);

	void alterar(Cliente cliente);

	Cliente buscarPorId(Integer id);

	Collection<Cliente> buscarTodos();

}
