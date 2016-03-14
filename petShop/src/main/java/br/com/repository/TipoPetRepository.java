package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.auxiliar.TipoPet;

public interface TipoPetRepository extends PagingAndSortingRepository<TipoPet, Integer> {

}
