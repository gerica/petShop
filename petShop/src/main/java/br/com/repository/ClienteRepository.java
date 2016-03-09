package br.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.sistema.Cliente;

public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Integer> {

	// @Query("SELECT c FROM Cliente c WHERE c.nome like %:valor%")
	// List<Cliente> findByValor(@Param("valor") String valor);

	List<Cliente> findByDsNomeContainingIgnoreCase(String nome);

	@Query(value = "SELECT c FROM Cliente c LEFT JOIN FETCH c.pets")
	List<Cliente> findAll();

}
