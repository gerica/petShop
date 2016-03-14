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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.sistema.Cliente;
import br.com.service.ClienteService;

@Component
@Path(ClienteRest.PATH_CLIENTE_REST)
public class ClienteRest {

	public static final String PATH_CLIENTE_REST = "clienteRest";
	private static final String PATH_CLIENTE_REST_INCLUIR = "incluir";
	private static final String PATH_CLIENTE_REST_FIND_ALL = "findAllCliente";
	private static final String PATH_CLIENTE_REST_FIND_VALOR = "findByValor";

	@Autowired
	private ClienteService clienteService;

	@POST
	@Path(PATH_CLIENTE_REST_INCLUIR)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public Response incluir(Cliente cliente) {
		clienteService.incluir(cliente);
		return Response.status(200).build();
	}

	@GET
	@Path(PATH_CLIENTE_REST_FIND_ALL)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<Cliente> findAllCliente() {
		return clienteService.findAll();
	}

	@GET
	@Path(PATH_CLIENTE_REST_FIND_VALOR)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("GERENTE")
	public List<Cliente> findCliente(@QueryParam("valor") String valor) {
		return clienteService.findByValor(valor);
	}

}
