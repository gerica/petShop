package br.com.rest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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

	@Autowired
	private UsuarioService usuarioService;

	@POST
	@Path(PATH_USUARIO_REST_INCLUIR)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ PapelEnum.Constants.GERENTE, PapelEnum.Constants.VENDAS, PapelEnum.Constants.COMPRAS, PapelEnum.Constants.VETERINARIO,
		PapelEnum.Constants.CONTABIL, PapelEnum.Constants.FISCAL, PapelEnum.Constants.TOSARDOR, PapelEnum.Constants.ENCARREGADO_ESTOQUE })
	public Response incluir(Usuario usuario) {
		usuarioService.incluir(usuario);
		return Response.status(200).build();
	}

}
