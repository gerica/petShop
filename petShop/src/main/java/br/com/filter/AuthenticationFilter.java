package br.com.filter;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import br.com.entidade.permissao.TipoUsuarioPapel;
import br.com.entidade.permissao.Usuario;

/**
 * This filter verify the access permissions for a user based on username and
 * passowrd provided in request
 * */
@Provider
public class AuthenticationFilter implements javax.ws.rs.container.ContainerRequestFilter {

	@Context
	private ResourceInfo resourceInfo;

	@Context
	private HttpServletRequest req;

	private static final String AUTHORIZATION_PROPERTY = "Authorization";
	private static final String AUTHENTICATION_SCHEME = "Basic";
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

			// Get request headers
			final MultivaluedMap<String, String> headers = requestContext.getHeaders();

			// Fetch authorization header
			final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);

			// If no authorization information present; block access
			if (authorization == null || authorization.isEmpty()) {
				requestContext.abortWith(ACCESS_DENIED);
				return;
			}

			// Get encoded username and password
			final String encodedUserPassword = authorization.get(0).replaceFirst(AUTHENTICATION_SCHEME + " ", "");

			// Decode username and password
			String usernameAndPassword = new String(Base64.decode(encodedUserPassword.getBytes()));

			// Split username and password tokens
			final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
			final String username = tokenizer.nextToken();
			final String password = tokenizer.nextToken();

			// Verifying Username and password
			System.out.println(username);
			System.out.println(password);

			// Verify user access
			if (method.isAnnotationPresent(RolesAllowed.class)) {
				RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
				Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));

				// Is user valid?
				if (!isUserAllowed(username, password, rolesSet)) {
					requestContext.abortWith(ACCESS_DENIED);
					return;
				}
			}
		}
	}

	private boolean isUserAllowed(final String username, final String password, final Set<String> rolesSet) {
		HttpSession session = req.getSession();
		UsernamePasswordAuthenticationToken usuarioToken = (UsernamePasswordAuthenticationToken) session.getAttribute("jsessionid");
		if (usuarioToken != null) {
			Usuario usuario = (Usuario) usuarioToken.getPrincipal();

			if (username.equals(usuario.getDsNome()) && password.equals(usuario.getDsSenha())) {

				if (usuario != null) {
					for (String role : rolesSet) {
						if (usuario.getTipoUsuario().getTipoUsuarioPapels() != null) {
							for (TipoUsuarioPapel tipoUsuarioPapel : usuario.getTipoUsuario().getTipoUsuarioPapels()) {
								if (tipoUsuarioPapel.getPapel().getDsPapel().equals(role)) {
									return true;

								}
							}
						}

					}
				}
			}
		}
		return false;
	}

	public static void main(String[] args) {
		// decode("YmVlcDpib29w");

		String userPass = "rogerio:123";
		String usernameAndPassword = new String(Base64.encode(userPass.getBytes()));
		System.out.println(usernameAndPassword);
		decode(usernameAndPassword);

	}

	private static String decode(String encodedUserPassword) {
		String usernameAndPassword = new String(Base64.decode(encodedUserPassword.getBytes()));

		// Split username and password tokens
		final StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
		final String username = tokenizer.nextToken();
		final String password = tokenizer.nextToken();

		System.out.println(username);
		System.out.println(password);
		return encodedUserPassword;
	}
}
