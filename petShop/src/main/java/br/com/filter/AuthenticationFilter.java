package br.com.filter;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import br.com.entidade.permissao.TipoUsuarioPapel;
import br.com.entidade.permissao.Usuario;

/**
 * This filter verify the access permissions for a user based on username and
 * passowrd provided in request
 * */
@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

	@Context
	private ResourceInfo resourceInfo;

	@Context
	private HttpServletRequest httpServletRequest;

	private static final Response ACCESS_DENIED = Response.status(Response.Status.UNAUTHORIZED).entity("You cannot access this resource").build();
	private static final Response ACCESS_FORBIDDEN = Response.status(Response.Status.FORBIDDEN).entity("Access blocked for all users !!").build();

	@Override
	public void filter(ContainerRequestContext requestContext) {

		Method method = resourceInfo.getResourceMethod();
		// Access allowed for all
		if (!method.isAnnotationPresent(PermitAll.class)) {
			// Access denied for all
			if (method.isAnnotationPresent(DenyAll.class)) {
				requestContext.abortWith(ACCESS_FORBIDDEN);
				return;
			}

			HttpSession session = httpServletRequest.getSession(true);
			Usuario usuario = (Usuario) session.getAttribute("jsessionid");

			if (usuario == null) {
				requestContext.abortWith(ACCESS_DENIED);
				return;
			}

			if (method.isAnnotationPresent(RolesAllowed.class)) {
				RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
				Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));

				if (usuario != null) {
					for (String role : rolesSet) {
						if (usuario.getTipoUsuario().getTipoUsuarioPapels() != null) {
							for (TipoUsuarioPapel tipoUsuarioPapel : usuario.getTipoUsuario().getTipoUsuarioPapels()) {
								if (tipoUsuarioPapel.getPapel().getDsPapel().equals(role)) {
									return;
								}
							}
						}

					}
				}

				requestContext.abortWith(ACCESS_DENIED);
				return;

			}
		}
	}
}
