package br.com.excecao;

import org.glassfish.jersey.server.monitoring.RequestEvent;
import org.glassfish.jersey.server.monitoring.RequestEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ExceptionListener {

//	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		new ExceptionRequestEventListener();
	}

	public static class ExceptionRequestEventListener implements RequestEventListener {
		private static final Logger logger = LoggerFactory.getLogger(ExceptionListener.class);

		public ExceptionRequestEventListener() {
		}

		@Override
		public void onEvent(RequestEvent event) {
			switch (event.getType()) {
			case ON_EXCEPTION:
				Throwable t = event.getException();
				logger.error("Found exception for requestType: " + event.getType(), t);
			}
		}
	}

}
