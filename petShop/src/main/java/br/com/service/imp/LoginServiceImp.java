package br.com.service.imp;

import java.util.ArrayList;
import java.util.List;

import org.glassfish.jersey.internal.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.permissao.Privilege;
import br.com.entidade.permissao.Role;
import br.com.entidade.permissao.TipoUsuarioPapel;
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
	public Usuario logar(String username, String password) throws PetShopBusinessExcption {
		logger.info("LoginServiceImp.logar()");
		Usuario usuarioBD = usuarioRepository.findUsuarioByDsLogin(username.toUpperCase());
		validarLogin(username, password, usuarioBD);
		loadRoles(usuarioBD);
		return usuarioBD;

	}

	private void validarLogin(String username, String password, Usuario usuarioBD) throws PetShopBusinessExcption {

		if (usuarioBD == null) {
			throw new PetShopBusinessExcption("Não existe nenhum usuário com esse Login.");
		}

		StringBuilder userSenhaView = new StringBuilder(username);
		userSenhaView.append(":");
		userSenhaView.append(password);

		String usernameAndPassword = new String(Base64.encode(userSenhaView.toString().getBytes()));

		if (!usernameAndPassword.equals(usuarioBD.getDsSenha())) {
			throw new PetShopBusinessExcption("A senha não confere.");
//			cm9nZXJpbzoxMjM=
		}

	}

	private void loadRoles(Usuario usuario) {
		if (usuario != null) {
			Role r = null;
			Privilege p = null;
			List<Role> roles = new ArrayList<Role>();

			for (TipoUsuarioPapel tup : usuario.getTipoUsuario().getTipoUsuarioPapels()) {
				r = new Role();
				p = new Privilege();
				r.setName(tup.getPapel().getDsPapel());
				p.setName(tup.getPapel().getDsPapel());
				roles.add(r);
				r.addPrivilege(p);
				usuario.setAuthorities(roles);
			}
		}
	}

}
