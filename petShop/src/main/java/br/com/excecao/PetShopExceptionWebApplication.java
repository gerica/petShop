package br.com.excecao;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.jersey.api.Responses;

public class PetShopExceptionWebApplication extends WebApplicationException {
	public PetShopExceptionWebApplication() {
		super(Responses.notFound().build());
	}

	public PetShopExceptionWebApplication(String message) {
		super(Response.status(Responses.NOT_ACCEPTABLE).entity(new ErrorItem(Response.Status.BAD_REQUEST.getStatusCode(), "bad_parameter", message)).type(MediaType.APPLICATION_JSON).build());
    }

}
