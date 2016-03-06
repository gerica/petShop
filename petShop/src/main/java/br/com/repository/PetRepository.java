package br.com.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.entidade.sistema.Pet;

public interface PetRepository extends PagingAndSortingRepository<Pet, Integer> {

}
