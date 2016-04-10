package br.com.rest;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import br.com.config.CustomAuthenticationProvider;
import br.com.entidade.permissao.Usuario;
import br.com.excecao.PetShopExceptionWebApplication;
import br.com.service.LoginService;

@Component
@Path(LoginRest.PATH_LOGIN_REST)
public class LoginRest {

	private static final Logger logger = LoggerFactory.getLogger(LoginRest.class);

	public static final String PATH_LOGIN_REST = "loginRest";
	private static final String PATH_LOGIN_REST_LOGAR = "login";
	private static final String PATH_LOGIN_REST_LOGOUT = "logout";
	private static final String PATH_SESSION_ATIVADA = "sessionAtivada";

	@Autowired
	private LoginService loginService;

	@Autowired
	private CustomAuthenticationProvider authenticatin;
	
	@Context
	private HttpServletRequest httpServletRequest;
	

	@POST
	@Path(PATH_LOGIN_REST_LOGAR)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response login(Usuario usuario) {
		logger.info("LoginRest.login()");
		
		
		try {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(usuario.getDsLogin(), usuario.getDsSenha());
			token.setDetails(new WebAuthenticationDetails(httpServletRequest));
			Authentication auth = authenticatin.authenticate(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
			
			// We configure your Security Context here
			httpServletRequest.getSession().setAttribute("jsessionid", auth);
			return Response.ok().entity(auth.getPrincipal()).build();
		} catch (AuthenticationException e) {
			logger.error(e.getMessage());
			throw new PetShopExceptionWebApplication(e.getMessage());
		}
		

	}

	@POST
	@Path(PATH_LOGIN_REST_LOGOUT)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "GERENTE", "VENDAS", "COMPRAS", "VETERINARIO", "CONTABIL", "FISCAL", "TOSARDOR", "ENCARREGADO ESTOQUE" })
	public Response logout() {
		logger.info("LoginRest.logout()");

		HttpSession session = httpServletRequest.getSession();
		session.invalidate();

		return Response.ok().build();
	}

	@GET
	@Path(PATH_SESSION_ATIVADA)	
	@PermitAll
	public Response sessionAtivada() {
		logger.info("LoginRest.sessionAtivada()");
		HttpSession session = httpServletRequest.getSession();
		UsernamePasswordAuthenticationToken usuario = (UsernamePasswordAuthenticationToken) session.getAttribute("jsessionid");
		
		if (usuario == null) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
			
		}


		return Response.ok().build();
	}

}
