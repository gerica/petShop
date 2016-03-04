package br.com.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.RacaCachorro;
import br.com.entidade.RacaGato;
import br.com.service.PetShopService;

@Component
@Path(PetShopRest.PATH_PATSHOP_REST)
public class PetShopRest {

	public static final String PATH_PATSHOP_REST = "petShopRest";
	public static final String PATH_PATSHOP_RACA_FIND_ALL = "findAllRaca";
	public static final String PATH_PATSHOP_RACA_GATO_FIND_ALL = "findAllRacaGato";

	@Autowired
	private PetShopService petShopService;
	
	@GET
	@Path(PATH_PATSHOP_RACA_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	public List<RacaCachorro> findAllRaca() {
		return petShopService.findAllRacasCachorro();
	}

	@GET
	@Path(PATH_PATSHOP_RACA_GATO_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	public List<RacaGato> findAllRacaGato() {
		return petShopService.findAllRacasGato();
	}

}
