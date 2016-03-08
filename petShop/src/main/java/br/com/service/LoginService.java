package br.com.service;

import br.com.entidade.permissao.Usuario;
import br.com.excecao.PetShopBusinessExcption;

public interface LoginService {

	Usuario logar(Usuario usuario) throws PetShopBusinessExcption;

}
