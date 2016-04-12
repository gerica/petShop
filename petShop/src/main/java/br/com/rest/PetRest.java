package br.com.rest;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.permissao.PapelEnum;
import br.com.entidade.sistema.Pet;
import br.com.service.PetService;

@Component
@Path(PetRest.PATH_PET_REST)
public class PetRest {

	public static final String PATH_PET_REST = "petRest";
	public static final String PATH_PET_REST_INCLUIR = "incluir";
	public static final String PATH_PET_REST_FIND_ALL = "findAll";
	public static final String PATH_PET_REST_FIND_PET_BY_CLIENTE = "findPetByCliente";
	public static final String PATH_PET_REST_FIND_PET_BY_DS_NOME = "findPetByDsNome";

	private static final Logger logger = LoggerFactory.getLogger(PetRest.class);

	@Autowired
	private PetService petService;

	@POST
	@Path(PATH_PET_REST_INCLUIR)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE, PapelEnum.Constants.VENDAS, PapelEnum.Constants.COMPRAS, PapelEnum.Constants.VETERINARIO,
		PapelEnum.Constants.CONTABIL, PapelEnum.Constants.FISCAL, PapelEnum.Constants.TOSARDOR, PapelEnum.Constants.ENCARREGADO_ESTOQUE })
	public Response incluir(Pet pet) {
		logger.info("PetRest.incluir()");
		petService.incluir(pet);
		return Response.status(200).build();
	}

	@GET
	@Path(PATH_PET_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE, PapelEnum.Constants.VENDAS, PapelEnum.Constants.COMPRAS, PapelEnum.Constants.VETERINARIO,
		PapelEnum.Constants.CONTABIL, PapelEnum.Constants.FISCAL, PapelEnum.Constants.TOSARDOR, PapelEnum.Constants.ENCARREGADO_ESTOQUE })
	public List<Pet> findAll() {
		return petService.findAll();
	}
	
	@GET
	@Path(PATH_PET_REST_FIND_PET_BY_CLIENTE)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE, PapelEnum.Constants.VENDAS, PapelEnum.Constants.COMPRAS, PapelEnum.Constants.VETERINARIO,
		PapelEnum.Constants.CONTABIL, PapelEnum.Constants.FISCAL, PapelEnum.Constants.TOSARDOR, PapelEnum.Constants.ENCARREGADO_ESTOQUE })
	public List<Pet> findPetByCliente(@QueryParam("valor") Integer idCliente) {
		return petService.findPetByCliente(idCliente);
	}

	@GET
	@Path(PATH_PET_REST_FIND_PET_BY_DS_NOME)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE, PapelEnum.Constants.VENDAS, PapelEnum.Constants.COMPRAS, PapelEnum.Constants.VETERINARIO,
		PapelEnum.Constants.CONTABIL, PapelEnum.Constants.FISCAL, PapelEnum.Constants.TOSARDOR, PapelEnum.Constants.ENCARREGADO_ESTOQUE })
	public List<Pet> findPetByDsNome(@QueryParam("valor") String valor) {
		return petService.findPetByDsNome(valor);
	}

}
