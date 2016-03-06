package br.com.service.imp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import br.com.entidade.permissao.Usuario;
import br.com.service.LoginService;

@Service
public class LoginServiceImp implements LoginService {
	private static final Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);

	@Override
	public void logar(Usuario usuario) {
		System.out.println("LoginServiceImp.logar()");
		logger.info("LoginServiceImp.logar()");

	}

}
