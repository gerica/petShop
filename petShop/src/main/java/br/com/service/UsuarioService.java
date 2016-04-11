package br.com.service;

import java.util.List;

import br.com.entidade.permissao.Usuario;

public interface UsuarioService {

	void incluir(Usuario usuario);

	List<Usuario> findAllUsuario();

}
