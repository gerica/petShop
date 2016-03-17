package br.com.rest;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.auxiliar.Raca;
import br.com.entidade.auxiliar.TipoPet;
import br.com.entidade.permissao.TipoUsuario;
import br.com.service.UtilService;

@Component
@Path(UtilRest.PATH_UTIL_REST)
public class UtilRest {

	public static final String PATH_UTIL_REST = "petShopRest";
	private static final String PATH_TIPO_PET_REST_FIND_ALL = "findAllTipoPet";
	private static final String PATH_RACA_REST_FIND_ALL = "findAllRaca";
	private static final String PATH_RACA_REST_FIND_BY_TIPO = "findRacaByTipo";
	private static final String PATH_RACA_REST_FIND_ALL_TIPO_USUARIO = "findAllTipoUsuario";

	@Autowired
	private UtilService utilService;

	@GET
	@Path(PATH_TIPO_PET_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<TipoPet> findAllTipoPet() {
		return utilService.findAllTipoPet();
	}

	@GET
	@Path(PATH_RACA_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<Raca> findAllRaca() {
		return utilService.findAllRaca();
	}

	@GET
	@Path(PATH_RACA_REST_FIND_BY_TIPO)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<Raca> findRacaByTipo(@QueryParam("valor") Integer idTipoPet) {
		return utilService.findRacaByTipo(idTipoPet);
	}
	
	@GET
	@Path(PATH_RACA_REST_FIND_ALL_TIPO_USUARIO)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<TipoUsuario> findAllTipoUsuario() {
		return utilService.findAllTipoUsuario();
	}

}
