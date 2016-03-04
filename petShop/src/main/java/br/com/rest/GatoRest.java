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

import br.com.entidade.Gato;
import br.com.service.GatoService;

@Component
@Path(GatoRest.PATH_GATO_REST)
public class GatoRest {

	public static final String PATH_GATO_REST = "gatoRest";
	public static final String PATH_GATO_REST_INCLUIR = "incluir";
	public static final String PATH_GATO_REST_FIND_ALL = "findAllGato";

	private static final Logger logger = LoggerFactory.getLogger(GatoRest.class);

	@Autowired
	private GatoService gatoService;

	@POST
	@Path(PATH_GATO_REST_INCLUIR)        
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(Gato gato) {
		logger.info("GatoRest.incluir()");
		gatoService.incluir(gato);
		return Response.status(200).build();
	}
	
	@GET
	@Path(PATH_GATO_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Gato> findAllCliente() {
		logger.info("GatoRest.findAllCliente()");
		return gatoService.findAll();
	}

}
