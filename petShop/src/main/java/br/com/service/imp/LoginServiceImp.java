package br.com.service.imp;

import org.glassfish.jersey.internal.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.permissao.Usuario;
import br.com.excecao.PetShopBusinessExcption;
import br.com.repository.UsuarioRepository;
import br.com.service.LoginService;

@Service
public class LoginServiceImp implements LoginService {
	private static final Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public Usuario logar(Usuario usuario) throws PetShopBusinessExcption {
		logger.info("LoginServiceImp.logar()");
		Usuario usuarioBD = usuarioRepository.findUsuarioByDsLogin(usuario.getDsLogin().toUpperCase());
		validarLogin(usuario, usuarioBD);
		return usuarioBD;

	}

	private void validarLogin(Usuario usuario, Usuario usuarioBD) throws PetShopBusinessExcption {
		if (usuarioBD == null) {
			throw new PetShopBusinessExcption("Não existe nenhum usuário com esse Login.");
		}

		StringBuilder userSenhaView = new StringBuilder(usuario.getDsLogin());
		userSenhaView.append(":");
		userSenhaView.append(usuario.getDsSenha());

		String usernameAndPassword = new String(Base64.encode(userSenhaView.toString().getBytes()));

		if (!usernameAndPassword.equals(usuarioBD.getDsSenha())) {
			throw new PetShopBusinessExcption("A senha não confere.");

		}

	}

}
