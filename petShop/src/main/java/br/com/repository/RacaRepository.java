package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.auxiliar.Raca;

public interface RacaRepository extends PagingAndSortingRepository<Raca, Integer> {

}
