package br.com.excecao;

import java.io.Serializable;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class PetShopBusinessExcption extends Exception implements Serializable, ExceptionMapper<PetShopBusinessExcption> {
	private static final long serialVersionUID = 1L;

	public PetShopBusinessExcption() {
		super();
	}

	public PetShopBusinessExcption(String msg) {
		super(msg);
	}

	public PetShopBusinessExcption(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public PetShopBusinessExcption(String message, Throwable cause) {
		super(message, cause);
	}

	public PetShopBusinessExcption(Throwable cause) {
		super(cause);
	}

	@Override
	public Response toResponse(PetShopBusinessExcption exception) {
		return Response.status(Response.Status.BAD_REQUEST).entity(exception.getMessage()).type(MediaType.APPLICATION_JSON).build();
	}

}
