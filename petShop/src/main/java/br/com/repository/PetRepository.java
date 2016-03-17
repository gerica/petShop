package br.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.sistema.Pet;

public interface PetRepository extends PagingAndSortingRepository<Pet, Integer> {

	@Query(value = "SELECT p FROM Pet p WHERE p.cliente.idCliente = ?1")
	List<Pet> findPetByCliente(Integer idCliente);

	@Query(value = "SELECT p FROM Pet p WHERE UPPER(p.dsNome) like UPPER('%'||?1||'%')")
	List<Pet> findPetByDsNome(String valor);

}
