package br.com.config;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;

import br.com.filter.AuthenticationFilter;

public class CustomApplication extends ResourceConfig {
	public CustomApplication() {
		packages("br.com.rest");
		register(LoggingFilter.class);

		// Register Auth Filter here
		register(AuthenticationFilter.class);
	}
}