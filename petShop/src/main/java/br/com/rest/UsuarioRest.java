package br.com.rest;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.entidade.permissao.PapelEnum;
import br.com.entidade.permissao.Usuario;
import br.com.service.UsuarioService;

@Component
@Path(UsuarioRest.PATH_USUARIO_REST)
public class UsuarioRest {

	public static final String PATH_USUARIO_REST = "usuarioRest";
	private static final String PATH_USUARIO_REST_INCLUIR = "incluir";
	private static final String PATH_USUARIO_REST_FIND_ALL_USER = "findAllUsuario";

	@Autowired
	private UsuarioService usuarioService;

	@POST
	@Path(PATH_USUARIO_REST_INCLUIR)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE })
	public Response incluir(Usuario usuario) {
		usuarioService.incluir(usuario);
		return Response.status(200).build();
	}

	@GET
	@Path(PATH_USUARIO_REST_FIND_ALL_USER)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE })
	public List<Usuario> findAllUsuario() {
		return usuarioService.findAllUsuario();
	}

}
