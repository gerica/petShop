package br.com.excecao;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class PetShopExceptionWebApplication extends WebApplicationException {
	public PetShopExceptionWebApplication() {
		super(Response.noContent().build());
	}

	public PetShopExceptionWebApplication(String message) {
		super(Response.status(Response.Status.BAD_REQUEST).entity(new ErrorItem(Response.Status.BAD_REQUEST.getStatusCode(), "bad_parameter", message)).type(MediaType.APPLICATION_JSON).build());
    }

}
