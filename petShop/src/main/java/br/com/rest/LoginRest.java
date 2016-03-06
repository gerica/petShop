package br.com.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.permissao.Usuario;
import br.com.service.LoginService;

@Component
@Path("/loginRest")
public class LoginRest {

	@Autowired
	private LoginService loginService;

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(Usuario usuario) {
		loginService.logar(usuario);
		return Response.status(200).build();
	}

}
