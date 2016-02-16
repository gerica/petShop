package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.Cachorro;

public interface CachorroRepository extends PagingAndSortingRepository<Cachorro, Integer> {

}
