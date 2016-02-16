package br.com.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.Cachorro;
import br.com.entidade.Cliente;
import br.com.service.CachorroService;

@Component
@Path(CachorroRest.PATH_CACHORRO_REST)
public class CachorroRest {

	public static final String PATH_CACHORRO_REST = "cachorroRest";
	public static final String PATH_CACHORRO_REST_INCLUIR = "incluir";
	public static final String PATH_CACHORRO_REST_FIND_ALL = "findAllCachorro";

	private static final Logger logger = LoggerFactory.getLogger(CachorroRest.class);

	@Autowired
	private CachorroService cachorroService;

	@POST
	@Path(PATH_CACHORRO_REST_INCLUIR)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(Cachorro cachorro) {
		logger.info("CachorroRest.incluir()");
		cachorroService.incluir(cachorro);
		return Response.status(200).build();
	}
	
	@GET
	@Path(PATH_CACHORRO_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Cachorro> findAllCliente() {
		return cachorroService.findAll();
	}

}
