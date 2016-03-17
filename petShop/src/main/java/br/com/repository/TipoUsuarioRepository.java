package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.permissao.TipoUsuario;

public interface TipoUsuarioRepository extends PagingAndSortingRepository<TipoUsuario, Integer> {

}
