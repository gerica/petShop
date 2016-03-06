package br.com.rest;

import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.service.UtilService;

@Component
@Path(UtilRest.PATH_UTIL_REST)
public class UtilRest {

	public static final String PATH_UTIL_REST = "petShopRest";

	@Autowired
	private UtilService utilService;

}
