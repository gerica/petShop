package br.com.service.imp;

import org.glassfish.jersey.internal.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.entidade.permissao.Usuario;
import br.com.repository.UsuarioRepository;
import br.com.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public void incluir(Usuario usuario) {
		String userPass = usuario.getDsLogin() + ":" + usuario.getDsSenha();
		String userPassBase64 = new String(Base64.encode(userPass.getBytes()));
		usuario.setDsSenha(userPassBase64);
		usuarioRepository.save(usuario);
	}


	public static void main(String[] args) {
		
		StringBuilder userSenhaView = new StringBuilder("rogerio");
		userSenhaView.append(":");
		userSenhaView.append("123");

		System.out.println(new String(Base64.encode(userSenhaView.toString().getBytes())));
		

	}

}
