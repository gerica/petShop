package br.com.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.permissao.Usuario;
import br.com.excecao.PetShopBusinessExcption;
import br.com.service.LoginService;

@Component
@Path("/loginRest")
public class LoginRest {

	private static final Logger logger = LoggerFactory.getLogger(LoginRest.class);

	@Autowired
	private LoginService loginService;

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(Usuario usuario) throws PetShopBusinessExcption {
		Usuario usuarioLogin = null;
		try {
			usuarioLogin = loginService.logar(usuario);
		} catch (PetShopBusinessExcption e) {
			logger.error(e.getMessage());
//			return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
			throw e;

		}
		return Response.ok().entity(usuarioLogin).build();
	}

}
