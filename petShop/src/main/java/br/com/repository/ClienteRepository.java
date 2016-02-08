package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.Cliente;

public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Integer> {

}
