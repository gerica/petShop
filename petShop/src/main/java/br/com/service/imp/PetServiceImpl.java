package br.com.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.sistema.Pet;
import br.com.repository.PetRepository;
import br.com.service.PetService;

@Service
public class PetServiceImpl implements PetService {

	@Autowired
	private PetRepository petRepository;

	@Override
	public void incluir(Pet pet) {
		petRepository.save(pet);

	}

	@Override
	public List<Pet> findAll() {
		return (List<Pet>) petRepository.findAll();
	}

	@Override
	public List<Pet> findPetByCliente(Integer idCliente) {
		return (List<Pet>) petRepository.findPetByCliente(idCliente);
	}

	@Override
	public List<Pet> findPetByDsNome(String valor) {
		return (List<Pet>) petRepository.findPetByDsNome(valor);
	}

}
