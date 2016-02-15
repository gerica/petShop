package br.com.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.Cliente;

public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Integer> {

//	@Query("SELECT c FROM Cliente c WHERE c.nome like %:valor%")
//	List<Cliente> findByValor(@Param("valor") String valor);
	
	List<Cliente> findByNomeContainingIgnoreCase(String nome);

}
