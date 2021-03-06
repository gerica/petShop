package br.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.sistema.Cliente;

public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Integer> {


	@Query(value = "SELECT c FROM Cliente c WHERE UPPER(c.dsNome) like UPPER('%'||?1||'%')")
	List<Cliente> findByDsNomeContainingIgnoreCase(String nome);

	List<Cliente> findAll();

}
