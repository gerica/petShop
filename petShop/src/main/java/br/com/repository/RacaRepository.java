package br.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.auxiliar.Raca;

public interface RacaRepository extends PagingAndSortingRepository<Raca, Integer> {

	@Query(value = "SELECT r FROM Raca r LEFT JOIN FETCH r.tipoPet where r.tipoPet.idTipoPet = ?1")
	List<Raca> findAllByTipoPet(Integer idTipoPet);

}
