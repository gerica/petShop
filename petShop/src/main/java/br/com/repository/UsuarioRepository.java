package br.com.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.permissao.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Integer> {

	@Query(value = "SELECT u FROM Usuario u WHERE UPPER(u.dsLogin) like UPPER(?1)")
	Usuario findUsuarioByDsLogin(String dsLogin);

	Usuario findByDsNome(String username);

}
