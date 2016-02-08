package br.com.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.Cliente;
import br.com.service.ClienteService;

@Component
@Path("/clienteRest")
public class ClienteRest {

	@Autowired
	private ClienteService clienteService;

	@POST
	@Path("/incluir")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(Cliente cliente) {
		clienteService.incluir(cliente);
		return Response.status(200).build();
	}

}
