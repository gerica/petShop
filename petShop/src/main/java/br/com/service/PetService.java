package br.com.service;

import java.util.List;

import br.com.entidade.sistema.Cliente;
import br.com.entidade.sistema.Pet;

public interface PetService {

	void incluir(Pet pet);

	List<Pet> findAll();

	List<Pet> findPetByCliente(Integer idCliente);

	List<Pet> findPetByDsNome(String valor);

}
