package br.com.service.imp;

import org.springframework.stereotype.Service;

import br.com.entidade.UsuarioLogin;
import br.com.service.LoginService;

@Service
public class LoginServiceImp implements LoginService {

	@Override
	public void logar(UsuarioLogin login) {
		System.out.println("LoginServiceImp.logar() " + login);

	}

}
