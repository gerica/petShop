package br.com.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.Raca;
import br.com.service.PetShopService;

@Component
@Path(PetShopRest.PATH_PATSHOP_REST)
public class PetShopRest {

	public static final String PATH_PATSHOP_REST = "petShopRest";
	public static final String PATH_PATSHOP_RACA_FIND_ALL = "findAllRaca";

	@Autowired
	private PetShopService petShopService;

	@GET
	@Path(PATH_PATSHOP_RACA_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Raca> findAllRaca() {
		return petShopService.findAllRacas();
	}

}
