package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.Gato;

public interface GatoRepository extends PagingAndSortingRepository<Gato, Integer> {

}
