package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.permissao.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Integer> {

	Usuario findUsuarioByDsLogin(String dsLogin);

}
